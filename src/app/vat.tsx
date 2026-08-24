import { useEffect, useMemo, useRef, useState } from 'react';

import { calculateVat, type VatMode } from '@/calculators/vat';
import { NumberField } from '@/components/number-field';
import { ResultPanel, ShareButton } from '@/components/result-panel';
import { Screen } from '@/components/screen';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
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

      {result ? (
        <ResultPanel
          title={copy.common.results}
          rows={[
            { label: copy.vat.rateLabel, value: formatPercent(result.rate, language) },
            { label: copy.vat.net, value: formatMoney(result.net, language) },
            { label: copy.vat.vat, value: formatMoney(result.vat, language) },
            {
              label: copy.vat.gross,
              value: formatMoney(result.gross, language),
              emphasize: true,
            },
          ]}
          footer={
            draft ? (
              <ShareButton
                label={copy.common.share}
                onPress={() => void share(copy.appName, formatShareMessage(draft, language, copy))}
              />
            ) : null
          }
        />
      ) : null}

      <ThemedText type="small" themeColor="textSecondary">
        {copy.common.estimateNote}
      </ThemedText>
    </Screen>
  );
}
