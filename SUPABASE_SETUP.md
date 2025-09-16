# Supabase Setup Instructions

## Step 1: Setup Supabase Project

1. **Create a Supabase account** at https://supabase.com
2. **Create a new project**
   - Choose a project name (e.g., "homemade-food-marketplace")
   - Set a database password (save this securely)
   - Choose a region close to your users

3. **Wait for project setup** (takes a few minutes)

## Step 2: Configure Database Schema

1. **Open the SQL Editor** in your Supabase dashboard
2. **Copy and paste** the entire content from `supabase-schema.sql`
3. **Run the SQL** - this will create all tables, indexes, and security policies
4. **Verify tables were created** in the Table Editor

## Step 3: Get Your Supabase Credentials

1. Go to **Settings > API** in your Supabase dashboard
2. Copy these values:
   - **Project URL** (starts with https://xxx.supabase.co)
   - **Project API Key** (anon public key)

## Step 4: Configure Environment Variables

1. **Create `.env` file** in your project root:
```bash
cp .env.example .env
```

2. **Update `.env` with your credentials**:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_APP_NAME=Homemade Food Marketplace
EXPO_PUBLIC_APP_VERSION=1.0.0
```

## Step 5: Configure Authentication

1. **Go to Authentication > Settings** in Supabase dashboard
2. **Enable Email authentication** (should be enabled by default)
3. **Configure Site URL**: Add your app's URL
   - For development: `http://localhost:8081`
   - For production: your actual domain

4. **Optional: Configure email templates** for better user experience

## Step 6: Test the Integration

1. **Start your Expo app**:
```bash
npx expo start
```

2. **Test user registration**:
   - Try creating a vendor account
   - Check if user appears in Supabase Auth > Users
   - Verify user profile is created in the `users` table

3. **Test vendor profile creation**:
   - Complete vendor profile setup
   - Check if vendor appears in the `vendors` table

## Step 7: Data Flow Overview

### User Registration Flow:
1. User fills registration form
2. Supabase creates auth user
3. App creates user profile in `users` table
4. User is redirected based on user_type

### Vendor Profile Flow:
1. Vendor user logs in
2. App checks if vendor profile exists in `vendors` table
3. If no profile: shows setup screen
4. If profile exists: shows dashboard

### Meal Management Flow:
1. Vendor creates/updates meals
2. Data stored in `meals` table
3. Admin approval required (`is_approved` field)
4. Customers see only approved, available meals

## Step 8: Security Features

The schema includes several security features:

### Row Level Security (RLS):
- Users can only access their own data
- Vendors can only manage their own meals
- Customers can only see approved content

### Data Validation:
- Price constraints (must be > 0)
- Rating constraints (1-5 scale)
- Status enums for orders
- Required fields validation

### Automatic Updates:
- `updated_at` timestamps
- Vendor rating calculations
- Order count tracking

## Step 9: Admin Features (Future)

The schema is ready for admin features:
- Review and approve meals (`is_approved` field)
- Verify vendors (`is_verified` field)
- Monitor orders and disputes
- Manage categories

## Step 10: Production Considerations

### Performance:
- Indexes are created for common queries
- Consider adding more indexes based on usage patterns

### Backup:
- Supabase automatically backs up your data
- Consider exporting important data regularly

### Monitoring:
- Monitor API usage in Supabase dashboard
- Set up alerts for high usage

### Scaling:
- Supabase scales automatically
- Consider upgrading plan based on usage

## Common Issues and Solutions

### Issue: "relation does not exist"
- **Solution**: Make sure you ran the complete SQL schema
- Check Table Editor to verify tables exist

### Issue: "Row Level Security policy violation"
- **Solution**: User might not be properly authenticated
- Check if user is logged in and has correct permissions

### Issue: "Invalid input syntax for type uuid"
- **Solution**: Make sure you're passing proper UUID values
- Use `gen_random_uuid()` for new records

### Issue: Environment variables not loading
- **Solution**: Restart Expo dev server after changing .env
- Make sure variable names start with `EXPO_PUBLIC_`

## Next Steps for Epic 1

After setting up Supabase:

1. **Test vendor registration** and profile creation
2. **Implement meal management** screens (add, edit, delete meals)
3. **Add image upload** functionality for meal photos
4. **Create meal availability** toggle features
5. **Build vendor dashboard** with statistics and quick actions

## Database Relationships Summary

```
users (auth) → vendors → meals
                    ↓
customers → orders → reviews
```

This structure ensures data integrity and proper relationships between all entities in your marketplace.
