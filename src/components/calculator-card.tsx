import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, useReducedMotion } from 'react-native-reanimated';

import { GlassSurface } from '@/components/glass-surface';
import { PressableScale } from '@/components/pressable-scale';
import { ThemedText } from '@/components/themed-text';
import { Motion, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CalculatorCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  delay?: number;
  onPress: () => void;
};

export function CalculatorCard({
  title,
  subtitle,
  icon,
  accent,
  delay = 0,
  onPress,
}: CalculatorCardProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const entering =
    Platform.OS === 'web' || reduceMotion
      ? undefined
      : FadeInDown.duration(Motion.slow).delay(delay).springify().damping(18);

  return (
    <Animated.View entering={entering} style={styles.pressable}>
      <PressableScale onPress={onPress} accessibilityLabel={`${title}. ${subtitle}`} style={styles.pressable}>
        <GlassSurface strong style={styles.card}>
          <View style={[styles.strip, { backgroundColor: accent }]} />
          <View style={[styles.stripGlow, { backgroundColor: withAlpha(accent, 0.22) }]} />
          <View style={[styles.iconWrap, { backgroundColor: withAlpha(accent, 0.16) }]}>
            <Ionicons name={icon} size={22} color={accent} />
          </View>
          <View style={styles.copy}>
            <ThemedText type="subtitle">{title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {subtitle}
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
        </GlassSurface>
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'stretch',
  },
  card: {
    minHeight: 84,
    paddingVertical: 14,
    paddingRight: Spacing.three,
    paddingLeft: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    overflow: 'hidden',
  },
  strip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  stripGlow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 28,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
