import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { CalculatorCard } from '@/components/calculator-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { CALCULATOR_ORDER, CALCULATOR_VISUALS } from '@/constants/calculators';
import { Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';

export default function HomeScreen() {
  const router = useRouter();
  const { copy } = useApp();

  return (
    <Screen includeTopSafeArea>
      <View style={styles.hero}>
        <ThemedText type="label" themeColor="primary">
          {copy.appNameAmharic}
        </ThemedText>
        <ThemedText type="title">{copy.appName}</ThemedText>
        <ThemedText type="subtitle">{copy.tagline}</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {copy.subtitle}
        </ThemedText>
      </View>

      <View style={styles.cards}>
        {CALCULATOR_ORDER.map((kind) => {
          const visual = CALCULATOR_VISUALS[kind];
          const item = copy.calculators[kind];
          return (
            <CalculatorCard
              key={kind}
              title={item.title}
              subtitle={item.subtitle}
              icon={visual.icon}
              tone={visual.tone}
              onPress={() => router.push(visual.href)}
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  cards: {
    gap: Spacing.three,
  },
});
