'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaSignOutAlt, FaCog, FaTimes } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/utils/getInitials";

const links = [
  { label: "Overview", href: "/member-dashboard", icon: <FaTachometerAlt /> },
  { label: "Transactions", href: "/member-dashboard/transactions", icon: <GrTransaction /> },
  { label: "Settings", href: "/member-dashboard/settings", icon: <FaCog /> },
];

const DashboardSidebar = ({ isMobile = false, isOpen = false, onClose }) => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const initials = getInitials(user?.fullName || user?.name || "");
  const fullName = user?.fullName || user?.name || "Member";
  const email = user?.email || "you@example.com";

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      window.location.href = "/login"; // redirect on logout
    }
  };

  const NavigationLinks = () => (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={isMobile ? onClose : undefined}
          className={`flex items-center px-3 py-2 rounded-md font-medium transition ${
            pathname === link.href
              ? "bg-blue-100 text-blue-900"
              : "hover:bg-gray-100 hover:text-[#0F2C59]"
          }`}
        >
          <span className="mr-3">{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const LogoutButton = () => (
    <button
      onClick={handleLogout}
      className="flex items-center text-sm text-red-600 hover:underline"
    >
      <FaSignOutAlt className="mr-2" />
      Logout
    </button>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden transition-transform duration-300 ease-in-out z-50 w-80 max-w-[85vw] bg-black text-white flex flex-col shadow-2xl`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
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

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-yellow-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="User avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-black font-bold text-xl">{initials}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-white truncate">{fullName}</h2>
                <p className="text-sm text-gray-300 truncate">{email}</p>
              </div>
            </div>
          </div>

          <NavigationLinks />

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <LogoutButton />
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="w-64 hidden md:flex flex-col bg-black text-white border-r border-white/10 shadow-lg">
      <div className="h-16 flex items-center justify-center border-b border-white/10 bg-gradient-to-r from-black to-gray-900 shrink-0">
        <h1 className="font-bold text-lg text-white">Member Area</h1>
      </div>

      <NavigationLinks />

      <div className="p-4 border-t border-white/20 shrink-0">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
