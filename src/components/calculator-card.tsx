import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { GlassSurface } from '@/components/glass-surface';
import { PressableScale } from '@/components/pressable-scale';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CalculatorCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: 'primary' | 'accent';
  onPress: () => void;
};

export function CalculatorCard({ title, subtitle, icon, tone = 'primary', onPress }: CalculatorCardProps) {
  const theme = useTheme();
  const color = tone === 'accent' ? theme.accent : theme.primary;
  const well = tone === 'accent' ? theme.accentMuted : theme.primaryMuted;

  return (
    <PressableScale onPress={onPress} accessibilityLabel={`${title}. ${subtitle}`} style={styles.pressable}>
      <GlassSurface strong style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: well }]}>
          <Ionicons name={icon} size={22} color={color} />
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
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'stretch',
  },
  card: {
    minHeight: 92,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
