# 🍽️ Homemade Food App

A React Native app built with Expo that connects home cooks with food lovers. Features complete Arabic/English localization, user authentication, and a modern UI.

## ✨ Features

- 🌍 **Full Bilingual Support**: Arabic (RTL) and English
- 🔐 **User Authentication**: Sign up, sign in with Supabase
- 👥 **Multi-User Types**: Customer, Vendor, Admin roles
- 🎨 **Modern UI**: Theme-aware components with dark/light mode
- 📱 **Cross-Platform**: iOS, Android, and Web support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- Docker (for local Supabase)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd homemade-food
   npm install
   ```

2. **Set up Supabase database:**
   ```bash
   # Option 1: Local development (recommended)
   npx supabase init
   npx supabase start
   
   # Option 2: Use Supabase cloud
   # Create project at supabase.com and get credentials
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Apply database migrations:**
   ```bash
   npx supabase db reset  # For local
   # Or run SQL in supabase/migrations/001_create_users_table.sql in Supabase dashboard
   ```

5. **Start the app:**
   ```bash
   npm start
   ```

## 🗄️ Database Schema

The app uses the following main table:

```sql
create table public.users (
  id uuid not null,
  email text not null,
  full_name text not null,
  phone_number text null,
  user_type text not null default 'customer'::text,
  avatar_url text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email),
  constraint users_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
  constraint users_user_type_check check (
    (user_type = any (array['customer'::text, 'vendor'::text, 'admin'::text]))
  )
) TABLESPACE pg_default;
```

## 🧪 Testing

### Database Integration Test
The app includes built-in database testing:

1. **Using the UI**: Go to Home tab and use "Database Tests" card
2. **Using scripts**: 
   ```bash
   node scripts/test-database.js
   ```

### Manual Testing Flow

1. **Test Registration:**
   - Go to Sign Up
   - Fill all fields
   - Select user type (Customer/Vendor/Admin)
   - Submit form
   - Check email verification

2. **Test Sign In:**
   - Use registered credentials
   - Verify profile loads correctly
   - Check user type persistence

3. **Test Language Switch:**
   - Go to Settings
   - Change language
   - Verify UI updates (including RTL for Arabic)

## 🔧 Development

### Project Structure
```
├── app/
│   ├── (auth)/          # Authentication screens
│   ├── (tabs)/          # Main tab navigation
│   └── _layout.tsx      # Root navigation
├── components/
│   ├── ui/              # Reusable UI components
│   └── Themed.tsx       # Theme-aware components
├── constants/
│   ├── localization/    # Translation files
│   └── Theme.ts         # Theme configuration
├── hooks/
│   └── useAuth.tsx      # Authentication hook
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── supabase-helpers.ts # Database utilities
└── types/
    └── index.ts         # TypeScript definitions
```

### Adding New Features

1. **New UI Component:**
   ```bash
   # Create component in components/ui/
   # Add to components/ui/index.ts exports
   # Follow theme and localization patterns
   ```

2. **New Screen:**
   ```bash
   # Add to app/ directory following Expo Router conventions
   # Use existing layout patterns
   # Add navigation and translations
   ```

3. **Database Changes:**
   ```bash
   # Create migration in supabase/migrations/
   # Update TypeScript types in types/index.ts
   # Update Supabase helpers if needed
   ```

## 🌍 Localization

### Adding New Languages

1. **Create translation file:**
   ```typescript
   // constants/localization/fr.ts
   export const fr = {
     common: { ... },
     auth: { ... },
     // ... match structure of en.ts
   };
   ```

2. **Update index:**
   ```typescript
   // constants/localization/index.ts
   import { fr } from './fr';
   // Add to translations object
   ```

3. **Add to selector:**
   ```typescript
   // components/ui/LanguageSelector.tsx
   // Add new language option
   ```

### Translation Keys Structure
```typescript
{
  common: { ok, cancel, error, success, ... },
  auth: { signIn, signUp, email, password, ... },
  settings: { language, appearance, account, ... },
  navigation: { home, profile, orders, ... }
}
```

## 🔒 Authentication Flow

1. **Sign Up**: Creates user in `auth.users` and profile in `public.users`
2. **Sign In**: Validates credentials and loads user profile
3. **Session Management**: Automatic token refresh and state management
4. **Profile Updates**: Synced with `public.users` table

## 📱 Deployment

### Expo Build
```bash
# iOS
expo build:ios

# Android
expo build:android

# Web
expo build:web
```

### Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_APP_NAME=Homemade Food
EXPO_PUBLIC_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📋 TODO

- [ ] Vendor management system
- [ ] Order placement and tracking
- [ ] Payment integration
- [ ] Push notifications
- [ ] Image upload for meals
- [ ] Rating and review system
- [ ] Advanced search and filtering

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ for the homemade food community
