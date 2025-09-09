import React from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  Alert,
  View,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { Text } from "@/components/Themed";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { testSupabaseConnection } from "@/lib/testSupabase";
import {
  useThemeColors,
  spacing,
  typography,
  borderRadius,
} from "@/constants/Theme";

export default function WelcomeScreen() {
  const { user, loading } = useAuth();
  const { colors, isDark } = useThemeColors();

  const handleTestSupabase = async () => {
    Alert.alert("🔧 Testing...", "Checking Supabase connection...");

    const result = await testSupabaseConnection();
    if (result.success) {
      Alert.alert(
        "✅ Success",
        result.message || "Supabase connection is working!",
        [{ text: "Great!", style: "default" }]
      );
    } else {
      Alert.alert("❌ Connection Failed", result.error, [
        { text: "OK", style: "default" },
        {
          text: "Setup Guide",
          onPress: () =>
            Alert.alert(
              "📋 Setup Steps",
              "1. Create Supabase project at supabase.com\n2. Copy URL and API key\n3. Update .env file\n4. Run SQL schema\n5. Restart app"
            ),
        },
      ]);
    }
  };

  // Auto-redirect if user is already logged in
  React.useEffect(() => {
    if (!loading && user) {
      switch (user.user_type) {
        case "customer":
          router.replace("/(customer)");
          break;
        case "vendor":
          router.replace("/(vendor)");
          break;
        case "admin":
          router.replace("/(vendor)"); // Redirect admin to vendor for now
          break;
        default:
          router.replace("/(customer)");
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.foreground }]}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: colors.foreground }]}>
          Homemade Food Marketplace
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Discover delicious homemade meals from local cooks
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="I'm a Customer"
            onPress={() => router.push("/(auth)/sign-in?type=customer")}
            variant="secondary"
            size="md"
            fullWidth
            style={styles.customerButton}
          />
          <Text
            style={[styles.buttonSubtext, { color: colors.mutedForeground }]}
          >
            Browse and order meals
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="I'm a Cook"
            onPress={() => router.push("/(auth)/sign-in?type=vendor")}
            variant="primary"
            size="md"
            fullWidth
            style={styles.vendorButton}
          />
          <Text
            style={[styles.buttonSubtext, { color: colors.mutedForeground }]}
          >
            Sell your homemade food
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/(auth)/sign-up")}>
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Don't have an account? Sign up
          </Text>
        </Pressable>

        <Pressable
          style={[styles.testButton, { backgroundColor: colors.success }]}
          onPress={handleTestSupabase}
        >
          <Text style={styles.testButtonText}>🔧 Test Supabase Connection</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "space-between",
    // backgroundColor will be set dynamically
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing["6xl"],
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing["4xl"],
  },
  title: {
    fontSize: typography.fontSize["2xl"], // H1 equivalent
    fontWeight: typography.fontWeight.medium as any,
    textAlign: "center",
    marginBottom: spacing.sm,
    // color will be set dynamically
  },
  subtitle: {
    fontSize: typography.fontSize.base, // Body text
    textAlign: "center",
    marginBottom: spacing["5xl"],
    // color will be set dynamically
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  buttonContainer: {
    gap: spacing.lg,
    marginBottom: spacing["5xl"],
  },
  buttonWrapper: {
    alignItems: "center",
    gap: spacing.xs,
  },
  customerButton: {
    // Button component will handle the styling
  },
  vendorButton: {
    // Button component will handle the styling
  },
  buttonSubtext: {
    fontSize: typography.fontSize.sm,
    // color will be set dynamically
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    paddingBottom: spacing["5xl"],
    gap: spacing.lg,
  },
  linkText: {
    fontSize: typography.fontSize.base,
    textDecorationLine: "underline",
    // color will be set dynamically
  },
  testButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
    // backgroundColor will be set dynamically
  },
  testButtonText: {
    color: "white",
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold as any,
  },
  loadingText: {
    fontSize: typography.fontSize.lg,
    textAlign: "center",
    // color will be set dynamically in loading component
  },
});
