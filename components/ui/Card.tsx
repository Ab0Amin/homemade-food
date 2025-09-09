import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import {
  useThemeColors,
  spacing,
  borderRadius,
  shadows,
} from "../../constants/Theme";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated";
  padding?: keyof typeof spacing;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  padding = "lg",
  style,
}) => {
  const { colors } = useThemeColors();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        variant === "elevated" && shadows.md,
        { padding: spacing[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => (
  <View style={[styles.header, style]}>{children}</View>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => (
  <View style={[styles.content, style]}>{children}</View>
);

export const CardFooter: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
  } as ViewStyle,
  header: {
    marginBottom: spacing.md,
  } as ViewStyle,
  content: {
    flex: 1,
  } as ViewStyle,
  footer: {
    marginTop: spacing.md,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  } as ViewStyle,
});
