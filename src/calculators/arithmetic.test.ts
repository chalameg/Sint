import { describe, expect, it } from 'vitest';

import { evaluateArithmetic, formatArithmeticValue } from '@/calculators/arithmetic';

describe('evaluateArithmetic', () => {
  it('adds', () => {
    expect(evaluateArithmetic('2+3')).toEqual({ ok: true, value: 5 });
  });

  it('subtracts', () => {
    expect(evaluateArithmetic('10-4')).toEqual({ ok: true, value: 6 });
  });

  it('multiplies', () => {
    expect(evaluateArithmetic('6*7')).toEqual({ ok: true, value: 42 });
  });

  it('divides', () => {
    expect(evaluateArithmetic('20/8')).toEqual({ ok: true, value: 2.5 });
  });

  it('handles decimal calculations', () => {
    expect(evaluateArithmetic('1.5+2.25')).toEqual({ ok: true, value: 3.75 });
    expect(evaluateArithmetic('0.1+0.2').ok).toBe(true);
    const result = evaluateArithmetic('0.1+0.2');
    if (result.ok) expect(result.value).toBeCloseTo(0.3, 10);
  });

  it('handles percent as postfix /100 and percent of a base', () => {
    expect(evaluateArithmetic('50%')).toEqual({ ok: true, value: 0.5 });
    expect(evaluateArithmetic('200*10%')).toEqual({ ok: true, value: 20 });
    expect(evaluateArithmetic('100+10%')).toEqual({ ok: true, value: 110 });
    expect(evaluateArithmetic('100-10%')).toEqual({ ok: true, value: 90 });
  });

  it('returns an error for division by zero', () => {
    expect(evaluateArithmetic('8/0')).toEqual({ ok: false, error: 'div_zero' });
    expect(evaluateArithmetic('8/0%')).toEqual({ ok: false, error: 'div_zero' });
  });

  it('rejects invalid expressions', () => {
    expect(evaluateArithmetic('')).toEqual({ ok: false, error: 'invalid' });
    expect(evaluateArithmetic('2+')).toEqual({ ok: false, error: 'invalid' });
    expect(evaluateArithmetic('(2+3')).toEqual({ ok: false, error: 'invalid' });
    expect(evaluateArithmetic('2+*2')).toEqual({ ok: false, error: 'invalid' });
    expect(evaluateArithmetic('abc')).toEqual({ ok: false, error: 'invalid' });
  });

  it('supports parentheses and unary minus', () => {
    expect(evaluateArithmetic('(2+3)*4')).toEqual({ ok: true, value: 20 });
    expect(evaluateArithmetic('-3+5')).toEqual({ ok: true, value: 2 });
  });
});

describe('formatArithmeticValue', () => {
  it('keeps integers compact', () => {
    expect(formatArithmeticValue(12)).toBe('12');
  });
});
