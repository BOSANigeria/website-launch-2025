"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MemberDashboardLayout from "@/app/member-dashboard/layout";
import { useState } from "react";

const queryClient = new QueryClient();

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname?.startsWith("/member-dashboard") ||
    pathname?.startsWith("/super-admin");

  return (
    <QueryClientProvider client={queryClient}>
      {isDashboardRoute ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      )}
    </QueryClientProvider>
  );
}
