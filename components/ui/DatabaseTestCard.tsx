import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { Button, Card, CardHeader, CardContent } from "@/components/ui";
import { useThemeColors, spacing, typography } from "@/constants/Theme";
import { useLocalization } from "@/constants/localization";
import { testConnection, testUserSignup } from "@/lib/supabase-helpers";
import { useAuth } from "@/hooks/useAuth";

export const DatabaseTestCard = () => {
  const { colors } = useThemeColors();
  const { t } = useLocalization();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    connection?: string;
    signup?: string;
  }>({});

  const runConnectionTest = async () => {
    setLoading(true);
    try {
      const result = await testConnection();
      setResults((prev) => ({ ...prev, connection: result.message }));

      if (result.success) {
        Alert.alert("✅ Success", result.message);
      } else {
        Alert.alert("❌ Failed", result.message);
      }
    } catch (error) {
      Alert.alert("❌ Error", `Connection test failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const runSignupTest = async () => {
    setLoading(true);
    try {
      const result = await testUserSignup();
      setResults((prev) => ({ ...prev, signup: result.message }));

      if (result.success) {
        Alert.alert("✅ Success", result.message);
      } else {
        Alert.alert("❌ Failed", result.message);
      }
    } catch (error) {
      Alert.alert("❌ Error", `Signup test failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={styles.card}>
      <CardHeader>
        <Text style={[styles.title, { color: colors.foreground }]}>
          🔧 Database Tests
        </Text>
        {user && (
          <Text style={[styles.userInfo, { color: colors.mutedForeground }]}>
            Logged in as: {user.full_name} ({user.user_type})
          </Text>
        )}
      </CardHeader>

      <CardContent>
        <View style={styles.buttonContainer}>
          <Button
            title="Test Connection"
            onPress={runConnectionTest}
            loading={loading}
            variant="secondary"
            size="sm"
            style={styles.testButton}
          />

          <Button
            title="Test Signup Flow"
            onPress={runSignupTest}
            loading={loading}
            variant="secondary"
            size="sm"
            style={styles.testButton}
          />
        </View>

        {results.connection && (
          <View style={styles.result}>
            <Text style={[styles.resultTitle, { color: colors.foreground }]}>
              Connection Test:
            </Text>
            <Text
              style={[styles.resultText, { color: colors.mutedForeground }]}
            >
              {results.connection}
            </Text>
          </View>
        )}

        {results.signup && (
          <View style={styles.result}>
            <Text style={[styles.resultTitle, { color: colors.foreground }]}>
              Signup Test:
            </Text>
            <Text
              style={[styles.resultText, { color: colors.mutedForeground }]}
            >
              {results.signup}
            </Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as any,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  userInfo: {
    fontSize: typography.fontSize.sm,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  testButton: {
    flex: 1,
  },
  result: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    marginBottom: spacing.xs,
  },
  resultText: {
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.xs,
  },
});
