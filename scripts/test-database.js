const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log("🔧 Testing Supabase connection...\n");

  // Test 1: Connection
  console.log("1. Testing basic connection...");
  try {
    const { data, error } = await supabase.from("users").select("count");
    if (error) throw error;
    console.log("✅ Connection successful");
  } catch (error) {
    console.log("❌ Connection failed:", error.message);
    return;
  }

  // Test 2: Table structure
  console.log("\n2. Testing users table structure...");
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);

    if (error) throw error;
    console.log("✅ Users table accessible");
    console.log("📊 Sample data structure:", data[0] || "No users found");
  } catch (error) {
    console.log("❌ Users table error:", error.message);
  }

  // Test 3: Auth
  console.log("\n3. Testing authentication...");
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log("✅ Auth service accessible");
    console.log("👤 Current session:", data.session ? "Active" : "None");
  } catch (error) {
    console.log("❌ Auth error:", error.message);
  }

  // Test 4: Create test user (optional)
  console.log("\n4. Testing user creation (test)...");
  const testEmail = `test-${Date.now()}@example.com`;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: "testpassword123",
    });

    if (authError) throw authError;

    if (authData.user) {
      console.log("✅ Test user created in auth:", authData.user.id);

      // Try to create profile
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email: testEmail,
          full_name: "Test User",
          user_type: "customer",
        },
      ]);

      if (profileError) throw profileError;
      console.log("✅ Test user profile created");

      // Clean up
      await supabase.auth.admin.deleteUser(authData.user.id);
      console.log("🧹 Test user cleaned up");
    }
  } catch (error) {
    console.log("❌ User creation test failed:", error.message);
  }

  console.log("\n🎉 Database tests completed!");
}

testDatabase().catch(console.error);
