import { describe, expect, it } from 'vitest';

import { amountIssue, parseAmount } from '@/utils/number';

describe('parseAmount', () => {
  it('returns null for empty or incomplete input', () => {
    expect(parseAmount('')).toBeNull();
    expect(parseAmount('   ')).toBeNull();
    expect(parseAmount('.')).toBeNull();
    expect(parseAmount('-')).toBeNull();
  });

  it('parses plain and comma-formatted numbers', () => {
    expect(parseAmount('15000')).toBe(15000);
    expect(parseAmount('15,000.50')).toBe(15000.5);
    expect(parseAmount('0')).toBe(0);
  });

  it('parses negatives so the UI can reject them', () => {
    expect(parseAmount('-20')).toBe(-20);
    expect(amountIssue('-20')).toBe('negative');
  });
});
