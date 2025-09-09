import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import {
  useThemeColors,
  spacing,
  borderRadius,
  typography,
} from "../../constants/Theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: "default" | "error";
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = "default",
  fullWidth = true,
  containerStyle,
  labelStyle,
  inputStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useThemeColors();

  const inputVariant = error ? "error" : variant;

  return (
    <View
      style={[styles.container, fullWidth && styles.fullWidth, containerStyle]}
    >
      {label && (
        <Text style={[styles.label, { color: colors.foreground }, labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: error ? colors.destructive : colors.border,
            color: colors.foreground,
          },
          isFocused && { borderColor: colors.primary, borderWidth: 2 },
          inputStyle,
        ]}
        onFocus={(e) => {
          setIsFocused(true);
          textInputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          textInputProps.onBlur?.(e);
        }}
        placeholderTextColor={colors.mutedForeground}
        {...textInputProps}
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.destructive }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  } as ViewStyle,
  fullWidth: {
    width: "100%",
  } as ViewStyle,
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: "500" as any,
    marginBottom: spacing.xs,
    // color will be set dynamically
  } as TextStyle,
  input: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.fontSize.base,
    minHeight: 44, // Accessibility minimum touch target
    borderWidth: 1,
    // backgroundColor, borderColor, and color will be set dynamically
  } as TextStyle,
  errorText: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
    // color will be set dynamically
  } as TextStyle,
});
