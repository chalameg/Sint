import type { LoanInput, LoanResult } from '@/calculators/loan';
import type { SalaryInput, SalaryResult } from '@/calculators/salary';
import type { SavingsInput, SavingsResult } from '@/calculators/savings';
import type { VatInput, VatResult } from '@/calculators/vat';

export type FinanceKind = 'salary' | 'loan' | 'vat' | 'savings';
export type CalculatorKind = FinanceKind | 'calculator';

export type HistoryDraft =
  | {
      kind: 'salary';
      input: SalaryInput;
      result: SalaryResult;
    }
  | {
      kind: 'loan';
      input: LoanInput;
      result: LoanResult;
    }
  | {
      kind: 'vat';
      input: VatInput;
      result: VatResult;
    }
  | {
      kind: 'savings';
      input: SavingsInput;
      result: SavingsResult;
    };

export type HistoryEntry = HistoryDraft & {
  id: string;
  createdAt: number;
};
