import { dictionaries, type Language, type TranslationDict } from '@/i18n';
import type { HistoryDraft, HistoryEntry } from '@/types/history';
import type { AppSettings } from '@/storage/keys';

export type AppContextValue = {
  ready: boolean;
  settings: AppSettings;
  copy: TranslationDict;
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
  setVatRatePercent: (vatRatePercent: number) => Promise<void>;
  history: HistoryEntry[];
  saveCalculation: (draft: HistoryDraft) => Promise<void>;
  clearHistory: () => Promise<void>;
};
