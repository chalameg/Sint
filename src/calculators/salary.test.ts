import { describe, expect, it } from 'vitest';

import { calculateEmploymentIncomeTax, calculateSalary } from '@/calculators/salary';
import { EMPLOYEE_PENSION_RATE, EMPLOYMENT_INCOME_TAX_BANDS } from '@/config/ethiopia';

describe('employment income tax bands', () => {
  it('keeps the first 2,000 ETB tax-free', () => {
    expect(calculateEmploymentIncomeTax(0)).toBe(0);
    expect(calculateEmploymentIncomeTax(2000)).toBe(0);
  });

  it('applies 15% only to income above 2,000', () => {
    expect(calculateEmploymentIncomeTax(4000)).toBe(300);
  });

  it('stacks progressive bands through 15,000', () => {
    // 2k@0 + 2k@15% + 3k@20% + 3k@25% + 4k@30% + 1k@35%
    expect(calculateEmploymentIncomeTax(15000)).toBe(3200);
  });

  it('uses 35% for income above 14,000', () => {
    expect(calculateEmploymentIncomeTax(14000)).toBe(2850);
    expect(calculateEmploymentIncomeTax(24000)).toBe(6350);
  });

  it('reads rates from the isolated tax config', () => {
    expect(EMPLOYMENT_INCOME_TAX_BANDS.map((band) => band.rate)).toEqual([
      0, 0.15, 0.2, 0.25, 0.3, 0.35,
    ]);
  });
});

describe('calculateSalary', () => {
  it('deducts tax and employee pension from net take-home', () => {
    const result = calculateSalary({ grossMonthly: 15000 });
    expect(result.incomeTax).toBe(3200);
    expect(result.employeePension).toBe(roundTo(15000 * EMPLOYEE_PENSION_RATE));
    expect(result.netTakeHome).toBe(roundTo(15000 - 3200 - 15000 * 0.07));
    expect(result.employerPension).toBe(roundTo(15000 * 0.11));
  });

  it('does not produce negative tax on empty or negative input', () => {
    expect(calculateSalary({ grossMonthly: 0 }).incomeTax).toBe(0);
    expect(calculateSalary({ grossMonthly: -100 }).netTakeHome).toBe(-100);
  });
});

function roundTo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
