import React from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  LoadingScreen,
} from "@/components/ui";
import { useVendorMeals } from "@/hooks/useVendor";
import { colors, spacing, typography, borderRadius } from "@/constants/Design";
import { router } from "expo-router";

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
    return <LoadingScreen message="Loading your meals..." />;
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
            <Button
              title="Add Your First Meal"
              onPress={() => router.push("/(vendor)/add-meal")}
              variant="primary"
            />
          </View>
        ) : (
          <View style={styles.mealsList}>
            {meals.map((meal) => (
              <Card key={meal.id} variant="elevated" style={styles.mealCard}>
                <CardHeader>
                  <View style={styles.mealHeader}>
                    <View style={styles.mealInfo}>
                      <Text style={styles.mealTitle}>{meal.title}</Text>
                      <Text style={styles.mealPrice}>
                        ${meal.price.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.mealStatus}>
                      <Badge size="sm">
                        {meal.is_available ? "Available" : "Unavailable"}
                      </Badge>
                      {!meal.is_approved && (
                        <Badge size="sm">Pending Approval</Badge>
                      )}
                    </View>
                  </View>
                </CardHeader>

                <CardContent>
                  <Text style={styles.mealDescription} numberOfLines={2}>
                    {meal.description}
                  </Text>

                  <View style={styles.mealDetails}>
                    <Badge variant="secondary" size="sm">
                      🕒 {meal.preparation_time} min
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      👥 {meal.serving_size}
                    </Badge>
                    {meal.category && (
                      <Badge variant="secondary" size="sm">
                        📂 {meal.category.name}
                      </Badge>
                    )}
                  </View>
                </CardContent>

                <CardFooter>
                  <View style={styles.mealActions}>
                    <Button
                      title="Edit"
                      onPress={() => {
                        // TODO: Navigate to edit meal screen
                        Alert.alert(
                          "Coming Soon",
                          "Edit meal functionality will be added next"
                        );
                      }}
                      variant="outline"
                      size="sm"
                    />

                    <Button
                      title={meal.is_available ? "Disable" : "Enable"}
                      onPress={() =>
                        handleToggleAvailability(meal.id, meal.is_available)
                      }
                      variant={meal.is_available ? "destructive" : "success"}
                      size="sm"
                    />

                    <Button
                      title="Delete"
                      onPress={() => handleDeleteMeal(meal.id, meal.title)}
                      variant="destructive"
                      size="sm"
                    />
                  </View>
                </CardFooter>
              </Card>
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
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: typography.fontSize.base,
    textAlign: "center",
    marginTop: 100,
    color: colors.foreground,
  },
  header: {
    marginBottom: spacing["3xl"],
  },
  title: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.bold as any,
    marginBottom: spacing.xs,
    color: colors.foreground,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.mutedForeground,
  },
  emptyState: {
    alignItems: "center",
    marginTop: spacing["6xl"],
    paddingHorizontal: spacing["5xl"],
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold as any,
    marginBottom: spacing.md,
    textAlign: "center",
    color: colors.foreground,
  },
  emptyDescription: {
    fontSize: typography.fontSize.base,
    color: colors.mutedForeground,
    textAlign: "center",
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing["4xl"],
  },
  mealsList: {
    gap: spacing.lg,
  },
  mealCard: {
    marginBottom: 0, // Card component handles spacing
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  mealInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  mealTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold as any,
    marginBottom: spacing.xs,
    color: colors.foreground,
  },
  mealPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.primary,
  },
  mealStatus: {
    alignItems: "flex-end",
    gap: spacing.xs,
  },
  mealDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
    marginBottom: spacing.md,
  },
  mealDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  mealActions: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "flex-end",
  },
});
