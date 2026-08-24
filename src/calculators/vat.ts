import { DEFAULT_VAT_RATE } from '@/config/ethiopia';
import { roundCurrency } from '@/utils/number';

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
  const rate =
    input.ratePercent === undefined ? DEFAULT_VAT_RATE : input.ratePercent / 100;

  if (!Number.isFinite(amount) || amount < 0) return null;
  if (!Number.isFinite(rate) || rate < 0) return null;

  if (input.mode === 'add') {
    const vat = roundCurrency(amount * rate);
    const gross = roundCurrency(amount + vat);
    return {
      mode: 'add',
      rate,
      net: roundCurrency(amount),
      vat,
      gross,
    };
  }

  const net = roundCurrency(amount / (1 + rate));
  const vat = roundCurrency(amount - net);
  return {
    mode: 'remove',
    rate,
    net,
    vat,
    gross: roundCurrency(amount),
  };
}
