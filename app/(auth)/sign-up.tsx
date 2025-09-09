import React, { useState } from "react";
import { StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";
import { UserType } from "@/types";

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
    userType: "customer" as UserType,
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      user_type: formData.userType,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Success",
        "Account created successfully! Please check your email to verify your account."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our food marketplace</Text>
        </View>

        <View style={styles.form}>
          {/* User Type Selection */}
          <Text style={styles.label}>I am a:</Text>
          <View style={styles.userTypeContainer}>
            <Pressable
              style={[
                styles.userTypeButton,
                formData.userType === "customer" && styles.userTypeButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, userType: "customer" })}
            >
              <Text
                style={[
                  styles.userTypeText,
                  formData.userType === "customer" && styles.userTypeTextActive,
                ]}
              >
                Customer
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.userTypeButton,
                formData.userType === "vendor" && styles.userTypeButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, userType: "vendor" })}
            >
              <Text
                style={[
                  styles.userTypeText,
                  formData.userType === "vendor" && styles.userTypeTextActive,
                ]}
              >
                Cook/Vendor
              </Text>
            </Pressable>
          </View>

          {/* Form fields - placeholder for now */}
          <Text style={styles.label}>Full Name *</Text>
          <Text style={styles.input}>Full name input (coming soon)</Text>

          <Text style={styles.label}>Email *</Text>
          <Text style={styles.input}>Email input (coming soon)</Text>

          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.input}>Phone input (coming soon)</Text>

          <Text style={styles.label}>Password *</Text>
          <Text style={styles.input}>Password input (coming soon)</Text>

          <Text style={styles.label}>Confirm Password *</Text>
          <Text style={styles.input}>Confirm password input (coming soon)</Text>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating Account..." : "Create Account"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => router.push("/(auth)/sign-in")}>
            <Text style={styles.linkText}>
              Already have an account? Sign in
            </Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.linkText}>Back to welcome</Text>
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
    paddingTop: 60,
  },
  header: {
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
    marginBottom: 40,
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
  userTypeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  userTypeButton: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  userTypeButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  userTypeTextActive: {
    color: "white",
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
