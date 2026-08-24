import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NumberField } from '@/components/number-field';
import { Screen } from '@/components/screen';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import type { Language } from '@/i18n';
import { parseAmount } from '@/utils/number';

export default function SettingsScreen() {
  const { copy, language, setLanguage, settings, setVatRatePercent, ready } = useApp();
  const [vatDraft, setVatDraft] = useState(String(settings.vatRatePercent));
  const hydrated = useRef(false);

  useEffect(() => {
    if (ready && !hydrated.current) {
      hydrated.current = true;
      setVatDraft(String(settings.vatRatePercent));
    }
  }, [ready, settings.vatRatePercent]);

  const vatOptions = useMemo(
    () =>
      [
        { value: 'en' as Language, label: copy.settings.english },
        { value: 'am' as Language, label: copy.settings.amharic },
      ] as const,
    [copy.settings.amharic, copy.settings.english],
  );

  return (
    <Screen>
      <View style={styles.block}>
        <ThemedText type="label" themeColor="textSecondary">
          {copy.settings.language}
        </ThemedText>
        <SegmentedControl value={language} onChange={(next) => void setLanguage(next)} options={vatOptions} />
      </View>

      <View style={styles.block}>
        <ThemedText type="label" themeColor="textSecondary">
          {copy.settings.defaults}
        </ThemedText>
        <NumberField
          label={copy.settings.defaultVat}
          value={vatDraft}
          suffix="%"
          onChangeText={(next) => {
            setVatDraft(next);
            const parsed = parseAmount(next);
            if (parsed !== null && parsed >= 0) {
              void setVatRatePercent(parsed);
            }
          }}
        />
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
