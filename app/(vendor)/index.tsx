import React from "react";
import { StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Badge,
  LoadingScreen,
} from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useVendor, useVendorMeals, useVendorOrders } from "@/hooks/useVendor";
import { usePreventGoBack } from "@/hooks/usePreventGoBack";
import { router } from "expo-router";
import { colors, spacing, typography, borderRadius } from "@/constants/Design";

export default function VendorDashboardScreen() {
  const { user, signOut } = useAuth();
  const { vendor, loading: vendorLoading, createVendorProfile } = useVendor();
  const { meals } = useVendorMeals();
  const { orders } = useVendorOrders();

  usePreventGoBack(); // Handle back button behavior

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
    return <LoadingScreen />;
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

            <Card variant="elevated" style={styles.setupCard}>
              <CardHeader>
                <Text style={styles.setupTitle}>
                  Complete Your Vendor Profile
                </Text>
              </CardHeader>
              <CardContent>
                <Text style={styles.setupDescription}>
                  Add your business information, location, and start listing
                  your delicious meals!
                </Text>
                <Button
                  title="Setup Profile"
                  onPress={handleCreateVendorProfile}
                  variant="primary"
                  fullWidth
                />
              </CardContent>
            </Card>
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
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{activeMeals.length}</Text>
            <Text style={styles.statLabel}>Active Meals</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingOrders.length}</Text>
            <Text style={styles.statLabel}>Pending Orders</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{todayOrders.length}</Text>
            <Text style={styles.statLabel}>Today's Orders</Text>
          </Card>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <Button
            title="Add New Meal"
            onPress={() => router.push("/(vendor)/add-meal")}
            variant="primary"
            fullWidth
            size="md"
            style={styles.actionButton}
          />

          <Button
            title="Manage Meals"
            onPress={() => router.push("/(vendor)/meals")}
            variant="outline"
            fullWidth
            size="md"
            style={styles.actionButton}
          />

          <Button
            title="View Orders"
            onPress={() => router.push("/(vendor)/orders")}
            variant="outline"
            fullWidth
            size="md"
            style={styles.actionButton}
          />
        </View>

        {pendingOrders.length > 0 && (
          <Card style={styles.alertSection}>
            <CardHeader>
              <View style={styles.alertHeader}>
                <Text style={styles.alertTitle}>⚠️ Pending Orders</Text>
                <Badge>{pendingOrders.length}</Badge>
              </View>
            </CardHeader>
            <CardContent>
              <Text style={styles.alertText}>
                You have {pendingOrders.length} pending order(s) that need your
                attention.
              </Text>
              <Button
                title="View Orders"
                onPress={() => router.push("/(vendor)/orders")}
                variant="secondary"
                size="sm"
              />
            </CardContent>
          </Card>
        )}

        <View style={styles.footer}>
          <Button
            title="Sign Out"
            onPress={signOut}
            variant="destructive"
            size="sm"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  loadingText: {
    fontSize: typography.fontSize.lg,
    textAlign: "center",
    marginTop: 100,
    color: colors.foreground,
  },
  welcomeSection: {
    marginTop: spacing["3xl"],
  },
  title: {
    fontSize: typography.fontSize["2xl"], // H1 equivalent
    fontWeight: typography.fontWeight.medium as any,
    marginBottom: spacing.xs,
    textAlign: "center",
    color: colors.foreground,
  },
  subtitle: {
    fontSize: typography.fontSize.base, // Body text
    textAlign: "center",
    marginBottom: spacing["3xl"],
    color: colors.mutedForeground,
  },
  setupCard: {
    backgroundColor: colors.accent,
    borderColor: colors.primary,
  },
  setupTitle: {
    fontSize: typography.fontSize.lg, // H3 equivalent
    fontWeight: typography.fontWeight.medium as any,
    color: "#ff6b35", // Food orange
    marginBottom: spacing.sm,
  },
  setupDescription: {
    fontSize: typography.fontSize.base, // Body text
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
    color: colors.foreground,
  },
  header: {
    marginBottom: spacing["2xl"],
  },
  greeting: {
    fontSize: typography.fontSize.xl, // H2 equivalent
    fontWeight: typography.fontWeight.medium as any,
    marginBottom: spacing.xs,
    color: colors.foreground,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing["2xl"],
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: spacing.lg,
  },
  statNumber: {
    fontSize: typography.fontSize["2xl"], // More reasonable size
    fontWeight: typography.fontWeight.semibold as any,
    color: "#ff6b35", // Food orange
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.mutedForeground,
    textAlign: "center",
  },
  quickActionsSection: {
    marginBottom: spacing["2xl"],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg, // H3 equivalent
    fontWeight: typography.fontWeight.medium as any,
    marginBottom: spacing.md,
    color: colors.foreground,
  },
  actionButton: {
    marginBottom: spacing.sm,
  },
  alertSection: {
    backgroundColor: colors.warning + "20", // 20% opacity
    borderColor: colors.warning,
    marginBottom: spacing["2xl"],
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.warningForeground,
  },
  alertText: {
    fontSize: typography.fontSize.sm,
    color: colors.warningForeground,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.lg,
  },
});
