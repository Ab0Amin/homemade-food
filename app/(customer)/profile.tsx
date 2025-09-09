import React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";

export default function CustomerProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Text style={styles.title}>Profile</Text>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user?.full_name}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
              {user?.phone_number || "Not provided"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Account Type</Text>
            <Text style={styles.value}>Customer</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Order History</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Settings</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Help & Support</Text>
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.signOutButton]}
            onPress={signOut}
          >
            <Text style={[styles.actionButtonText, styles.signOutText]}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
  actionsSection: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    borderColor: "#FF3B30",
    marginTop: 20,
  },
  signOutText: {
    color: "white",
  },
});
