import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
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
      <View style={[styles.ambient, { pointerEvents: 'none' }]} accessibilityElementsHidden>
        <View style={[styles.orb, styles.orbPrimary, { backgroundColor: theme.primary }]} />
        <View style={[styles.orb, styles.orbAccent, { backgroundColor: theme.accent }]} />
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, padded && styles.padded]}
          style={styles.flex}>
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
  ambient: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  orbPrimary: {
    top: -120,
    right: -80,
    opacity: 0.08,
  },
  orbAccent: {
    bottom: 80,
    left: -100,
    opacity: 0.07,
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
  },
  inner: {
    flexGrow: 1,
    gap: Spacing.four,
  },
});
