// Design system colors and tokens for React Native
export const colors = {
  // Light theme (default)
  background: "#ffffff",
  foreground: "#030213",
  card: "#ffffff",
  cardForeground: "#030213",
  primary: "#030213",
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

// Component variants
export const buttonVariants = {
  primary: {
    backgroundColor: "#ff6b35", // Food/Brand Orange
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryForeground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  destructive: {
    backgroundColor: colors.destructive,
    color: colors.destructiveForeground,
  },
  success: {
    backgroundColor: colors.success,
    color: colors.successForeground,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.foreground,
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.foreground,
  },
};

export const inputVariants = {
  default: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.foreground,
  },
  error: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.destructive,
    color: colors.foreground,
  },
};

// Status colors for orders, meals, etc.
export const statusColors = {
  pending: colors.warning,
  confirmed: "#3b82f6",
  preparing: colors.warning,
  ready: colors.success,
  delivered: colors.muted,
  cancelled: colors.destructive,
  active: colors.success,
  inactive: colors.muted,
  approved: colors.success,
  rejected: colors.destructive,
};
