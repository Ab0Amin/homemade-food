-- Simple fix: Remove trigger completely and handle everything manually
-- Run this in Supabase SQL Editor

-- Remove the automatic trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Disable RLS temporarily to avoid complications
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

SELECT 'Trigger removed and RLS disabled - manual signup only' as status;