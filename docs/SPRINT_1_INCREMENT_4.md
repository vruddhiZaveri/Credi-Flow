# Sprint 1 increment 4 — Save and resume synthetic drafts

## Problem and product decision
Borrowers can lose unfinished work on refresh. This increment provides explicit Save draft, Resume saved draft and Delete saved draft actions using browser localStorage. Saving does not require a complete application. Consent is never stored and must be confirmed again after resuming. Resume always starts at personal details so the applicant can review restored input.

This is a local prototype for synthetic data only. It stores one draft per browser origin (scheme, host and port), without accounts, cross-device recovery, encryption or automatic expiry. Saving replaces the prior draft. Later edits are not saved automatically. Resume confirms replacement of current editable details; delete confirms removal and leaves current on-screen details intact. Successful submission does not automatically delete the saved draft. Submitted snapshots still live only in memory and are lost on refresh.

## Architecture and files
Paths relative to C:\1_PLACEMENT\FINAL PROJECTS\CREDI-FLOW:
- src/services/draftStorage.ts: versioned JSON storage, known-field selection, type/length checks, consent reset and recoverable failures. Injected storage allows testing without a browser. Stored drafts remain untrusted input and pass normal form validation before submission.
- src/main.tsx: explicit controls, replacement/deletion confirmations and accessible status messages. Submitted decisions remain separate from the editable draft.
- src/style.css: wrapping action buttons and spacing.
- tests/draftStorage.test.mjs: five tests for round trips, replacement, corrupt data, unavailable storage and scoped deletion.
- package.json and tsconfig.test.json: test execution and compilation.

## Verification
24 automated tests and production build pass in the development environment. Browser verification is pending:
1. Enter incomplete synthetic details and choose Save draft. Verify a saved message.
2. Refresh at the same URL, navigate to Apply, choose Resume saved draft and accept replacement. Verify saved values return.
3. Verify consent is unchecked, errors are initially hidden, and normal validation still runs on Continue/Submit.
4. Edit without saving, refresh and resume: the last explicitly saved values must return.
5. Delete the saved draft, refresh and try Resume: a no-draft message must appear.
6. Save a draft, submit an application, edit/resume a different draft without submitting and inspect tracking: the submitted snapshot must remain unchanged until a new submission.
7. Check buttons on narrow screens and navigate them with a keyboard.

## Metrics and APM relevance
Future events: draft_saved, draft_resumed, draft_deleted, draft_storage_failed. Never include applicant fields in event payloads. Define resume-to-submit conversion as distinct resumed drafts later submitted divided by distinct resumed drafts within a stated observation window. These events, identities and measurements are not implemented here. This increment demonstrates a retention hypothesis and acceptance criteria; conversion improvement is a hypothesis, not a measured result. Backend authenticated draft storage remains future work.
