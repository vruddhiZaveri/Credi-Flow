# Sprint 1 · Increment 2: submitted snapshots

Problem: outcome and tracking previously mixed a saved decision with live draft inputs. Calculator edits could change displayed loan details without evaluating a new decision.

Decision: preserve the latest submitted snapshot separately from the draft. Edit details retains that snapshot for tracking; a successful resubmission replaces the latest displayed case with a new reference. Multiple-case history and persistence are deferred.

Implementation: `src/services/submission.ts` copies and freezes applicant data, decision fields and demo policy metadata. Reference uses browser `crypto.randomUUID()`; UTC submission time uses `toISOString()`. These are client-generated demo records, not authoritative server audit evidence. Browser UUID support requires a secure context such as localhost or deployed HTTPS.

`src/main.tsx` displays requested amount, applicant name, terms and EMI from the snapshot. Calculator Apply opens an editable step rather than leaving the previous result displayed. Policy thresholds are unchanged and centralized. Outcome icons/colors distinguish all three branches. Long references wrap.

Tests: `npm test` runs 11 tests including input validation, draft mutation isolation, frozen snapshot protection, distinct resubmissions and required consent. `npm run build` verifies TypeScript and production compilation. Browser acceptance remains a local check.

Manual regression:

1. Submit synthetic Demo Applicant, income 65000, existing EMI 5000, loan 300000, tenure 18, consent checked.
2. Note reference, amount, EMI, submission time and policy CF-DEMO-1.0 in tracking.
3. Use calculator, change amount and tenure, click Apply. Edit the draft name. Before submitting, visit tracking: original name, amount, tenure, EMI and reference must remain unchanged.
4. Submit the changed draft: latest tracking now shows its new inputs, a new reference and newly calculated outcome.
5. Choose Edit details from outcome, change income, visit tracking before resubmitting: the previous outcome remains available.
6. Check all three decision branches have distinct icons and readable text.
7. Refresh: memory-only state resets, as before. Do not describe this as durable storage.

APM relevance: decision traceability and consistent borrower communication reduce ambiguity across the journey. No measured business uplift is claimed. Future event records should associate the submission ID and policy version so draft edits cannot contaminate decision metrics.
