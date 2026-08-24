import { Alert, Platform } from 'react-native';

import { useApp } from '@/context/app-context';
import { shareText } from '@/utils/share';

export function useShareResult() {
  const { copy } = useApp();

  return async (title: string, message: string) => {
    try {
      const outcome = await shareText(title, message);
      if (outcome === 'copied' && Platform.OS === 'web') {
        Alert.alert(copy.common.copied);
      }
    } catch {
      // User dismissed the sheet or sharing is unavailable.
    }
  };
}
