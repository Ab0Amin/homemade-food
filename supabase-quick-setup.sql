-- Simplified Supabase Schema for Quick Setup
-- Copy and paste this into your Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
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
CREATE TABLE IF NOT EXISTS public.vendors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
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
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, description, icon) VALUES
    ('Appetizers', 'Starters and small bites', '🥗'),
    ('Main Courses', 'Full meals and entrees', '🍽️'),
    ('Desserts', 'Sweet treats and desserts', '🍰'),
    ('Beverages', 'Drinks and refreshments', '🥤'),
    ('Snacks', 'Light snacks and finger foods', '🍿'),
    ('Breakfast', 'Morning meals', '🍳')
ON CONFLICT (name) DO NOTHING;

-- Meals table
CREATE TABLE IF NOT EXISTS public.meals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.categories(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    currency TEXT DEFAULT 'USD',
    preparation_time INTEGER DEFAULT 30,
    serving_size TEXT DEFAULT '1 person',
    ingredients TEXT[],
    allergens TEXT[],
    is_available BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT TRUE,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for Vendors
CREATE POLICY "Anyone can view active vendors" ON public.vendors FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors can manage own profile" ON public.vendors FOR ALL USING (
    auth.uid() = user_id
);

-- RLS Policies for Categories
CREATE POLICY "Anyone can view active categories" ON public.categories FOR SELECT USING (is_active = true);

-- RLS Policies for Meals
CREATE POLICY "Anyone can view approved meals" ON public.meals FOR SELECT USING (is_approved = true);
CREATE POLICY "Vendors can view own meals" ON public.meals FOR SELECT USING (
    vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())
);
CREATE POLICY "Vendors can manage own meals" ON public.meals FOR ALL USING (
    vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())
);

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER handle_users_updated_at BEFORE UPDATE ON public.users 
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_vendors_updated_at BEFORE UPDATE ON public.vendors 
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_meals_updated_at BEFORE UPDATE ON public.meals 
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
