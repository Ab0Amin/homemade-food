import { TranslationKey } from "./en";

export const ar: TranslationKey = {
  // Landing Page
  landing: {
    title: "سوق الطعام المنزلي",
    subtitle: "اكتشف الوجبات المنزلية اللذيذة من الطباخين المحليين",
    customerButton: "أنا عميل",
    customerSubtext: "تصفح واطلب الوجبات",
    cookButton: "أنا طباخ",
    cookSubtext: "بع طعامك المنزلي",
    signUpLink: "ليس لديك حساب؟ سجل الآن",
    testConnection: "🔧 اختبار اتصال قاعدة البيانات",
    loading: "جاري التحميل...",
  },

  // Common UI
  common: {
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    ok: "موافق",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    back: "رجوع",
    next: "التالي",
    done: "تم",
    retry: "إعادة المحاولة",
  },

  // Authentication
  auth: {
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    signOut: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    rememberMe: "تذكرني",
    orContinueWith: "أو تابع باستخدام",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    dontHaveAccount: "ليس لديك حساب؟",

    // Sign Up specific
    createAccount: "إنشاء حساب",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    phoneNumber: "رقم الهاتف",
    selectUserType: "أريد أن:",
    customerOption: "أطلب الطعام (عميل)",
    vendorOption: "أبيع الطعام (طباخ/بائع)",
    adminOption: "أدير المنصة (مدير)",
    acceptTerms: "أوافق على شروط الخدمة وسياسة الخصوصية",
    createAccountButton: "إنشاء الحساب",
    signUpSuccess: "تم إنشاء الحساب بنجاح!",
    signUpError: "فشل في إنشاء الحساب",

    // Form validation
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
    passwordRequired: "كلمة المرور مطلوبة",
    passwordTooShort: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    confirmPasswordRequired: "يرجى تأكيد كلمة المرور",
    passwordsDontMatch: "كلمات المرور غير متطابقة",
    firstNameRequired: "الاسم الأول مطلوب",
    lastNameRequired: "اسم العائلة مطلوب",
    phoneRequired: "رقم الهاتف مطلوب",
    userTypeRequired: "يرجى اختيار نوع الحساب",
    termsRequired: "يرجى الموافقة على الشروط والأحكام",
  },

  // Supabase Connection Test
  supabase: {
    testing: "🔧 جاري الاختبار...",
    checkingConnection: "فحص اتصال قاعدة البيانات...",
    connectionSuccess: "✅ نجح الاتصال",
    connectionWorking: "اتصال قaعدة البيانات يعمل بشكل صحيح!",
    great: "ممتاز!",
    connectionFailed: "❌ فشل الاتصال",
    setupGuide: "دليل الإعداد",
    setupSteps: "📋 خطوات الإعداد",
    setupInstructions:
      "1. إنشاء مشروع Supabase في supabase.com\n2. نسخ الرابط ومفتاح API\n3. تحديث ملف .env\n4. تشغيل قاعدة البيانات\n5. إعادة تشغيل التطبيق",
  },

  // Navigation
  navigation: {
    home: "الرئيسية",
    profile: "الملف الشخصي",
    orders: "الطلبات",
    favorites: "المفضلة",
    settings: "الإعدادات",
  },

  // Settings
  settings: {
    language: "اللغة",
    languageDescription: "اختر لغتك المفضلة للتطبيق",
    appearance: "المظهر",
    appearanceDescription: "خصص شكل وطريقة عرض التطبيق",
    account: "الحساب",
    accountDescription: "إدارة إعدادات حسابك وتفضيلاتك",
    notifications: "الإشعارات",
    notificationsDescription: "تحكم في الإشعارات التي تتلقاها",
    privacy: "الخصوصية والأمان",
    privacyDescription: "إدارة إعدادات الخصوصية والأمان",
    about: "حول التطبيق",
    aboutDescription: "إصدار التطبيق والمعلومات القانونية",
  },
};
