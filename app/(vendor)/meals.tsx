import React from "react";
import { StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { useVendorMeals } from "@/hooks/useVendor";

export default function VendorMealsScreen() {
  const { meals, loading, toggleMealAvailability, deleteMeal } =
    useVendorMeals();

  const handleToggleAvailability = async (
    mealId: string,
    currentStatus: boolean
  ) => {
    const { error } = await toggleMealAvailability(mealId, !currentStatus);
    if (error) {
      Alert.alert("Error", "Failed to update meal availability");
    }
  };

  const handleDeleteMeal = (mealId: string, mealTitle: string) => {
    Alert.alert(
      "Delete Meal",
      `Are you sure you want to delete "${mealTitle}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const { error } = await deleteMeal(mealId);
            if (error) {
              Alert.alert("Error", "Failed to delete meal");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading your meals...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Meals</Text>
          <Text style={styles.subtitle}>
            {meals.length} meal{meals.length !== 1 ? "s" : ""} total
          </Text>
        </View>

        {meals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No meals yet</Text>
            <Text style={styles.emptyDescription}>
              Start by adding your first delicious meal to attract customers!
            </Text>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Your First Meal</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.mealsList}>
            {meals.map((meal) => (
              <View key={meal.id} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealTitle}>{meal.title}</Text>
                    <Text style={styles.mealPrice}>
                      ${meal.price.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.mealStatus}>
                    <View
                      style={[
                        styles.statusBadge,
                        meal.is_available
                          ? styles.availableBadge
                          : styles.unavailableBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          meal.is_available
                            ? styles.availableText
                            : styles.unavailableText,
                        ]}
                      >
                        {meal.is_available ? "Available" : "Unavailable"}
                      </Text>
                    </View>
                    {!meal.is_approved && (
                      <View style={[styles.statusBadge, styles.pendingBadge]}>
                        <Text style={styles.pendingText}>Pending Approval</Text>
                      </View>
                    )}
                  </View>
                </View>

                <Text style={styles.mealDescription} numberOfLines={2}>
                  {meal.description}
                </Text>

                <View style={styles.mealDetails}>
                  <Text style={styles.detailText}>
                    🕒 {meal.preparation_time} min
                  </Text>
                  <Text style={styles.detailText}>👥 {meal.serving_size}</Text>
                  {meal.category && (
                    <Text style={styles.detailText}>
                      📂 {meal.category.name}
                    </Text>
                  )}
                </View>

                <View style={styles.mealActions}>
                  <Pressable
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => {
                      // TODO: Navigate to edit meal screen
                      Alert.alert(
                        "Coming Soon",
                        "Edit meal functionality will be added next"
                      );
                    }}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.actionButton,
                      meal.is_available
                        ? styles.disableButton
                        : styles.enableButton,
                    ]}
                    onPress={() =>
                      handleToggleAvailability(meal.id, meal.is_available)
                    }
                  >
                    <Text
                      style={[
                        styles.actionButtonText,
                        meal.is_available
                          ? styles.disableButtonText
                          : styles.enableButtonText,
                      ]}
                    >
                      {meal.is_available ? "Disable" : "Enable"}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteMeal(meal.id, meal.title)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            ))}
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
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  mealsList: {
    gap: 16,
  },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  mealInfo: {
    flex: 1,
    marginRight: 12,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mealPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  mealStatus: {
    alignItems: "flex-end",
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: "#D4F4DD",
  },
  unavailableBadge: {
    backgroundColor: "#F4D4D4",
  },
  pendingBadge: {
    backgroundColor: "#FFF3CD",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  availableText: {
    color: "#0F7B0F",
  },
  unavailableText: {
    color: "#B91C1C",
  },
  pendingText: {
    color: "#856404",
    fontSize: 12,
    fontWeight: "600",
  },
  mealDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  mealDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mealActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  editButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },
  enableButton: {
    backgroundColor: "#D4F4DD",
    borderWidth: 1,
    borderColor: "#0F7B0F",
  },
  enableButtonText: {
    color: "#0F7B0F",
    fontSize: 14,
    fontWeight: "600",
  },
  disableButton: {
    backgroundColor: "#F4D4D4",
    borderWidth: 1,
    borderColor: "#B91C1C",
  },
  disableButtonText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
