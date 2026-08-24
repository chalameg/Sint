import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_SETTINGS, STORAGE_KEYS, type AppSettings } from '@/storage/keys';
import type { Language } from '@/i18n';
import type { TaxableIncomeMode } from '@/config/ethiopia';

function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'am';
}

function isTaxableIncomeMode(value: unknown): value is TaxableIncomeMode {
  return value === 'gross' || value === 'grossMinusPension';
}

export async function loadSettings(): Promise<AppSettings> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.settings);
  if (!raw) return DEFAULT_SETTINGS;

  try {
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    const vatRatePercent =
      typeof parsed.vatRatePercent === 'number' && parsed.vatRatePercent >= 0
        ? parsed.vatRatePercent
        : DEFAULT_SETTINGS.vatRatePercent;

    return {
      language: isLanguage(parsed.language) ? parsed.language : DEFAULT_SETTINGS.language,
      vatRatePercent,
      taxableIncomeMode: isTaxableIncomeMode(parsed.taxableIncomeMode)
        ? parsed.taxableIncomeMode
        : DEFAULT_SETTINGS.taxableIncomeMode,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}
