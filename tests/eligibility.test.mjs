import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEmi } from '../.test-build/utils/finance.js';
import { evaluateDemoEligibility } from '../.test-build/services/demoEligibility.js';
const draft = (changes = {}) => ({name:'Demo Applicant', email:'demo@example.com', phone:'9876543210', employment:'Salaried', income:'65000', existingEmi:'5000', requested:'300000', tenure:'36', consent:true, ...changes});

test('EMI matches a known amortisation example and zero-interest repayment', () => {
  assert.ok(Math.abs(calculateEmi(100000, 12, 12) - 8884.878867834) < 0.000001);
  assert.equal(calculateEmi(120000, 0, 12), 10000);
  assert.ok(Math.abs(calculateEmi(120000, 1e-12, 12) - 10000) < 0.000001);
});
test('EMI rejects invalid numerical inputs', () => {
  for (const values of [[0,12,12], [-1,12,12], [NaN,12,12], [Infinity,12,12], [100,-1,12], [100,NaN,12], [100,12,0], [100,12,1.5]]) {
    assert.throws(() => calculateEmi(...values), RangeError);
  }
});
test('longer tenure reduces monthly EMI but increases total repayment', () => {
  const short = calculateEmi(300000,11.5,12);
  const long = calculateEmi(300000,11.5,36);
  assert.ok(long < short);
  assert.ok(long * 36 > short * 12);
});
test('affordable applications pass preliminarily and unaffordable ones route to review', () => {
  assert.equal(evaluateDemoEligibility(draft()).status, 'Preliminary eligible');
  assert.equal(evaluateDemoEligibility(draft({requested:'2000000'})).status, 'Manual review');
});
test('income and product amount limits are inclusive', () => {
  assert.equal(evaluateDemoEligibility(draft({income:'15000',existingEmi:'0',requested:'25000'})).status, 'Preliminary eligible');
  assert.equal(evaluateDemoEligibility(draft({income:'1000000',requested:'2500000'})).status, 'Preliminary eligible');
  for (const changes of [{income:'14999'}, {requested:'24999'}, {requested:'2500001'}]) {
    assert.equal(evaluateDemoEligibility(draft(changes)).status, 'Outside demo criteria');
  }
});
test('no affordability room returns zero capacity and a specific explanation', () => {
  for (const existingEmi of ['29250','30000']) {
    const result = evaluateDemoEligibility(draft({existingEmi}));
    assert.equal(result.status, 'Outside demo criteria');
    assert.equal(result.maxAmount, 0);
    assert.match(result.reason, /no room/);
  }
});
test('all failed policy conditions are explained', () => {
  const result = evaluateDemoEligibility(draft({income:'14000', requested:'20000', existingEmi:'7000'}));
  assert.match(result.reason, /income is below/);
  assert.match(result.reason, /amount is below/);
  assert.match(result.reason, /no room/);
});
test('engine rejects invalid drafts and preserves its input', () => {
  for (const changes of [{consent:false},{income:'Infinity'},{tenure:'13'},{employment:'Unknown'}]) {
    assert.throws(() => evaluateDemoEligibility(draft(changes)));
  }
  const form = Object.freeze(draft());
  evaluateDemoEligibility(form);
  assert.equal(form.requested, '300000');
});
