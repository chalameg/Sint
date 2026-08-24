import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'amount' | 'hero' | 'label';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'amount' && styles.amount,
        type === 'hero' && styles.hero,
        type === 'label' && styles.label,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  link: {
    lineHeight: 24,
    fontSize: 16,
    fontWeight: 600,
  },
  amount: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 700,
    fontVariant: ['tabular-nums'],
  },
  hero: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: 700,
    letterSpacing: -0.6,
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 600,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
