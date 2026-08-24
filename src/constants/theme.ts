/**
 * Sint? visual tokens: dark graphite brand with violet and cyan.
 * Identity is typographic and tonal, not flag-colored.
 */

import '@/global.css';

import { Platform, type ViewStyle } from 'react-native';

export const Brand = {
  background: '#0B0D10',
  surface: 'rgba(255,255,255,0.075)',
  surfaceStrong: 'rgba(255,255,255,0.12)',
  text: '#F6F7F9',
  textSecondary: '#A7ADB7',
  primary: '#7C5CFF',
  secondary: '#30D5C8',
  result: '#F2B84B',
  danger: '#FF5C70',
  border: 'rgba(255,255,255,0.11)',
  onPrimary: '#FFFFFF',
  salary: '#7C5CFF',
  vat: '#F2B84B',
  loan: '#FF5C70',
  savings: '#30D5C8',
  calculator: '#6EA8FF',
} as const;

export function withAlpha(hex: string, alpha: number): string {
  const raw = hex.replace('#', '');
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const SintDark = {
  text: Brand.text,
  background: Brand.background,
  backgroundElement: Brand.surfaceStrong,
  backgroundSelected: withAlpha(Brand.primary, 0.18),
  glass: Brand.surface,
  glassStrong: Brand.surfaceStrong,
  textSecondary: Brand.textSecondary,
  primary: Brand.primary,
  primaryMuted: withAlpha(Brand.primary, 0.18),
  accent: Brand.secondary,
  accentMuted: withAlpha(Brand.secondary, 0.16),
  result: Brand.result,
  border: Brand.border,
  danger: Brand.danger,
  onPrimary: Brand.onPrimary,
} as const;

export const Colors = {
  light: SintDark,
  dark: SintDark,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 640;
export const Radius = {
  sm: 12,
  md: 18,
  lg: 24,
} as const;

export const Motion = {
  fast: 160,
  base: 220,
  slow: 320,
} as const;

export const Shadows = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.35,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 6,
    },
    default: {
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.38)',
    },
  }),
  floating: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.45,
      shadowRadius: 28,
      shadowOffset: { width: 0, height: 14 },
    },
    android: {
      elevation: 10,
    },
    default: {
      boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
    },
  }),
} as const;
