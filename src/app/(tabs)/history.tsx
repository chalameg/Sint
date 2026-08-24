import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import { useShareResult } from '@/hooks/use-share-result';
import { useTheme } from '@/hooks/use-theme';
import { calculatorTitle, formatHistorySummary, formatShareMessage } from '@/utils/summaries';

export default function HistoryScreen() {
  const { copy, history, language, clearHistory } = useApp();
  const theme = useTheme();
  const share = useShareResult();

  const onClear = () => {
    Alert.alert(copy.history.clear, copy.history.clearConfirm, [
      { text: copy.common.cancel, style: 'cancel' },
      { text: copy.history.clear, style: 'destructive', onPress: () => void clearHistory() },
    ]);
  };

  return (
    <Screen>
      {history.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={36} color={theme.textSecondary} />
          <ThemedText type="subtitle">{copy.history.empty}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {copy.history.emptyHint}
          </ThemedText>
        </View>
      ) : (
        <View style={styles.list}>
          {history.map((entry) => (
            <Pressable
              key={entry.id}
              onPress={() => void share(copy.appName, formatShareMessage(entry, language, copy))}
              style={[
                styles.item,
                { backgroundColor: theme.backgroundElement, borderColor: theme.border },
              ]}>
              <View style={styles.itemCopy}>
                <ThemedText type="smallBold">{calculatorTitle(copy, entry.kind)}</ThemedText>
                <ThemedText type="default">{formatHistorySummary(entry, language, copy)}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {new Date(entry.createdAt).toLocaleString(language === 'am' ? 'am-ET' : 'en-ET')}
                </ThemedText>
              </View>
              <Ionicons name="share-outline" size={18} color={theme.primary} />
            </Pressable>
          ))}
          <Pressable onPress={onClear} style={styles.clear}>
            <ThemedText type="smallBold" style={{ color: theme.danger }}>
              {copy.history.clear}
            </ThemedText>
          </Pressable>
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
    gap: Spacing.two,
  },
  list: {
    gap: Spacing.two,
  },
  item: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  itemCopy: {
    flex: 1,
    gap: 2,
  },
  clear: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
});
