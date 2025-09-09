import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  UserTypeSelector,
  Checkbox,
} from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useLocalization } from "@/constants/localization";
import { useThemeColors, spacing, typography } from "@/constants/Theme";
import { UserType } from "@/types";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  userType?: string;
  acceptTerms?: string;
}

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const { t, isRTL } = useLocalization();
  const { colors } = useThemeColors();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userType: "customer" as UserType,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = t("auth.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("auth.emailInvalid");
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t("auth.passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("auth.passwordTooShort");
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.confirmPasswordRequired");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.passwordsDontMatch");
    }

    // Name validation
    if (!formData.firstName) {
      newErrors.firstName = t("auth.firstNameRequired");
    }
    if (!formData.lastName) {
      newErrors.lastName = t("auth.lastNameRequired");
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = t("auth.phoneRequired");
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t("auth.termsRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, {
      full_name: `${formData.firstName} ${formData.lastName}`,
      phone_number: formData.phoneNumber,
      user_type: formData.userType,
    });
    setLoading(false);

    if (error) {
      Alert.alert(t("auth.signUpError"), error.message);
    } else {
      Alert.alert(
        t("auth.signUpSuccess"),
        "Please check your email to verify your account.",
        [
          {
            text: t("common.ok"),
            onPress: () => router.replace("/"),
          },
        ]
      );
    }
  };

  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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
              {t("auth.createAccount")}
            </Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
              Join our homemade food community
            </Text>
          </CardHeader>

          <CardContent>
            {/* Name Fields */}
            <View style={[styles.row, isRTL && styles.rowRTL]}>
              <View style={styles.halfWidth}>
                <Input
                  label={t("auth.firstName")}
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                  error={errors.firstName}
                  placeholder="John"
                />
              </View>
              <View style={styles.halfWidth}>
                <Input
                  label={t("auth.lastName")}
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                  error={errors.lastName}
                  placeholder="Doe"
                />
              </View>
            </View>

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

            {/* Phone Number */}
            <Input
              label={t("auth.phoneNumber")}
              value={formData.phoneNumber}
              onChangeText={(text) => updateFormData("phoneNumber", text)}
              error={errors.phoneNumber}
              keyboardType="phone-pad"
              placeholder="+1 (555) 123-4567"
            />

            {/* Password Fields */}
            <Input
              label={t("auth.password")}
              value={formData.password}
              onChangeText={(text) => updateFormData("password", text)}
              error={errors.password}
              secureTextEntry
              placeholder="••••••••"
            />

            <Input
              label={t("auth.confirmPassword")}
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData("confirmPassword", text)}
              error={errors.confirmPassword}
              secureTextEntry
              placeholder="••••••••"
            />

            {/* User Type Selector */}
            <UserTypeSelector
              selectedType={formData.userType}
              onTypeSelect={(type) => updateFormData("userType", type)}
              error={errors.userType}
            />

            {/* Terms and Conditions */}
            <Checkbox
              checked={formData.acceptTerms}
              onToggle={() =>
                updateFormData("acceptTerms", !formData.acceptTerms)
              }
              label={t("auth.acceptTerms")}
              error={errors.acceptTerms}
            />

            {/* Sign Up Button */}
            <Button
              title={t("auth.createAccountButton")}
              onPress={handleSignUp}
              loading={loading}
              variant="primary"
              size="lg"
              fullWidth
              style={styles.signUpButton}
            />

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text
                style={[styles.signInText, { color: colors.mutedForeground }]}
              >
                {t("auth.alreadyHaveAccount")}
              </Text>
              <Pressable onPress={() => router.push("/(auth)/sign-in" as any)}>
                <Text style={[styles.signInLink, { color: colors.primary }]}>
                  {t("auth.signIn")}
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
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  rowRTL: {
    flexDirection: "row-reverse",
  },
  halfWidth: {
    flex: 1,
  },
  signUpButton: {
    marginTop: spacing.md,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  signInText: {
    fontSize: typography.fontSize.sm,
  },
  signInLink: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    textDecorationLine: "underline",
  },
});
