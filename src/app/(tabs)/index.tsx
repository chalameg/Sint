import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { CalculatorCard } from '@/components/calculator-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
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
        <ThemedText type="default" themeColor="textSecondary">
          {copy.subtitle}
        </ThemedText>
      </View>

      <View style={styles.cards}>
        <CalculatorCard
          title={copy.calculators.salary.title}
          subtitle={copy.calculators.salary.subtitle}
          icon="wallet-outline"
          onPress={() => router.push('/salary')}
        />
        <CalculatorCard
          title={copy.calculators.loan.title}
          subtitle={copy.calculators.loan.subtitle}
          icon="card-outline"
          onPress={() => router.push('/loan')}
        />
        <CalculatorCard
          title={copy.calculators.vat.title}
          subtitle={copy.calculators.vat.subtitle}
          icon="receipt-outline"
          onPress={() => router.push('/vat')}
        />
        <CalculatorCard
          title={copy.calculators.savings.title}
          subtitle={copy.calculators.savings.subtitle}
          icon="leaf-outline"
          onPress={() => router.push('/savings')}
        />
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
