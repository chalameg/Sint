import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NumberField } from '@/components/number-field';
import { Screen } from '@/components/screen';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { TaxableIncomeMode } from '@/config/ethiopia';
import { useApp } from '@/context/app-context';
import type { Language } from '@/i18n';
import { hintForRate } from '@/utils/input-hint';
import { isFiniteRatePercent, parseAmount } from '@/utils/number';

export default function SettingsScreen() {
  const { copy, language, setLanguage, settings, setVatRatePercent, setTaxableIncomeMode, ready } =
    useApp();
  const [vatDraft, setVatDraft] = useState(String(settings.vatRatePercent));
  const hydrated = useRef(false);

  useEffect(() => {
    if (ready && !hydrated.current) {
      hydrated.current = true;
      setVatDraft(String(settings.vatRatePercent));
    }
  }, [ready, settings.vatRatePercent]);

  const languageOptions = useMemo(
    () =>
      [
        { value: 'en' as Language, label: copy.settings.english },
        { value: 'am' as Language, label: copy.settings.amharic },
      ] as const,
    [copy.settings.amharic, copy.settings.english],
  );

  const vatHint = hintForRate(vatDraft, copy);

  return (
    <Screen>
      <View style={styles.block}>
        <ThemedText type="label" themeColor="textSecondary">
          {copy.settings.language}
        </ThemedText>
        <SegmentedControl
          value={language}
          onChange={(next) => void setLanguage(next)}
          options={languageOptions}
        />
      </View>

      <View style={styles.block}>
        <ThemedText type="label" themeColor="textSecondary">
          {copy.settings.defaults}
        </ThemedText>
        <NumberField
          label={copy.settings.defaultVat}
          value={vatDraft}
          suffix="%"
          hint={vatHint}
          error={Boolean(vatHint)}
          onChangeText={(next) => {
            setVatDraft(next);
            const parsed = parseAmount(next);
            if (parsed !== null && isFiniteRatePercent(parsed)) {
              void setVatRatePercent(parsed);
            }
          }}
        />
      </View>

      <View style={styles.block}>
        <ThemedText type="label" themeColor="textSecondary">
          {copy.settings.taxableMode}
        </ThemedText>
        <SegmentedControl
          value={settings.taxableIncomeMode}
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

      <View style={styles.block}>
        <ThemedText type="label" themeColor="textSecondary">
          {copy.settings.about}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {copy.settings.aboutBody}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {copy.settings.localNote}
        </ThemedText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: Spacing.two,
  },
});
