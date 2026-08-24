import { useMemo, useState } from 'react';

import { calculateSavings } from '@/calculators/savings';
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

export default function SavingsScreen() {
  const { copy, language } = useApp();
  const share = useShareResult();
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [duration, setDuration] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [unit, setUnit] = useState<DurationUnit>('months');
  const visual = CALCULATOR_VISUALS.savings;

  const initialHint = hintForAmount(initial, copy);
  const monthlyHint = hintForAmount(monthly, copy);
  const durationMax = unit === 'years' ? MAX_DURATION_MONTHS / 12 : MAX_DURATION_MONTHS;
  const durationHint = hintForAmount(duration, copy, durationMax);
  const returnHint = annualReturn.trim() === '' ? undefined : hintForRate(annualReturn, copy);

  const result = useMemo(() => {
    const initialAmount = parseAmount(initial) ?? 0;
    const monthlySaving = parseAmount(monthly) ?? 0;
    const durationValue = parseAmount(duration);
    const annualReturnPercent = annualReturn.trim() === '' ? 0 : parseAmount(annualReturn);
    if (durationValue === null || annualReturnPercent === null) return null;
    if (initial.trim() === '' && monthly.trim() === '') return null;
    return calculateSavings({
      initialAmount,
      monthlySaving,
      duration: durationValue,
      durationUnit: unit,
      annualReturnPercent,
    });
  }, [annualReturn, duration, initial, monthly, unit]);

  const draft = useMemo(() => {
    if (!result) return null;
    return {
      kind: 'savings' as const,
      input: {
        initialAmount: parseAmount(initial) ?? 0,
        monthlySaving: parseAmount(monthly) ?? 0,
        duration: parseAmount(duration) ?? 0,
        durationUnit: unit,
        annualReturnPercent: annualReturn.trim() === '' ? 0 : (parseAmount(annualReturn) ?? 0),
      },
      result,
    };
  }, [annualReturn, duration, initial, monthly, result, unit]);
  useHistorySave(draft);

  return (
    <Screen>
      <ScreenHeader icon={visual.icon} subtitle={copy.calculators.savings.subtitle} tone={visual.tone} />

      <NumberField
        label={copy.savings.initialLabel}
        value={initial}
        onChangeText={setInitial}
        suffix={copy.common.etb}
        autoFocus
        hint={initialHint}
        error={Boolean(initialHint)}
      />
      <NumberField
        label={copy.savings.monthlyLabel}
        value={monthly}
        onChangeText={setMonthly}
        suffix={copy.common.etb}
        hint={monthlyHint}
        error={Boolean(monthlyHint)}
      />
      <NumberField
        label={copy.savings.durationLabel}
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
      <NumberField
        label={`${copy.savings.returnLabel} (${copy.common.optional})`}
        value={annualReturn}
        onChangeText={setAnnualReturn}
        suffix="%"
        placeholder="0"
        hint={returnHint}
        error={Boolean(returnHint)}
      />

      <ResultPanel
        title={copy.common.breakdown}
        emptyLabel={copy.common.enterAmount}
        hero={
          result
            ? {
                label: copy.savings.finalAmount,
                value: formatMoney(result.finalAmount, language),
              }
            : undefined
        }
        rows={
          result
            ? [
                {
                  label: copy.savings.totalContributed,
                  value: formatMoney(result.totalContributed, language),
                },
                {
                  label: copy.savings.estimatedGain,
                  value: formatMoney(result.estimatedGain, language),
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
