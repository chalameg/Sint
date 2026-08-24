import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';

import { Brand } from '@/constants/theme';
import type { CalculatorKind } from '@/types/history';

export type CalculatorVisual = {
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  href: Href;
};

export const CALCULATOR_ORDER: CalculatorKind[] = ['calculator', 'salary', 'vat', 'loan', 'savings'];

export const CALCULATOR_VISUALS: Record<CalculatorKind, CalculatorVisual> = {
  calculator: { icon: 'calculator', accent: Brand.calculator, href: '/calculator' as Href },
  salary: { icon: 'wallet', accent: Brand.salary, href: '/salary' },
  vat: { icon: 'receipt', accent: Brand.vat, href: '/vat' },
  loan: { icon: 'card', accent: Brand.loan, href: '/loan' },
  savings: { icon: 'leaf', accent: Brand.savings, href: '/savings' },
};
