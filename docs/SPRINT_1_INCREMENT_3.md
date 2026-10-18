# Sprint 1, increment 3 — EMI and explainable demo eligibility

## Customer and business problem
Borrowers need to understand why an application falls outside simulated criteria. A generic failure message gives no actionable explanation. Product and risk teams also need decision rules that can be checked independently of the page rendering.

## Product decision and trade-offs
Retain CF-DEMO-1.0 thresholds: annual rate 11.5%, monthly income at least INR 15,000, requested amount INR 25,000–2,500,000 inclusive, and total monthly EMIs within 45% of income. These are invented demo assumptions, not bank policy or financial advice. All failed outside-criteria conditions appear in the explanation. Positive available income with an unaffordable requested EMI routes to manual review. There is no real review queue yet.

## Implementation and files
All paths below are relative to C:\1_PLACEMENT\FINAL PROJECTS\CREDI-FLOW.
- src/utils/finance.ts: pure fixed-rate EMI calculation, numerical checks, zero-interest support. No React or network dependency.
- src/services/demoEligibility.ts: validates the draft and evaluates the existing illustrative policy; returns a decision without mutating the form.
- src/main.tsx: calls the shared EMI function and decision service, then creates the existing immutable snapshot.
- tests/eligibility.test.mjs: calculation accuracy, invalid numbers, tenure trade-off, inclusive policy boundaries, decision routing, explanations and input preservation.
- tsconfig.test.json and package.json: compile and run the additional tests.

The policy remains in submission.ts for compatibility. This small increment avoids introducing a configurable policy UI or backend before they exist. Affordability comparisons use unrounded calculated values; the screen rounds amounts for display. maxAmount remains an affordability estimate, not a product-limit cap or offer.

## Acceptance and verification
Run npm test and npm run build. This increment passes 19 tests and production compilation in the development environment. Browser interaction still requires local verification:
1. Open the application using your existing Vite URL. Use synthetic details only.
2. Submit income 65000, existing EMIs 5000, requested amount 300000, tenure 36: preliminary eligible.
3. Change requested amount to 2000000: manual review.
4. Change income to 14000, existing EMIs to 7000, amount to 20000: outside criteria with three explanations.
5. Edit a draft after submitting; tracking must retain the prior submitted details until resubmission.
6. Confirm calculator output still updates when amount or tenure changes.

## Metrics and APM relevance
Future instrumentation should measure decision distribution and outcome-to-edit/resubmit rate, alongside usability interviews about explanation comprehension. No such measurements were collected in this increment. Guardrails: do not improve conversion by concealing affordability failures. This work demonstrates acceptance criteria, policy-versus-input-validation separation, explainability, and testable product rules. Backend persistence, authentication and real credit decisions remain unimplemented.
