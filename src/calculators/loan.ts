import { durationToMonths, type DurationUnit } from '@/utils/duration';
import { isFiniteDurationMonths, isFiniteMoney, isFiniteRatePercent, roundCurrency } from '@/utils/number';

export type { DurationUnit };

export type LoanInput = {
  principal: number;
  annualRatePercent: number;
  duration: number;
  durationUnit: DurationUnit;
};

export type LoanResult = {
  principal: number;
  monthlyRate: number;
  months: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
};

/**
 * Standard fully amortized loan payment:
 * M = P * r * (1+r)^n / ((1+r)^n - 1)
 * When r = 0, M = P / n.
 */
export function calculateLoan(input: LoanInput): LoanResult | null {
  const principal = input.principal;
  const months = durationToMonths(input.duration, input.durationUnit);
  const annualRatePercent = input.annualRatePercent;

  if (!isFiniteMoney(principal) || principal <= 0) return null;
  if (!isFiniteDurationMonths(months)) return null;
  if (!isFiniteRatePercent(annualRatePercent)) return null;

  const n = months;
  const monthlyRate = annualRatePercent / 100 / 12;

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principal / n;
  } else {
    const factor = Math.pow(1 + monthlyRate, n);
    if (!Number.isFinite(factor) || factor <= 1) return null;
    monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
  }

  if (!Number.isFinite(monthlyPayment)) return null;

  const roundedMonthly = roundCurrency(monthlyPayment);
  const totalRepayment = roundCurrency(roundedMonthly * n);
  const totalInterest = roundCurrency(totalRepayment - principal);

  return {
    principal: roundCurrency(principal),
    monthlyRate,
    months: n,
    monthlyPayment: roundedMonthly,
    totalRepayment,
    totalInterest,
  };
}
