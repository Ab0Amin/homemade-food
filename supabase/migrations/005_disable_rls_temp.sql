-- Temporary fix: Disable RLS for testing
-- Run this first to test if signup works

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

SELECT 'RLS disabled for testing - signup should work now' as status;

-- To re-enable later when everything works:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;