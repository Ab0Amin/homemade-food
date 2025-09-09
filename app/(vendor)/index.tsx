import React from "react";
import { StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";
import { useVendor, useVendorMeals, useVendorOrders } from "@/hooks/useVendor";
import { router } from "expo-router";

export default function VendorDashboardScreen() {
  const { user, signOut } = useAuth();
  const { vendor, loading: vendorLoading, createVendorProfile } = useVendor();
  const { meals } = useVendorMeals();
  const { orders } = useVendorOrders();

  const handleCreateVendorProfile = () => {
    Alert.alert(
      "Complete Your Profile",
      "You need to complete your vendor profile to start selling.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Setup Profile",
          onPress: () => router.push("/(vendor)/profile"),
        },
      ]
    );
  };

  if (vendorLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!vendor) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.title}>Welcome, {user?.full_name}!</Text>
            <Text style={styles.subtitle}>
              Let's set up your cooking business
            </Text>

            <View style={styles.setupCard}>
              <Text style={styles.setupTitle}>
                Complete Your Vendor Profile
              </Text>
              <Text style={styles.setupDescription}>
                Add your business information, location, and start listing your
                delicious meals!
              </Text>
              <Pressable
                style={styles.setupButton}
                onPress={handleCreateVendorProfile}
              >
                <Text style={styles.setupButtonText}>Setup Profile</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  const activeMeals = meals.filter((meal) => meal.is_available);
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const todayOrders = orders.filter((order) => {
    const today = new Date().toDateString();
    const orderDate = new Date(order.created_at).toDateString();
    return today === orderDate;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {vendor.business_name}!</Text>
          <Text style={styles.subtitle}>Here's your business overview</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{activeMeals.length}</Text>
            <Text style={styles.statLabel}>Active Meals</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingOrders.length}</Text>
            <Text style={styles.statLabel}>Pending Orders</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{todayOrders.length}</Text>
            <Text style={styles.statLabel}>Today's Orders</Text>
          </View>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <Pressable
            style={styles.actionButton}
            onPress={() => router.push("/(vendor)/add-meal")}
          >
            <Text style={styles.actionButtonText}>➕ Add New Meal</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => router.push("/(vendor)/meals")}
          >
            <Text style={styles.actionButtonText}>🍽️ Manage Meals</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => router.push("/(vendor)/orders")}
          >
            <Text style={styles.actionButtonText}>📦 View Orders</Text>
          </Pressable>
        </View>

        {pendingOrders.length > 0 && (
          <View style={styles.alertSection}>
            <Text style={styles.alertTitle}>⚠️ Pending Orders</Text>
            <Text style={styles.alertText}>
              You have {pendingOrders.length} pending order(s) that need your
              attention.
            </Text>
            <Pressable
              style={styles.alertButton}
              onPress={() => router.push("/(vendor)/orders")}
            >
              <Text style={styles.alertButtonText}>View Orders</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.footer}>
          <Pressable style={styles.signOutButton} onPress={signOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
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
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
  welcomeSection: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 40,
  },
  setupCard: {
    backgroundColor: "#f0f8ff",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
  },
  setupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 12,
  },
  setupDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  setupButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  setupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  alertSection: {
    backgroundColor: "#fff3cd",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffeaa7",
    marginBottom: 30,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    color: "#856404",
    marginBottom: 12,
  },
  alertButton: {
    backgroundColor: "#ffc107",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  alertButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#856404",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  signOutButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 8,
  },
  signOutText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
});
