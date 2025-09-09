# حل مشكلة Supabase Extension في VS Code

## المشكلة
تظهر رسالة: "Could not connect to local Supabase project. Make sure you've run 'supabase start'!"

## الحل الأسهل: استخدام Supabase Cloud

### الخطوة 1: إعداد مشروع Supabase Cloud
1. اذهب إلى https://supabase.com
2. انقر "Start your project"
3. سجل دخول باستخدام GitHub
4. أنشئ مشروع جديد:
   - الاسم: `homemade-food-marketplace`
   - كلمة المرور: اختر كلمة مرور قوية
   - المنطقة: اختر الأقرب لك

### الخطوة 2: احصل على بيانات الاتصال
1. اذهب إلى Settings → API
2. انسخ:
   - Project URL
   - Project API Key (anon public)

### الخطوة 3: حدث ملف .env
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_APP_NAME=Homemade Food Marketplace
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### الخطوة 4: تشغيل SQL Schema
1. اذهب إلى SQL Editor في لوحة تحكم Supabase
2. انسخ محتوى ملف `supabase-quick-setup.sql`
3. الصقه وشغله

### الخطوة 5: إعداد VS Code Extension
1. ثبت "Supabase" extension في VS Code
2. افتح Command Palette (Ctrl+Shift+P)
3. اكتب "Supabase: Connect to Project"
4. اختر "Connect to hosted project"
5. أدخل Project URL و API key

### الخطوة 6: اختبار الاتصال
1. شغل التطبيق: `npx expo start`
2. انقر على زر "🔧 Test Supabase Connection"
3. يجب أن ترى رسالة نجاح

## حل مشاكل VS Code Extension

### إذا كان Extension يطلب local project:
1. افتح Command Palette (Ctrl+Shift+P)
2. اكتب "Supabase: Disconnect"
3. ثم "Supabase: Connect to Project"
4. اختر "Connect to hosted project"
5. أدخل بيانات cloud project

### إذا لم يعمل Extension:
1. أعد تشغيل VS Code
2. تأكد من أن Extension محدث لآخر إصدار
3. جرب إلغاء تثبيت وإعادة تثبيت Extension

## اختبار النظام

### 1. اختبار الاتصال الأساسي
```bash
npx expo start
# انقر زر Test Supabase Connection في التطبيق
```

### 2. اختبار التسجيل
1. انقر "Don't have an account? Sign up"
2. املأ النموذج واضغط إرسال
3. تحقق من Authentication → Users في Supabase

### 3. اختبار البيانات
1. تحقق من Table Editor في Supabase
2. يجب أن ترى الجداول: users, vendors, categories, meals

## رسائل الخطأ الشائعة وحلولها

### ❌ "Invalid API key"
**الحل:** تأكد من أنك نسخت anon public key وليس service role key

### ❌ "relation does not exist"  
**الحل:** شغل SQL schema مرة أخرى في SQL Editor

### ❌ "Environment variables not set"
**الحل:** 
1. تأكد من ملف .env في المجلد الرئيسي
2. أعد تشغيل Expo server
3. تأكد من أن المتغيرات تبدأ بـ EXPO_PUBLIC_

### ❌ "Row Level Security policy violation"
**الحل:** هذا طبيعي! يعني أن الأمان يعمل بشكل صحيح

## مميزات Supabase Cloud مقابل Local

### ✅ Supabase Cloud:
- لا يحتاج تثبيت محلي
- أداء أفضل
- نسخ احتياطية تلقائية
- مشاركة الفريق
- تحديثات تلقائية

### ❌ Local Supabase:
- يحتاج Docker
- مشاكل في Windows
- يحتاج موارد النظام
- لا يوجد نسخ احتياطية

## الخطوات التالية

بعد إعداد Supabase بنجاح:
1. جرب إنشاء حساب vendor
2. أكمل الملف الشخصي للـ vendor
3. أضف وجبة تجريبية
4. تحقق من البيانات في Supabase dashboard
