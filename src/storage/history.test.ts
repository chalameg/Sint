import { describe, expect, it } from 'vitest';

import { mergeHistory } from '@/storage/history';
import type { HistoryDraft } from '@/types/history';

const salaryDraft: HistoryDraft = {
  kind: 'salary',
  input: { grossMonthly: 15000 },
  result: {
    grossMonthly: 15000,
    incomeTax: 3200,
    employeePension: 1050,
    employerPension: 1650,
    netTakeHome: 10750,
    effectiveTaxRate: 3200 / 15000,
  },
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
      input: { grossMonthly: 20000 },
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
