// MemberDashboardLayout.js
'use client';
import { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/layout/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/layout/dashboard/DashoardHeader';

export default function MemberDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked, current state:', sidebarOpen);
    setSidebarOpen(prev => {
      const newState = !prev;
      console.log('New sidebar state:', newState);
      return newState;
    });
  };

  const closeSidebar = () => {
    console.log('Closing sidebar');
    setSidebarOpen(false);
  };

  // Close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && sidebarOpen) {
        console.log('Closing sidebar due to screen resize');
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar - Only visible on desktop */}
      <DashboardSidebar isMobile={false} />
      
      {/* Mobile Sidebar - Always rendered but conditionally visible */}
      <DashboardSidebar 
        isMobile={true} 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuToggle={toggleSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
        
        {/* Debug info - remove in production */}
        <div className="fixed bottom-4 left-4 bg-black text-white p-2 rounded text-xs md:hidden z-50">
          Mobile Menu: {sidebarOpen ? 'OPEN' : 'CLOSED'}
        </div>
      </div>
    </div>
  );
}