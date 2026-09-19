# R2 media migration

Branch: `migrate-media-to-r2`, based on main `7985619`.

The application stays on Vercel. Media is stored in the `gijshulsebos-media`
R2 bucket in the Cloudflare account for gijs@gijshulsebos.com. A read-only
Worker serves the files at:

https://gijshulsebos-media.ai-automation-workflow-demo.workers.dev/

The owner approved this Cloudflare address instead of `media.gijshulsebos.com`.
No DNS or registrar changes were made. No main branch push or merge is included.

## Selection and integrity

25 tracked media files of at least 500,000 bytes were migrated, totaling
106,396,339 bytes (106.40 MB / 101.47 MiB). This includes all six MP4 videos,
large PNGs, and eight unusually large SVGs containing embedded raster images.
Some large PNGs are source variants of the SVG logos; these are retained in R2
as well, even where the application does not currently reference them.

Small images, certificate thumbnails, fonts, light SVG/UI assets, and JSON
catalogs remain local. Media was not resized, recompressed, or otherwise edited.
`infra/media/manifest.json` records every original path, size, MIME type, SHA-256,
and remote key. Folder structure is preserved; filenames include a content hash.

All objects were uploaded before reference changes. Every live object was
downloaded and SHA-256 checked before its local copy was removed. Application
references were checked before removal, including conditional paths and shared
logo maps. CSS masks and metadata do not reference any migrated assets.

## Delivery

- Immutable content-hashed URLs, with one-year browser cache headers.
- Streamed responses, byte ranges and suffix ranges for video seeking.
- HEAD, ETag/304, CORS and correct content types.
- Only manifest-listed objects can be read. No public upload, listing or delete API.
- Full responses use the Workers Cache API; partial responses are not stored as full files.
- Next.js remote image allowlist includes only the exact media hostname.
  Existing responsive image optimization remains enabled for raster images.

Workers request limits/billing apply in addition to R2 storage and operations.
Cloudflare recommends custom domains for production Workers; workers.dev is the
owner-approved compromise to avoid moving DNS. Monitor the account's request
quota. A domain can be added later without changing the stored objects.
The standard Python urllib User-Agent receives Cloudflare 1010; verification uses
browser headers. Browser and Next.js optimizer delivery must be checked as well.

## Verification and maintenance

Run `python scripts/verify-r2-media.py` to check the live bytes and HTTP behavior.
Deploy the media gateway with:

```sh
npx wrangler@4.135.0 deploy --config infra/media/wrangler.jsonc
```

Use the correct Wrangler OAuth account; do not supply another account's inherited
API token. Credentials and `.wrangler` state are not tracked.
`scripts/upload-r2-media.py` is the original upload procedure and requires the
original files at their manifest paths (available from commit `c26a616`).
It never deletes R2 objects. New media needs a new hash/key and manifest entry;
upload and verify first, then update references and deploy the gateway allowlist.

The initial `npm ci` exposed an existing optional dependency lockfile mismatch.
That was repaired separately and a clean install was rerun successfully.

Validation results:

- Production build passed, including TypeScript and all 13 generated pages.
- Home, projects, certificates and learning-trajectory returned HTTP 200.
- All 11 migrated PNGs returned HTTP 200 through the built Next.js image optimizer.
- Live verification passed for all 25 R2 objects, including video seeking.
- Technology evidence and portfolio chat regression scripts passed.
- The learning radar script fails at its existing missing `YamlGen` assertion;
  the unchanged original main checkout produces the identical failure.
- Application/data diffs are asset URL substitutions only. No design changes.
- Browser visual automation could not start due to a tool filesystem-path error;
  visual browser verification is therefore not claimed.
- Remaining tracked public assets total 14,251,086 bytes, down from 120,647,425
  bytes (88.2% reduction in public asset payload).

## Deployment impact

The reduction applies to future Vercel deployments containing this branch.
Existing Vercel deployments and historical Git objects are unchanged. Their
storage is not reclaimed by moving media in a new commit. Next.js image caching
and application build output still use Vercel resources. Reduced deployment size
is verified; a page-speed improvement is not claimed without measurement.
