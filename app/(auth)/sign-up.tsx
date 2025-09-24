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
  full_name?: string;
  phoneNumber?: string;
  userType?: string;
  acceptTerms?: string;
  businessName?: string;
}

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const { t, isRTL } = useLocalization();
  const { colors } = useThemeColors();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    phoneNumber: "",
    userType: "customer" as UserType,
    acceptTerms: false,

    // Optional fields
    dateOfBirth: "",
    gender: "" as "male" | "female" | "other" | "",

    // Business fields (for vendors)
    businessName: "",
    businessDescription: "",
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
    if (!formData.full_name.trim()) {
      newErrors.full_name = t("auth.fullNameRequired");
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
    const { error } = await signUp({
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      phone_number: formData.phoneNumber || undefined,
      user_type: formData.userType,
      date_of_birth: formData.dateOfBirth || undefined,
      gender: formData.gender || undefined,
      business_name:
        formData.userType === "vendor"
          ? formData.businessName || undefined
          : undefined,
      business_description:
        formData.userType === "vendor"
          ? formData.businessDescription || undefined
          : undefined,
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

  const handleLinkPress = (linkType: "terms" | "privacy") => {
    if (linkType === "terms") {
      router.push("/(legal)/terms-of-service");
    } else {
      router.push("/(legal)/privacy-policy");
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
        {/* Welcome Card */}
        <Card style={styles.welcomeCard}>
          <CardContent>
            <Text style={[styles.welcomeTitle, { color: colors.foreground }]}>
              {t("auth.createNewAccount")}
            </Text>
            <Text
              style={[
                styles.welcomeSubtitle,
                { color: colors.mutedForeground },
              ]}
            >
              {t("landing.joinOurCommunity")}
            </Text>
          </CardContent>
        </Card>

        {/* Form Card */}
        <Card style={styles.formCard}>
          <CardContent>
            {/* Name Fields */}
            <Input
              label={t("auth.fullName")}
              value={formData.full_name}
              onChangeText={(text) => updateFormData("full_name", text)}
              error={errors.full_name}
              placeholder={t("auth.fullNamePlaceholder")}
            />

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
            <View style={styles.termsContainer}>
              <Pressable
                style={styles.checkboxContainer}
                onPress={() =>
                  updateFormData("acceptTerms", !formData.acceptTerms)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.acceptTerms && styles.checkboxChecked,
                    {
                      borderColor: formData.acceptTerms
                        ? colors.primary
                        : colors.border,
                    },
                  ]}
                >
                  {formData.acceptTerms && (
                    <Text
                      style={[
                        styles.checkmark,
                        { color: colors.primaryForeground },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </View>
                <View
                  style={[styles.termsTextContainer, !isRTL && styles.rowRTL]}
                >
                  <Pressable onPress={() => handleLinkPress("terms")}>
                    <Text style={[styles.linkText, { color: colors.primary }]}>
                      {t("auth.termsOfService")}
                    </Text>
                  </Pressable>
                  <Text>{t("auth.andThe")}</Text>
                  <Pressable onPress={() => handleLinkPress("privacy")}>
                    <Text style={[styles.linkText, { color: colors.primary }]}>
                      {t("auth.privacyPolicy")}
                    </Text>
                  </Pressable>
                  <Text>{t("auth.iAcceptThe")} </Text>
                </View>
              </Pressable>
              {errors.acceptTerms && (
                <Text style={[styles.errorText, { color: colors.destructive }]}>
                  {errors.acceptTerms}
                </Text>
              )}
            </View>

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
    marginTop: 40,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  welcomeCard: {
    marginBottom: spacing.lg,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: typography.fontWeight.bold as any,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: typography.fontSize.base,
    textAlign: "center",
  },
  formCard: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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

  termsContainer: {
    marginBottom: spacing.lg,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: spacing.sm,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
  },

  checkboxChecked: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },

  checkmark: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },

  termsTextContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
  },

  termsText: {
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
  },

  linkText: {
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
    textDecorationLine: "underline",
    fontWeight: typography.fontWeight.semibold as any,
  },

  errorText: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeight.medium as any,
  },
});
