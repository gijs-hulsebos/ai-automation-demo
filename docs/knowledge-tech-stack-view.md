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

## Review revision

Following visual feedback, Tech Stack now uses a radar rather than bubbles. The toggle is centered in the panel header. Each technology is an axis, with the original three series colors and linear evidence counts. Up to ten technologies appear per page; group/search filters and pagination keep labels readable. Hover/tap and accessible technology buttons select the source inspector. The original evidence aggregation remains unchanged. The former bubble diameter helper is no longer used by the UI.

## Area-axis correction

Tech Stack axes now represent areas (Webdevelopment, No-code & Automation, AI & LLM, Cloud & Backend, API & Integration, Data, Security, DevOps / Delivery and populated Other). Concrete tools are listed inside the selected area's inspector. Area totals union source IDs, so using React and Next.js in one project still counts as one practice record for Webdevelopment. Pagination and per-technology axes have been removed. TypeScript, area deduplication and browser selection checks pass.

## Portfolio areas

The radar now groups related implementation concerns into six areas: AI & Agents, Web & Apps, Cloud & Deployment, No-code & Workflows, API & Integrations, and Data & Tooling. Cloud includes deployment and authentication tools. Documented payment integration tools (USDC, x402, PayAI) join integrations; unknown tools remain unclassified rather than receiving inferred expertise. Unique source deduplication is unchanged.

## Content evidence linked

Tech areas now union explicit technology evidence with the existing reviewed project domains and curriculum/module-derived domains from the shared source records. Brand-free workflow or cloud content therefore remains visible. Security/ethics course classification is not automatically treated as cloud implementation. Sources remain unique per area. Validation with the current live dataset: Cloud 12 theory / 14 practice, Automation 13 / 11, Data 12 / 14, Integration 1 / 16, Software 3 / 18, AI 32 / 10. Overall totals remain unchanged.

## Chart-only revision

Removed the added profile intro and project cards and restored the surrounding panel. Knowledge itself now has six axes: software and API integration are combined with source-ID deduplication. The radial scale is square-root with actual count labels (currently 2, 8, 18, 32), keeping zero at the center and preventing the AI count from compressing other areas. The methodology discloses this scale. Overall totals and source counts are preserved; no proficiency scores are added. Verified six axes, no added section and no mobile horizontal overflow.
