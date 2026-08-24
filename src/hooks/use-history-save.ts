import { useEffect, useRef } from 'react';

import { useApp } from '@/context/app-context';
import type { HistoryDraft } from '@/types/history';

const SAVE_DELAY_MS = 800;

export function useHistorySave(draft: HistoryDraft | null) {
  const { saveCalculation } = useApp();
  const signature = draft ? JSON.stringify(draft) : '';
  const lastSaved = useRef<string>('');

  useEffect(() => {
    if (!draft || signature === lastSaved.current) return;

    const timer = setTimeout(() => {
      lastSaved.current = signature;
      void saveCalculation(draft);
    }, SAVE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [draft, saveCalculation, signature]);
}
