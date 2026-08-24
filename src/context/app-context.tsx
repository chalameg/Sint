import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { dictionaries, type Language } from '@/i18n';
import { clearHistory as clearStoredHistory, loadHistory, mergeHistory, saveHistory } from '@/storage/history';
import { DEFAULT_SETTINGS, type AppSettings } from '@/storage/keys';
import { loadSettings, saveSettings } from '@/storage/settings';
import type { AppContextValue } from '@/types/app';
import type { HistoryDraft } from '@/types/history';
import type { TaxableIncomeMode } from '@/config/ethiopia';

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<AppContextValue['history']>([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([loadSettings(), loadHistory()])
      .then(([nextSettings, nextHistory]) => {
        if (cancelled) return;
        setSettings(nextSettings);
        setHistory(nextHistory);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const persistSettings = useCallback(async (next: AppSettings) => {
    setSettings(next);
    await saveSettings(next);
  }, []);

  const setLanguage = useCallback(
    async (language: Language) => {
      await persistSettings({ ...settings, language });
    },
    [persistSettings, settings],
  );

  const setVatRatePercent = useCallback(
    async (vatRatePercent: number) => {
      await persistSettings({ ...settings, vatRatePercent });
    },
    [persistSettings, settings],
  );

  const setTaxableIncomeMode = useCallback(
    async (taxableIncomeMode: TaxableIncomeMode) => {
      await persistSettings({ ...settings, taxableIncomeMode });
    },
    [persistSettings, settings],
  );

  const saveCalculation = useCallback(async (draft: HistoryDraft) => {
    setHistory((current) => {
      const next = mergeHistory(current, draft);
      void saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    await clearStoredHistory();
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      settings,
      copy: dictionaries[settings.language],
      language: settings.language,
      setLanguage,
      setVatRatePercent,
      setTaxableIncomeMode,
      history,
      saveCalculation,
      clearHistory,
    }),
    [clearHistory, history, ready, saveCalculation, setLanguage, setTaxableIncomeMode, setVatRatePercent, settings],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error('useApp must be used within AppProvider');
  }
  return value;
}
