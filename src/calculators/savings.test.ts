import { describe, expect, it } from 'vitest';

import { calculateSavings } from '@/calculators/savings';
import { MAX_MONEY_AMOUNT, MAX_RATE_PERCENT } from '@/utils/number';

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

  it('treats a missing return rate as 0%', () => {
    const result = calculateSavings({
      initialAmount: 100,
      monthlySaving: 0,
      duration: 5,
      durationUnit: 'months',
    });
    expect(result?.finalAmount).toBe(100);
    expect(result?.estimatedGain).toBe(0);
  });

  it('compounds monthly deposits with an annual return', () => {
    const result = calculateSavings({
      initialAmount: 10_000,
      monthlySaving: 1_000,
      duration: 1,
      durationUnit: 'years',
      annualReturnPercent: 12,
    });

    const monthlyRate = 0.12 / 12;
    const growth = (1 + monthlyRate) ** 12;
    const expected = 10_000 * growth + 1_000 * ((growth - 1) / monthlyRate);

    expect(result).not.toBeNull();
    expect(result!.months).toBe(12);
    expect(result!.totalContributed).toBe(22_000);
    expect(result!.finalAmount).toBeCloseTo(expected, 2);
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

  it('returns null for negative or huge values', () => {
    expect(
      calculateSavings({
        initialAmount: -1,
        monthlySaving: 100,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateSavings({
        initialAmount: 100,
        monthlySaving: 0,
        duration: 0,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateSavings({
        initialAmount: MAX_MONEY_AMOUNT + 1,
        monthlySaving: 0,
        duration: 12,
        durationUnit: 'months',
      }),
    ).toBeNull();
    expect(
      calculateSavings({
        initialAmount: 100,
        monthlySaving: 0,
        duration: 12,
        durationUnit: 'months',
        annualReturnPercent: MAX_RATE_PERCENT + 1,
      }),
    ).toBeNull();
  });
});
