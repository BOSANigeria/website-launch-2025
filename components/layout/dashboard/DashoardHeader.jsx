'use client';
import { useState } from 'react';
import { FaBars, FaBell, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { getInitials } from '@/utils/getInitials';
import { useAuth } from '@/hooks/useAuth';

const DashboardHeader = ({ onMenuToggle, title = "Welcome" }) => {
  const { user, logout } = useAuth();
  const fullName = user?.fullName || "Admin";
  const email = user?.email || "user@example.com";
  const initials = getInitials(fullName, email);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between relative z-40">
      {/* Left: Menu & Title */}
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="p-1 mr-3 rounded-md text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">{title}, {fullName}</h1>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-4 relative">
        {/* Notifications */}
        <button
          onClick={() => {
            setShowNotifications(prev => !prev);
            setShowProfileMenu(false);
          }}
          className="p-1 rounded-full hover:bg-gray-100 relative"
        >
          <FaBell className="text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Notifications Modal */}
        {showNotifications && (
          <div className="absolute right-16 top-14 w-64 bg-white shadow-lg rounded-md p-4 text-sm z-50">
            <h3 className="font-medium mb-2">Notifications</h3>
            <ul className="space-y-2">
              <li>No new notifications.</li>
            </ul>
          </div>
        )}

        {/* Profile Dropdown Trigger */}
        <div
          onClick={() => {
            setShowProfileMenu(prev => !prev);
            setShowNotifications(false);
          }}
          className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-semibold cursor-pointer"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {/* Profile Dropdown */}
        {showProfileMenu && (
  <div className="absolute right-0 top-12 w-56 bg-white shadow-xl rounded-lg z-50 text-sm ring-1 ring-black/5">
    {/* User Info */}
    <div className="px-4 py-3 border-b text-gray-800">
      <p className="font-semibold truncate">{fullName}</p>
      <p className="text-xs text-gray-500 truncate">{email}</p>
    </div>

    {/* Settings */}
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition-all"
    >
      Profile Settings
    </button>

    {/* Logout */}
    <button
      onClick={logout}
      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 transition-all"
    >
      <FaSignOutAlt className="text-sm" />
      Logout
    </button>
  </div>
)}

      </div>
    </header>
  );
};

export default DashboardHeader;
