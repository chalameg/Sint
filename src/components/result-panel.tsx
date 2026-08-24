import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ResultRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

type ResultPanelProps = {
  title: string;
  rows: ResultRow[];
  footer?: ReactNode;
};

export function ResultPanel({ title, rows, footer }: ResultPanelProps) {
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={[styles.card, { borderColor: theme.border }]}>
      <ThemedText type="label" themeColor="textSecondary">
        {title}
      </ThemedText>
      <View style={styles.rows}>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
              {row.label}
            </ThemedText>
            <ThemedText
              type={row.emphasize ? 'amount' : 'default'}
              style={[styles.value, row.emphasize && { color: theme.primary }]}>
              {row.value}
            </ThemedText>
          </View>
        ))}
      </View>
      {footer}
    </ThemedView>
  );
}

type ShareButtonProps = {
  label: string;
  onPress: () => void;
};

export function ShareButton({ label, onPress }: ShareButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.share, { backgroundColor: theme.primaryMuted }]}>
      <ThemedText type="smallBold" style={{ color: theme.primary }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  rows: {
    gap: Spacing.three,
  },
  row: {
    gap: Spacing.half,
  },
  label: {
    textTransform: 'none',
  },
  value: {
    fontVariant: ['tabular-nums'],
  },
  share: {
    minHeight: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
