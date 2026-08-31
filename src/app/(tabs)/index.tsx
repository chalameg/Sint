import { useRouter } from 'expo-router';
import { StyleSheet, View, Platform } from 'react-native';
import Animated, { FadeInDown, useReducedMotion } from 'react-native-reanimated';

import { CalculatorCard } from '@/components/calculator-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { CALCULATOR_ORDER, CALCULATOR_VISUALS } from '@/constants/calculators';
import { Motion, Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const router = useRouter();
  const { copy } = useApp();
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const headerEntering =
    Platform.OS === 'web' || reduceMotion
      ? undefined
      : FadeInDown.duration(Motion.slow).springify().damping(18);

  return (
    <Screen includeTopSafeArea>
      <Animated.View entering={headerEntering} style={styles.hero}>
        <ThemedText type="smallBold" style={{ color: theme.primary }}>
          {copy.appNameAmharic}
        </ThemedText>
        <ThemedText type="title">{copy.appName}</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {copy.subtitle}
        </ThemedText>
      </Animated.View>

      <View style={styles.cards}>
        {CALCULATOR_ORDER.map((kind, index) => {
          const visual = CALCULATOR_VISUALS[kind];
          const item = copy.calculators[kind];
          return (
            <CalculatorCard
              key={kind}
              title={item.title}
              subtitle={item.subtitle}
              icon={visual.icon}
              accent={visual.accent}
              delay={80 + index * 70}
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
    marginBottom: Spacing.one,
  },
  cards: {
    gap: Spacing.three,
  },
});
