import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { useThemeColors, spacing, typography } from "@/constants/Theme";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
}) => {
  const { colors } = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.message, { color: colors.mutedForeground }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.lg,
    // backgroundColor will be set dynamically
  },
  message: {
    fontSize: typography.fontSize.base,
    textAlign: "center",
    // color will be set dynamically
  },
});
