import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/Themed";
import { useLocalization } from "@/constants/localization";
import {
  useThemeColors,
  spacing,
  borderRadius,
  typography,
} from "@/constants/Theme";
import { UserType } from "@/types";

interface UserTypeSelectorProps {
  selectedType: UserType;
  onTypeSelect: (type: UserType) => void;
  error?: string;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
  error,
}) => {
  const { t } = useLocalization();
  const { colors } = useThemeColors();

  const userTypes: { value: UserType; labelKey: string; iconKey: string }[] = [
    {
      value: "customer",
      labelKey: "auth.customerOption",
      iconKey: "🛒",
    },
    {
      value: "vendor",
      labelKey: "auth.chefOption",
      iconKey: "👨‍🍳",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.foreground }]}>
        {t("auth.selectUserType")}
      </Text>

      <View style={styles.optionsContainer}>
        {userTypes.map((type) => (
          <Pressable
            key={type.value}
            style={[
              styles.option,
              {
                backgroundColor:
                  selectedType === type.value
                    ? colors.primary
                    : colors.secondary,
                borderColor:
                  selectedType === type.value ? colors.primary : colors.border,
              },
            ]}
            onPress={() => onTypeSelect(type.value)}
          >
            <Text style={styles.icon}>{type.iconKey}</Text>
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    selectedType === type.value
                      ? colors.primaryForeground
                      : colors.secondaryForeground,
                },
              ]}
            >
              {t(type.labelKey)}
            </Text>
          </Pressable>
        ))}
      </View>

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
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: "500",
    marginBottom: spacing.xs,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  icon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing.sm,
  },
  optionText: {
    fontSize: typography.fontSize.base,
    flex: 1,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
});
