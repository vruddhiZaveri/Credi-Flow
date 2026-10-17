import test from 'node:test';
import assert from 'node:assert/strict';
import { validateField, firstInvalidField, personalFields, financeFields, allowedTenures } from '../.test-build/utils/validation.js';

const valid = { name: 'Demo Applicant', email: 'demo@example.com', phone: '9876543210', income: '65000', employment: 'Salaried', existingEmi: '0', requested: '300000', tenure: '18', consent: true };

test('valid personal and finance steps pass the shared validator', () => {
  assert.equal(firstInvalidField(valid, personalFields), undefined);
  assert.equal(firstInvalidField(valid, financeFields), undefined);
});
test('empty required fields fail, including whitespace and cleared obligations', () => {
  for (const key of ['name', 'email', 'phone', 'income', 'requested', 'existingEmi', 'tenure']) {
    assert.ok(validateField({ ...valid, [key]: '   ' }, key), key);
  }
});
test('email and phone checks use the same trimmed values as step validation', () => {
  assert.equal(validateField({ ...valid, email: ' demo@example.com ' }, 'email'), '');
  assert.ok(validateField({ ...valid, email: 'abc' }, 'email'));
  for (const phone of ['09876543210', '98765', 'abcdefghij', '+919876543210']) {
    assert.ok(validateField({ ...valid, phone }, 'phone'));
  }
});
test('numeric input rejects non-finite, negative and invalid values', () => {
  for (const key of ['income', 'requested']) {
    for (const value of ['0', '-1', 'Infinity', 'NaN', '1e309']) {
      assert.ok(validateField({ ...valid, [key]: value }, key), `${key}: ${value}`);
    }
  }
  assert.equal(validateField(valid, 'existingEmi'), '');
  assert.ok(validateField({ ...valid, existingEmi: '-1' }, 'existingEmi'));
});
test('policy failures are valid inputs for a simulated outside-criteria outcome', () => {
  assert.equal(validateField({ ...valid, income: '10000' }, 'income'), '');
  assert.equal(validateField({ ...valid, requested: '1000' }, 'requested'), '');
});
test('every allowed tenure passes and unsupported values fail', () => {
  for (const tenure of allowedTenures) assert.equal(validateField({ ...valid, tenure: String(tenure) }, 'tenure'), '');
  for (const tenure of ['0', '7', '18.5', 'Infinity']) assert.ok(validateField({ ...valid, tenure }, 'tenure'));
});
test('consent is required and invalid focus follows field order', () => {
  assert.equal(firstInvalidField({ ...valid, income: '', consent: false }, financeFields), 'income');
  assert.equal(firstInvalidField({ ...valid, consent: false }, financeFields), 'consent');
});
