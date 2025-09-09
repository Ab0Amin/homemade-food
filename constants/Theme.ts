import { useColorScheme } from "react-native";

// Light theme colors
const lightColors = {
  background: "#ffffff",
  foreground: "#030213",
  card: "#ffffff",
  cardForeground: "#030213",
  primary: "#ff6b35", // Food orange
  primaryForeground: "#ffffff",
  secondary: "#f3f3f5",
  secondaryForeground: "#030213",
  muted: "#ececf0",
  mutedForeground: "#717182",
  accent: "#e9ebef",
  accentForeground: "#030213",
  destructive: "#d4183d",
  destructiveForeground: "#ffffff",
  border: "rgba(0, 0, 0, 0.1)",
  input: "transparent",
  inputBackground: "#f3f3f5",
  success: "#059669",
  successForeground: "#ffffff",
  warning: "#d97706",
  warningForeground: "#ffffff",

  // Chart colors
  chart1: "#ff6b35",
  chart2: "#4f46e5",
  chart3: "#059669",
  chart4: "#dc2626",
  chart5: "#7c3aed",
};

// Dark theme colors
const darkColors = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  card: "#1a1a1a",
  cardForeground: "#fafafa",
  primary: "#ff6b35", // Food orange (same in both themes)
  primaryForeground: "#ffffff",
  secondary: "#262626",
  secondaryForeground: "#fafafa",
  muted: "#171717",
  mutedForeground: "#a1a1aa",
  accent: "#262626",
  accentForeground: "#fafafa",
  destructive: "#dc2626",
  destructiveForeground: "#fafafa",
  border: "rgba(255, 255, 255, 0.1)",
  input: "transparent",
  inputBackground: "#262626",
  success: "#16a34a",
  successForeground: "#000000",
  warning: "#ca8a04",
  warningForeground: "#000000",

  // Chart colors (same as light)
  chart1: "#ff6b35",
  chart2: "#4f46e5",
  chart3: "#059669",
  chart4: "#dc2626",
  chart5: "#7c3aed",
};

// Hook to get current theme colors
export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
    colorScheme,
  };
};

// Static exports for backward compatibility
export const colors = lightColors;

// Other design tokens remain the same
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
};

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  "2xl": 16,
  full: 9999,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Dynamic button variants that work with themes
export const getButtonVariants = (themeColors: typeof lightColors) => ({
  primary: {
    backgroundColor: themeColors.primary,
    color: themeColors.primaryForeground,
  },
  secondary: {
    backgroundColor: themeColors.secondary,
    color: themeColors.secondaryForeground,
    borderWidth: 1,
    borderColor: themeColors.border,
  },
  destructive: {
    backgroundColor: themeColors.destructive,
    color: themeColors.destructiveForeground,
  },
  success: {
    backgroundColor: themeColors.success,
    color: themeColors.successForeground,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: themeColors.border,
    color: themeColors.foreground,
  },
  ghost: {
    backgroundColor: "transparent",
    color: themeColors.foreground,
  },
});

// Dynamic input variants
export const getInputVariants = (themeColors: typeof lightColors) => ({
  default: {
    backgroundColor: themeColors.inputBackground,
    borderWidth: 1,
    borderColor: themeColors.border,
    color: themeColors.foreground,
  },
  error: {
    backgroundColor: themeColors.inputBackground,
    borderWidth: 1,
    borderColor: themeColors.destructive,
    color: themeColors.foreground,
  },
});

// Status colors function
export const getStatusColors = (themeColors: typeof lightColors) => ({
  pending: themeColors.warning,
  confirmed: "#3b82f6",
  preparing: themeColors.warning,
  ready: themeColors.success,
  delivered: themeColors.muted,
  cancelled: themeColors.destructive,
  active: themeColors.success,
  inactive: themeColors.muted,
  approved: themeColors.success,
  rejected: themeColors.destructive,
});

// Backward compatibility exports
export const buttonVariants = getButtonVariants(lightColors);
export const inputVariants = getInputVariants(lightColors);
export const statusColors = getStatusColors(lightColors);
