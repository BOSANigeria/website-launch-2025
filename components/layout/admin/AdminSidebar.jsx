'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaSignOutAlt, FaChartLine, FaUsers, FaCog, FaFileAlt, FaTimes } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdEmojiEvents } from "react-icons/md";
import { logout } from '@/utils/auth';

// Navigation links with icons
const links = [
  { label: "Overview", href: "/super-admin", icon: <FaTachometerAlt /> },
  { label: "Announcement", href: "/super-admin/announcement", icon: <TfiAnnouncement /> },
  { label: "Events", href: "/super-admin/events", icon: <MdEmojiEvents /> },
  { label: "Users", href: "/super-admin/users", icon: <FaUsers /> },
  { label: "Transactions", href: "/super-admin/transactions", icon: <GrTransaction /> },
  // { label: "Settings", href: "/superadmin/settings", icon: <FaCog /> },
];


// Sidebar Component for both mobile and desktop
const AdminSidebar = ({ isMobile = false, isOpen = false, onClose }) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback: clear storage and redirect anyway
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
  };

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
              pathname === link.href ? "bg-white text-blue-900" : " hover:bg-gray-100 hover:text-[#0F2C59]"
            }`}
          >
            <span className="mr-3">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      
      <div className={`${isMobile ? 'absolute bottom-0 left-0 right-0' : ''} p-4 border-t`}>
        <button
          onClick={handleLogout}
          className="flex items-center text-sm text-red-600 hover:underline"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </>
  );

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile sidebar backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div 
          id="sidebar"
          className={`fixed inset-y-0 left-0 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden transition duration-200 ease-in-out z-30 w-64 bg-white shadow-lg flex flex-col`}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <span className="font-bold text-lg">Admin Area</span>
            <button 
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <FaTimes className="text-black" />
            </button>
          </div>
          
          {navigationContent}
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className="w-64 hidden md:flex flex-col bg-black text-white border-r shadow-sm">
      <div className="h-16 flex items-center justify-center border-b font-bold text-lg">
        Admin Area
      </div>
      {navigationContent}
    </aside>
  );
};

export default AdminSidebar;