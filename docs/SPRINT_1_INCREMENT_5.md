# Sprint 1 increment 5 — Honest local journey metrics

## Problem and decision
Submissions divided by page views mixes different counting units and may exceed 100%. Keep activity counts but replace that ratio with an observed journey completion indicator. One page load represents one observed journey. Opening Apply, completing personal details through Continue, and submitting are milestones counted once. A valid submission also establishes the preceding milestones. Repeated submissions remain visible in activity counts but do not add completed journeys.

This intentionally small frontend increment demonstrates metric definitions. Completion is undefined (shown as a dash) before an application opens, 0% while unfinished and 100% after submission. These binary values are not population conversion estimates. Counters reset on refresh; saved drafts do not preserve analytics. Unfinished milestones are not confirmed abandonment. Returning to edit after submission retains the completed milestone.

## Files and concepts
Paths relative to C:\1_PLACEMENT\FINAL PROJECTS\CREDI-FLOW:
- src/services/analytics.ts: typed pure state transitions and rates. Milestones use booleans to prevent duplicate counting; attempts use counters.
- src/main.tsx: action-based instrumentation and dashboard definitions. No applicant fields are sent to analytics, and nothing is transmitted or persisted.
- tests/analytics.test.mjs: undefined denominators, repeated activity, incomplete journeys and validation rate denominator.
- package.json and tsconfig.test.json: test registration.

Validation failure rate = failed Continue/Submit validation attempts divided by all Continue/Submit validation attempts. It is not per-field error rate, input-blur errors, credit policy rejection rate or customer abandonment. Eligibility policy failures are valid submissions and therefore count as completed journeys. Opening a saved draft is not a new journey. Calculator-assisted entry may bypass the personal Continue action; personal completion is established at successful submission in that route.

## Verification
28 automated tests and production build pass in development. Browser verification pending:
1. Refresh; open Product insights before Apply: completion shows a dash.
2. Visit Apply repeatedly: page views rise but journey-opened stays 1, completion 0%.
3. Click Continue with required details empty: validation failures/attempts rise together.
4. Complete personal details: personal milestone becomes 1.
5. Submit valid synthetic data: submission milestone becomes 1 and completion 100%, including outside-criteria outcomes.
6. Edit and submit again: simulations rise but completion remains 100%.
7. Refresh: metrics reset; explicitly saved draft remains resumable.

## Product and APM relevance
Specify the counting unit, denominator, observation window and deduplication before using a metric to choose an experiment. Aggregate conversion, step abandonment, duration metrics, decision distribution, stable journey IDs and backend event storage remain future work. No conversion uplift or abandonment reduction has been measured. The proposed A/B test remains a proposal, not an active experiment.
