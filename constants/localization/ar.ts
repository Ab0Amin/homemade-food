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
    joinOurCommunity: "انضم إلى مجتمع الطعام المنزلي",
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
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أدخل اسمك الكامل",
    phoneNumber: "رقم الهاتف",
    selectUserType: "أريد أن:",
    customerOption: "أطلب الطعام (عميل)",
    chefOption: "أطبخ الطعام (طباخ)",
    acceptTerms: "أوافق على شروط الخدمة وسياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    iAcceptThe: "أوافق على",
    andThe: "و",
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

  legal: {
    termsOfServiceTitle: "شروط الخدمة",
    privacyPolicyTitle: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث",

    // Terms of Service
    acceptance: "قبول الشروط",
    acceptanceText:
      "باستخدام تطبيق الطعام المنزلي، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدمتنا.",

    serviceDescription: "وصف الخدمة",
    serviceDescriptionText:
      "الطعام المنزلي هو منصة تربط الطباخين المنزليين بعشاق الطعام. تتيح خدمتنا للطهاة المنزليين عرض وجباتهم المنزلية وللعملاء طلب الطعام الأصيل المحضر منزلياً من مجتمعهم المحلي.",

    userResponsibilities: "مسؤوليات المستخدم",
    userResponsibilitiesText:
      "يجب على المستخدمين تقديم معلومات دقيقة والحفاظ على أمان الحساب والامتثال لجميع القوانين المعمول بها. الطباخون المنزليون مسؤولون عن جودة وسلامة الطعام والتعامل السليم وفقاً للوائح الصحية المحلية.",

    foodSafety: "سلامة وجودة الطعام",
    foodSafetyText:
      "يجب على الطباخين المنزليين اتباع إرشادات سلامة الغذاء المناسبة والحفاظ على بيئات طبخ نظيفة ووصف المكونات والمواد المسببة للحساسية بدقة. يجب على العملاء إبلاغ أي حساسية أو قيود غذائية بوضوح.",

    payments: "المدفوعات والرسوم",
    paymentsText:
      "تتم معالجة المدفوعات من خلال خدمات طرف ثالث آمنة. قد يفرض الطعام المنزلي رسوم خدمة. تطبق سياسات الاسترداد في حالات إلغاء الطلب أو مشاكل سلامة الغذاء.",

    liability: "تحديد المسؤولية",
    liabilityText:
      "يعمل الطعام المنزلي كمنصة لربط المستخدمين. بينما نسعى لضمان الجودة، فإننا غير مسؤولين عن جودة الطعام أو الحساسية أو النزاعات بين المستخدمين. يشارك المستخدمون على مسؤوليتهم الخاصة.",

    termination: "إنهاء الحساب",
    terminationText:
      "نحتفظ بالحق في تعليق أو إنهاء الحسابات بسبب انتهاك هذه الشروط أو النشاط الاحتيالي أو أي سبب معقول آخر. يمكن للمستخدمين حذف حساباتهم في أي وقت.",

    // Privacy Policy
    informationCollection: "المعلومات التي نجمعها",
    informationCollectionText:
      "نجمع المعلومات التي تقدمها عند إنشاء الحساب وتقديم الطلبات واستخدام خدماتنا. يشمل ذلك الاسم والبريد الإلكتروني ورقم الهاتف والعنوان ومعلومات الدفع.",

    informationUse: "كيف نستخدم معلوماتك",
    informationUseText:
      "تُستخدم معلوماتك لتقديم خدماتنا ومعالجة الطلبات والتواصل معك وتحسين منصتنا وضمان سلامة وأمان الطعام.",

    informationSharing: "مشاركة المعلومات",
    informationSharingText:
      "نشارك معلوماتك فقط مع الطباخين المنزليين لتنفيذ الطلبات ومعالجات الدفع للمعاملات وحسب ما يتطلبه القانون. نحن لا نبيع بياناتك الشخصية لأطراف ثالثة مطلقاً.",

    dataSecurity: "أمان البيانات",
    dataSecurityText:
      "ننفذ تدابير أمنية معيارية في الصناعة لحماية معلوماتك الشخصية. ومع ذلك، لا يوجد نظام آمن تماماً ولا يمكننا ضمان الأمان المطلق.",

    userRights: "حقوقك",
    userRightsText:
      "لك الحق في الوصول إلى معلوماتك الشخصية أو تحديثها أو حذفها. يمكنك أيضاً إلغاء الاشتراك في الاتصالات التسويقية وطلب نقل البيانات.",

    cookies: "ملفات الارتباط والتتبع",
    cookiesText:
      "نستخدم ملفات الارتباط والتقنيات المماثلة لتحسين تجربة المستخدم وتحليل أنماط الاستخدام وتقديم محتوى مخصص. يمكنك إدارة تفضيلات ملفات الارتباط في إعدادات المتصفح.",

    policyChanges: "تغييرات السياسة",
    policyChangesText:
      "قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنخطر المستخدمين بالتغييرات المهمة ونحدث تاريخ 'آخر تعديل' في أعلى هذه السياسة.",

    contactInfo: "معلومات الاتصال",
    contactInfoText:
      "للأسئلة حول هذه الشروط أو سياسة الخصوصية، تواصل معنا على: support@homemadefood.com أو من خلال نظام الدعم داخل التطبيق.",
  },
};
