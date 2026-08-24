import type { TranslationDict } from '@/i18n';
import type { Language } from '@/i18n';
import type { HistoryDraft, HistoryEntry } from '@/types/history';
import { formatMoney, formatPercent } from '@/utils/format';

export function calculatorTitle(copy: TranslationDict, kind: HistoryEntry['kind']): string {
  return copy.calculators[kind].title;
}

export function formatHistorySummary(entry: HistoryEntry, language: Language, copy: TranslationDict): string {
  switch (entry.kind) {
    case 'salary':
      return `${copy.salary.netTakeHome}: ${formatMoney(entry.result.netTakeHome, language)}`;
    case 'loan':
      return `${copy.loan.monthlyPayment}: ${formatMoney(entry.result.monthlyPayment, language)}`;
    case 'vat':
      return entry.result.mode === 'add'
        ? `${copy.vat.gross}: ${formatMoney(entry.result.gross, language)}`
        : `${copy.vat.net}: ${formatMoney(entry.result.net, language)}`;
    case 'savings':
      return `${copy.savings.finalAmount}: ${formatMoney(entry.result.finalAmount, language)}`;
  }
}

export function formatShareMessage(
  entry: HistoryEntry | HistoryDraft,
  language: Language,
  copy: TranslationDict,
): string {
  const heading = `Sint? — ${calculatorTitle(copy, entry.kind)}`;

  switch (entry.kind) {
    case 'salary':
      return [
        heading,
        `${copy.salary.grossLabel}: ${formatMoney(entry.result.grossMonthly, language)}`,
        `${copy.salary.incomeTax}: ${formatMoney(entry.result.incomeTax, language)}`,
        `${copy.salary.employeePension}: ${formatMoney(entry.result.employeePension, language)}`,
        `${copy.salary.netTakeHome}: ${formatMoney(entry.result.netTakeHome, language)}`,
      ].join('\n');
    case 'loan':
      return [
        heading,
        `${copy.loan.amountLabel}: ${formatMoney(entry.result.principal, language)}`,
        `${copy.loan.monthlyPayment}: ${formatMoney(entry.result.monthlyPayment, language)}`,
        `${copy.loan.totalRepayment}: ${formatMoney(entry.result.totalRepayment, language)}`,
        `${copy.loan.totalInterest}: ${formatMoney(entry.result.totalInterest, language)}`,
      ].join('\n');
    case 'vat':
      return [
        heading,
        `${copy.vat.rateLabel}: ${formatPercent(entry.result.rate, language)}`,
        `${copy.vat.net}: ${formatMoney(entry.result.net, language)}`,
        `${copy.vat.vat}: ${formatMoney(entry.result.vat, language)}`,
        `${copy.vat.gross}: ${formatMoney(entry.result.gross, language)}`,
      ].join('\n');
    case 'savings':
      return [
        heading,
        `${copy.savings.totalContributed}: ${formatMoney(entry.result.totalContributed, language)}`,
        `${copy.savings.estimatedGain}: ${formatMoney(entry.result.estimatedGain, language)}`,
        `${copy.savings.finalAmount}: ${formatMoney(entry.result.finalAmount, language)}`,
      ].join('\n');
  }
}
