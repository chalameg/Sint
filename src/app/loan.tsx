import { useMemo, useState } from 'react';

import { calculateLoan } from '@/calculators/loan';
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
import type { DurationUnit } from '@/utils/duration';
import { formatMoney } from '@/utils/format';
import { hintForAmount, hintForRate } from '@/utils/input-hint';
import { MAX_DURATION_MONTHS, parseAmount } from '@/utils/number';
import { formatShareMessage } from '@/utils/summaries';

export default function LoanScreen() {
  const { copy, language } = useApp();
  const share = useShareResult();
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');
  const [unit, setUnit] = useState<DurationUnit>('months');
  const visual = CALCULATOR_VISUALS.loan;

  const amountHint = hintForAmount(amount, copy);
  const rateHint = hintForRate(rate, copy);
  const durationMax = unit === 'years' ? MAX_DURATION_MONTHS / 12 : MAX_DURATION_MONTHS;
  const durationHint = hintForAmount(duration, copy, durationMax);

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
      <ScreenHeader icon={visual.icon} subtitle={copy.calculators.loan.subtitle} accent={visual.accent} />

      <NumberField
        label={copy.loan.amountLabel}
        value={amount}
        onChangeText={setAmount}
        suffix={copy.common.etb}
        autoFocus
        hint={amountHint}
        error={Boolean(amountHint)}
      />
      <NumberField
        label={copy.loan.rateLabel}
        value={rate}
        onChangeText={setRate}
        suffix="%"
        hint={rateHint}
        error={Boolean(rateHint)}
      />
      <NumberField
        label={copy.loan.durationLabel}
        value={duration}
        onChangeText={setDuration}
        suffix={unit === 'years' ? copy.common.years : copy.common.months}
        hint={durationHint}
        error={Boolean(durationHint)}
      />
      <SegmentedControl
        value={unit}
        onChange={setUnit}
        options={[
          { value: 'months', label: copy.common.months },
          { value: 'years', label: copy.common.years },
        ]}
      />

      <ResultPanel
        title={copy.common.breakdown}
        emptyLabel={copy.common.enterAmount}
        hero={
          result
            ? {
                label: copy.loan.monthlyPayment,
                value: formatMoney(result.monthlyPayment, language),
              }
            : undefined
        }
        rows={
          result
            ? [
                {
                  label: copy.loan.totalRepayment,
                  value: formatMoney(result.totalRepayment, language),
                },
                {
                  label: copy.loan.totalInterest,
                  value: formatMoney(result.totalInterest, language),
                },
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
