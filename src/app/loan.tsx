import { useMemo, useState } from 'react';

import { calculateLoan } from '@/calculators/loan';
import { NumberField } from '@/components/number-field';
import { ResultPanel, ShareButton } from '@/components/result-panel';
import { Screen } from '@/components/screen';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { useApp } from '@/context/app-context';
import { useHistorySave } from '@/hooks/use-history-save';
import { useShareResult } from '@/hooks/use-share-result';
import type { DurationUnit } from '@/utils/duration';
import { formatMoney } from '@/utils/format';
import { parseAmount } from '@/utils/number';
import { formatShareMessage } from '@/utils/summaries';

export default function LoanScreen() {
  const { copy, language } = useApp();
  const share = useShareResult();
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');
  const [unit, setUnit] = useState<DurationUnit>('months');

  const result = useMemo(() => {
    const principal = parseAmount(amount);
    const annualRatePercent = parseAmount(rate);
    const durationValue = parseAmount(duration);
    if (principal === null || annualRatePercent === null || durationValue === null) return null;
    return calculateLoan({
      principal,
      annualRatePercent,
      duration: durationValue,
      durationUnit: unit,
    });
  }, [amount, duration, rate, unit]);

  const draft = useMemo(() => {
    if (!result) return null;
    return {
      kind: 'loan' as const,
      input: {
        principal: result.principal,
        annualRatePercent: parseAmount(rate) ?? 0,
        duration: parseAmount(duration) ?? 0,
        durationUnit: unit,
      },
      result,
    };
  }, [duration, rate, result, unit]);
  useHistorySave(draft);

  return (
    <Screen>
      <NumberField
        label={copy.loan.amountLabel}
        value={amount}
        onChangeText={setAmount}
        suffix={copy.common.etb}
        autoFocus
      />
      <NumberField
        label={copy.loan.rateLabel}
        value={rate}
        onChangeText={setRate}
        suffix="%"
      />
      <NumberField
        label={copy.loan.durationLabel}
        value={duration}
        onChangeText={setDuration}
      />
      <SegmentedControl
        value={unit}
        onChange={setUnit}
        options={[
          { value: 'months', label: copy.common.months },
          { value: 'years', label: copy.common.years },
        ]}
      />

      {result ? (
        <ResultPanel
          title={copy.common.results}
          rows={[
            {
              label: copy.loan.monthlyPayment,
              value: formatMoney(result.monthlyPayment, language),
              emphasize: true,
            },
            {
              label: copy.loan.totalRepayment,
              value: formatMoney(result.totalRepayment, language),
            },
            {
              label: copy.loan.totalInterest,
              value: formatMoney(result.totalInterest, language),
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
