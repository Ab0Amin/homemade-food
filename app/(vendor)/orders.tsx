import React from "react";
import { StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { useVendorOrders } from "@/hooks/useVendor";
import { Order } from "@/types";

export default function VendorOrdersScreen() {
  const { orders, loading, updateOrderStatus } = useVendorOrders();

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    const { error } = await updateOrderStatus(orderId, newStatus);
    if (error) {
      Alert.alert("Error", "Failed to update order status");
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "#FF9500";
      case "confirmed":
        return "#007AFF";
      case "preparing":
        return "#FF9500";
      case "ready":
        return "#34C759";
      case "delivered":
        return "#8E8E93";
      case "cancelled":
        return "#FF3B30";
      default:
        return "#8E8E93";
    }
  };

  const getNextStatus = (
    currentStatus: Order["status"]
  ): Order["status"] | null => {
    switch (currentStatus) {
      case "pending":
        return "confirmed";
      case "confirmed":
        return "preparing";
      case "preparing":
        return "ready";
      case "ready":
        return "delivered";
      default:
        return null;
    }
  };

  const getStatusAction = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Confirm Order";
      case "confirmed":
        return "Start Preparing";
      case "preparing":
        return "Mark as Ready";
      case "ready":
        return "Mark as Delivered";
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const activeOrders = orders.filter((order) =>
    ["confirmed", "preparing", "ready"].includes(order.status)
  );
  const completedOrders = orders.filter((order) =>
    ["delivered", "cancelled"].includes(order.status)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.subtitle}>
            {orders.length} total order{orders.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyDescription}>
              Orders from customers will appear here. Make sure your meals are
              available and approved!
            </Text>
          </View>
        ) : (
          <>
            {pendingOrders.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  ⏳ Pending Orders ({pendingOrders.length})
                </Text>
                {pendingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                    getStatusColor={getStatusColor}
                    getNextStatus={getNextStatus}
                    getStatusAction={getStatusAction}
                  />
                ))}
              </View>
            )}

            {activeOrders.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  🔥 Active Orders ({activeOrders.length})
                </Text>
                {activeOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                    getStatusColor={getStatusColor}
                    getNextStatus={getNextStatus}
                    getStatusAction={getStatusAction}
                  />
                ))}
              </View>
            )}

            {completedOrders.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  ✅ Completed Orders ({completedOrders.length})
                </Text>
                {completedOrders.slice(0, 5).map(
                  (
                    order // Show only recent 5
                  ) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                      getStatusColor={getStatusColor}
                      getNextStatus={getNextStatus}
                      getStatusAction={getStatusAction}
                    />
                  )
                )}
                {completedOrders.length > 5 && (
                  <Text style={styles.moreText}>
                    + {completedOrders.length - 5} more completed orders
                  </Text>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order["status"]) => void;
  getStatusColor: (status: Order["status"]) => string;
  getNextStatus: (status: Order["status"]) => Order["status"] | null;
  getStatusAction: (status: Order["status"]) => string | null;
}

function OrderCard({
  order,
  onStatusChange,
  getStatusColor,
  getNextStatus,
  getStatusAction,
}: OrderCardProps) {
  const nextStatus = getNextStatus(order.status);
  const statusAction = getStatusAction(order.status);

  const handleCancel = () => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order? This action cannot be undone.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => onStatusChange(order.id, "cancelled"),
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>Order #{order.id.slice(-8)}</Text>
          <Text style={styles.orderDate}>{formatDate(order.created_at)}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(order.status) + "20" },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(order.status) }]}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.customerName}>
          👤 {order.customer?.full_name || "Customer"}
        </Text>
        {order.meal && (
          <Text style={styles.mealName}>
            🍽️ {order.quantity}x {order.meal.title}
          </Text>
        )}
        <Text style={styles.orderTotal}>
          💰 ${order.total_price.toFixed(2)}
        </Text>
        {order.customer_notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>Customer Notes:</Text>
            <Text style={styles.notesText}>{order.customer_notes}</Text>
          </View>
        )}
        {order.delivery_address && (
          <Text style={styles.deliveryAddress}>
            📍 {order.delivery_address}
          </Text>
        )}
        {order.delivery_phone && (
          <Text style={styles.deliveryPhone}>📞 {order.delivery_phone}</Text>
        )}
      </View>

      {order.status !== "delivered" && order.status !== "cancelled" && (
        <View style={styles.orderActions}>
          {nextStatus && statusAction && (
            <Pressable
              style={[styles.actionButton, styles.primaryAction]}
              onPress={() => onStatusChange(order.id, nextStatus)}
            >
              <Text style={styles.primaryActionText}>{statusAction}</Text>
            </Pressable>
          )}

          {order.status === "pending" && (
            <Pressable
              style={[styles.actionButton, styles.cancelAction]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelActionText}>Cancel</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  orderDetails: {
    marginBottom: 16,
  },
  customerName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  mealName: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  notesSection: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 2,
  },
  notesText: {
    fontSize: 14,
    color: "#333",
  },
  deliveryAddress: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  deliveryPhone: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  orderActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  primaryAction: {
    backgroundColor: "#007AFF",
  },
  primaryActionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  cancelAction: {
    backgroundColor: "#FF3B30",
  },
  cancelActionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  moreText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 8,
  },
});
