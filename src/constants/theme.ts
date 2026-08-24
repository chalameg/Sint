/**
 * Sint? visual tokens. Ethiopian highland green and warm parchment,
 * with a gold accent. Light and dark palettes share the same keys.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1C1917',
    background: '#F4F1EA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E4F3EC',
    textSecondary: '#6B645C',
    primary: '#0E6B4C',
    primaryMuted: '#E4F3EC',
    accent: '#C9A227',
    border: '#E7E1D6',
    danger: '#B42318',
    onPrimary: '#FFFFFF',
  },
  dark: {
    text: '#F5F0E6',
    background: '#121410',
    backgroundElement: '#1C1F1A',
    backgroundSelected: '#24352C',
    textSecondary: '#A8A29A',
    primary: '#3DDC97',
    primaryMuted: '#1A2E25',
    accent: '#E0B83A',
    border: '#2A2E28',
    danger: '#F97066',
    onPrimary: '#082016',
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
  sm: 10,
  md: 16,
  lg: 22,
} as const;
