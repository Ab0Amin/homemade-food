import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/Themed";
import {
  useThemeColors,
  spacing,
  borderRadius,
  typography,
} from "@/constants/Theme";

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  error,
}) => {
  const { colors } = useThemeColors();

  return (
    <View style={styles.container}>
      <Pressable style={styles.checkboxContainer} onPress={onToggle}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: checked ? colors.primary : colors.background,
              borderColor: checked ? colors.primary : colors.border,
            },
          ]}
        >
          {checked && (
            <Text
              style={[styles.checkmark, { color: colors.primaryForeground }]}
            >
              ✓
            </Text>
          )}
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>
          {label}
        </Text>
      </Pressable>

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
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: "bold",
  },
  label: {
    fontSize: typography.fontSize.sm,
    flex: 1,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    marginLeft: 28, // لمحاذاة النص مع النص الرئيسي
    marginTop: spacing.xs,
  },
});
