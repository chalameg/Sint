import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { calculateSalary } from '@/calculators/salary';
import { NumberField } from '@/components/number-field';
import { ResultPanel, ShareButton } from '@/components/result-panel';
import { Screen } from '@/components/screen';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { TaxableIncomeMode } from '@/config/ethiopia';
import { useApp } from '@/context/app-context';
import { useHistorySave } from '@/hooks/use-history-save';
import { useShareResult } from '@/hooks/use-share-result';
import { formatMoney, formatPercent } from '@/utils/format';
import { hintForAmount } from '@/utils/input-hint';
import { parseAmount } from '@/utils/number';
import { formatShareMessage } from '@/utils/summaries';

export default function SalaryScreen() {
  const { copy, language, settings, setTaxableIncomeMode } = useApp();
  const share = useShareResult();
  const [gross, setGross] = useState('');
  const mode = settings.taxableIncomeMode;

  const parsedGross = parseAmount(gross);
  const result =
    parsedGross === null ? null : calculateSalary({ grossMonthly: parsedGross, taxableIncomeMode: mode });
  const grossHint = hintForAmount(gross, copy);

  const draft = useMemo(
    () =>
      result && result.grossMonthly > 0
        ? {
            kind: 'salary' as const,
            input: { grossMonthly: result.grossMonthly, taxableIncomeMode: mode },
            result,
          }
        : null,
    [mode, result],
  );
  useHistorySave(draft);

  return (
    <Screen>
      <NumberField
        label={copy.salary.grossLabel}
        value={gross}
        onChangeText={setGross}
        suffix={copy.common.etb}
        autoFocus
        hint={grossHint}
        error={Boolean(grossHint)}
      />

      <View style={{ gap: Spacing.one }}>
        <ThemedText type="label" themeColor="textSecondary">
          {copy.salary.taxableMode}
        </ThemedText>
        <SegmentedControl
          value={mode}
          onChange={(next: TaxableIncomeMode) => void setTaxableIncomeMode(next)}
          options={[
            { value: 'gross', label: copy.salary.taxableGross },
            { value: 'grossMinusPension', label: copy.salary.taxableAfterPension },
          ]}
        />
        <ThemedText type="small" themeColor="textSecondary">
          {copy.salary.taxableHint}
        </ThemedText>
      </View>

      {result ? (
        <ResultPanel
          title={copy.common.results}
          rows={[
            { label: copy.salary.taxableIncome, value: formatMoney(result.taxableIncome, language) },
            { label: copy.salary.incomeTax, value: formatMoney(result.incomeTax, language) },
            {
              label: copy.salary.employeePension,
              value: formatMoney(result.employeePension, language),
            },
            {
              label: copy.salary.employerPension,
              value: formatMoney(result.employerPension, language),
            },
            {
              label: copy.salary.netTakeHome,
              value: formatMoney(result.netTakeHome, language),
              emphasize: true,
            },
            {
              label: copy.salary.effectiveRate,
              value: formatPercent(result.effectiveTaxRate, language),
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
        {copy.salary.disclaimer}
      </ThemedText>
    </Screen>
  );
}
