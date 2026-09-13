# Live automatic certificate-chain audit — 13 September 2026

## Result: automatic publication is not running

Test source: genuine upload of **Anthropic / Introduction to Model Context Protocol / Coursera 0T1UB7FHM21J.pdf**, [commit d47881e](https://github.com/gijs-hulsebos/Certificates/commit/d47881e9af15aa0cbbf1f386450035bcb2182190), 2026-09-13 16:08:10 UTC (18:08:10 Europe/Paris). GitHub reports `status: added`, blob `a10ad1662b09e41baddd26ebe5a9af87bed0cd63`.

| Step | Observed evidence | Verdict |
| --- | --- | --- |
| GitHub upload | Real PDF added in the commit above; later two commits removed older placeholder/README files | Confirmed |
| Source notification | `GET repos/gijs-hulsebos/Certificates/actions/workflows` returns `total_count: 0` | Missing |
| Automatic processing | Website Actions workflows and workflow runs both return `total_count: 0` | Missing |
| Published generated data | Website repository Contents API for `data/certificates.json` returns HTTP 404 | Missing |
| Automatic website update | Most recent deployment recorded by GitHub is ID `4166530486`, 2026-03-24 22:57:13 UTC, success, commit `d861dbac23ddd3625132f47132b1d7b7de354238` | No deployment for this upload recorded |
| Live carousel | Browser loaded `https://gijshulsebos.com`, redirected to `https://www.gijshulsebos.com/`; zero `.circular-gallery` elements, zero raw Certificates PDF links, zero occurrences of the uploaded course title | Upload not visible |
| Missing provider logo | Local browser shows `Anthropic` in `.certificate-provider`, with the actual uploaded certificate; mapping has no image path | Local fallback confirmed, not live-chain proof |

The local application at `127.0.0.1:3000` is a different, unpublished version. Its 35 certificates were imported during the earlier manual implementation. Their presence does not demonstrate automation.

## Implemented during this audit

- Added `/certificates.json`, built from the exact same manifest imported by the carousel, with no-store response caching.
- Extended the prepared Actions workflow with `scripts/verify-live-certificates.cjs`. After requesting deployment it waits for the live manifest to match, opens the production website, visits every certificate through sixteen slots, checks loaded previews, `contain`, full title labels, provider text/logo and matching PDF URLs.
- Verification writes a timestamped JSON report and screenshot to the `live-certificate-proof` Actions artifact. A hook HTTP acknowledgement alone can no longer count as a successful run.
- No PDF upload, manual sync, manual production deployment or remote configuration mutation was performed for this audit.

## Remaining activation dependencies

1. The current website implementation and prepared workflow must be published to the website repository. It is still a local checkout with substantial uncommitted website changes.
2. A Vercel administrator must create a production `main` Deploy Hook for the project serving the domain and supply website Actions secret `VERCEL_DEPLOY_HOOK`. No Vercel management connection/deploy-hook secret is available here.
3. The source notification workflow must be installed in Certificates with its narrowly scoped `PORTFOLIO_DISPATCH_TOKEN` secret, or a GitHub App equivalent. No Actions secrets were listed in either repository. The scheduled website workflow is a fallback once published, but does not provide immediate upload notification.
4. Validate a subsequent real upload without manually starting Actions or a deployment. Require the source push-triggered run, downstream run, successful production verification artifact and visible new card. Until those exist, report the integration as unverified/inactive.

See [the activation instructions](certificate-sync.md). Authenticated GitHub read access was available during this audit; the missing Vercel deployment connection and unpublished application prevent a complete live-chain verification. Installing a notifier with no usable receiver/secret would only create failing runs, so it was not installed in isolation.
