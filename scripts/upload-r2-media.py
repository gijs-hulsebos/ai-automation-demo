"""Upload the checked-in media manifest with Wrangler; never delete remote objects."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess

root = Path(__file__).resolve().parents[1]
env = os.environ.copy()
for name in ('CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_API_KEY', 'CLOUDFLARE_EMAIL'):
    env.pop(name, None)
npx = shutil.which('npx.cmd') or shutil.which('npx')
if not npx:
    raise SystemExit('Install Node.js first')
items = json.loads((root / 'infra/media/manifest.json').read_text())
for item in items:
    path = root / item['local']
    if hashlib.sha256(path.read_bytes()).hexdigest() != item['sha256']:
        raise SystemExit(f"Source changed: {item['local']}")
    subprocess.run([npx, '--yes', 'wrangler@4.135.0', 'r2', 'object', 'put',
        'gijshulsebos-media/' + item['key'], '--remote', '--file', str(path),
        '--content-type', item['contentType'], '--cache-control',
        'public, max-age=31536000, immutable', '--config', 'infra/media/wrangler.jsonc'],
        cwd=root, env=env, check=True)
    print('Uploaded:', item['key'], flush=True)
