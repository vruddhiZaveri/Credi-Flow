/** Monthly payment for a fixed-rate, fully amortising demo loan. */
export function calculateEmi(principal: number, annualRate: number, months: number): number {
  if (!Number.isFinite(principal) || principal <= 0 ||
      !Number.isFinite(annualRate) || annualRate < 0 ||
      !Number.isSafeInteger(months) || months <= 0) {
    throw new RangeError('Expected positive principal, non-negative rate and positive whole months.');
  }
  const rate = annualRate / 1200;
  // log1p/expm1 avoid subtracting nearly equal numbers for small rates.
  const payment = rate === 0 ? principal / months
    : principal * rate / -Math.expm1(-months * Math.log1p(rate));
  if (!Number.isFinite(payment)) throw new RangeError('Calculated payment is outside the supported range.');
  return payment;
}
