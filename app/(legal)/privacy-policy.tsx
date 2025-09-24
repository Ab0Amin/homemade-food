import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "@/constants/localization";
import { router } from "expo-router";

export default function PrivacyPolicyScreen() {
  const t = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t("legal.privacyPolicyTitle")}</Text>
          <Text style={styles.lastUpdated}>
            {t("legal.lastUpdated")}: September 24, 2025
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            1. {t("legal.informationCollection")}
          </Text>
          <Text style={styles.sectionText}>
            {t("legal.informationCollectionText")}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. {t("legal.informationUse")}
          </Text>
          <Text style={styles.sectionText}>
            {t("legal.informationUseText")}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. {t("legal.informationSharing")}
          </Text>
          <Text style={styles.sectionText}>
            {t("legal.informationSharingText")}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. {t("legal.dataSecurity")}</Text>
          <Text style={styles.sectionText}>{t("legal.dataSecurityText")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. {t("legal.userRights")}</Text>
          <Text style={styles.sectionText}>{t("legal.userRightsText")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. {t("legal.cookies")}</Text>
          <Text style={styles.sectionText}>{t("legal.cookiesText")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. {t("legal.policyChanges")}</Text>
          <Text style={styles.sectionText}>{t("legal.policyChangesText")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. {t("legal.contactInfo")}</Text>
          <Text style={styles.sectionText}>{t("legal.contactInfoText")}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{t("common.back")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  lastUpdated: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#000",
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    color: "#333",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  backButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
