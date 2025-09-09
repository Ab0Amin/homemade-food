import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";

export default function CustomerFavoritesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Favorites</Text>

        <View style={styles.mealCard}>
          <Text style={styles.mealTitle}>Mom's Special Biryani</Text>
          <Text style={styles.mealVendor}>Maria's Kitchen</Text>
          <Text style={styles.mealDescription}>
            Authentic homemade biryani with aromatic spices
          </Text>
          <Text style={styles.mealPrice}>$12.99</Text>
        </View>

        <Text style={styles.emptyText}>Favorites feature coming soon!</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  mealVendor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  mealPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.7,
    marginTop: 40,
  },
});
