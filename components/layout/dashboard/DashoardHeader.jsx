// DashboardHeader.js
'use client';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaBell, FaSignOutAlt, FaUser, FaCog } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { getInitials } from '@/utils/getInitials';

const DashboardHeader = ({ onMenuToggle, title = "Welcome" }) => {
  const { user, logout } = useAuth();
  const fullName = user?.fullName || "User";
  const email = user?.email || "user@example.com";
  const initials = getInitials(fullName, email);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const NotificationDropdown = () => (
    <div className="absolute right-0 top-12 w-80 max-w-[90vw] bg-white shadow-xl rounded-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">3</span>
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto">
        <div className="p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
          <p className="text-sm font-medium text-gray-900">New transaction processed</p>
          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
        </div>
        <div className="p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
          <p className="text-sm font-medium text-gray-900">Profile updated successfully</p>
          <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
        </div>
        <div className="p-3 hover:bg-gray-50 cursor-pointer">
          <p className="text-sm font-medium text-gray-900">Welcome to Member Dashboard</p>
          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
        </div>
      </div>
      <div className="p-3 border-t border-gray-100">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );

  const ProfileDropdown = () => (
    <div className="absolute right-0 top-12 w-64 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-yellow-500 rounded-full flex items-center justify-center shrink-0">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <span className="text-black font-bold text-sm">{initials}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{fullName}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>
        </div>
      </div>
      
      <div className="py-2">
        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center space-x-3">
          <FaUser className="text-gray-400" />
          <span>Profile Settings</span>
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center space-x-3">
          <FaCog className="text-gray-400" />
          <span>Account Settings</span>
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center space-x-3">
          <FaBell className="text-gray-400" />
          <span>Notification Settings</span>
        </button>
      </div>
      
      <div className="border-t border-gray-100 py-2">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-3"
        >
          <FaSignOutAlt className="text-red-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center min-w-0 flex-1">
        <button
          onClick={onMenuToggle}
          className="p-2 mr-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <FaBars />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
            {title}
          </h1>
          <p className="text-sm text-gray-500 truncate md:hidden">
            {fullName}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={toggleNotifications}
            className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
            aria-label="View notifications"
          >
            <FaBell className="text-gray-600 text-lg" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          {showNotifications && <NotificationDropdown />}
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="User menu"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#D4AF37] to-yellow-500 rounded-full flex items-center justify-center shrink-0">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="User avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <span className="text-black font-bold text-sm">{initials}</span>
              )}
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 truncate max-w-32">
              {fullName}
            </span>
          </button>
          {showProfileMenu && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;