"use client"

import React, { useState, useEffect } from 'react'
import {  
    Layers,
    AlertTriangle,
    Check,
    Users,
    PlusCircle,
    Loader2,
    Search,
    Filter
  } from 'lucide-react';
  import UsersModal from '@/components/admin/UsersModal';

const UserPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});
      
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to fetch users from API
    const fetchUsers = async (page = 1, search = '', status = '') => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '20'
        });
        
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        
        const response = await fetch(`/api/user?${params}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch users');
        }
        
        setUsers(data.users || []);
        setPagination(data.pagination || {});
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
        setUsers([]); // Clear users on error
        setPagination({});
      } finally {
        setLoading(false);
      }
    };

    // Fetch users on component mount and when filters change
    useEffect(() => {
      fetchUsers(currentPage, searchTerm, statusFilter);
    }, [currentPage, searchTerm, statusFilter]);

    // Handle search with debouncing
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setCurrentPage(1); // Reset to first page when searching
        fetchUsers(1, searchTerm, statusFilter);
      }, 500);

      return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Function to refresh users (useful after adding new user)
    const handleUserAdded = () => {
      fetchUsers(currentPage, searchTerm, statusFilter);
      closeModal();
    };

    // Handle status filter change
    const handleStatusFilter = (status) => {
      setStatusFilter(status);
      setCurrentPage(1);
    };

    // Handle pagination
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    // Generate short ID for display
    const generateShortId = (id, index) => {
      if (id && typeof id === 'string') {
        return id.slice(-6).toUpperCase();
      }
      return `USR${String(index + 1).padStart(3, '0')}`;
    };

    // Format date helper
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      
      try {
        const date = new Date(dateString);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === now.toDateString()) {
          return `Today, ${date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
          return `Yesterday, ${date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          })}`;
        } else {
          return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          });
        }
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
      }
    };

    // Safe number formatting
    const formatCurrency = (amount) => {
      const numAmount = Number(amount) || 0;
      return numAmount.toLocaleString();
    };

    return (
      <div>
        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
          {/* Users Table */}
          <div className="bg-white rounded-lg shadow">
            <header className="bg-white shadow px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-indigo-600 mr-2" />
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Users ({pagination.total || users.length})
                  </h1>
                </div>
                <button 
                  onClick={openModal}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Onboard User
                </button>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users by name, email, or call-up number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    className="block py-2 pl-3 pr-10 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <UsersModal 
                isOpen={isModalOpen} 
                onClose={closeModal}
                onUserAdded={handleUserAdded}
              />
            </header>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600 mr-2" />
                  <span className="text-gray-600">Loading users...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
                  <span className="text-red-600 mb-2">Error: {error}</span>
                  <button 
                    onClick={() => fetchUsers(currentPage, searchTerm, statusFilter)}
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    Retry
                  </button>
                </div>
              ) : users.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-gray-500">
                  <Users className="h-6 w-6 mr-2" />
                  <span>No users found</span>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="text-xs text-gray-700 bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">ID</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Call-up Number</th>
                      <th className="px-6 py-3 text-left">Elevation Year</th>
                      <th className="px-6 py-3 text-left">Debit Balance</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Role</th>
                      <th className="px-6 py-3 text-left">Date Joined</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {users.map((user, index) => (
                      <tr key={user._id || index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-xs">
                          {generateShortId(user._id, index)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                              <span className="text-indigo-600 font-medium text-sm">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{user.name || 'Unknown User'}</div>
                              {user.fullName && user.fullName !== user.name && (
                                <div className="text-gray-500 text-xs">{user.fullName}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.callUpNumber || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.elevationYear || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${
                            (user.debitBalance || 0) > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            ₦{formatCurrency(user.debitBalance)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                            {!user.invitationSent && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending Invite
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                          {formatDate(user.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {((currentPage - 1) * (pagination.limit || 20)) + 1} to{' '}
                    {Math.min(currentPage * (pagination.limit || 20), pagination.total)} of{' '}
                    {pagination.total} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm">
                      Page {currentPage} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.pages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
}

export default UserPage