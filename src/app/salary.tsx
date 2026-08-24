import { useMemo, useState } from 'react';

import { calculateSalary } from '@/calculators/salary';
import { NumberField } from '@/components/number-field';
import { ResultPanel, ShareButton } from '@/components/result-panel';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { useApp } from '@/context/app-context';
import { useHistorySave } from '@/hooks/use-history-save';
import { useShareResult } from '@/hooks/use-share-result';
import { isNonNegative, parseAmount } from '@/utils/number';
import { formatMoney, formatPercent } from '@/utils/format';
import { formatShareMessage } from '@/utils/summaries';

export default function SalaryScreen() {
  const { copy, language } = useApp();
  const share = useShareResult();
  const [gross, setGross] = useState('');

  const parsedGross = parseAmount(gross);
  const result = isNonNegative(parsedGross) ? calculateSalary({ grossMonthly: parsedGross }) : null;

  const draft = useMemo(
    () =>
      result
        ? { kind: 'salary' as const, input: { grossMonthly: result.grossMonthly }, result }
        : null,
    [result],
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
      />

      {result ? (
        <ResultPanel
          title={copy.common.results}
          rows={[
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
      <ThemedText type="small" themeColor="textSecondary">
        {copy.common.estimateNote}
      </ThemedText>
    </Screen>
  );
}
