import { CURRENCY_CODE } from '@/config/ethiopia';
import type { Language } from '@/i18n';

export function localeFor(language: Language): string {
  return language === 'am' ? 'am-ET' : 'en-ET';
}

export function formatMoney(amount: number, language: Language): string {
  return new Intl.NumberFormat(localeFor(language), {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(amount: number, language: Language, digits = 2): string {
  return new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

export function formatPercent(rate: number, language: Language): string {
  return new Intl.NumberFormat(localeFor(language), {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rate);
}
