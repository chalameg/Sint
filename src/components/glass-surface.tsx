import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type GlassSurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  strong?: boolean;
  accent?: boolean;
  elevated?: boolean;
};

export function GlassSurface({
  children,
  style,
  strong = false,
  accent = false,
  elevated = true,
}: GlassSurfaceProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.surface,
        elevated ? Shadows.card : undefined,
        {
          backgroundColor: strong ? theme.glassStrong : theme.glass,
          borderColor: accent ? theme.accent : theme.border,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
});
