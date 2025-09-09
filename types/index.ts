export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  user_type: "customer" | "vendor" | "admin";
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  description?: string;
  address: string;
  city: string;
  phone_number: string;
  whatsapp_number?: string;
  is_verified: boolean;
  is_active: boolean;
  rating: number;
  total_orders: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
}

export interface Meal {
  id: string;
  vendor_id: string;
  category_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  preparation_time: number; // in minutes
  serving_size: string;
  ingredients?: string[];
  allergens?: string[];
  is_available: boolean;
  is_approved: boolean;
  images: string[];
  created_at: string;
  updated_at: string;
  vendor?: Vendor;
  category?: Category;
}

export interface Order {
  id: string;
  customer_id: string;
  vendor_id: string;
  meal_id: string;
  quantity: number;
  total_price: number;
  currency: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  customer_notes?: string;
  vendor_notes?: string;
  delivery_address?: string;
  delivery_phone?: string;
  scheduled_for?: string;
  created_at: string;
  updated_at: string;
  customer?: User;
  vendor?: Vendor;
  meal?: Meal;
}

export interface Review {
  id: string;
  customer_id: string;
  vendor_id: string;
  order_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  customer?: User;
}

export type UserType = "customer" | "vendor" | "admin";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";
