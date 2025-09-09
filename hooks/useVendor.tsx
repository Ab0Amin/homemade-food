import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Vendor, Meal, Order } from "@/types";
import { useAuth } from "./useAuth";

export const useVendor = () => {
  const { user } = useAuth();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.user_type === "vendor") {
      fetchVendorProfile();
    }
  }, [user]);

  const fetchVendorProfile = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        throw error;
      }

      setVendor(data);
    } catch (error) {
      console.error("Error fetching vendor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const createVendorProfile = async (
    vendorData: Omit<Vendor, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    try {
      if (!user) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from("vendors")
        .insert([
          {
            user_id: user.id,
            ...vendorData,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setVendor(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateVendorProfile = async (updates: Partial<Vendor>) => {
    try {
      if (!vendor) throw new Error("No vendor profile found");

      const { data, error } = await supabase
        .from("vendors")
        .update(updates)
        .eq("id", vendor.id)
        .select()
        .single();

      if (error) throw error;

      setVendor(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    vendor,
    loading,
    createVendorProfile,
    updateVendorProfile,
    refreshVendorProfile: fetchVendorProfile,
  };
};

export const useVendorMeals = () => {
  const { vendor } = useVendor();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vendor) {
      fetchMeals();
    }
  }, [vendor]);

  const fetchMeals = async () => {
    try {
      if (!vendor) return;

      const { data, error } = await supabase
        .from("meals")
        .select(
          `
          *,
          category:categories(*)
        `
        )
        .eq("vendor_id", vendor.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setMeals(data || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (
    mealData: Omit<Meal, "id" | "vendor_id" | "created_at" | "updated_at">
  ) => {
    try {
      if (!vendor) throw new Error("No vendor profile found");

      const { data, error } = await supabase
        .from("meals")
        .insert([
          {
            vendor_id: vendor.id,
            ...mealData,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setMeals((prev) => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateMeal = async (mealId: string, updates: Partial<Meal>) => {
    try {
      const { data, error } = await supabase
        .from("meals")
        .update(updates)
        .eq("id", mealId)
        .select()
        .single();

      if (error) throw error;

      setMeals((prev) =>
        prev.map((meal) => (meal.id === mealId ? data : meal))
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const deleteMeal = async (mealId: string) => {
    try {
      const { error } = await supabase.from("meals").delete().eq("id", mealId);

      if (error) throw error;

      setMeals((prev) => prev.filter((meal) => meal.id !== mealId));
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const toggleMealAvailability = async (
    mealId: string,
    isAvailable: boolean
  ) => {
    return await updateMeal(mealId, { is_available: isAvailable });
  };

  return {
    meals,
    loading,
    addMeal,
    updateMeal,
    deleteMeal,
    toggleMealAvailability,
    refreshMeals: fetchMeals,
  };
};

export const useVendorOrders = () => {
  const { vendor } = useVendor();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vendor) {
      fetchOrders();
    }
  }, [vendor]);

  const fetchOrders = async () => {
    try {
      if (!vendor) return;

      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          customer:users!orders_customer_id_fkey(*),
          meal:meals(*)
        `
        )
        .eq("vendor_id", vendor.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: Order["status"]
  ) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .select()
        .single();

      if (error) throw error;

      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? data : order))
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    orders,
    loading,
    updateOrderStatus,
    refreshOrders: fetchOrders,
  };
};
