import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  LoadingScreen,
} from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useLocalization } from "@/constants/localization";
import { useThemeColors, spacing, typography } from "@/constants/Theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CustomerFormData {
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  address_street: string;
  address_city: string;
}

export default function CustomerProfileScreen() {
  const { user } = useAuth();
  const { t } = useLocalization();
  const { colors } = useThemeColors();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    full_name: user?.full_name || "",
    phone_number: user?.phone_number || "",
    date_of_birth: user?.date_of_birth || "",
    address_street: (typeof user?.address === 'object' ? user.address?.street : user?.address) || "",
    address_city: (typeof user?.address === 'object' ? user.address?.city : "") || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        phone_number: user.phone_number || "",
        date_of_birth: user.date_of_birth || "",
        address_street: (typeof user.address === 'object' ? user.address?.street : user.address) || "",
        address_city: (typeof user.address === 'object' ? user.address?.city : "") || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!formData.full_name) {
      Alert.alert("Error", "Full name is required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone_number || null,
          date_of_birth: formData.date_of_birth || null,
          address: {
            street: formData.address_street || null,
            city: formData.address_city || null,
          },
        })
        .eq("id", user?.id);

      if (error) throw error;

      Alert.alert("Success", "Profile updated successfully!");
      setIsEditing(false);
      
      // Refresh user data
      window.location.reload(); // Simple refresh for now
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof CustomerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={20} color={colors.foreground} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            My Profile
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <Card style={styles.photoCard}>
          <CardContent>
            <View style={styles.photoSection}>
              <View style={[styles.photoPlaceholder, { backgroundColor: colors.secondary }]}>
                <FontAwesome name="user" size={40} color={colors.mutedForeground} />
              </View>
              <Text style={[styles.welcomeText, { color: colors.foreground }]}>
                Welcome, {user?.full_name}!
              </Text>
              <Text style={[styles.accountType, { color: colors.mutedForeground }]}>
                Customer Account
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card style={styles.formCard}>
          <CardHeader>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Personal Information
            </Text>
          </CardHeader>
          <CardContent>
            <Input
              label="Full Name *"
              value={formData.full_name}
              onChangeText={(text) => updateFormData("full_name", text)}
              placeholder="Enter your full name"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="Phone Number"
              value={formData.phone_number}
              onChangeText={(text) => updateFormData("phone_number", text)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="Date of Birth"
              value={formData.date_of_birth}
              onChangeText={(text) => updateFormData("date_of_birth", text)}
              placeholder="YYYY-MM-DD"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="Address"
              value={formData.address_street}
              onChangeText={(text) => updateFormData("address_street", text)}
              placeholder="Enter your address"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="City"
              value={formData.address_city}
              onChangeText={(text) => updateFormData("address_city", text)}
              placeholder="Enter your city"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card style={styles.formCard}>
          <CardHeader>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Account Information
            </Text>
          </CardHeader>
          <CardContent>
            <Input
              label="Email (Read-only)"
              value={user?.email || ""}
              editable={false}
              style={styles.readonlyInput}
            />

            <Input
              label="Account Type (Read-only)"
              value="Customer"
              editable={false}
              style={styles.readonlyInput}
            />

            <Input
              label="Member Since (Read-only)"
              value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ""}
              editable={false}
              style={styles.readonlyInput}
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.formCard}>
          <CardHeader>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Quick Actions
            </Text>
          </CardHeader>
          <CardContent>
            <Pressable
              style={[styles.actionItem, { borderBottomColor: colors.border }]}
              onPress={() => router.push("/(customer)/orders")}
            >
              <FontAwesome name="list-alt" size={20} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.foreground }]}>
                My Orders
              </Text>
              <FontAwesome name="chevron-right" size={16} color={colors.mutedForeground} />
            </Pressable>

            <Pressable
              style={[styles.actionItem, { borderBottomColor: colors.border }]}
              onPress={() => router.push("/(customer)/favorites")}
            >
              <FontAwesome name="heart" size={20} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.foreground }]}>
                Favorites
              </Text>
              <FontAwesome name="chevron-right" size={16} color={colors.mutedForeground} />
            </Pressable>

            <Pressable style={styles.actionItem}>
              <FontAwesome name="cog" size={20} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.foreground }]}>
                Settings
              </Text>
              <FontAwesome name="chevron-right" size={16} color={colors.mutedForeground} />
            </Pressable>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                onPress={() => setIsEditing(false)}
                variant="outline"
                style={styles.halfButton}
              />
              <Button
                title={loading ? "Saving..." : "Save Changes"}
                onPress={handleSave}
                loading={loading}
                variant="primary"
                style={styles.halfButton}
              />
            </View>
          ) : (
            <Button
              title="Edit Profile"
              onPress={() => setIsEditing(true)}
              variant="primary"
              fullWidth
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold as any,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  photoCard: {
    marginBottom: spacing.lg,
    borderRadius: 16,
  },
  photoSection: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  welcomeText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold as any,
    marginBottom: spacing.xs,
  },
  accountType: {
    fontSize: typography.fontSize.sm,
  },
  formCard: {
    marginBottom: spacing.lg,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as any,
  },
  readonlyInput: {
    opacity: 0.6,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
  },
  actionText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium as any,
  },
  buttonContainer: {
    paddingTop: spacing.lg,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  halfButton: {
    flex: 1,
  },
});