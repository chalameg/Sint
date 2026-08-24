import { describe, expect, it } from 'vitest';

import { calculateSavings } from '@/calculators/savings';

describe('calculateSavings', () => {
  it('sums contributions when there is no return', () => {
    const result = calculateSavings({
      initialAmount: 1000,
      monthlySaving: 500,
      duration: 10,
      durationUnit: 'months',
      annualReturnPercent: 0,
    });

    expect(result).toEqual({
      months: 10,
      monthlyRate: 0,
      totalContributed: 6000,
      finalAmount: 6000,
      estimatedGain: 0,
    });
  });

  it('compounds monthly deposits with an annual return', () => {
    const result = calculateSavings({
      initialAmount: 10_000,
      monthlySaving: 1_000,
      duration: 1,
      durationUnit: 'years',
      annualReturnPercent: 12,
    });

    expect(result).not.toBeNull();
    expect(result!.months).toBe(12);
    expect(result!.totalContributed).toBe(22_000);
    expect(result!.finalAmount).toBeGreaterThan(22_000);
    expect(result!.estimatedGain).toBeCloseTo(result!.finalAmount - 22_000, 2);
  });

  it('returns null when nothing is being saved', () => {
    expect(
      calculateSavings({
        initialAmount: 0,
        monthlySaving: 0,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
  });
});
