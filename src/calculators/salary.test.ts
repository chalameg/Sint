import { describe, expect, it } from 'vitest';

import { calculateEmploymentIncomeTax, calculateSalary } from '@/calculators/salary';
import { EMPLOYEE_PENSION_RATE, EMPLOYMENT_INCOME_TAX_BANDS } from '@/config/ethiopia';
import { MAX_MONEY_AMOUNT } from '@/utils/number';

describe('employment income tax bands', () => {
  it('keeps the first 2,000 ETB tax-free', () => {
    expect(calculateEmploymentIncomeTax(0)).toBe(0);
    expect(calculateEmploymentIncomeTax(2000)).toBe(0);
  });

  it('applies 15% only to income above 2,000', () => {
    expect(calculateEmploymentIncomeTax(2001)).toBeCloseTo(0.15, 2);
    expect(calculateEmploymentIncomeTax(4000)).toBe(300);
  });

  it('applies 20% to the 4,001–7,000 slice', () => {
    expect(calculateEmploymentIncomeTax(7000)).toBe(900);
  });

  it('stacks progressive bands through 15,000', () => {
    // 2k@0 + 2k@15% + 3k@20% + 3k@25% + 4k@30% + 1k@35%
    expect(calculateEmploymentIncomeTax(15000)).toBe(3200);
  });

  it('uses 35% for income above 14,000', () => {
    expect(calculateEmploymentIncomeTax(14000)).toBe(2850);
    expect(calculateEmploymentIncomeTax(14001)).toBeCloseTo(2850.35, 2);
    expect(calculateEmploymentIncomeTax(24000)).toBe(6350);
  });

  it('reads rates from the isolated tax config', () => {
    expect(EMPLOYMENT_INCOME_TAX_BANDS.map((band) => band.rate)).toEqual([
      0, 0.15, 0.2, 0.25, 0.3, 0.35,
    ]);
  });
});

describe('calculateSalary', () => {
  it('taxes gross and deducts employee pension from net take-home', () => {
    const result = calculateSalary({ grossMonthly: 15000, taxableIncomeMode: 'gross' });
    expect(result).not.toBeNull();
    expect(result!.taxableIncome).toBe(15000);
    expect(result!.incomeTax).toBe(3200);
    expect(result!.employeePension).toBe(roundTo(15000 * EMPLOYEE_PENSION_RATE));
    expect(result!.netTakeHome).toBe(roundTo(15000 - 3200 - 15000 * 0.07));
    expect(result!.employerPension).toBe(roundTo(15000 * 0.11));
  });

  it('can tax gross minus employee pension', () => {
    const result = calculateSalary({
      grossMonthly: 15000,
      taxableIncomeMode: 'grossMinusPension',
    });
    expect(result).not.toBeNull();
    const pension = roundTo(15000 * 0.07);
    expect(result!.employeePension).toBe(pension);
    expect(result!.taxableIncome).toBe(roundTo(15000 - pension));
    expect(result!.incomeTax).toBe(calculateEmploymentIncomeTax(result!.taxableIncome));
    expect(result!.netTakeHome).toBe(roundTo(15000 - result!.incomeTax - pension));
    expect(result!.incomeTax).toBeLessThan(3200);
  });

  it('returns zeros for a zero salary', () => {
    const result = calculateSalary({ grossMonthly: 0 });
    expect(result).toEqual({
      grossMonthly: 0,
      taxableIncome: 0,
      taxableIncomeMode: 'gross',
      incomeTax: 0,
      employeePension: 0,
      employerPension: 0,
      netTakeHome: 0,
      effectiveTaxRate: 0,
    });
  });

  it('returns null for negative or non-finite input', () => {
    expect(calculateSalary({ grossMonthly: -100 })).toBeNull();
    expect(calculateSalary({ grossMonthly: Number.NaN })).toBeNull();
    expect(calculateSalary({ grossMonthly: Number.POSITIVE_INFINITY })).toBeNull();
  });

  it('returns null for extremely large salaries', () => {
    expect(calculateSalary({ grossMonthly: MAX_MONEY_AMOUNT + 1 })).toBeNull();
  });
});

function roundTo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
