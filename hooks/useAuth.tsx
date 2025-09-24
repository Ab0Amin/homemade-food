import { useState, useEffect, createContext, useContext } from "react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { User, UserType } from "@/types";

interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
  user_type: UserType;
  date_of_birth?: string;
  gender?: "male" | "female" | "other";
  business_name?: string;
  business_description?: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (userData: SignUpData) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (userData: Partial<User>) => Promise<{ error: any }>;
  upgradeToVendor: (vendorData: {
    business_name: string;
    business_description: string;
    business_license?: string;
    website_url?: string;
  }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
  updateProfile: async () => ({ error: null }),
  upgradeToVendor: async () => ({ error: null }),
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        await fetchUserProfile(session.user.id);

        // After successful login, redirect based on user type
        if (event === "SIGNED_IN") {
          try {
            const { data: userData } = await supabase
              .from("users")
              .select("user_type")
              .eq("id", session.user.id)
              .single();

            if (userData?.user_type === "vendor") {
              router.replace("/(vendor)" as any);
            } else {
              router.replace("/(customer)" as any);
            }
          } catch (error) {
            console.error("Error redirecting after login:", error);
            router.replace("/(customer)" as any); // Default fallback
          }
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: SignUpData) => {
    try {
      console.log("🚀 Simple signup...");

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile - simple insert
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: authData.user.email,
          full_name: userData.full_name,
          phone_number: userData.phone_number,
          user_type: userData.user_type,
          date_of_birth: userData.date_of_birth,
          gender: userData.gender,
          business_name: userData.business_name,
          business_description: userData.business_description,
        });

        if (profileError) throw profileError;
        console.log("✅ Signup complete!");
      }

      return { error: null };
    } catch (error: any) {
      console.error("❌ Signup error:", error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        console.log("✅ User signed in successfully:", {
          id: data.user.id,
          email: data.user.email,
        });
      }

      return { error: null };
    } catch (error: any) {
      console.error("❌ Sign in error:", error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear user state manually to ensure immediate update
      setUser(null);
      setSession(null);

      // Navigate to sign-in page
      router.replace("/(auth)/sign-in");

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("users")
        .update(userData)
        .eq("id", user.id);

      if (error) throw error;

      setUser({ ...user, ...userData });
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Simple function to upgrade user to vendor
  const upgradeToVendor = async (vendorData: {
    business_name: string;
    business_description: string;
    business_license?: string;
    website_url?: string;
  }) => {
    try {
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase.rpc("upgrade_to_vendor", {
        user_id: user.id,
        business_name_param: vendorData.business_name,
        business_description_param: vendorData.business_description,
        business_license_param: vendorData.business_license || null,
        website_url_param: vendorData.website_url || null,
      });

      if (error) throw error;

      // Update local user state
      const updatedUser = {
        ...user,
        user_type: "vendor" as UserType,
        business_name: vendorData.business_name,
        business_description: vendorData.business_description,
        business_license: vendorData.business_license,
        website_url: vendorData.website_url,
      };

      setUser(updatedUser);
      console.log("✅ User upgraded to vendor successfully");

      return { error: null };
    } catch (error: any) {
      console.error("❌ Vendor upgrade error:", error);
      return { error };
    }
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    upgradeToVendor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
