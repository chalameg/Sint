import { describe, expect, it } from 'vitest';

import { calculateVat } from '@/calculators/vat';
import { DEFAULT_VAT_RATE } from '@/config/ethiopia';

describe('calculateVat', () => {
  it('adds the default 15% Ethiopian VAT', () => {
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

  it('removes VAT from a tax-inclusive amount', () => {
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

  it('returns null for negative amounts', () => {
    expect(calculateVat({ amount: -1, mode: 'add' })).toBeNull();
  });
});
