import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import {
  useThemeColors,
  spacing,
  borderRadius,
  typography,
  shadows,
  getButtonVariants,
} from "../../constants/Theme";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "success"
    | "outline"
    | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { colors } = useThemeColors();
  const buttonVariants = getButtonVariants(colors);
  const sizeStyles = {
    sm: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      minHeight: 32,
    },
    md: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      minHeight: 40,
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      minHeight: 48,
    },
  };

  const fontSizes = {
    sm: typography.fontSize.sm,
    md: typography.fontSize.base,
    lg: typography.fontSize.lg,
  };

  const buttonStyle: ViewStyle = {
    ...styles.button,
    ...sizeStyles[size], // Apply size first
    ...buttonVariants[variant], // Then variant colors
    ...(fullWidth && styles.fullWidth),
    ...(disabled && styles.disabled),
    ...shadows.sm,
    ...style, // User styles last
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" ? colors.primaryForeground : colors.foreground
          }
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            { fontSize: fontSizes[size] },
            variant === "primary" && { color: colors.primaryForeground },
            variant === "secondary" && { color: colors.secondaryForeground },
            variant === "destructive" && {
              color: colors.destructiveForeground,
            },
            variant === "success" && { color: colors.successForeground },
            variant === "outline" && { color: colors.foreground },
            variant === "ghost" && { color: colors.foreground },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    // minHeight removed - will be set by size styles
  } as ViewStyle,
  buttonText: {
    fontWeight: "500" as any,
    textAlign: "center",
  } as TextStyle,
  fullWidth: {
    width: "100%",
  } as ViewStyle,
  disabled: {
    opacity: 0.5,
  } as ViewStyle,
});
