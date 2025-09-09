import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";
import { useVendor } from "@/hooks/useVendor";

export default function VendorProfileScreen() {
  const { user, signOut } = useAuth();
  const { vendor, createVendorProfile, updateVendorProfile } = useVendor();

  const [isEditing, setIsEditing] = useState(!vendor); // Auto-edit if no vendor profile
  const [formData, setFormData] = useState({
    business_name: vendor?.business_name || "",
    description: vendor?.description || "",
    address: vendor?.address || "",
    city: vendor?.city || "",
    phone_number: vendor?.phone_number || user?.phone_number || "",
    whatsapp_number: vendor?.whatsapp_number || "",
  });
  const [loading, setLoading] = useState(false);

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
        // Update existing profile
        const { error } = await updateVendorProfile(formData);
        if (error) throw error;
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        // Create new profile
        const { error } = await createVendorProfile({
          ...formData,
          is_verified: false,
          is_active: true,
          rating: 0,
          total_orders: 0,
        });
        if (error) throw error;
        Alert.alert("Success", "Vendor profile created successfully!");
      }

      setIsEditing(false);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (vendor) {
      // Reset to original values
      setFormData({
        business_name: vendor.business_name,
        description: vendor.description || "",
        address: vendor.address,
        city: vendor.city,
        phone_number: vendor.phone_number,
        whatsapp_number: vendor.whatsapp_number || "",
      });
      setIsEditing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {vendor ? "Vendor Profile" : "Setup Your Vendor Profile"}
          </Text>
          {vendor && !isEditing && (
            <Pressable
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Business Name *</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.business_name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, business_name: text }))
                }
                placeholder="Enter your business name"
                editable={!loading}
              />
            ) : (
              <Text style={styles.value}>
                {vendor?.business_name || "Not set"}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, description: text }))
                }
                placeholder="Tell customers about your cooking style and specialties"
                multiline
                numberOfLines={4}
                editable={!loading}
              />
            ) : (
              <Text style={styles.value}>
                {vendor?.description || "No description"}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Address *</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, address: text }))
                }
                placeholder="Enter your full address"
                editable={!loading}
              />
            ) : (
              <Text style={styles.value}>{vendor?.address || "Not set"}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>City *</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.city}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, city: text }))
                }
                placeholder="Enter your city"
                editable={!loading}
              />
            ) : (
              <Text style={styles.value}>{vendor?.city || "Not set"}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number *</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.phone_number}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, phone_number: text }))
                }
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                editable={!loading}
              />
            ) : (
              <Text style={styles.value}>
                {vendor?.phone_number || "Not set"}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>WhatsApp Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.whatsapp_number}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, whatsapp_number: text }))
                }
                placeholder="Enter your WhatsApp number (optional)"
                keyboardType="phone-pad"
                editable={!loading}
              />
            ) : (
              <Text style={styles.value}>
                {vendor?.whatsapp_number || "Not provided"}
              </Text>
            )}
          </View>

          {vendor && !isEditing && (
            <View style={styles.statusSection}>
              <View style={styles.statusItem}>
                <Text style={styles.label}>Status</Text>
                <Text
                  style={[
                    styles.status,
                    vendor.is_verified ? styles.verified : styles.pending,
                  ]}
                >
                  {vendor.is_verified
                    ? "✅ Verified"
                    : "⏳ Pending Verification"}
                </Text>
              </View>

              <View style={styles.statusItem}>
                <Text style={styles.label}>Rating</Text>
                <Text style={styles.value}>{vendor.rating.toFixed(1)} ⭐</Text>
              </View>

              <View style={styles.statusItem}>
                <Text style={styles.label}>Total Orders</Text>
                <Text style={styles.value}>{vendor.total_orders}</Text>
              </View>
            </View>
          )}
        </View>

        {isEditing && (
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.button,
                styles.saveButton,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading
                  ? "Saving..."
                  : vendor
                  ? "Save Changes"
                  : "Create Profile"}
              </Text>
            </Pressable>

            {vendor && (
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            )}
          </View>
        )}

        {vendor && !isEditing && (
          <View style={styles.footer}>
            <Pressable style={styles.signOutButton} onPress={signOut}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
          </View>
        )}
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButtonText: {
    color: "white",
    fontWeight: "600",
  },
  form: {
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  value: {
    fontSize: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  statusSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  verified: {
    color: "#34C759",
  },
  pending: {
    color: "#FF9500",
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 30,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footer: {
    alignItems: "center",
  },
  signOutButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 8,
  },
  signOutText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
});
