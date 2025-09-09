-- Homemade Food Marketplace Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security (RLS) for all tables
-- This ensures users can only access data they're authorized to see

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'vendor', 'admin')) DEFAULT 'customer',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    business_name TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    whatsapp_number TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
    total_orders INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, description, icon) VALUES
    ('Appetizers', 'Starters and small bites', '🥗'),
    ('Main Courses', 'Full meals and entrees', '🍽️'),
    ('Desserts', 'Sweet treats and desserts', '🍰'),
    ('Beverages', 'Drinks and refreshments', '🥤'),
    ('Snacks', 'Light snacks and finger foods', '🍿'),
    ('Breakfast', 'Morning meals', '🍳'),
    ('Lunch', 'Midday meals', '🥙'),
    ('Dinner', 'Evening meals', '🍲')
ON CONFLICT (name) DO NOTHING;

-- Meals table
CREATE TABLE IF NOT EXISTS meals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES categories(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    currency TEXT DEFAULT 'USD',
    preparation_time INTEGER DEFAULT 30, -- in minutes
    serving_size TEXT DEFAULT '1 person',
    ingredients TEXT[], -- array of ingredients
    allergens TEXT[], -- array of allergens
    is_available BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE, -- admin approval
    images TEXT[] DEFAULT '{}', -- array of image URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
    meal_id UUID REFERENCES meals(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
    customer_notes TEXT,
    vendor_notes TEXT,
    delivery_address TEXT,
    delivery_phone TEXT,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(customer_id, order_id) -- One review per customer per order
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_city ON vendors(city);
CREATE INDEX IF NOT EXISTS idx_vendors_is_active ON vendors(is_active);
CREATE INDEX IF NOT EXISTS idx_meals_vendor_id ON meals(vendor_id);
CREATE INDEX IF NOT EXISTS idx_meals_category_id ON meals(category_id);
CREATE INDEX IF NOT EXISTS idx_meals_is_available ON meals(is_available);
CREATE INDEX IF NOT EXISTS idx_meals_is_approved ON meals(is_approved);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_vendor_id ON reviews(vendor_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Vendors: Public read for active vendors, vendors can manage their own profile
CREATE POLICY "Anyone can view active vendors" ON vendors FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors can manage own profile" ON vendors FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM vendors WHERE id = vendors.id)
);
CREATE POLICY "Users can create vendor profile" ON vendors FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Categories: Public read
CREATE POLICY "Anyone can view active categories" ON categories FOR SELECT USING (is_active = true);

-- Meals: Public read for approved meals, vendors can manage their own meals
CREATE POLICY "Anyone can view approved meals" ON meals FOR SELECT USING (is_approved = true AND is_available = true);
CREATE POLICY "Vendors can view own meals" ON meals FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);
CREATE POLICY "Vendors can manage own meals" ON meals FOR ALL USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);

-- Orders: Customers and vendors can view their own orders
CREATE POLICY "Customers can view own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Vendors can view orders for their meals" ON orders FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);
CREATE POLICY "Customers can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Vendors can update order status" ON orders FOR UPDATE USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);

-- Reviews: Public read, customers can create reviews for their orders
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Customers can create reviews for own orders" ON reviews FOR INSERT WITH CHECK (
    auth.uid() = customer_id AND 
    order_id IN (SELECT id FROM orders WHERE customer_id = auth.uid())
);

-- Functions and triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to update vendor rating when new review is added
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE vendors 
    SET rating = (
        SELECT COALESCE(AVG(rating), 0) 
        FROM reviews 
        WHERE vendor_id = NEW.vendor_id
    )
    WHERE id = NEW.vendor_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vendor_rating_on_review 
    AFTER INSERT ON reviews 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_vendor_rating();

-- Function to update vendor total_orders when order status changes to 'delivered'
CREATE OR REPLACE FUNCTION update_vendor_order_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'delivered' AND OLD.status != 'delivered' THEN
        UPDATE vendors 
        SET total_orders = total_orders + 1
        WHERE id = NEW.vendor_id;
    ELSIF OLD.status = 'delivered' AND NEW.status != 'delivered' THEN
        UPDATE vendors 
        SET total_orders = GREATEST(total_orders - 1, 0)
        WHERE id = NEW.vendor_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vendor_order_count_on_status_change 
    AFTER UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_vendor_order_count();
