-- Clean up script (run this first in Supabase SQL Editor)

-- Drop existing table and functions if they exist
DROP TABLE IF EXISTS public.users CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user_signup() CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.upgrade_to_vendor(uuid, text, text, text, text) CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS trigger_users_updated_at ON public.users;

-- Also clean up any existing auth users for fresh start (optional)
-- DELETE FROM auth.users WHERE email LIKE '%@example.com%';
-- DELETE FROM auth.users WHERE email = 'your-test-email@gmail.com';

SELECT 'Database cleaned up successfully' as status;