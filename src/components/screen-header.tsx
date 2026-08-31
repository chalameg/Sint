import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing, withAlpha } from '@/constants/theme';

type ScreenHeaderProps = {
  icon: keyof typeof Ionicons.glyphMap;
  subtitle: string;
  accent: string;
};

export function ScreenHeader({ icon, subtitle, accent }: ScreenHeaderProps) {
  return (
    <View style={styles.row} accessibilityRole="header">
      <View style={[styles.icon, { backgroundColor: withAlpha(accent, 0.16) }]}>
        <Ionicons name={icon} size={18} color={accent} />
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
