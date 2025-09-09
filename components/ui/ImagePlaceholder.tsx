import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@/components/Themed";
import { colors, spacing, borderRadius, typography } from "@/constants/Design";

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
  text?: string;
  icon?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = 150,
  height = 100,
  style,
  text = "Image",
  icon = "🍽️",
}) => {
  return (
    <View style={[styles.placeholder, { width, height }, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  icon: {
    fontSize: 24,
  },
  text: {
    fontSize: typography.fontSize.sm,
    color: colors.mutedForeground,
    fontWeight: typography.fontWeight.medium as any,
  },
});
