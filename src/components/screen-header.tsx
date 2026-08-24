import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenHeaderProps = {
  icon: keyof typeof Ionicons.glyphMap;
  subtitle: string;
  tone?: 'primary' | 'accent';
};

export function ScreenHeader({ icon, subtitle, tone = 'primary' }: ScreenHeaderProps) {
  const theme = useTheme();
  const color = tone === 'accent' ? theme.accent : theme.primary;

  return (
    <View style={styles.row} accessibilityRole="header">
      <View style={[styles.icon, { backgroundColor: tone === 'accent' ? theme.accentMuted : theme.primaryMuted }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <ThemedText type="default" themeColor="textSecondary" style={styles.copy}>
        {subtitle}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
  },
});
