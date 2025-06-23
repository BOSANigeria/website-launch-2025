// DashboardSidebar.js
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaSignOutAlt, FaCog, FaTimes, FaUser, FaBell, FaChevronRight } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/utils/getInitials";
import { useEffect } from "react";

const links = [
  { label: "Overview", href: "/member-dashboard", icon: <FaTachometerAlt /> },
  { label: "Transactions", href: "/member-dashboard/transactions", icon: <GrTransaction /> },
  // { label: "Reports", href: "/member-dashboard/reports", icon: <FaFileAlt /> },
  { label: "Settings", href: "/member-dashboard/settings", icon: <FaCog /> },
];



const DashboardSidebar = ({ isMobile = false, isOpen = false, onClose }) => {
  const pathname = usePathname();

  // const handleLogout = () => {
  //   localStorage.removeItem('user'); // clear session
  //   location.href = '/login';
  // };

  // Common navigation content
  const navigationContent = (
    <>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={isMobile ? onClose : undefined}
            className={`flex items-center px-3 py-2 rounded-md font-medium transition ${
              pathname === link.href ? "bg-blue-100 text-blue-900" : " hover:bg-gray-100 hover:text-[#0F2C59]"
            }`}
          >
            <span className="mr-3">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      
      <div className={`${isMobile ? 'absolute bottom-0 left-0 right-0' : ''} p-4 border-t`}>
        <button
          onClick={logout}
          className="flex items-center text-sm text-red-600 hover:underline"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden" 
            onClick={onClose}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile Drawer */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden transition-transform duration-300 ease-in-out z-50 w-80 max-w-[85vw] bg-black text-white flex flex-col shadow-2xl`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Mobile Header */}
          <div className="bg-black px-6 py-6 border-b border-white/20 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold text-xl text-white">Member Area</h1>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <FaTimes className="text-white text-xl" />
              </button>
            </div>
            
            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-yellow-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User avatar" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <span className="text-black font-bold text-xl">{initials}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-white truncate">{fullName}</h2>
                <p className="text-sm text-gray-300 truncate">{email}</p>
                {/* <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-400">Online</span>
                </div> */}
              </div>
            </div>
            
            {/* Account Status */}
            {/* <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Account Status</span>
                <span className="text-sm font-medium text-green-400">Active</span>
              </div>
            </div> */}
          </div>
          
          {/* Navigation Content */}
          <NavigationLinks />
          
            <LogoutButton />
          
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="w-64 hidden md:flex flex-col bg-black text-white border-r border-white/10 shadow-lg">
      {/* Desktop Header */}
      <div className="h-16 flex items-center justify-center border-b border-white/10 bg-gradient-to-r from-black to-gray-900 shrink-0">
        <h1 className="font-bold text-lg text-white">Member Area</h1>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              pathname === link.href
                ? "bg-white text-black shadow-lg"
                : "hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] text-white"
            }`}
          >
            <span className="mr-3 text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* Desktop Footer */}
      <div className="p-4 border-t border-white/20 shrink-0">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
