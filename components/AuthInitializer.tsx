"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/lib/api/client";

/**
 * This component initializes authentication on app load
 * It restores the token from localStorage to the API client
 */
export default function AuthInitializer() {
  useEffect(() => {
    // Get the persisted auth state
    const token = useAuthStore.getState().token;

    // If token exists, set it in the API client
    if (token) {
      apiClient.setToken(token);
      console.log("✅ Auth token restored from storage");
    }
  }, []);

  return null; // This component doesn't render anything
}
