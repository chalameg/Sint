import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '@/storage/keys';

export type ArithmeticHistoryEntry = {
  id: string;
  expression: string;
  value: number;
  createdAt: number;
};

const STORAGE_KEY = STORAGE_KEYS.arithmeticHistory;
export const MAX_ARITHMETIC_HISTORY = 20;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isEntry(value: unknown): value is ArithmeticHistoryEntry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as ArithmeticHistoryEntry;
  return (
    typeof entry.id === 'string' &&
    typeof entry.expression === 'string' &&
    typeof entry.value === 'number' &&
    typeof entry.createdAt === 'number'
  );
}

export async function loadArithmeticHistory(): Promise<ArithmeticHistoryEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEntry).slice(0, MAX_ARITHMETIC_HISTORY);
  } catch {
    return [];
  }
}

export function pushArithmeticHistory(
  existing: ArithmeticHistoryEntry[],
  expression: string,
  value: number,
): ArithmeticHistoryEntry[] {
  const next: ArithmeticHistoryEntry = {
    id: createId(),
    expression,
    value,
    createdAt: Date.now(),
  };
  return [next, ...existing.filter((entry) => entry.expression !== expression)].slice(
    0,
    MAX_ARITHMETIC_HISTORY,
  );
}

export async function saveArithmeticHistory(entries: ArithmeticHistoryEntry[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ARITHMETIC_HISTORY)));
}
