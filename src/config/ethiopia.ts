/**
 * Ethiopian tax, VAT, and pension constants.
 *
 * Update this file when proclamations or rates change. Calculators read
 * from here and should not hard-code these numbers.
 *
 * Sources:
 * - Employment income tax: Income Tax (Amendment) Proclamation No. 1395/2025
 *   (effective 8 July 2025).
 * - Employee pension: Private Organization Employees’ Pension
 *   Proclamation No. 1268/2022 (7% employee / 11% employer).
 * - VAT: standard Ethiopian rate of 15%.
 */

export const CURRENCY_CODE = 'ETB';
export const CURRENCY_SYMBOL = 'Br';

export type IncomeTaxBand = {
  /** Inclusive upper bound of this band in ETB. Use Infinity for the top band. */
  upTo: number;
  /** Marginal rate as a decimal (0.15 = 15%). */
  rate: number;
};

/**
 * Monthly employment income tax bands.
 *
 * Edit `upTo` and `rate` when the law changes. Bands must be sorted
 * ascending by `upTo`, and the last band should use Infinity.
 */
export const EMPLOYMENT_INCOME_TAX_BANDS: readonly IncomeTaxBand[] = [
  { upTo: 2_000, rate: 0 },
  { upTo: 4_000, rate: 0.15 },
  { upTo: 7_000, rate: 0.2 },
  { upTo: 10_000, rate: 0.25 },
  { upTo: 14_000, rate: 0.3 },
  { upTo: Number.POSITIVE_INFINITY, rate: 0.35 },
];

/** Employee contribution applied to the entered monthly salary. */
export const EMPLOYEE_PENSION_RATE = 0.07;

/** Employer contribution (shown as extra context; not deducted from net). */
export const EMPLOYER_PENSION_RATE = 0.11;

/** Default VAT rate as a decimal (15%). */
export const DEFAULT_VAT_RATE = 0.15;

/**
 * How employment income tax is applied.
 * - `gross`: tax the entered salary (default).
 * - `grossMinusPension`: tax salary after the 7% employee pension.
 * Payroll offices differ; this is an estimate either way.
 */
export type TaxableIncomeMode = 'gross' | 'grossMinusPension';

export const DEFAULT_TAXABLE_INCOME_MODE: TaxableIncomeMode = 'gross';

export const TAX_RULES_NOTE_EN =
  'Employment tax bands from Proclamation No. 1395/2025. Pension at 7% employee / 11% employer. VAT default 15%.';
