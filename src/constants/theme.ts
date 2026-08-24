/**
 * Sint? visual tokens: highland green, warm gold, parchment.
 * Ethiopian identity is in the palette, not in flag decoration.
 */

import '@/global.css';

import { Platform, type ViewStyle } from 'react-native';

export const Colors = {
  light: {
    text: '#1A1916',
    background: '#EFEBE3',
    backgroundElement: 'rgba(255, 252, 247, 0.92)',
    backgroundSelected: 'rgba(12, 92, 67, 0.12)',
    glass: 'rgba(255, 252, 247, 0.72)',
    glassStrong: 'rgba(255, 252, 247, 0.88)',
    textSecondary: '#6A635A',
    primary: '#0B5340',
    primaryMuted: 'rgba(11, 83, 64, 0.12)',
    accent: '#C4A35A',
    accentMuted: 'rgba(196, 163, 90, 0.16)',
    border: 'rgba(26, 25, 22, 0.08)',
    danger: '#C45C4A',
    onPrimary: '#FFFFFF',
  },
  dark: {
    text: '#F4EFE6',
    background: '#0E110F',
    backgroundElement: 'rgba(28, 34, 29, 0.92)',
    backgroundSelected: 'rgba(123, 201, 160, 0.16)',
    glass: 'rgba(28, 34, 29, 0.72)',
    glassStrong: 'rgba(32, 40, 34, 0.88)',
    textSecondary: '#B3AAA0',
    primary: '#7BC9A0',
    primaryMuted: 'rgba(123, 201, 160, 0.14)',
    accent: '#D4B36A',
    accentMuted: 'rgba(212, 179, 106, 0.16)',
    border: 'rgba(244, 239, 230, 0.08)',
    danger: '#E08B7C',
    onPrimary: '#0E110F',
  },
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
      shadowColor: '#142018',
      shadowOpacity: 0.1,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 4,
    },
    default: {
      boxShadow: '0 8px 18px rgba(20, 32, 24, 0.08)',
    },
  }),
  floating: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#142018',
      shadowOpacity: 0.14,
      shadowRadius: 28,
      shadowOffset: { width: 0, height: 14 },
    },
    android: {
      elevation: 8,
    },
    default: {
      boxShadow: '0 12px 24px rgba(20, 32, 24, 0.12)',
    },
  }),
} as const;
