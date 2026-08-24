import type { Language } from '@/i18n';
import { DEFAULT_TAXABLE_INCOME_MODE, type TaxableIncomeMode } from '@/config/ethiopia';

export const STORAGE_KEYS = {
  settings: 'sint.settings.v1',
  history: 'sint.history.v1',
} as const;

export type AppSettings = {
  language: Language;
  vatRatePercent: number;
  taxableIncomeMode: TaxableIncomeMode;
};

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  vatRatePercent: 15,
  taxableIncomeMode: DEFAULT_TAXABLE_INCOME_MODE,
};
