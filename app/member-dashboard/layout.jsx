
'use client';
import { useState } from 'react';
import DashboardSidebar from '@/components/layout/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/layout/dashboard/DashoardHeader';

export default function MemberDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-950">
      <DashboardSidebar 
        isMobile={true} 
        isOpen={sidebarOpen} 
        onClose={toggleSidebar} 
      />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <DashboardHeader onMenuToggle={toggleSidebar} />
        <main className="p-4 w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}