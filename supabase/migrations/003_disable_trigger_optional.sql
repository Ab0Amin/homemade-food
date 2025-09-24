-- Optional: Disable the trigger if it causes issues
-- Run this migration if you want to handle user creation manually

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Keep the function but don't trigger it automatically
-- This gives us manual control over when to create user profiles

SELECT 'User creation trigger disabled - using manual control' as status;