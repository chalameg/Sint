import { useEffect, useMemo, useRef, useState } from 'react';

import { calculateVat, type VatMode } from '@/calculators/vat';
import { NumberField } from '@/components/number-field';
import { ResultPanel, ShareButton } from '@/components/result-panel';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { CALCULATOR_VISUALS } from '@/constants/calculators';
import { useApp } from '@/context/app-context';
import { useHistorySave } from '@/hooks/use-history-save';
import { useShareResult } from '@/hooks/use-share-result';
import { formatMoney, formatPercent } from '@/utils/format';
import { hintForAmount, hintForRate } from '@/utils/input-hint';
import { parseAmount } from '@/utils/number';
import { formatShareMessage } from '@/utils/summaries';

export default function VatScreen() {
  const { copy, language, settings, ready } = useApp();
  const share = useShareResult();
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(String(settings.vatRatePercent));
  const [mode, setMode] = useState<VatMode>('add');
  const hydrated = useRef(false);
  const visual = CALCULATOR_VISUALS.vat;

  useEffect(() => {
    if (ready && !hydrated.current) {
      hydrated.current = true;
      setRate(String(settings.vatRatePercent));
    }
  }, [ready, settings.vatRatePercent]);

  const amountHint = hintForAmount(amount, copy);
  const rateHint = hintForRate(rate, copy);

  const result = useMemo(() => {
    const parsedAmount = parseAmount(amount);
    const parsedRate = parseAmount(rate);
    if (parsedAmount === null || parsedRate === null) return null;
    return calculateVat({ amount: parsedAmount, ratePercent: parsedRate, mode });
  }, [amount, mode, rate]);

  const draft = useMemo(() => {
    if (!result) return null;
    return {
      kind: 'vat' as const,
      input: {
        amount: parseAmount(amount) ?? 0,
        ratePercent: parseAmount(rate) ?? settings.vatRatePercent,
        mode,
      },
      result,
    };
  }, [amount, mode, rate, result, settings.vatRatePercent]);
  useHistorySave(draft);

  return (
    <Screen>
      <ScreenHeader icon={visual.icon} subtitle={copy.calculators.vat.subtitle} tone={visual.tone} />

      <SegmentedControl
        value={mode}
        onChange={setMode}
        options={[
          { value: 'add', label: copy.vat.add },
          { value: 'remove', label: copy.vat.remove },
        ]}
      />
      <NumberField
        label={copy.vat.amountLabel}
        value={amount}
        onChangeText={setAmount}
        suffix={copy.common.etb}
        autoFocus
        hint={amountHint}
        error={Boolean(amountHint)}
      />
      <NumberField
        label={copy.vat.rateLabel}
        value={rate}
        onChangeText={setRate}
        suffix="%"
        hint={rateHint}
        error={Boolean(rateHint)}
      />

      <ResultPanel
        title={copy.common.breakdown}
        emptyLabel={copy.common.enterAmount}
        hero={
          result
            ? {
                label: mode === 'add' ? copy.vat.gross : copy.vat.net,
                value: formatMoney(mode === 'add' ? result.gross : result.net, language),
              }
            : undefined
        }
        rows={
          result
            ? [
                { label: copy.vat.rateLabel, value: formatPercent(result.rate, language) },
                ...(mode === 'add'
                  ? [{ label: copy.vat.net, value: formatMoney(result.net, language) }]
                  : [{ label: copy.vat.gross, value: formatMoney(result.gross, language) }]),
                { label: copy.vat.vat, value: formatMoney(result.vat, language) },
              ]
            : []
        }
        footer={
          draft ? (
            <ShareButton
              label={copy.common.share}
              onPress={() => void share(copy.appName, formatShareMessage(draft, language, copy))}
            />
          ) : null
        }
      />

      <ThemedText type="small" themeColor="textSecondary">
        {copy.common.estimateNote}
      </ThemedText>
    </Screen>
  );
}
