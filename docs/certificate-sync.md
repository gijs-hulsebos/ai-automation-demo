# Certificate synchronisation

## Current deployment and trigger

The current website and receiver workflow have been published to `gijs-hulsebos/ai-automation-demo` on `main` (initial commit `bd43139`). Vercel completed the automatic Git deployment. The production site now contains the carousel and `/certificates.json`.

After the user's preference for pulling the public source, the active trigger is a scheduled check every five minutes (offset to minutes 2, 7, 12, etc.). GitHub may delay scheduled jobs. No additional PAT is required to read the public Certificates repository; the workflow's built-in token publishes generated files in the website repository. Runs are serialized, and a source snapshot is checked again before commit and deployment. The workflow is not triggered by its own commits.

The existing Vercel Git integration is used first. `VERCEL_DEPLOY_HOOK` is optional and is called only if configured, after publishing generated assets. The workflow then waits for actual live data and checks every carousel card using a browser. A successful hook request or local build does not count as verification.

## End-to-end test in progress

The real Anthropic PDF was renamed to `Introduction to Model Context Protocol - Coursera 0T1UB7FHM21J.pdf` in source commit `2a33de6967a6a60cfe51496d183d56a0b1112213`; its PDF blob is unchanged. This is the test change, with no fictitious certificate. No manual synchronization workflow was started. Until a **schedule-triggered** run succeeds and produces the live-certificate-proof artifact for that source snapshot, automatic synchronization remains unverified.

## Optional immediate push notification

For immediate `repository_dispatch`, install `docs/certificates-source-workflow.yml` in Certificates and provide `PORTFOLIO_DISPATCH_TOKEN` as an Actions secret there. Use a fine-grained token scoped only to the website repository with Contents: write, or a GitHub App installation token. This optional source notifier has not been installed because no scoped token was supplied. It is not needed by the active polling approach.

If Vercel's Git integration does not deploy the workflow bot's commit, a Vercel administrator must create a Deploy Hook for production `main` and save it as website repository secret `VERCEL_DEPLOY_HOOK`. Never put tokens or hook URLs in chat or browser code.

## Verification

Successful changed-data runs publish `live-certificate-proof`: a JSON report and screenshot checking the production manifest, all certificate links/titles, provider fallback, loaded previews and sixteen fixed carousel slots. See the historical [pre-publication audit](certificate-sync-audit-2026-09-13.md).

## Local processing

```
python -m pip install -r scripts/requirements-certificates.txt
python scripts/sync_certificates.py
python -m unittest discover -s scripts -p "test_*.py"
```

Recursively reads an immutable Git tree snapshot; links are encoded and pinned to that same commit. First folder supplies provider, direct parent supplies title, including specialization PDFs. Rejects missing signatures, unreadable/zero-page PDFs and blank first pages. SHA-256 deduplicates by content. PDFium renders page one at a maximum of 1000 pixels; Pillow writes WebP. No PDFs are rendered in the browser.

Unchanged Git blobs reuse their validated manifest entry and existing preview. New paths with identical content reuse the content-addressed preview. A network/render infrastructure failure aborts before manifest replacement. Invalid source files are explicitly listed under `skipped`. An entirely invalid/empty result fails closed to retain the last working set. For an intentionally empty repository, removal must therefore be reviewed manually.

Assets are written first, the manifest is atomically replaced last, and unreferenced previews are removed after success. CI commits only after a successful build. Vercel keeps serving its previous deployment if a new build fails. The client imports the generated manifest at build time; no runtime GitHub request or credential is required.

Provider branding is centralized in `data/provider-logos.ts`. Verified local logo paths can be added there. Until supplied, providers display as text; no logos or individual certificate cards are invented.

Sixteen stable animation slots remain. At the invisible end of each orbit, the next certificate is assigned; the fixed portrait is separate. Pause/focus/touch stops both movement and replacement. Reduced-motion users can browse every certificate with the next-certificates button.
