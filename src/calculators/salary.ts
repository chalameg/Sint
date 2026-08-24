import {
  DEFAULT_TAXABLE_INCOME_MODE,
  EMPLOYEE_PENSION_RATE,
  EMPLOYER_PENSION_RATE,
  EMPLOYMENT_INCOME_TAX_BANDS,
  type IncomeTaxBand,
  type TaxableIncomeMode,
} from '@/config/ethiopia';
import { isFiniteMoney, roundCurrency } from '@/utils/number';

export type SalaryInput = {
  grossMonthly: number;
  taxableIncomeMode?: TaxableIncomeMode;
  bands?: readonly IncomeTaxBand[];
  employeePensionRate?: number;
  employerPensionRate?: number;
};

export type SalaryResult = {
  grossMonthly: number;
  taxableIncome: number;
  taxableIncomeMode: TaxableIncomeMode;
  incomeTax: number;
  employeePension: number;
  employerPension: number;
  netTakeHome: number;
  effectiveTaxRate: number;
};

/**
 * Progressive employment income tax on a monthly amount.
 * Each band taxes only the slice of income that falls inside it.
 */
export function calculateEmploymentIncomeTax(
  monthlyAmount: number,
  bands: readonly IncomeTaxBand[] = EMPLOYMENT_INCOME_TAX_BANDS,
): number {
  if (!Number.isFinite(monthlyAmount) || monthlyAmount <= 0) {
    return 0;
  }

  let tax = 0;
  let previousLimit = 0;

  for (const band of bands) {
    if (monthlyAmount <= previousLimit) {
      break;
    }
    const slice = Math.min(monthlyAmount, band.upTo) - previousLimit;
    if (slice > 0) {
      tax += slice * band.rate;
    }
    previousLimit = band.upTo;
  }

  return roundCurrency(tax);
}

export function calculateSalary(input: SalaryInput): SalaryResult | null {
  const grossMonthly = input.grossMonthly;
  if (!isFiniteMoney(grossMonthly)) return null;

  const taxableIncomeMode = input.taxableIncomeMode ?? DEFAULT_TAXABLE_INCOME_MODE;
  const employeePensionRate = input.employeePensionRate ?? EMPLOYEE_PENSION_RATE;
  const employerPensionRate = input.employerPensionRate ?? EMPLOYER_PENSION_RATE;

  const employeePension = roundCurrency(grossMonthly * employeePensionRate);
  const employerPension = roundCurrency(grossMonthly * employerPensionRate);
  const taxableIncome =
    taxableIncomeMode === 'grossMinusPension'
      ? roundCurrency(Math.max(0, grossMonthly - employeePension))
      : roundCurrency(grossMonthly);

  const incomeTax = calculateEmploymentIncomeTax(taxableIncome, input.bands);
  const netTakeHome = roundCurrency(grossMonthly - incomeTax - employeePension);
  const effectiveTaxRate = grossMonthly > 0 ? incomeTax / grossMonthly : 0;

  return {
    grossMonthly: roundCurrency(grossMonthly),
    taxableIncome,
    taxableIncomeMode,
    incomeTax,
    employeePension,
    employerPension,
    netTakeHome,
    effectiveTaxRate,
  };
}
