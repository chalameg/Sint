import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { GlassSurface } from '@/components/glass-surface';
import { PressableScale } from '@/components/pressable-scale';
import { ThemedText } from '@/components/themed-text';
import { CALCULATOR_VISUALS } from '@/constants/calculators';
import { Radius, Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import { useShareResult } from '@/hooks/use-share-result';
import { useTheme } from '@/hooks/use-theme';
import type { HistoryEntry } from '@/types/history';
import { calculatorTitle, formatHistorySummary, formatShareMessage } from '@/utils/summaries';

export function HistoryItem({ entry }: { entry: HistoryEntry }) {
  const { copy, language } = useApp();
  const theme = useTheme();
  const share = useShareResult();
  const visual = CALCULATOR_VISUALS[entry.kind];
  const color = visual.tone === 'accent' ? theme.accent : theme.primary;
  const well = visual.tone === 'accent' ? theme.accentMuted : theme.primaryMuted;
  const title = calculatorTitle(copy, entry.kind);
  const summary = formatHistorySummary(entry, language, copy);

  return (
    <PressableScale
      onPress={() => void share(copy.appName, formatShareMessage(entry, language, copy))}
      accessibilityLabel={`${title}. ${summary}. ${copy.common.share}`}>
      <GlassSurface strong style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: well }]}>
          <Ionicons name={visual.icon} size={18} color={color} />
        </View>
        <View style={styles.copy}>
          <ThemedText type="smallBold">{title}</ThemedText>
          <ThemedText type="default">{summary}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {new Date(entry.createdAt).toLocaleString(language === 'am' ? 'am-ET' : 'en-ET')}
          </ThemedText>
        </View>
        <Ionicons name="share-outline" size={18} color={theme.primary} />
      </GlassSurface>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
