import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";

export default function CustomerOrdersScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Orders</Text>

        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order #1234</Text>
          <Text style={styles.orderVendor}>From: Maria's Kitchen</Text>
          <Text style={styles.orderItems}>2x Mom's Special Biryani</Text>
          <Text style={styles.orderPrice}>Total: $25.98</Text>
          <Text style={styles.orderStatus}>Status: Preparing</Text>
        </View>

        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order #1233</Text>
          <Text style={styles.orderVendor}>From: Green Garden</Text>
          <Text style={styles.orderItems}>1x Fresh Garden Salad</Text>
          <Text style={styles.orderPrice}>Total: $8.50</Text>
          <Text style={styles.orderStatus}>Status: Delivered</Text>
        </View>

        <Text style={styles.emptyText}>More order features coming soon!</Text>
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
  orderCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  orderVendor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9500",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.7,
    marginTop: 40,
  },
});
