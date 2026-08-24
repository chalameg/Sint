import { DEFAULT_VAT_RATE } from '@/config/ethiopia';
import { isFiniteMoney, isFiniteRatePercent, roundCurrency } from '@/utils/number';

export type VatMode = 'add' | 'remove';

export type VatInput = {
  amount: number;
  ratePercent?: number;
  mode: VatMode;
};

export type VatResult = {
  mode: VatMode;
  rate: number;
  net: number;
  vat: number;
  gross: number;
};

export function calculateVat(input: VatInput): VatResult | null {
  const amount = input.amount;
  const ratePercent =
    input.ratePercent === undefined ? DEFAULT_VAT_RATE * 100 : input.ratePercent;
  const rate = ratePercent / 100;

  if (!isFiniteMoney(amount)) return null;
  if (!isFiniteRatePercent(ratePercent)) return null;

  if (input.mode === 'add') {
    const net = roundCurrency(amount);
    const gross = roundCurrency(amount * (1 + rate));
    const vat = roundCurrency(gross - net);
    return { mode: 'add', rate, net, vat, gross };
  }

  const gross = roundCurrency(amount);
  const net = roundCurrency(amount / (1 + rate));
  const vat = roundCurrency(gross - net);
  return { mode: 'remove', rate, net, vat, gross };
}
