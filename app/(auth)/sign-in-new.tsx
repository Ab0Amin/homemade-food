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
      // Success is handled by useAuth hook redirects
      Alert.alert(t("common.success"), "Welcome back!");
    }
  };

  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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
        <Card style={styles.formCard}>
          <CardHeader>
            <Text style={[styles.title, { color: colors.foreground }]}>
              {t("auth.signIn")}
            </Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
              {getWelcomeMessage()}
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
});
