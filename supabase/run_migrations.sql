-- Script to run all migrations in order
-- Run this in Supabase SQL Editor after cleanup

-- Migration 1: Create users table
\i 001_create_users_table_simple.sql

-- Migration 2: Create vendor upgrade function  
\i 002_vendor_upgrade_function.sql

-- Verify everything was created
SELECT 
  table_name, 
  table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'users';

SELECT 
  routine_name,
  routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN ('handle_new_user_signup', 'upgrade_to_vendor', 'handle_updated_at');

SELECT 'All migrations completed successfully!' as status;