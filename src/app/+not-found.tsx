import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';

export default function NotFoundScreen() {
  const { copy } = useApp();

  return (
    <>
      <Stack.Screen options={{ title: copy.notFound.title }} />
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">{copy.notFound.title}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link" themeColor="primary">
            {copy.notFound.back}
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  link: {
    paddingVertical: Spacing.two,
  },
});
