import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';

import type { CalculatorKind } from '@/types/history';

export type CalculatorVisual = {
  icon: keyof typeof Ionicons.glyphMap;
  tone: 'primary' | 'accent';
  href: Href;
};

export const CALCULATOR_ORDER: CalculatorKind[] = ['salary', 'vat', 'loan', 'savings'];

export const CALCULATOR_VISUALS: Record<CalculatorKind, CalculatorVisual> = {
  salary: { icon: 'wallet-outline', tone: 'primary', href: '/salary' },
  vat: { icon: 'receipt-outline', tone: 'accent', href: '/vat' },
  loan: { icon: 'card-outline', tone: 'primary', href: '/loan' },
  savings: { icon: 'leaf-outline', tone: 'primary', href: '/savings' },
};
