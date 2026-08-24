import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';

import { Brand, MaxContentWidth, Spacing } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';

type ScreenProps = {
  children: ReactNode;
  padded?: boolean;
  includeTopSafeArea?: boolean;
  scroll?: boolean;
};

export function Screen({
  children,
  padded = true,
  includeTopSafeArea = false,
  scroll = true,
}: ScreenProps) {
  const body = (
    <SafeAreaView edges={includeTopSafeArea ? ['top', 'bottom'] : ['bottom']} style={styles.inner}>
      {children}
    </SafeAreaView>
  );

  return (
    <ThemedView style={styles.root}>
      <View style={[styles.ambient, { pointerEvents: 'none' }]} accessibilityElementsHidden>
        <View style={[styles.orb, styles.orbViolet]} />
        <View style={[styles.orb, styles.orbCyan]} />
        <View style={[styles.orb, styles.orbGraphite]} />
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.content, padded && styles.padded]}
            style={styles.flex}>
            {body}
          </ScrollView>
        ) : (
          <View style={[styles.flex, styles.content, padded && styles.padded]}>{body}</View>
        )}
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
    borderRadius: 999,
  },
  orbViolet: {
    width: 340,
    height: 340,
    top: -140,
    right: -90,
    backgroundColor: Brand.primary,
    opacity: 0.22,
  },
  orbCyan: {
    width: 300,
    height: 300,
    bottom: 40,
    left: -120,
    backgroundColor: Brand.secondary,
    opacity: 0.14,
  },
  orbGraphite: {
    width: 220,
    height: 220,
    top: 180,
    left: 40,
    backgroundColor: '#161922',
    opacity: 0.9,
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
    flex: 1,
    gap: Spacing.four,
  },
});
