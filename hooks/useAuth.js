// hooks/useAuth.js
'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      const res = await fetch("/api/auth/check-auth", {
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      return data.user;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      // Attempt to clear cookie client-side (even though it's httpOnly)
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

      // Clear react-query cache
      queryClient.clear();

      return data?.success;
    } catch (err) {
      console.error("Logout error:", err);
      return false;
    }
  };

  return {
    user: data,
    isLoading,
    isError,
    logout,
  };
};
