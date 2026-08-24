import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, View } from 'react-native';

import { GlassSurface } from '@/components/glass-surface';
import { HistoryItem } from '@/components/history-item';
import { PressableScale } from '@/components/pressable-scale';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import { useTheme } from '@/hooks/use-theme';

export default function HistoryScreen() {
  const { copy, history, clearHistory } = useApp();
  const theme = useTheme();

  const onClear = () => {
    Alert.alert(copy.history.clear, copy.history.clearConfirm, [
      { text: copy.common.cancel, style: 'cancel' },
      { text: copy.history.clear, style: 'destructive', onPress: () => void clearHistory() },
    ]);
  };

  return (
    <Screen>
      {history.length === 0 ? (
        <GlassSurface elevated={false} style={styles.empty}>
          <Ionicons name="time-outline" size={36} color={theme.textSecondary} />
          <ThemedText type="subtitle">{copy.history.empty}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {copy.history.emptyHint}
          </ThemedText>
        </GlassSurface>
      ) : (
        <View style={styles.list}>
          {history.map((entry) => (
            <HistoryItem key={entry.id} entry={entry} />
          ))}
          <PressableScale onPress={onClear} accessibilityLabel={copy.history.clear} style={styles.clear}>
            <ThemedText type="smallBold" style={{ color: theme.danger }}>
              {copy.history.clear}
            </ThemedText>
          </PressableScale>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  list: {
    gap: Spacing.three,
  },
  clear: {
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
    paddingVertical: Spacing.three,
  },
});
