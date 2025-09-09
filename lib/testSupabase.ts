import { supabase } from "@/lib/supabase";

// Test function to verify Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection...");

    // Check if environment variables are set
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        success: false,
        error: "Environment variables not set. Please check your .env file.",
      };
    }

    console.log("✅ Environment variables found");
    console.log("📡 Supabase URL:", supabaseUrl);

    // Test 1: Check if we can connect to Supabase
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Supabase connection error:", error);
      return {
        success: false,
        error: `Database error: ${error.message}. Make sure you ran the SQL schema.`,
      };
    }

    console.log("✅ Supabase connection successful!");
    console.log("📂 Categories found:", data?.length || 0);

    return {
      success: true,
      data,
      message: `Connected successfully! Found ${data?.length || 0} categories.`,
    };
  } catch (error: any) {
    console.error("Connection test failed:", error);
    return {
      success: false,
      error: `Connection failed: ${error.message}. Check your internet connection and credentials.`,
    };
  }
};

// Test authentication
export const testAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Auth test error:", error);
      return { success: false, error: error.message };
    }

    console.log("Auth session:", data.session ? "Active" : "No session");
    return { success: true, session: data.session };
  } catch (error: any) {
    console.error("Auth test failed:", error);
    return { success: false, error: error.message };
  }
};
