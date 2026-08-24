import { Platform, Share } from 'react-native';

export type ShareOutcome = 'shared' | 'copied' | 'cancelled';

export async function shareText(title: string, message: string): Promise<ShareOutcome> {
  if (Platform.OS === 'web') {
    const nav = typeof navigator === 'undefined' ? undefined : navigator;
    if (nav?.share) {
      await nav.share({ title, text: message });
      return 'shared';
    }
    if (nav?.clipboard?.writeText) {
      await nav.clipboard.writeText(message);
      return 'copied';
    }
  }

  const result = await Share.share({ title, message });
  if (result.action === Share.dismissedAction) {
    return 'cancelled';
  }
  return 'shared';
}
