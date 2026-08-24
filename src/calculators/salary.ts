import {
  EMPLOYEE_PENSION_RATE,
  EMPLOYER_PENSION_RATE,
  EMPLOYMENT_INCOME_TAX_BANDS,
  type IncomeTaxBand,
} from '@/config/ethiopia';
import { roundCurrency } from '@/utils/number';

export type SalaryInput = {
  grossMonthly: number;
  bands?: readonly IncomeTaxBand[];
  employeePensionRate?: number;
  employerPensionRate?: number;
};

export type SalaryResult = {
  grossMonthly: number;
  incomeTax: number;
  employeePension: number;
  employerPension: number;
  netTakeHome: number;
  effectiveTaxRate: number;
};

/**
 * Progressive employment income tax on a monthly gross salary.
 * Each band taxes only the slice of income that falls inside it.
 */
export function calculateEmploymentIncomeTax(
  grossMonthly: number,
  bands: readonly IncomeTaxBand[] = EMPLOYMENT_INCOME_TAX_BANDS,
): number {
  if (!Number.isFinite(grossMonthly) || grossMonthly <= 0) {
    return 0;
  }

  let tax = 0;
  let previousLimit = 0;

  for (const band of bands) {
    if (grossMonthly <= previousLimit) {
      break;
    }
    const slice = Math.min(grossMonthly, band.upTo) - previousLimit;
    if (slice > 0) {
      tax += slice * band.rate;
    }
    previousLimit = band.upTo;
  }

  return roundCurrency(tax);
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const grossMonthly = roundCurrency(input.grossMonthly);
  const employeePensionRate = input.employeePensionRate ?? EMPLOYEE_PENSION_RATE;
  const employerPensionRate = input.employerPensionRate ?? EMPLOYER_PENSION_RATE;

  const incomeTax = calculateEmploymentIncomeTax(grossMonthly, input.bands);
  const employeePension = roundCurrency(Math.max(0, grossMonthly) * employeePensionRate);
  const employerPension = roundCurrency(Math.max(0, grossMonthly) * employerPensionRate);
  const netTakeHome = roundCurrency(grossMonthly - incomeTax - employeePension);
  const effectiveTaxRate = grossMonthly > 0 ? incomeTax / grossMonthly : 0;

  return {
    grossMonthly,
    incomeTax,
    employeePension,
    employerPension,
    netTakeHome,
    effectiveTaxRate,
  };
}
