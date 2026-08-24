import type { Language } from '@/i18n';

export const STORAGE_KEYS = {
  settings: 'sint.settings.v1',
  history: 'sint.history.v1',
} as const;

export type AppSettings = {
  language: Language;
  vatRatePercent: number;
};

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  vatRatePercent: 15,
};
