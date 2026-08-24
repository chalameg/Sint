import { describe, expect, it } from 'vitest';

import { calculateLoan } from '@/calculators/loan';

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
    expect(result!.totalRepayment).toBeCloseTo(result!.monthlyPayment * 12, 2);
    expect(result!.totalInterest).toBeCloseTo(result!.totalRepayment - 100_000, 2);
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

  it('returns null for invalid duration or principal', () => {
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
        principal: 1000,
        annualRatePercent: 10,
        duration: 0,
        durationUnit: 'months',
      }),
    ).toBeNull();
  });
});
