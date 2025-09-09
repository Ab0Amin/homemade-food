import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "@/components/Themed";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useLocalization } from "@/constants/localization";
import { useThemeColors, spacing, typography } from "@/constants/Theme";

export default function SettingsScreen() {
  const { colors } = useThemeColors();
  const { t } = useLocalization();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        {/* Language Settings Card */}
        <Card>
          <CardHeader>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              {t("settings.language")}
            </Text>
          </CardHeader>
          <CardContent>
            <Text
              style={[
                styles.sectionDescription,
                { color: colors.mutedForeground },
              ]}
            >
              {t("settings.languageDescription")}
            </Text>
            <LanguageSelector style={styles.languageSelector} />
          </CardContent>
        </Card>

        {/* Theme Settings Card */}
        <Card>
          <CardHeader>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              {t("settings.appearance")}
            </Text>
          </CardHeader>
          <CardContent>
            <Text
              style={[
                styles.sectionDescription,
                { color: colors.mutedForeground },
              ]}
            >
              {t("settings.appearanceDescription")}
            </Text>
          </CardContent>
        </Card>

        {/* Account Settings Card */}
        <Card>
          <CardHeader>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              {t("settings.account")}
            </Text>
          </CardHeader>
          <CardContent>
            <Text
              style={[
                styles.sectionDescription,
                { color: colors.mutedForeground },
              ]}
            >
              {t("settings.accountDescription")}
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as any,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
  languageSelector: {
    marginTop: spacing.sm,
    justifyContent: "flex-start",
  },
});
