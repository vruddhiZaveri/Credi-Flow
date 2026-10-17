import type { LoanForm } from '../types/loan.js';

export const allowedTenures = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];
export const personalFields = ['name', 'email', 'phone'] as const;
export const financeFields = ['income', 'existingEmi', 'requested', 'tenure', 'consent'] as const;

// Validation checks input integrity. Demo policy thresholds belong to the decision engine.
export function validateField(form: LoanForm, key: keyof LoanForm): string {
  if (key === 'consent') return form.consent ? '' : 'Confirm that you understand this is a demonstration.';
  const value = form[key].trim();
  if (!value) return key === 'existingEmi'
    ? 'Enter your existing monthly EMIs, or 0 if none.'
    : 'This field is required.';

  switch (key) {
    case 'name': return '';
    case 'email': return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Enter a valid email address.';
    case 'phone': return /^[0-9]{10}$/.test(value) ? '' : 'Enter exactly 10 digits without a country code.';
    case 'employment': return ['Salaried', 'Self-employed', 'Other'].includes(value) ? '' : 'Select an employment type.';
    case 'tenure': return allowedTenures.includes(Number(value)) ? '' : 'Select a supported repayment tenure.';
    case 'income':
    case 'requested': return Number.isFinite(Number(value)) && Number(value) > 0 ? '' : 'Enter a valid amount greater than zero.';
    case 'existingEmi': return Number.isFinite(Number(value)) && Number(value) >= 0 ? '' : 'Enter zero or a positive amount.';
  }
}

export function firstInvalidField(form: LoanForm, fields: readonly (keyof LoanForm)[]): keyof LoanForm | undefined {
  return fields.find((key) => Boolean(validateField(form, key)));
}
