# Sprint 1 · Increment 1: validation and branding

## Customer problem

Disabled buttons previously blocked progress without explaining missing fields. The input helper and button checks used different validation rules.

## Product decision

Continue remains clickable so an attempt can reveal required-field guidance and focus the first invalid field. Errors appear after blur or an attempt, rather than while an untouched form is empty. Correcting a touched field clears its error immediately. Invalid attempts never advance or create a decision. This change aims to improve error recovery; no conversion improvement has been measured.

## Implementation

- `src/types/loan.ts`: shared form and input-field types.
- `src/utils/validation.ts`: one pure validator for required fields, input formats, finite amounts, supported tenure and consent.
- `src/main.tsx`: touched/attempt state, accessible error association, first-invalid focus and guarded step/submission actions.
- `index.html`, `package.json`, `package-lock.json`: CrediFlow naming; desktop/mobile UI branding updated.

Existing CSS error styles are reused. Positive values outside demo credit policy remain valid inputs: they produce a policy outcome rather than a form error. No backend, persistence or underwriting was added. Submitted snapshot isolation, policy versioning and outcome icon changes remain later Sprint 1 work.

## Verification

Run `npm ci`, `npm test` and `npm run build`. Tests compile only the validation module into ignored `.test-build/` and run Node's built-in test runner. No new dependency was added.

Manual acceptance:

1. Start a blank application. There are no errors before interaction.
2. Click Continue. Required messages appear, name receives focus, and the step remains unchanged.
3. Enter a fictional name, malformed email and 11-digit phone. Blur each; messages explain the corrections.
4. Correct email and phone; messages disappear. Continue reaches finance.
5. Attempt eligibility with empty income and unchecked consent. Income receives focus; no outcome appears.
6. Enter income 65000, obligations 5000, request 300000 and tenure 18. Attempt without consent: checkbox receives focus with its associated explanation.
7. Check consent and submit. Preliminary eligible appears. Lower income to 30000 via Edit details for manual review; 10000 and zero obligations yields outside demo criteria.
8. Clear existing obligations: require an explicit 0. Negative obligations cannot submit.
9. Use keyboard navigation and a narrow viewport to verify focus, labels and error layout.

## Metrics and APM connection

Future events should distinguish validation attempts, errors corrected and successful step completion. Track error-recovery success and time, with a defined denominator; current counters do not provide these measures. The work demonstrates translating observed customer friction into acceptance criteria, accessible interaction design and verifiable implementation.
