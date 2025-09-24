-- Fix infinite recursion in vendor policies
-- Run this in Supabase SQL Editor

-- Drop the problematic policy
DROP POLICY IF EXISTS "Vendors can manage own profile" ON vendors;

-- Create corrected policies
CREATE POLICY "Vendors can view own profile" ON vendors FOR SELECT USING (
    auth.uid() = user_id
);

CREATE POLICY "Vendors can update own profile" ON vendors FOR UPDATE USING (
    auth.uid() = user_id
);

CREATE POLICY "Vendors can delete own profile" ON vendors FOR DELETE USING (
    auth.uid() = user_id
);

-- Keep the existing insert policy (it's correct)
-- CREATE POLICY "Users can create vendor profile" ON vendors FOR INSERT WITH CHECK (auth.uid() = user_id);

SELECT 'Vendor infinite recursion fixed!' as status;