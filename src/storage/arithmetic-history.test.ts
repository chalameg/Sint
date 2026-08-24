import { describe, expect, it } from 'vitest';

import { MAX_ARITHMETIC_HISTORY, pushArithmeticHistory } from '@/storage/arithmetic-history';

describe('pushArithmeticHistory', () => {
  it('puts the newest expression first', () => {
    const first = pushArithmeticHistory([], '1+1', 2);
    const next = pushArithmeticHistory(first, '2+2', 4);
    expect(next[0]?.expression).toBe('2+2');
    expect(next[1]?.expression).toBe('1+1');
  });

  it('replaces a matching expression instead of duplicating it', () => {
    const first = pushArithmeticHistory([], '1+1', 2);
    const next = pushArithmeticHistory(first, '1+1', 2);
    expect(next).toHaveLength(1);
  });

  it('keeps only the latest 20 entries', () => {
    const filled = Array.from({ length: 25 }, (_, index) => `${index}+1`).reduce(
      (entries, expression, index) => pushArithmeticHistory(entries, expression, index + 1),
      [] as ReturnType<typeof pushArithmeticHistory>,
    );
    expect(filled).toHaveLength(MAX_ARITHMETIC_HISTORY);
    expect(filled[0]?.expression).toBe('24+1');
    expect(filled.at(-1)?.expression).toBe('5+1');
  });
});
