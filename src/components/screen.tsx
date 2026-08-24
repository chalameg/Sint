import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

type ScreenProps = {
  children: ReactNode;
  padded?: boolean;
  includeTopSafeArea?: boolean;
};

export function Screen({ children, padded = true, includeTopSafeArea = false }: ScreenProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, padded && styles.padded]}
          style={{ backgroundColor: theme.background }}>
          <SafeAreaView edges={includeTopSafeArea ? ['top', 'bottom'] : ['bottom']} style={styles.inner}>
            {children}
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  padded: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  inner: {
    flexGrow: 1,
    gap: Spacing.three,
  },
});
