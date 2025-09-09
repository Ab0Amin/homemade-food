import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useVendorMeals } from "@/hooks/useVendor";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types";

export default function AddMealScreen() {
  const { addMeal } = useVendorMeals();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    preparation_time: "30",
    serving_size: "1 person",
    ingredients: "",
    allergens: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("Error", "Please enter a meal title");
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert("Error", "Please enter a description");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Alert.alert("Error", "Please enter a valid price");
      return false;
    }
    if (!formData.category_id) {
      Alert.alert("Error", "Please select a category");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const ingredients = formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const allergens = formData.allergens
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const mealData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        preparation_time: parseInt(formData.preparation_time) || 30,
        serving_size: formData.serving_size.trim() || "1 person",
        ingredients: ingredients.length > 0 ? ingredients : undefined,
        allergens: allergens.length > 0 ? allergens : undefined,
        currency: "USD",
        is_available: true,
        is_approved: false, // Requires admin approval
        images: [], // We'll add image upload later
      };

      const { error } = await addMeal(mealData);

      if (error) throw error;

      Alert.alert(
        "Success",
        "Meal added successfully! It will be visible to customers after admin approval.",
        [
          {
            text: "Add Another",
            onPress: () => {
              setFormData({
                title: "",
                description: "",
                price: "",
                category_id: "",
                preparation_time: "30",
                serving_size: "1 person",
                ingredients: "",
                allergens: "",
              });
            },
          },
          {
            text: "View Meals",
            onPress: () => {
              // TODO: Navigate to meals screen
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Meal</Text>
          <Text style={styles.subtitle}>
            Share your delicious creation with customers
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Meal Title *</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, title: text }))
              }
              placeholder="e.g., Mom's Special Biryani"
              editable={!loading}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, description: text }))
              }
              placeholder="Describe your meal, cooking style, and what makes it special..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!loading}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.field, styles.halfField]}>
              <Text style={styles.label}>Price ($) *</Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, price: text }))
                }
                placeholder="12.99"
                keyboardType="decimal-pad"
                editable={!loading}
              />
            </View>

            <View style={[styles.field, styles.halfField]}>
              <Text style={styles.label}>Prep Time (min)</Text>
              <TextInput
                style={styles.input}
                value={formData.preparation_time}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, preparation_time: text }))
                }
                placeholder="30"
                keyboardType="number-pad"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category *</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    formData.category_id === category.id &&
                      styles.categoryButtonSelected,
                  ]}
                  onPress={() =>
                    setFormData((prev) => ({
                      ...prev,
                      category_id: category.id,
                    }))
                  }
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      formData.category_id === category.id &&
                        styles.categoryTextSelected,
                    ]}
                  >
                    {category.icon} {category.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Serving Size</Text>
            <TextInput
              style={styles.input}
              value={formData.serving_size}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, serving_size: text }))
              }
              placeholder="e.g., 1 person, 2-3 people, Family size"
              editable={!loading}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Ingredients</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.ingredients}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, ingredients: text }))
              }
              placeholder="Rice, Chicken, Onions, Spices (separate with commas)"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              editable={!loading}
            />
            <Text style={styles.helpText}>
              Separate ingredients with commas
            </Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Allergens</Text>
            <TextInput
              style={styles.input}
              value={formData.allergens}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, allergens: text }))
              }
              placeholder="Nuts, Dairy, Gluten (separate with commas)"
              editable={!loading}
            />
            <Text style={styles.helpText}>
              List any common allergens, separate with commas
            </Text>
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.label}>Photos</Text>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>📸</Text>
              <Text style={styles.imagePlaceholderSubtext}>
                Photo upload coming soon
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={[
              styles.submitButton,
              loading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Adding Meal..." : "Add Meal"}
            </Text>
          </Pressable>

          <Text style={styles.noteText}>
            * Your meal will be reviewed by our team before it becomes visible
            to customers
          </Text>
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
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  halfField: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 12,
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
  helpText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  categoryButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextSelected: {
    color: "white",
  },
  imageSection: {
    marginTop: 10,
  },
  imagePlaceholder: {
    height: 120,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  imagePlaceholderText: {
    fontSize: 32,
    marginBottom: 8,
  },
  imagePlaceholderSubtext: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  noteText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
});
