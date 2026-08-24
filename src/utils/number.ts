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

export function isNonNegative(value: number | null): value is number {
  return value !== null && value >= 0;
}

export function isPositive(value: number | null): value is number {
  return value !== null && value > 0;
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
