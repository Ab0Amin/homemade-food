-- Fix RLS policies to allow signup process
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Create new policies that work with signup process
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- This policy allows insert during signup process
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

-- Alternative: Disable RLS temporarily for testing
-- ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

SELECT 'RLS policies updated for signup process' as status;