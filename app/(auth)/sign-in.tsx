import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";

export default function SignInScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      // Navigation will be handled by the auth context
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in as a {type === "vendor" ? "Cook" : "Customer"}
          </Text>
        </View>

        <View style={styles.form}>
          {/* We'll add proper TextInput components later */}
          <Text style={styles.label}>Email</Text>
          <Text style={styles.input}>Email input field (coming soon)</Text>

          <Text style={styles.label}>Password</Text>
          <Text style={styles.input}>Password input field (coming soon)</Text>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => router.push("/(auth)/sign-up")}>
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.linkText}>Back to welcome</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    gap: 16,
    paddingBottom: 40,
  },
  linkText: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
