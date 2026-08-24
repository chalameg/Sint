import type { TranslationDict } from '@/i18n';
import { amountIssue, MAX_RATE_PERCENT } from '@/utils/number';

export function hintForAmount(value: string, copy: TranslationDict, max?: number): string | undefined {
  const issue = amountIssue(value, max);
  if (issue === 'negative') return copy.common.enterValidAmount;
  if (issue === 'tooLarge') return copy.common.amountTooLarge;
  return undefined;
}

export function hintForRate(value: string, copy: TranslationDict): string | undefined {
  return hintForAmount(value, copy, MAX_RATE_PERCENT);
}
