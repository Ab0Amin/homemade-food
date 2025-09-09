import React from "react";
import { StyleSheet, Image, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";
import { testSupabaseConnection } from "@/lib/testSupabase";

export default function WelcomeScreen() {
  const { user, loading } = useAuth();

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
          router.replace("/(admin)");
          break;
        default:
          router.replace("/(customer)");
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Homemade Food Marketplace</Text>
        <Text style={styles.subtitle}>
          Discover delicious homemade meals from local cooks
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.customerButton]}
          onPress={() => router.push("/(auth)/sign-in?type=customer")}
        >
          <Text style={styles.buttonText}>I'm a Customer</Text>
          <Text style={styles.buttonSubtext}>Browse and order meals</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.vendorButton]}
          onPress={() => router.push("/(auth)/sign-in?type=vendor")}
        >
          <Text style={styles.buttonText}>I'm a Cook</Text>
          <Text style={styles.buttonSubtext}>Sell your homemade food</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/(auth)/sign-up")}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </Pressable>

        <Pressable style={styles.testButton} onPress={handleTestSupabase}>
          <Text style={styles.testButtonText}>🔧 Test Supabase Connection</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 40,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  customerButton: {
    backgroundColor: "#007AFF",
  },
  vendorButton: {
    backgroundColor: "#FF6B35",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  buttonSubtext: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 40,
    gap: 16,
  },
  linkText: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  testButton: {
    backgroundColor: "#34C759",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  testButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
});
