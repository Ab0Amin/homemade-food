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
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    marginBottom: spacing.sm,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: 16,
    borderWidth: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  optionText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium as any,
    flex: 1,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeight.medium as any,
  },
});
