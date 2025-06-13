"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const queryClient = new QueryClient();

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname?.startsWith("/member-dashboard") ||
    pathname?.startsWith("/super-admin");

  return (
    <QueryClientProvider client={queryClient}>
      {!isDashboardRoute && <Navbar />}
      <main className={`${!isDashboardRoute ? "flex-1" : ""}`}>
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
    </QueryClientProvider>
  );
}
