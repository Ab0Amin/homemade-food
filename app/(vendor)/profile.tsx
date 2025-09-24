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
import { useVendor } from "@/hooks/useVendor";
import { useLocalization } from "@/constants/localization";
import { useThemeColors, spacing, typography } from "@/constants/Theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface FormData {
  business_name: string;
  description: string;
  address: string;
  city: string;
  phone_number: string;
  whatsapp_number: string;
}

export default function VendorProfileScreen() {
  const { user } = useAuth();
  const {
    vendor,
    createVendorProfile,
    updateVendorProfile,
    loading: vendorLoading,
  } = useVendor();
  const { t } = useLocalization();
  const { colors } = useThemeColors();

  const [isEditing, setIsEditing] = useState(!vendor);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    business_name: vendor?.business_name || "",
    description: vendor?.description || "",
    address: vendor?.address || "",
    city: vendor?.city || "",
    phone_number: vendor?.phone_number || user?.phone_number || "",
    whatsapp_number: vendor?.whatsapp_number || "",
  });

  useEffect(() => {
    if (vendor) {
      setFormData({
        business_name: vendor.business_name || "",
        description: vendor.description || "",
        address: vendor.address || "",
        city: vendor.city || "",
        phone_number: vendor.phone_number || user?.phone_number || "",
        whatsapp_number: vendor.whatsapp_number || "",
      });
      setIsEditing(false);
    }
  }, [vendor, user]);

  const handleSave = async () => {
    if (
      !formData.business_name ||
      !formData.address ||
      !formData.city ||
      !formData.phone_number
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (vendor) {
        const { error } = await updateVendorProfile(formData);
        if (error) throw error;
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        const { error } = await createVendorProfile({
          ...formData,
          is_verified: false,
          is_active: true,
          rating: 0,
          total_orders: 0,
        });
        if (error) throw error;
        Alert.alert("Success", "Profile created successfully!");
      }
      setIsEditing(false);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (vendorLoading) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome
              name="arrow-left"
              size={20}
              color={colors.foreground}
            />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            Profile Settings
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
              <View
                style={[
                  styles.photoPlaceholder,
                  { backgroundColor: colors.secondary },
                ]}
              >
                <FontAwesome
                  name="camera"
                  size={32}
                  color={colors.mutedForeground}
                />
              </View>
              <Text
                style={[styles.photoText, { color: colors.mutedForeground }]}
              >
                Profile Photo (Coming Soon)
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card style={styles.formCard}>
          <CardHeader>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Business Information
            </Text>
          </CardHeader>
          <CardContent>
            <Input
              label="Business Name *"
              value={formData.business_name}
              onChangeText={(text) => updateFormData("business_name", text)}
              placeholder="Enter your business name"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="Description"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              placeholder="Tell customers about your cooking..."
              multiline
              numberOfLines={4}
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="Address *"
              value={formData.address}
              onChangeText={(text) => updateFormData("address", text)}
              placeholder="Enter your address"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="City *"
              value={formData.city}
              onChangeText={(text) => updateFormData("city", text)}
              placeholder="Enter your city"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="Phone Number *"
              value={formData.phone_number}
              onChangeText={(text) => updateFormData("phone_number", text)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              editable={isEditing}
              style={!isEditing ? styles.readonlyInput : {}}
            />

            <Input
              label="WhatsApp Number"
              value={formData.whatsapp_number}
              onChangeText={(text) => updateFormData("whatsapp_number", text)}
              placeholder="Enter your WhatsApp number"
              keyboardType="phone-pad"
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
              label="Full Name (Read-only)"
              value={user?.full_name || ""}
              editable={false}
              style={styles.readonlyInput}
            />

            <Input
              label="Email (Read-only)"
              value={user?.email || ""}
              editable={false}
              style={styles.readonlyInput}
            />
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
    shadowColor: "#000",
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
    paddingVertical: spacing.lg,
  },
  photoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  photoText: {
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
