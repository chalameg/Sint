import type { Language, TranslationDict } from '@/i18n';
import type { HistoryDraft, HistoryEntry } from '@/types/history';
import type { AppSettings } from '@/storage/keys';

export type AppContextValue = {
  ready: boolean;
  settings: AppSettings;
  copy: TranslationDict;
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
  setVatRatePercent: (vatRatePercent: number) => Promise<void>;
  setTaxableIncomeMode: (mode: AppSettings['taxableIncomeMode']) => Promise<void>;
  history: HistoryEntry[];
  saveCalculation: (draft: HistoryDraft) => Promise<void>;
  clearHistory: () => Promise<void>;
};
