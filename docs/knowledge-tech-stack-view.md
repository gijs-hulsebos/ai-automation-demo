# Kennis / Tech Stack

Feature branch: `codex/knowledge-tech-stack-view`. Review before merging; main is unchanged.

## Implementation

- `components/LearningRadar.tsx`: accessible Kennis / Tech Stack tabs; Kennis remains default. Existing radar, inspector, selected series and totals are preserved.
- `components/TechEvidence.tsx` and `components/tech-evidence.css`: grouped bubbles, logos, search/group filters, hover summary and clickable source inspector. Touch selection scrolls to details. Reduced motion is respected.
- `lib/learning-radar.ts`: adds shared evidence records to the existing response. Both projections use the same source pool. Records retain source IDs, domains, series, technology mentions, dates and course metadata.
- `lib/technology-normalization.ts`: central canonical names and aliases; explicit version suffixes remain metadata. Text extraction matches known technology names, avoiding overlapping shorter names.
- `lib/technology-evidence.ts`: pure aggregation. Each independent project/course/exercise counts once per technology. Modules provide support without multiplying their parent course. Bubble diameter uses a capped square-root scale.
- `data/special-project-stacks.ts` and `components/TarvosProjectInfo.tsx`: reuse the existing documented Tarvos stacks rather than duplicating their definitions.
- `scripts/test-technology-evidence.cjs`: normalization, overlap, deduplication, module attribution and bounded sizing checks.

## Storage and requests

No Firestore schema, collections or writes are added. The existing cached public chart/catalog request supplies the data. Hover, filtering and tab changes run locally. The original totals do not change between views. No proficiency rating is inferred.

## Metadata boundaries

- Exercise totals currently have no technology attribution, so no invented exercise assignments are shown.
- Aegix has no structured technology stack in the current source pool. Its project remains in the original totals but has no fabricated bubbles.
- Certificate completion dates are retained. Portfolio documentation dates are labelled as documentation, not first/last technology use.
- First/last use, duration and technology-specific production deployment counts cannot currently be established reliably.
- Theory technologies are extracted from explicit skill/module terms. New aliases can be added centrally. Parent course IDs, issuer and credential links remain available for richer future ingestion.
- Commit/deployment volume never increases bubble strength. Weighting can later change in the aggregation layer without modifying source records.

## Validation and review

Existing radar regression tests and new technology tests pass, as does TypeScript checking. Browser checks confirmed unchanged totals across views, one initial radar request, 49 technology nodes in the current dataset, working selection and no horizontal overflow at 390px.

Review the preview on a physical touch device and check source-to-technology assignments against project/course content. Dataset counts can change with the live source. Publication to main requires a separate merge decision.
