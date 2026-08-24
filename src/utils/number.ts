/** Upper bound for money fields so results stay finite and readable. */
export const MAX_MONEY_AMOUNT = 1_000_000_000_000;

/** 100 years in months. */
export const MAX_DURATION_MONTHS = 1_200;

/** Percent fields (interest, VAT, return) above this are treated as invalid. */
export const MAX_RATE_PERCENT = 1_000;

/** Parse a calculator field. Empty, incomplete, or non-finite values return null. */
export function parseAmount(value: string): number | null {
  const normalized = value.replace(/,/g, '').trim();
  if (normalized === '' || normalized === '.' || normalized === '-' || normalized === '-.') {
    return null;
  }
  const amount = Number(normalized);
  if (!Number.isFinite(amount)) {
    return null;
  }
  return amount;
}

export function isFiniteMoney(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= MAX_MONEY_AMOUNT;
}

export function isFiniteRatePercent(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= MAX_RATE_PERCENT;
}

export function isFiniteDurationMonths(value: number): boolean {
  return Number.isFinite(value) && value > 0 && value <= MAX_DURATION_MONTHS;
}

export type AmountIssue = 'negative' | 'tooLarge';

export function amountIssue(value: string, max = MAX_MONEY_AMOUNT): AmountIssue | null {
  const amount = parseAmount(value);
  if (amount === null) return null;
  if (amount < 0) return 'negative';
  if (amount > max) return 'tooLarge';
  return null;
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
