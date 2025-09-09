# 🚀 Supabase Setup Instructions

Follow these steps to create and configure your Supabase project for the Homemade Food Marketplace.

## Step 1: Create Supabase Account & Project

1. **Go to** https://supabase.com
2. **Click "Start your project"**
3. **Sign up/Login** (GitHub recommended for easier setup)
4. **Click "New Project"**
5. **Fill in project details:**
   - Organization: Create new or select existing
   - Name: `homemade-food-marketplace`
   - Database Password: **SAVE THIS PASSWORD!** (you'll need it)
   - Region: Choose closest to your location (e.g., US East, Europe West)
6. **Click "Create new project"**
7. **Wait 2-3 minutes** for setup to complete

## Step 2: Get Your Project Credentials

1. **Once project is ready**, go to **Settings → API** (gear icon on left sidebar)
2. **Copy these two values:**
   - **Project URL** (starts with `https://xxx.supabase.co`)
   - **Project API Key** (anon public key - starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. **Open your `.env` file** in the project root
2. **Replace the placeholder values:**
```env
EXPO_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL_HERE
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
EXPO_PUBLIC_APP_NAME=Homemade Food Marketplace
EXPO_PUBLIC_APP_VERSION=1.0.0
```

**Example:**
```env
EXPO_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Set Up Database Schema

1. **Go to SQL Editor** in your Supabase dashboard (left sidebar)
2. **Copy the entire content** from `supabase-quick-setup.sql` file
3. **Paste it into the SQL Editor**
4. **Click "Run"** (bottom right)
5. **Verify success** - you should see "Success. No rows returned" message

## Step 5: Verify Tables Were Created

1. **Go to Table Editor** (left sidebar)
2. **You should see these tables:**
   - `users`
   - `vendors`
   - `categories`
   - `meals`
3. **Click on `categories` table** - should have 6 default categories

## Step 6: Configure Authentication

1. **Go to Authentication → Settings** (left sidebar)
2. **Site URL:** 
   - Add: `http://localhost:8081`
   - For production, add your actual domain
3. **Redirect URLs:**
   - Add: `http://localhost:8081/**`
4. **Email Templates** (optional but recommended):
   - Customize the confirmation and reset password emails

## Step 7: Test the Connection

1. **Restart your Expo development server:**
```bash
npx expo start --clear
```

2. **Open your app** and look for the "🔧 Test Supabase Connection" button
3. **Tap the button** - you should see "✅ Success" message
4. **If you see an error:**
   - Check your `.env` file has correct values
   - Restart Expo server: `Ctrl+C` then `npx expo start`
   - Verify you ran the SQL schema

## Step 8: Test User Registration

1. **Try creating a new account:**
   - Click "Don't have an account? Sign up"
   - Fill in the form and submit
   - Check **Authentication → Users** in Supabase dashboard
   - You should see your new user

2. **Check database:**
   - Go to **Table Editor → users**
   - Your user profile should appear here

## Common Issues & Solutions

### ❌ "Invalid API key" error
- **Solution:** Double-check your `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env`
- Make sure you copied the **anon public** key, not the service role key

### ❌ "relation does not exist" error
- **Solution:** Run the SQL schema again in SQL Editor
- Check that all tables were created in Table Editor

### ❌ Environment variables not working
- **Solution:** Restart Expo server after changing `.env`
- Variable names must start with `EXPO_PUBLIC_`

### ❌ "Row Level Security policy violation"
- **Solution:** This means RLS is working! 
- Users can only access their own data (this is correct)

## Next Steps After Setup

1. **Test vendor registration** - create a vendor account
2. **Complete vendor profile** - add business information
3. **Add a test meal** - try the meal creation flow
4. **Verify in Supabase** - check data appears in tables

## Security Notes

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Users can only access their own data
- ✅ Meals require approval before being public (set to auto-approve for now)
- ✅ Environment variables are properly configured

## Production Checklist (for later)

- [ ] Change meal approval from auto to manual (`is_approved: false`)
- [ ] Set up proper email templates
- [ ] Configure custom domain
- [ ] Set up database backups
- [ ] Monitor API usage

---

**🎉 Once setup is complete, you'll have a fully functional backend for your marketplace!**
