import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '@/storage/keys';
import type { HistoryDraft, HistoryEntry } from '@/types/history';

const MAX_HISTORY = 50;
const REPLACE_WINDOW_MS = 2 * 60 * 1000;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as HistoryEntry;
  return (
    typeof entry.id === 'string' &&
    typeof entry.createdAt === 'number' &&
    (entry.kind === 'salary' ||
      entry.kind === 'loan' ||
      entry.kind === 'vat' ||
      entry.kind === 'savings')
  );
}

export async function loadHistory(): Promise<HistoryEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.history);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isHistoryEntry);
  } catch {
    return [];
  }
}

export async function saveHistory(entries: HistoryEntry[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.history, JSON.stringify(entries.slice(0, MAX_HISTORY)));
}

export function mergeHistory(existing: HistoryEntry[], draft: HistoryDraft): HistoryEntry[] {
  const now = Date.now();
  const latest = existing[0];

  if (latest && latest.kind === draft.kind && now - latest.createdAt < REPLACE_WINDOW_MS) {
    return [{ ...draft, id: latest.id, createdAt: now } as HistoryEntry, ...existing.slice(1)].slice(
      0,
      MAX_HISTORY,
    );
  }

  const next: HistoryEntry = { ...draft, id: createId(), createdAt: now } as HistoryEntry;
  return [next, ...existing].slice(0, MAX_HISTORY);
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEYS.history);
}
