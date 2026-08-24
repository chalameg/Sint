import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, useReducedMotion } from 'react-native-reanimated';

import { GlassSurface } from '@/components/glass-surface';
import { PressableScale } from '@/components/pressable-scale';
import { ThemedText } from '@/components/themed-text';
import { Motion, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ResultRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

type ResultPanelProps = {
  title?: string;
  hero?: ResultRow;
  rows: ResultRow[];
  footer?: ReactNode;
  emptyLabel?: string;
};

export function ResultPanel({ title, hero, rows, footer, emptyLabel }: ResultPanelProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const entering = reduceMotion ? undefined : FadeIn.duration(Motion.base);
  const exiting = reduceMotion ? undefined : FadeOut.duration(Motion.fast);
  const layout = reduceMotion ? undefined : LinearTransition.duration(Motion.base);

  return (
    <GlassSurface accent={Boolean(hero)} strong={Boolean(hero)} style={styles.card}>
      {hero ? (
        <Animated.View
          entering={entering}
          layout={layout}
          accessibilityLiveRegion="polite"
          style={[styles.hero, { borderBottomColor: theme.border }]}>
          <ThemedText type="label" themeColor="textSecondary">
            {hero.label}
          </ThemedText>
          <ThemedText type="hero" style={{ color: theme.primary }}>
            {hero.value}
          </ThemedText>
        </Animated.View>
      ) : emptyLabel ? (
        <View style={styles.empty}>
          <ThemedText type="small" themeColor="textSecondary">
            {emptyLabel}
          </ThemedText>
        </View>
      ) : (
        <ThemedText type="label" themeColor="textSecondary">
          {title}
        </ThemedText>
      )}

      {rows.length > 0 ? (
        <Animated.View entering={entering} exiting={exiting} layout={layout} style={styles.rows}>
          {title && hero ? (
            <ThemedText type="label" themeColor="textSecondary">
              {title}
            </ThemedText>
          ) : null}
          {rows.map((row) => (
            <View key={row.label} style={styles.row}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
                {row.label}
              </ThemedText>
              <ThemedText type="default" style={styles.value}>
                {row.value}
              </ThemedText>
            </View>
          ))}
        </Animated.View>
      ) : null}

      {footer}
    </GlassSurface>
  );
}

type ShareButtonProps = {
  label: string;
  onPress: () => void;
};

export function ShareButton({ label, onPress }: ShareButtonProps) {
  const theme = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={label}
      style={[styles.share, { backgroundColor: theme.primaryMuted }]}>
      <Ionicons name="share-outline" size={18} color={theme.primary} />
      <ThemedText type="smallBold" style={{ color: theme.primary }}>
        {label}
      </ThemedText>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  hero: {
    gap: Spacing.one,
    paddingBottom: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  empty: {
    minHeight: 72,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rows: {
    gap: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  label: {
    textTransform: 'none',
    flex: 1,
  },
  value: {
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  share: {
    minHeight: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
