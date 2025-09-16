import { supabase } from "@/lib/supabase";

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);
    if (error) throw error;
    return { success: true, message: "Database connection successful" };
  } catch (error) {
    return { success: false, message: `Database connection failed: ${error}` };
  }
};

// Test user signup flow
export const testUserSignup = async () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = "testpassword123";

  try {
    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No user returned from signup");

    console.log("✅ Auth signup successful:", authData.user.id);

    // 2. Create user profile
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .insert([
        {
          id: authData.user.id,
          email: testEmail,
          full_name: "Test User",
          phone_number: "+1234567890",
          user_type: "customer",
        },
      ])
      .select()
      .single();

    if (profileError) throw profileError;

    console.log("✅ Profile creation successful:", profileData);

    // 3. Clean up - delete test user
    await supabase.auth.admin.deleteUser(authData.user.id);

    return {
      success: true,
      message: "User signup flow test completed successfully",
      data: { authData, profileData },
    };
  } catch (error) {
    console.error("❌ Test failed:", error);
    return {
      success: false,
      message: `Test failed: ${error}`,
      error,
    };
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// Check if email exists
export const checkEmailExists = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .limit(1);

    if (error) throw error;
    return { exists: data && data.length > 0 };
  } catch (error) {
    console.error("Error checking email:", error);
    return { exists: false, error };
  }
};
