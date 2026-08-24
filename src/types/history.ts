import type { LoanInput, LoanResult } from '@/calculators/loan';
import type { SalaryInput, SalaryResult } from '@/calculators/salary';
import type { SavingsInput, SavingsResult } from '@/calculators/savings';
import type { VatInput, VatResult } from '@/calculators/vat';

export type CalculatorKind = 'salary' | 'loan' | 'vat' | 'savings';

export type HistoryEntry =
  | {
      id: string;
      createdAt: number;
      kind: 'salary';
      input: SalaryInput;
      result: SalaryResult;
    }
  | {
      id: string;
      createdAt: number;
      kind: 'loan';
      input: LoanInput;
      result: LoanResult;
    }
  | {
      id: string;
      createdAt: number;
      kind: 'vat';
      input: VatInput;
      result: VatResult;
    }
  | {
      id: string;
      createdAt: number;
      kind: 'savings';
      input: SavingsInput;
      result: SavingsResult;
    };

export type HistoryDraft = Omit<HistoryEntry, 'id' | 'createdAt'>;
