import test from 'node:test';
import assert from 'node:assert/strict';
import { snapshotSubmission } from '../.test-build/services/submission.js';

const makeDraft = () => ({ name: 'Demo Applicant', email: 'demo@example.com', phone: '9876543210', income: '65000', employment: 'Salaried', existingEmi: '5000', requested: '300000', tenure: '18', consent: true });
const result = { status: 'Preliminary eligible', reason: 'Demo outcome', maxAmount: 399176, emi: 18225 };

test('editing a draft cannot alter the submitted details or decision', () => {
  const draft = makeDraft();
  const decision = { ...result };
  const submitted = snapshotSubmission(draft, decision, 'test-id', '2026-10-18T00:00:00Z');
  draft.name = 'Different applicant';
  draft.requested = '900000';
  draft.tenure = '60';
  decision.emi = 1;
  assert.equal(submitted.applicant.name, 'Demo Applicant');
  assert.equal(submitted.applicant.requested, '300000');
  assert.equal(submitted.applicant.tenure, '18');
  assert.equal(submitted.emi, 18225);
});
test('submission, applicant and policy reject accidental mutation', () => {
  const submitted = snapshotSubmission(makeDraft(), result, 'test-id', '2026-10-18T00:00:00Z');
  assert.throws(() => { submitted.applicant.income = '1'; }, TypeError);
  assert.throws(() => { submitted.emi = 1; }, TypeError);
  assert.throws(() => { submitted.policy.annualRate = 0; }, TypeError);
});
test('resubmission gets separate identity and preserves the previous snapshot', () => {
  const draft = makeDraft();
  const first = snapshotSubmission(draft, result, 'first-id', '2026-10-18T00:00:00Z');
  draft.requested = '200000';
  const second = snapshotSubmission(draft, result, 'second-id', '2026-10-18T00:01:00Z');
  assert.notEqual(first.id, second.id);
  assert.equal(first.applicant.requested, '300000');
  assert.equal(second.applicant.requested, '200000');
  assert.equal(second.policy.version, 'CF-DEMO-1.0');
  assert.equal(second.submittedAt, '2026-10-18T00:01:00Z');
});
test('invalid or unconsented drafts cannot be snapshotted', () => {
  assert.throws(() => snapshotSubmission({ ...makeDraft(), consent: false }, result, 'id', '2026-10-18T00:00:00Z'));
});
