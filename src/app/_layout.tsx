import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useReducedMotion } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider, useApp } from '@/context/app-context';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { ready, copy } = useApp();
  const theme = useTheme();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (ready) {
      void SplashScreen.hideAsync();
    }
  }, [ready]);

  return (
    <Stack
      screenOptions={{
        animation: reduceMotion ? 'none' : 'slide_from_right',
        headerShadowVisible: false,
        headerTintColor: theme.primary,
        headerStyle: { backgroundColor: theme.background },
        headerTitleStyle: { color: theme.text, fontWeight: '700' },
        contentStyle: { backgroundColor: theme.background },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="calculator" options={{ title: copy.calculator.title }} />
      <Stack.Screen name="salary" options={{ title: copy.salary.title }} />
      <Stack.Screen name="loan" options={{ title: copy.loan.title }} />
      <Stack.Screen name="vat" options={{ title: copy.vat.title }} />
      <Stack.Screen name="savings" options={{ title: copy.savings.title }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </AppProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
