import type { LoanForm } from '../types/loan.js';
import { firstInvalidField, personalFields, financeFields } from '../utils/validation.js';

export type DecisionResult = Readonly<{
  status: 'Preliminary eligible' | 'Manual review' | 'Outside demo criteria';
  reason: string;
  maxAmount: number;
  emi: number;
}>;

export const demoPolicy = Object.freeze({
  version: 'CF-DEMO-1.0',
  annualRate: 11.5,
  totalEmiRatio: 0.45,
  minimumIncome: 15000,
  minimumAmount: 25000,
  maximumAmount: 2500000,
});

export function snapshotSubmission(
  form: LoanForm,
  result: DecisionResult,
  uuid: string,
  submittedAt: string,
) {
  if (firstInvalidField(form, [...personalFields, ...financeFields])) {
    throw new Error('Cannot snapshot an invalid application.');
  }
  return Object.freeze({
    ...result,
    id: `CF-DEMO-${uuid}`,
    submittedAt,
    policy: demoPolicy,
    applicant: Object.freeze({ ...form }),
  });
}

export type Submission = ReturnType<typeof snapshotSubmission>;
