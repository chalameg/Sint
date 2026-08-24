import { describe, expect, it } from 'vitest';

import { calculateVat } from '@/calculators/vat';
import { DEFAULT_VAT_RATE } from '@/config/ethiopia';
import { MAX_MONEY_AMOUNT, MAX_RATE_PERCENT } from '@/utils/number';

describe('calculateVat', () => {
  it('adds VAT with total = amount * (1 + rate)', () => {
    expect(DEFAULT_VAT_RATE).toBe(0.15);
    const result = calculateVat({ amount: 1000, mode: 'add' });
    expect(result).toEqual({
      mode: 'add',
      rate: 0.15,
      net: 1000,
      vat: 150,
      gross: 1150,
    });
  });

  it('removes VAT with base = total / (1 + rate)', () => {
    const result = calculateVat({ amount: 1150, mode: 'remove' });
    expect(result).not.toBeNull();
    expect(result!.net).toBe(1000);
    expect(result!.vat).toBe(150);
    expect(result!.gross).toBe(1150);
  });

  it('honors a rate override', () => {
    const result = calculateVat({ amount: 200, ratePercent: 10, mode: 'add' });
    expect(result).toEqual({
      mode: 'add',
      rate: 0.1,
      net: 200,
      vat: 20,
      gross: 220,
    });
  });

  it('handles 0% VAT', () => {
    expect(calculateVat({ amount: 500, ratePercent: 0, mode: 'add' })).toEqual({
      mode: 'add',
      rate: 0,
      net: 500,
      vat: 0,
      gross: 500,
    });
    expect(calculateVat({ amount: 500, ratePercent: 0, mode: 'remove' })).toEqual({
      mode: 'remove',
      rate: 0,
      net: 500,
      vat: 0,
      gross: 500,
    });
  });

  it('handles a zero amount', () => {
    const result = calculateVat({ amount: 0, mode: 'add' });
    expect(result?.gross).toBe(0);
    expect(result?.vat).toBe(0);
  });

  it('returns null for negative, empty-equivalent, or huge values', () => {
    expect(calculateVat({ amount: -1, mode: 'add' })).toBeNull();
    expect(calculateVat({ amount: 100, ratePercent: -5, mode: 'add' })).toBeNull();
    expect(calculateVat({ amount: MAX_MONEY_AMOUNT + 1, mode: 'add' })).toBeNull();
    expect(calculateVat({ amount: 100, ratePercent: MAX_RATE_PERCENT + 1, mode: 'add' })).toBeNull();
  });
});
