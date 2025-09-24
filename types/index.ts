// User types
export type UserType = "customer" | "vendor" | "admin";
export type Gender = "male" | "female" | "other";
export type VerificationType = "email" | "phone" | "both";

// Address interface
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Business hours interface
export interface BusinessHours {
  monday?: { open: string; close: string; closed?: boolean };
  tuesday?: { open: string; close: string; closed?: boolean };
  wednesday?: { open: string; close: string; closed?: boolean };
  thursday?: { open: string; close: string; closed?: boolean };
  friday?: { open: string; close: string; closed?: boolean };
  saturday?: { open: string; close: string; closed?: boolean };
  sunday?: { open: string; close: string; closed?: boolean };
}

// Social links interface
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  telegram?: string;
  linkedin?: string;
}

// User preferences interface
export interface UserPreferences {
  language?: "en" | "ar";
  theme?: "light" | "dark" | "system";
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    marketing?: boolean;
  };
  privacy?: {
    showEmail?: boolean;
    showPhone?: boolean;
    showAddress?: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  user_type: UserType;
  avatar_url?: string;

  // Additional profile fields
  date_of_birth?: string;
  gender?: Gender;
  address?: Address;
  preferences?: UserPreferences;

  // Status fields
  is_active: boolean;
  is_verified: boolean;
  verification_type?: VerificationType;

  // Business fields (for vendors)
  business_name?: string;
  business_description?: string;
  business_license?: string;
  business_hours?: BusinessHours;

  // Social and contact
  social_links?: SocialLinks;
  website_url?: string;

  // Metadata
  metadata?: Record<string, any>;
  last_login_at?: string;

  // Timestamps
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

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";
