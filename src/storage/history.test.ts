import { describe, expect, it } from 'vitest';

import { calculateSalary } from '@/calculators/salary';
import { mergeHistory } from '@/storage/history';
import type { HistoryDraft } from '@/types/history';

const salaryResult = calculateSalary({ grossMonthly: 15000 });
if (!salaryResult) {
  throw new Error('Expected a salary result for the history fixture');
}

const salaryDraft: HistoryDraft = {
  kind: 'salary',
  input: { grossMonthly: 15000, taxableIncomeMode: 'gross' },
  result: salaryResult,
};

describe('mergeHistory', () => {
  it('inserts a new calculation at the front', () => {
    const next = mergeHistory([], salaryDraft);
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({
      kind: 'salary',
      result: { netTakeHome: 10750 },
    });
  });

  it('replaces the latest entry of the same kind within the edit window', () => {
    const first = mergeHistory([], salaryDraft);
    const updated = mergeHistory(first, {
      ...salaryDraft,
      input: { grossMonthly: 20000, taxableIncomeMode: 'gross' },
      result: { ...salaryDraft.result, grossMonthly: 20000 },
    });

    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe(first[0].id);
    expect(updated[0]).toMatchObject({
      kind: 'salary',
      input: { grossMonthly: 20000 },
    });
  });
});
