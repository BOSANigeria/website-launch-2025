"use client";

import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      const res = await fetch("/api/auth/check-auth", { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      return data.user;
    },
    staleTime: 5 * 60 * 1000, // cache for 5 mins
    retry: false,
  });
};
