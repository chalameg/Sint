import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { evaluateArithmetic, formatArithmeticValue } from '@/calculators/arithmetic';
import { GlassSurface } from '@/components/glass-surface';
import { KeypadKey } from '@/components/keypad-key';
import { PressableScale } from '@/components/pressable-scale';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { CALCULATOR_VISUALS } from '@/constants/calculators';
import { Radius, Spacing } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import {
  loadArithmeticHistory,
  pushArithmeticHistory,
  saveArithmeticHistory,
  type ArithmeticHistoryEntry,
} from '@/storage/arithmetic-history';
import { formatMoney } from '@/utils/format';

type DisplayMode = 'number' | 'money';

const OPERATORS = new Set(['+', '-', '*', '/']);

export default function CalculatorScreen() {
  const { copy, language } = useApp();
  const visual = CALCULATOR_VISUALS.calculator;
  const [expression, setExpression] = useState('0');
  const [mode, setMode] = useState<DisplayMode>('number');
  const [overwrite, setOverwrite] = useState(true);
  const [history, setHistory] = useState<ArithmeticHistoryEntry[]>([]);
  const [equalsError, setEqualsError] = useState<string | null>(null);

  useEffect(() => {
    void loadArithmeticHistory().then(setHistory);
  }, []);

  const evaluated = useMemo(() => evaluateArithmetic(expression), [expression]);

  const displayValue = useMemo(() => {
    if (!evaluated.ok) return null;
    return mode === 'money'
      ? formatMoney(evaluated.value, language)
      : formatArithmeticValue(evaluated.value);
  }, [evaluated, language, mode]);

  const errorLabel =
    equalsError ??
    (!evaluated.ok && expression !== '0' && evaluated.error === 'div_zero'
      ? copy.calculator.divideByZero
      : null);

  const append = (next: string) => {
    setEqualsError(null);
    setExpression((current) => {
      if (overwrite) {
        setOverwrite(false);
        if (OPERATORS.has(next)) return `${current}${next}`;
        return next === '.' ? '0.' : next;
      }
      if (current === '0' && next !== '.' && !OPERATORS.has(next) && next !== '%') {
        return next;
      }
      const last = current.slice(-1);
      if (OPERATORS.has(next) && OPERATORS.has(last)) {
        return `${current.slice(0, -1)}${next}`;
      }
      if (next === '.') {
        const lastNumber = current.split(/[+\-*/]/).pop() ?? '';
        if (lastNumber.includes('.')) return current;
      }
      return `${current}${next}`;
    });
  };

  const onClear = () => {
    setEqualsError(null);
    setExpression('0');
    setOverwrite(true);
  };

  const onDelete = () => {
    setEqualsError(null);
    setOverwrite(false);
    setExpression((current) => (current.length <= 1 ? '0' : current.slice(0, -1)));
  };

  const onEquals = () => {
    const result = evaluateArithmetic(expression);
    if (!result.ok) {
      setEqualsError(
        result.error === 'div_zero' ? copy.calculator.divideByZero : copy.calculator.invalid,
      );
      return;
    }
    setEqualsError(null);
    const formatted = formatArithmeticValue(result.value);
    setHistory((current) => {
      const next = pushArithmeticHistory(current, expression, result.value);
      void saveArithmeticHistory(next);
      return next;
    });
    setExpression(formatted);
    setOverwrite(true);
  };

  const reuse = (entry: ArithmeticHistoryEntry) => {
    setEqualsError(null);
    setExpression(entry.expression);
    setOverwrite(false);
  };

  return (
    <Screen scroll={false}>
      <ScreenHeader icon={visual.icon} subtitle={copy.calculators.calculator.subtitle} accent={visual.accent} />

      <SegmentedControl
        value={mode}
        onChange={setMode}
        options={[
          { value: 'number', label: copy.calculator.number },
          { value: 'money', label: copy.calculator.money },
        ]}
      />

      <GlassSurface strong style={styles.display}>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2} style={styles.expression}>
          {expression}
        </ThemedText>
        <ThemedText type="hero" themeColor="result" numberOfLines={1} adjustsFontSizeToFit>
          {displayValue ?? ' '}
        </ThemedText>
        {errorLabel ? (
          <ThemedText type="small" themeColor="danger">
            {errorLabel}
          </ThemedText>
        ) : null}
      </GlassSurface>

      {history.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.history}>
          {history.map((entry) => (
            <PressableScale
              key={entry.id}
              onPress={() => reuse(entry)}
              accessibilityLabel={`${entry.expression} = ${formatArithmeticValue(entry.value)}`}
              style={styles.historyChip}>
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                {entry.expression}
              </ThemedText>
              <ThemedText type="smallBold" numberOfLines={1}>
                {mode === 'money'
                  ? formatMoney(entry.value, language)
                  : formatArithmeticValue(entry.value)}
              </ThemedText>
            </PressableScale>
          ))}
        </ScrollView>
      ) : null}

      <View style={styles.keypad}>
        <View style={styles.row}>
          <KeypadKey label="C" accessibilityLabel={copy.calculator.clear} tone="danger" onPress={onClear} />
          <KeypadKey label="⌫" accessibilityLabel={copy.calculator.delete} tone="muted" onPress={onDelete} />
          <KeypadKey label="%" tone="accent" onPress={() => append('%')} />
          <KeypadKey label="÷" tone="accent" onPress={() => append('/')} />
        </View>
        <View style={styles.row}>
          <KeypadKey label="7" onPress={() => append('7')} />
          <KeypadKey label="8" onPress={() => append('8')} />
          <KeypadKey label="9" onPress={() => append('9')} />
          <KeypadKey label="×" tone="accent" onPress={() => append('*')} />
        </View>
        <View style={styles.row}>
          <KeypadKey label="4" onPress={() => append('4')} />
          <KeypadKey label="5" onPress={() => append('5')} />
          <KeypadKey label="6" onPress={() => append('6')} />
          <KeypadKey label="−" tone="accent" onPress={() => append('-')} />
        </View>
        <View style={styles.row}>
          <KeypadKey label="1" onPress={() => append('1')} />
          <KeypadKey label="2" onPress={() => append('2')} />
          <KeypadKey label="3" onPress={() => append('3')} />
          <KeypadKey label="+" tone="accent" onPress={() => append('+')} />
        </View>
        <View style={styles.row}>
          <KeypadKey label="0" wide onPress={() => append('0')} />
          <KeypadKey label="." onPress={() => append('.')} />
          <KeypadKey
            label="="
            accessibilityLabel={copy.calculator.equals}
            tone="primary"
            onPress={onEquals}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  display: {
    padding: Spacing.three,
    minHeight: 96,
    gap: Spacing.one,
  },
  expression: {
    fontVariant: ['tabular-nums'],
  },
  history: {
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  historyChip: {
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.075)',
    maxWidth: 160,
    gap: 2,
  },
  keypad: {
    flex: 1,
    gap: Spacing.two,
    justifyContent: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
