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
    joinOurCommunity: "Join our homemade food community",
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
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    phoneNumber: "Phone Number",
    selectUserType: "I want to:",
    customerOption: "Order food (Customer)",
    chefOption: "Cook food (Chef)",
    acceptTerms: "I accept the Terms of Service and Privacy Policy",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    iAcceptThe: "I accept the",
    andThe: "and",
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

  legal: {
    termsOfServiceTitle: "Terms of Service",
    privacyPolicyTitle: "Privacy Policy",
    lastUpdated: "Last updated",

    // Terms of Service
    acceptance: "Acceptance of Terms",
    acceptanceText:
      "By using HomeMade Food app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.",

    serviceDescription: "Service Description",
    serviceDescriptionText:
      "HomeMade Food is a platform that connects home cooks with food lovers. Our service allows home chefs to offer their homemade meals and customers to order authentic, homemade food from their local community.",

    userResponsibilities: "User Responsibilities",
    userResponsibilitiesText:
      "Users must provide accurate information, maintain account security, and comply with all applicable laws. Home cooks are responsible for food quality, safety, and proper handling according to local health regulations.",

    foodSafety: "Food Safety and Quality",
    foodSafetyText:
      "Home cooks must follow proper food safety guidelines, maintain clean cooking environments, and accurately describe ingredients and allergens. Customers should communicate any allergies or dietary restrictions clearly.",

    payments: "Payments and Fees",
    paymentsText:
      "Payment processing is handled through secure third-party services. HomeMade Food may charge service fees. Refund policies apply in cases of order cancellation or food safety issues.",

    liability: "Limitation of Liability",
    liabilityText:
      "HomeMade Food acts as a platform connecting users. While we strive to ensure quality, we are not liable for food quality, allergic reactions, or disputes between users. Users participate at their own risk.",

    termination: "Account Termination",
    terminationText:
      "We reserve the right to suspend or terminate accounts for violations of these terms, fraudulent activity, or other reasonable cause. Users may delete their accounts at any time.",

    // Privacy Policy
    informationCollection: "Information We Collect",
    informationCollectionText:
      "We collect information you provide when creating an account, placing orders, and using our services. This includes name, email, phone number, address, and payment information.",

    informationUse: "How We Use Your Information",
    informationUseText:
      "Your information is used to provide our services, process orders, communicate with you, improve our platform, and ensure food safety and security.",

    informationSharing: "Information Sharing",
    informationSharingText:
      "We only share your information with home cooks for order fulfillment, payment processors for transactions, and as required by law. We never sell your personal data to third parties.",

    dataSecurity: "Data Security",
    dataSecurityText:
      "We implement industry-standard security measures to protect your personal information. However, no system is completely secure, and we cannot guarantee absolute security.",

    userRights: "Your Rights",
    userRightsText:
      "You have the right to access, update, or delete your personal information. You can also opt out of marketing communications and request data portability.",

    cookies: "Cookies and Tracking",
    cookiesText:
      "We use cookies and similar technologies to improve user experience, analyze usage patterns, and provide personalized content. You can manage cookie preferences in your browser settings.",

    policyChanges: "Policy Changes",
    policyChangesText:
      "We may update this privacy policy from time to time. We will notify users of significant changes and update the 'last modified' date at the top of this policy.",

    contactInfo: "Contact Information",
    contactInfoText:
      "For questions about these terms or privacy policy, contact us at: support@homemadefood.com or through our in-app support system.",
  },
};

export type TranslationKey = typeof en;
