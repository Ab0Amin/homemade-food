import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import { useSegments } from "expo-router";
import { useAuth } from "./useAuth";

export const usePreventGoBack = () => {
  const { user } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (Platform.OS === "android" && user) {
      const backAction = () => {
        const currentRoute = segments.join("/");

        // If on main screens (vendor or customer root), allow app exit
        if (currentRoute === "vendor" || currentRoute === "customer") {
          BackHandler.exitApp();
          return true;
        }

        // Allow normal back navigation within the app
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, [user]);
};
