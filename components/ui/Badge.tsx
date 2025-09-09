import React from "react";
import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  useThemeColors,
  spacing,
  borderRadius,
  typography,
} from "../../constants/Theme";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "success" | "warning";
  size?: "sm" | "md";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  style,
  textStyle,
}) => {
  const { colors } = useThemeColors();

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: colors.secondary,
          color: colors.secondaryForeground,
        };
      case "destructive":
        return {
          backgroundColor: colors.destructive,
          color: colors.destructiveForeground,
        };
      case "success":
        return {
          backgroundColor: colors.success,
          color: colors.successForeground,
        };
      case "warning":
        return {
          backgroundColor: colors.warning,
          color: colors.warningForeground,
        };
      default:
        return {
          backgroundColor: colors.primary,
          color: colors.primaryForeground,
        };
    }
  };

  const sizeStyles = {
    sm: {
      paddingVertical: spacing.xs / 2,
      paddingHorizontal: spacing.xs,
      fontSize: typography.fontSize.xs,
    },
    md: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      fontSize: typography.fontSize.sm,
    },
  };

  const variantStyles = getVariantStyles();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantStyles.backgroundColor,
          paddingVertical: sizeStyles[size].paddingVertical,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.color,
            fontSize: sizeStyles[size].fontSize,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.full,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  text: {
    fontWeight: "500" as any,
    textAlign: "center",
  } as TextStyle,
});
