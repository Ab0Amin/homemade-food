import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "@/components/Themed";
import { useThemeColors, spacing, typography } from "@/constants/Theme";

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = false,
}) => {
  const { colors } = useThemeColors();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.content}>
        {title && (
          <Text style={[styles.title, { color: colors.foreground }]}>
            {title}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as any,
  },
});
