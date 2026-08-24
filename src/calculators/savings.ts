import { durationToMonths, type DurationUnit } from '@/utils/duration';
import { roundCurrency } from '@/utils/number';

export type SavingsInput = {
  initialAmount: number;
  monthlySaving: number;
  duration: number;
  durationUnit: DurationUnit;
  annualReturnPercent?: number;
};

export type SavingsResult = {
  months: number;
  monthlyRate: number;
  totalContributed: number;
  finalAmount: number;
  estimatedGain: number;
};

/**
 * Future value of an initial amount plus end-of-month deposits,
 * compounded monthly. When the return rate is 0, this is a simple sum.
 */
export function calculateSavings(input: SavingsInput): SavingsResult | null {
  const initialAmount = input.initialAmount;
  const monthlySaving = input.monthlySaving;
  const months = durationToMonths(input.duration, input.durationUnit);
  const annualReturn = (input.annualReturnPercent ?? 0) / 100;

  if (!Number.isFinite(initialAmount) || initialAmount < 0) return null;
  if (!Number.isFinite(monthlySaving) || monthlySaving < 0) return null;
  if (!Number.isFinite(months) || months <= 0) return null;
  if (!Number.isFinite(annualReturn) || annualReturn < 0) return null;
  if (initialAmount === 0 && monthlySaving === 0) return null;

  const monthlyRate = annualReturn / 12;
  const totalContributed = initialAmount + monthlySaving * months;

  let finalAmount: number;
  if (monthlyRate === 0) {
    finalAmount = totalContributed;
  } else {
    const growth = Math.pow(1 + monthlyRate, months);
    if (!Number.isFinite(growth)) return null;
    const initialFuture = initialAmount * growth;
    const annuityFuture = monthlySaving * ((growth - 1) / monthlyRate);
    finalAmount = initialFuture + annuityFuture;
  }

  if (!Number.isFinite(finalAmount)) return null;

  return {
    months,
    monthlyRate,
    totalContributed: roundCurrency(totalContributed),
    finalAmount: roundCurrency(finalAmount),
    estimatedGain: roundCurrency(finalAmount - totalContributed),
  };
}
