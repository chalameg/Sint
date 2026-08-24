import { describe, expect, it } from 'vitest';

import { calculateLoan } from '@/calculators/loan';
import { MAX_MONEY_AMOUNT, MAX_RATE_PERCENT } from '@/utils/number';

describe('calculateLoan', () => {
  it('uses the standard amortization formula', () => {
    const result = calculateLoan({
      principal: 100_000,
      annualRatePercent: 12,
      duration: 12,
      durationUnit: 'months',
    });

    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeCloseTo(8884.88, 1);
    expect(result!.totalRepayment).toBe(roundTo(result!.monthlyPayment * 12));
    expect(result!.totalInterest).toBe(roundTo(result!.totalRepayment - 100_000));
  });

  it('splits principal evenly when interest is zero', () => {
    const result = calculateLoan({
      principal: 12_000,
      annualRatePercent: 0,
      duration: 1,
      durationUnit: 'years',
    });

    expect(result).not.toBeNull();
    expect(result!.months).toBe(12);
    expect(result!.monthlyPayment).toBe(1000);
    expect(result!.totalInterest).toBe(0);
    expect(result!.totalRepayment).toBe(12_000);
  });

  it('converts years to monthly payments', () => {
    const result = calculateLoan({
      principal: 24_000,
      annualRatePercent: 0,
      duration: 2,
      durationUnit: 'years',
    });
    expect(result!.months).toBe(24);
    expect(result!.monthlyPayment).toBe(1000);
  });

  it('returns null for invalid principal, duration, or rate', () => {
    expect(
      calculateLoan({
        principal: 0,
        annualRatePercent: 10,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateLoan({
        principal: -1000,
        annualRatePercent: 10,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateLoan({
        principal: 1000,
        annualRatePercent: 10,
        duration: 0,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateLoan({
        principal: 1000,
        annualRatePercent: -1,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateLoan({
        principal: MAX_MONEY_AMOUNT + 1,
        annualRatePercent: 10,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateLoan({
        principal: 1000,
        annualRatePercent: MAX_RATE_PERCENT + 1,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
  });
});

function roundTo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
