import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type NumberFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  suffix?: string;
  hint?: string;
  error?: boolean;
  placeholder?: string;
} & Pick<TextInputProps, 'autoFocus' | 'editable'>;

export function NumberField({
  label,
  value,
  onChangeText,
  suffix,
  hint,
  error = false,
  placeholder = '0',
  autoFocus,
  editable,
}: NumberFieldProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      <ThemedText type="label" themeColor="textSecondary">
        {label}
      </ThemedText>
      <View
        style={[
          styles.field,
          {
            backgroundColor: theme.backgroundElement,
            borderColor: error ? theme.danger : theme.border,
          },
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          keyboardType="decimal-pad"
          inputMode="decimal"
          autoFocus={autoFocus}
          editable={editable}
          style={[styles.input, { color: theme.text }]}
        />
        {suffix ? (
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.suffix}>
            {suffix}
          </ThemedText>
        ) : null}
      </View>
      {hint ? (
        <ThemedText type="small" style={error ? { color: theme.danger } : undefined} themeColor="textSecondary">
          {hint}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
  },
  field: {
    minHeight: 64,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 28,
    fontWeight: '700',
    paddingVertical: Spacing.two,
    fontVariant: ['tabular-nums'],
  },
  suffix: {
    minWidth: 36,
    textAlign: 'right',
  },
});
