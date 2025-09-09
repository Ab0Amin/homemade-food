export const en = {
  // Landing Page
  landing: {
    title: "Homemade Food Marketplace",
    subtitle: "Discover delicious homemade meals from local cooks",
    customerButton: "I'm a Customer",
    customerSubtext: "Browse and order meals",
    cookButton: "I'm a Cook",
    cookSubtext: "Sell your homemade food",
    signUpLink: "Don't have an account? Sign up",
    testConnection: "🔧 Test Supabase Connection",
    loading: "Loading...",
  },

  // Common UI
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    ok: "OK",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    done: "Done",
    retry: "Retry",
  },

  // Authentication
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    rememberMe: "Remember me",
    orContinueWith: "Or continue with",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",

    // Sign Up specific
    createAccount: "Create Account",
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    selectUserType: "I want to:",
    customerOption: "Order food (Customer)",
    vendorOption: "Sell food (Cook/Vendor)",
    adminOption: "Manage platform (Admin)",
    acceptTerms: "I accept the Terms of Service and Privacy Policy",
    createAccountButton: "Create Account",
    signUpSuccess: "Account created successfully!",
    signUpError: "Failed to create account",

    // Form validation
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 6 characters",
    confirmPasswordRequired: "Please confirm your password",
    passwordsDontMatch: "Passwords don't match",
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    phoneRequired: "Phone number is required",
    userTypeRequired: "Please select account type",
    termsRequired: "Please accept the terms and conditions",
  },

  // Supabase Connection Test
  supabase: {
    testing: "🔧 Testing...",
    checkingConnection: "Checking Supabase connection...",
    connectionSuccess: "✅ Success",
    connectionWorking: "Supabase connection is working!",
    great: "Great!",
    connectionFailed: "❌ Connection Failed",
    setupGuide: "Setup Guide",
    setupSteps: "📋 Setup Steps",
    setupInstructions:
      "1. Create Supabase project at supabase.com\n2. Copy URL and API key\n3. Update .env file\n4. Run SQL schema\n5. Restart app",
  },

  // Navigation
  navigation: {
    home: "Home",
    profile: "Profile",
    orders: "Orders",
    favorites: "Favorites",
    settings: "Settings",
  },

  // Settings
  settings: {
    language: "Language",
    languageDescription: "Choose your preferred language for the app",
    appearance: "Appearance",
    appearanceDescription: "Customize how the app looks and feels",
    account: "Account",
    accountDescription: "Manage your account settings and preferences",
    notifications: "Notifications",
    notificationsDescription: "Control what notifications you receive",
    privacy: "Privacy & Security",
    privacyDescription: "Manage your privacy and security settings",
    about: "About",
    aboutDescription: "App version and legal information",
  },
};

export type TranslationKey = typeof en;
