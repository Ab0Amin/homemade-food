import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
} from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useLocalization } from "@/constants/localization";
import { useThemeColors, spacing, typography } from "@/constants/Theme";
import { supabase } from "@/lib/supabase";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignInScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const { signIn } = useAuth();
  const { t } = useLocalization();
  const { colors } = useThemeColors();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = t("auth.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("auth.emailInvalid");
    }

    if (!formData.password) {
      newErrors.password = t("auth.passwordRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const { error } = await signIn(formData.email, formData.password);
    setLoading(false);

    if (error) {
      Alert.alert(t("common.error"), error.message);
    } else {
      // Navigation will be handled by useAuth hook auto-redirect
      console.log("Sign in successful - navigation handled by useAuth");
    }
  };

  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getUserTypeLabel = () => {
    switch (type) {
      case "customer":
        return t("auth.customerSignIn");
      case "vendor":
        return t("auth.vendorSignIn");
      default:
        return t("auth.signInToAccount");
    }
  };

  const getWelcomeMessage = () => {
    switch (type) {
      case "customer":
        return "Welcome back! Ready to order some delicious meals?";
      case "vendor":
        return "Welcome back! Ready to share your culinary creations?";
      default:
        return "Welcome back to our food community!";
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header Card */}
        <Card style={styles.welcomeCard}>
          <CardHeader>
            <Text style={[styles.welcomeTitle, { color: colors.foreground }]}>
              {t("auth.welcomeBack")}
            </Text>
            <Text
              style={[
                styles.welcomeSubtitle,
                { color: colors.mutedForeground },
              ]}
            >
              {getUserTypeLabel()}
            </Text>
          </CardHeader>
        </Card>

        {/* Main Form Card */}
        <Card style={styles.formCard}>
          <CardHeader>
            <Text style={[styles.title, { color: colors.foreground }]}>
              {t("auth.signIn")}
            </Text>
          </CardHeader>

          <CardContent>
            {/* Email */}
            <Input
              label={t("auth.email")}
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="john@example.com"
            />

            {/* Password */}
            <Input
              label={t("auth.password")}
              value={formData.password}
              onChangeText={(text) => updateFormData("password", text)}
              error={errors.password}
              secureTextEntry
              placeholder="••••••••"
            />

            {/* Remember Me */}
            <Checkbox
              checked={formData.rememberMe}
              onToggle={() =>
                updateFormData("rememberMe", !formData.rememberMe)
              }
              label={t("auth.rememberMe")}
            />

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordContainer}>
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Coming Soon",
                    "Password reset feature will be available soon."
                  );
                }}
              >
                <Text
                  style={[styles.forgotPasswordLink, { color: colors.primary }]}
                >
                  {t("auth.forgotPassword")}
                </Text>
              </Pressable>
            </View>

            {/* Sign In Button */}
            <Button
              title={t("auth.signIn")}
              onPress={handleSignIn}
              loading={loading}
              variant="primary"
              size="lg"
              fullWidth
              style={styles.signInButton}
            />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
              <Text
                style={[styles.dividerText, { color: colors.mutedForeground }]}
              >
                {t("auth.orContinueWith")}
              </Text>
              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
            </View>

            {/* Social Sign In Buttons (Placeholder) */}
            <Button
              title="Continue with Google"
              onPress={() => {
                Alert.alert(
                  "Coming Soon",
                  "Social sign-in will be available soon."
                );
              }}
              variant="secondary"
              size="md"
              fullWidth
              style={styles.socialButton}
            />

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text
                style={[styles.signUpText, { color: colors.mutedForeground }]}
              >
                {t("auth.dontHaveAccount")}
              </Text>
              <Pressable onPress={() => router.push("/(auth)/sign-up" as any)}>
                <Text style={[styles.signUpLink, { color: colors.primary }]}>
                  {t("auth.signUp")}
                </Text>
              </Pressable>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  formCard: {
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.bold as any,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: spacing.md,
  },
  forgotPasswordLink: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    textDecorationLine: "underline",
  },
  signInButton: {
    marginTop: spacing.md,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.md,
  },
  socialButton: {
    marginBottom: spacing.md,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  signUpText: {
    fontSize: typography.fontSize.sm,
  },
  signUpLink: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    textDecorationLine: "underline",
  },

  // New welcome card styles
  welcomeCard: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 22,
  },
});
