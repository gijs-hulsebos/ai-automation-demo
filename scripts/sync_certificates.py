"""Transactional, content-addressed certificate importer. No credentials reach the browser."""
from contextlib import closing
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import tempfile
import time
import urllib.error
import urllib.request
from urllib.parse import quote

import pypdfium2 as pdfium
from sync_learning_catalog import sync_catalog

ROOT = Path(__file__).resolve().parents[1]
REPO = 'gijs-hulsebos/Certificates'
VERSION = 1
FETCH_ATTEMPTS = 5
FETCH_BACKOFF_SECONDS = 1


def fetch(url):
    headers = {'User-Agent': 'certificate-preview-builder'}
    token = os.environ.get('CERTIFICATES_TOKEN')
    if token:
        headers['Authorization'] = f'Bearer {token}'
    request = urllib.request.Request(url, headers=headers)
    for attempt in range(FETCH_ATTEMPTS):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.read()
        except (urllib.error.URLError, ConnectionError, TimeoutError, OSError):
            if attempt == FETCH_ATTEMPTS - 1:
                raise
            time.sleep(FETCH_BACKOFF_SECONDS * (2 ** attempt))


def render(data):
    if not data.lstrip().startswith(b'%PDF-'):
        raise ValueError('Missing PDF signature')
    with closing(pdfium.PdfDocument(data)) as document:
        if len(document) == 0:
            raise ValueError('No pages')
        with closing(document[0]) as page:
            with closing(page.render(scale=1000 / max(page.get_size()))) as bitmap:
                image = bitmap.to_pil().convert('RGB')
        if all(low == high for low, high in image.getextrema()):
            raise ValueError('Blank first page')
        return image


def sync():
    manifest = ROOT / 'data/certificates.json'
    previews = ROOT / 'public/certificates'
    previews.mkdir(parents=True, exist_ok=True)
    old = json.loads(manifest.read_text('utf-8')) if manifest.exists() else {}
    previous = {c['path']: c for c in old.get('certificates', [])}
    commit = json.loads(fetch(f'https://api.github.com/repos/{REPO}/commits/main'))['sha']
    tree = json.loads(fetch(f'https://api.github.com/repos/{REPO}/git/trees/{commit}?recursive=1'))
    if tree.get('truncated'):
        raise RuntimeError('Truncated repository listing: preserving last successful manifest')
    certificates, skipped, seen = [], [], set()
    with tempfile.TemporaryDirectory() as temporary:
        staging = Path(temporary)
        for entry in sorted(tree['tree'], key=lambda item: item['path']):
            path = entry['path']
            if entry['type'] != 'blob' or not path.lower().endswith('.pdf'):
                continue
            parts = PurePosixPath(path).parts
            if len(parts) < 3 or entry.get('size', 0) == 0:
                skipped.append({'path': path, 'reason': 'Empty file or missing provider/course folders'})
                continue
            cached = previous.get(path)
            if (old.get('rendererVersion') == VERSION and cached and cached['blob'] == entry['sha']
                    and (ROOT / 'public' / cached['image'].lstrip('/')).exists()):
                record = dict(cached)
            else:
                # Network errors deliberately abort the entire run, never silently delete entries.
                data = fetch(f'https://raw.githubusercontent.com/{REPO}/{commit}/{quote(path, safe="/")}')
                digest = hashlib.sha256(data).hexdigest()
                try:
                    image = render(data)
                except (ValueError, pdfium.PdfiumError) as error:
                    skipped.append({'path': path, 'reason': str(error)})
                    continue
                filename = f'{digest}-v{VERSION}.webp'
                if not (previews / filename).exists():
                    image.save(staging / filename, 'WEBP', quality=86, method=6)
                record = {'id': digest, 'blob': entry['sha'], 'path': path,
                          'title': parts[-2].strip(), 'issuer': parts[0],
                          'image': f'/certificates/{filename}'}
            if record['id'] in seen:
                skipped.append({'path': path, 'reason': 'Duplicate content'})
                continue
            seen.add(record['id'])
            record['credential'] = f'https://raw.githubusercontent.com/{REPO}/{commit}/{quote(path, safe="/")}'
            certificates.append(record)
        if not certificates:
            raise RuntimeError('No valid certificates: preserving last successful data')
        sync_catalog(ROOT, commit, tree, certificates, fetch)
        result = {'repository': REPO, 'commit': commit, 'rendererVersion': VERSION,
                  'certificates': certificates, 'skipped': skipped}
        # Publish previews before atomically replacing the only consumer entry point.
        for file in staging.glob('*.webp'):
            (previews / file.name).write_bytes(file.read_bytes())
        replacement = manifest.with_suffix('.json.tmp')
        replacement.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', 'utf-8')
        os.replace(replacement, manifest)
        referenced = {Path(c['image']).name for c in certificates}
        for file in previews.glob('*.webp'):
            if file.name not in referenced:
                file.unlink()
    print(f'{len(certificates)} valid certificates; {len(skipped)} skipped')
    for entry in skipped:
        print(entry)


if __name__ == '__main__':
    sync()
