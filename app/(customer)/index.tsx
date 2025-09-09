import React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";

export default function CustomerHomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.full_name}!</Text>
        <Text style={styles.subtitle}>What would you like to eat today?</Text>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.input}>🔍 Search for meals (coming soon)</Text>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {["Appetizers", "Main Courses", "Desserts", "Beverages"].map(
            (category) => (
              <View key={category} style={styles.categoryCard}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            )
          )}
        </View>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Meals</Text>
        <View style={styles.mealCard}>
          <Text style={styles.mealTitle}>Mom's Special Biryani</Text>
          <Text style={styles.mealDescription}>
            Authentic homemade biryani with aromatic spices
          </Text>
          <Text style={styles.mealPrice}>$12.99</Text>
        </View>
        <View style={styles.mealCard}>
          <Text style={styles.mealTitle}>Fresh Garden Salad</Text>
          <Text style={styles.mealDescription}>
            Crispy vegetables with homemade dressing
          </Text>
          <Text style={styles.mealPrice}>$8.50</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  searchSection: {
    padding: 20,
    paddingTop: 0,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  categoriesSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    minWidth: "45%",
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    fontWeight: "600",
  },
  featuredSection: {
    padding: 20,
    paddingTop: 0,
  },
  mealCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  mealPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  footer: {
    padding: 20,
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
