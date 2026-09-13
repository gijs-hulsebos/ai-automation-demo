# Certificate synchronisation

## Current status

The local importer has processed the real public repository. Generated assets are included in this checkout. Automatic production synchronisation is **not active or verified**. Public response headers identify gijshulsebos.com as Vercel; no deployment-hook secret or existing Actions workflow was found in the website repository. These files have not been published remotely.

The [13 September live audit](certificate-sync-audit-2026-09-13.md) confirms that the recent Anthropic upload did not reach production. The prepared workflow now waits for `/certificates.json` on production and runs a browser verification of all certificates; its report and screenshot are uploaded as `live-certificate-proof`. A failed verification fails the workflow instead of reporting a deployment-hook acknowledgement as success.

## Activate

1. Publish this website checkout (including the generated manifest, previews, scripts and `.github/workflows/sync-certificates.yml`) to the website repository's `main` branch. Enable Actions with read/write contents permission; if branch rules forbid the bot's generated-data commit, grant that automation permission or use a reviewed PR flow.
2. In the Vercel project serving **gijshulsebos.com**, verify that Git points to `gijs-hulsebos/ai-automation-demo`, production branch `main`. Create a Deploy Hook for `main` in Settings → Git. Store its URL only as website repository Actions secret **VERCEL_DEPLOY_HOOK**.
3. For immediate source updates, copy `docs/certificates-source-workflow.yml` to `.github/workflows/notify-portfolio.yml` in **Certificates**. Create a fine-grained token scoped only to the website repository with Contents: write (required by repository_dispatch), or use a GitHub App installation token. Store it only in Certificates Actions secret **PORTFOLIO_DISPATCH_TOKEN**. No token belongs in NEXT_PUBLIC variables or browser code. The six-hour scheduled check is a fallback if dispatch fails.
4. Manually run **Sync certificate previews**. Confirm the build succeeds, the generated-data commit is pushed, the Vercel production deployment becomes Ready, and the live carousel loads the same manifest assets. A successful hook request alone is not proof of a successful deployment.
5. Add, replace and remove a test PDF in the source repository, then verify each triggered run and live result. Only then call the automatic integration verified. Remove the test PDF afterward. If the deploy hook fails after a commit, manually rerun the workflow: manual runs redeploy even when data is unchanged.

The explicit hook avoids relying on a GitHub Actions bot push to trigger another workflow. See [GitHub workflow triggering](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow) and [Vercel Deploy Hooks](https://vercel.com/docs/deploy-hooks).

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
