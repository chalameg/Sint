import { StyleSheet } from 'react-native';

import { PressableScale } from '@/components/pressable-scale';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type KeypadKeyProps = {
  label: string;
  accessibilityLabel?: string;
  wide?: boolean;
  tone?: 'default' | 'accent' | 'primary' | 'danger' | 'muted';
  onPress: () => void;
};

export function KeypadKey({ label, accessibilityLabel, wide = false, tone = 'default', onPress }: KeypadKeyProps) {
  const theme = useTheme();
  const background =
    tone === 'primary'
      ? theme.primary
      : tone === 'accent'
        ? theme.accentMuted
        : tone === 'danger'
          ? 'rgba(255,92,112,0.16)'
          : tone === 'muted'
            ? theme.glass
            : theme.glassStrong;
  const color =
    tone === 'primary' ? theme.onPrimary : tone === 'danger' ? theme.danger : tone === 'accent' ? theme.accent : theme.text;

  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.key, wide && styles.wide, { backgroundColor: background }]}>
      <ThemedText type="subtitle" style={{ color }}>
        {label}
      </ThemedText>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  key: {
    flex: 1,
    minHeight: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wide: {
    flex: 2,
  },
});
