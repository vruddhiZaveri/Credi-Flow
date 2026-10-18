import type { LoanForm } from '../types/loan.js';
import { firstInvalidField, personalFields, financeFields } from '../utils/validation.js';
import { calculateEmi } from '../utils/finance.js';
import { demoPolicy } from './submission.js';
import type { DecisionResult } from './submission.js';

/** Illustrative policy only; never represents an actual credit approval. */
export function evaluateDemoEligibility(form: LoanForm): DecisionResult {
  if (firstInvalidField(form, [...personalFields, ...financeFields, 'employment'])) {
    throw new Error('Cannot evaluate an invalid or unconsented application.');
  }
  const income = Number(form.income);
  const amount = Number(form.requested);
  const months = Number(form.tenure);
  const room = income * demoPolicy.totalEmiRatio - Number(form.existingEmi);
  const payment = calculateEmi(amount, demoPolicy.annualRate, months);
  const maxAmount = Math.max(0, Math.floor(room / calculateEmi(1, demoPolicy.annualRate, months)));
  const reasons: string[] = [];
  if (income < demoPolicy.minimumIncome) reasons.push('Monthly income is below the demo minimum of ₹15,000.');
  if (amount < demoPolicy.minimumAmount) reasons.push('Requested amount is below the demo minimum of ₹25,000.');
  if (amount > demoPolicy.maximumAmount) reasons.push('Requested amount exceeds the demo maximum of ₹25,00,000.');
  if (room <= 0) reasons.push('Existing monthly EMIs leave no room within the demo 45% income limit.');
  if (reasons.length) return { status: 'Outside demo criteria', reason: reasons.join(' '), maxAmount, emi: payment };
  return payment <= room
    ? { status: 'Preliminary eligible', reason: 'Estimated EMI is within the demo affordability threshold. This is not an approval or an offer.', maxAmount, emi: payment }
    : { status: 'Manual review', reason: 'The requested EMI exceeds the demo affordability threshold. A different amount or tenure may help.', maxAmount, emi: payment };
}
