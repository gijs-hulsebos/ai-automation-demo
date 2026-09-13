import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from reportlab.pdfgen import canvas
import sync_certificates as sync


def pdf(text):
    buffer = io.BytesIO()
    page = canvas.Canvas(buffer)
    page.drawString(100, 700, text)
    page.save()
    return buffer.getvalue()


class SyncTests(unittest.TestCase):
    def test_lifecycle_cache_dedup_and_failure(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'data').mkdir()
            a, b = pdf('First certificate'), pdf('Replacement certificate')
            files = {'Provider/Specialisation/A & B.pdf': a,
                     'Provider/Course/Duplicate.pdf': a,
                     'Provider/Invalid/Placeholder.pdf': b'not a PDF'}

            def fetch(url):
                from urllib.parse import unquote
                if '/commits/main' in url:
                    return json.dumps({'sha': 'snapshot'}).encode()
                if '/git/trees/' in url:
                    return json.dumps({'sha': 'snapshot', 'tree': [
                        {'path': path, 'type': 'blob', 'size': len(data),
                         'sha': sync.hashlib.sha256(data).hexdigest()}
                        for path, data in files.items()]}).encode()
                return files[unquote(url.split('/snapshot/')[1])]

            with patch.object(sync, 'ROOT', root), patch.object(sync, 'fetch', side_effect=fetch):
                sync.sync()
                manifest = root / 'data/certificates.json'
                first = json.loads(manifest.read_text('utf-8'))
                self.assertEqual(len(first['certificates']), 1)
                self.assertEqual(len(first['skipped']), 2)
                previews = list((root / 'public/certificates').glob('*.webp'))
                modified = previews[0].stat().st_mtime_ns
                sync.sync()
                self.assertEqual(previews[0].stat().st_mtime_ns, modified)
                files.pop('Provider/Course/Duplicate.pdf')
                files['Provider/Specialisation/A & B.pdf'] = b
                sync.sync()
                current = json.loads(manifest.read_text('utf-8'))['certificates'][0]
                self.assertEqual(current['title'], 'Specialisation')
                self.assertIn('A%20%26%20B.pdf', current['credential'])
                self.assertFalse(previews[0].exists())
                before = manifest.read_bytes()
                with patch.object(sync, 'fetch', side_effect=OSError('network failure')):
                    with self.assertRaises(OSError):
                        sync.sync()
                self.assertEqual(manifest.read_bytes(), before)
                files.clear()
                with self.assertRaises(RuntimeError):
                    sync.sync()
                self.assertEqual(manifest.read_bytes(), before)


if __name__ == '__main__':
    unittest.main()
