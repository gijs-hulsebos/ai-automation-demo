"""Read-only live checks: exact bytes, MIME, caching, CORS, seeking and read-only access."""
import hashlib
import json
from pathlib import Path
import urllib.request
import urllib.error

root = Path(__file__).resolve().parents[1]
base = 'https://gijshulsebos-media.ai-automation-workflow-demo.workers.dev/'
items = json.loads((root / 'infra/media/manifest.json').read_text())

def fetch(url, method='GET', headers=None):
    # workers.dev rejects Python's default agent (1010); check browser delivery.
    request = urllib.request.Request(url, method=method, headers={'User-Agent': 'Mozilla/5.0', **(headers or {})})
    try:
        return urllib.request.urlopen(request, timeout=120)
    except urllib.error.HTTPError as error:
        return error

for item in items:
    url = base + item['key']
    with fetch(url) as response:
        assert response.status == 200, (url, response.status)
        data = response.read()
        assert hashlib.sha256(data).hexdigest() == item['sha256'], url
        assert len(data) == item['bytes'], url
        assert response.headers['Content-Type'] == item['contentType'], url
        assert 'immutable' in response.headers['Cache-Control'], url
        assert response.headers['Access-Control-Allow-Origin'] == '*', url
        etag = response.headers['ETag']
    with fetch(url, 'HEAD') as response:
        assert response.status == 200 and int(response.headers['Content-Length']) == item['bytes'], url
    with fetch(url, headers={'If-None-Match': etag}) as response:
        assert response.status == 304, url
    if item['contentType'].startswith('video/'):
        for value, expected in [('bytes=0-31', data[:32]), ('bytes=-32', data[-32:])]:
            with fetch(url, headers={'Range': value}) as response:
                assert response.status == 206 and response.read() == expected, url
        with fetch(url, headers={'Range': f"bytes={item['bytes']}-"}) as response:
            assert response.status == 416, url
    print('Verified:', item['key'], flush=True)
with fetch(base + items[0]['key'], 'POST') as response:
    assert response.status == 405
with fetch(base + 'not-public') as response:
    assert response.status == 404
print(f"PASS: {len(items)} files, {sum(item['bytes'] for item in items)} bytes")
