"use client"

import React, { useState, useEffect } from 'react';
import {
  Users,
  BellRing,
  Calendar,
  CreditCard,
  Activity,
  RefreshCw,
  Eye,
  Trash2
} from 'lucide-react';
import { useRecentAnnouncements } from '@/hooks/useRecentAnnouncements';
import { useRecentEvents } from '@/hooks/useRecentEvents';
import { useRecentUsers } from '@/hooks/useRecentUsers';
import { useRecentTransactions } from '@/hooks/useRecentTransactions';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Use the custom hooks
  const { 
    announcements, 
    loading: announcementsLoading, 
    error: announcementsError, 
    refetch: refetchAnnouncements 
  } = useRecentAnnouncements(1, true);

  const { 
    events, 
    loading: eventsLoading, 
    error: eventsError, 
    refetch: refetchEvents 
  } = useRecentEvents(3, true);

  const { 
    users, 
    loading: usersLoading, 
    error: usersError, 
    refetch: refetchUsers 
  } = useRecentUsers(1, true);

  const { 
    transactions, 
    loading: transactionsLoading, 
    error: transactionsError, 
    refetch: refetchTransactions 
  } = useRecentTransactions(1, true);

  // Combine announcements and events into activities
  useEffect(() => {
    const allActivities = [];

    // Convert announcements to activity format
    if (announcements && announcements.length > 0) {
      const announcementActivities = announcements.map(announcement => ({
        id: `announcement-${announcement._id}`,
        type: 'announcement',
        icon: BellRing,
        iconColor: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        title: 'New announcement',
        description: announcement.title,
        timestamp: new Date(announcement.createdAt),
        read: false,
        originalData: announcement
      }));
      allActivities.push(...announcementActivities);
    }

    // Convert events to activity format
    if (events && events.length > 0) {
      const eventActivities = events.map(event => ({
        id: `event-${event._id}`,
        type: 'event',
        icon: Calendar,
        iconColor: 'text-purple-600',
        bgColor: 'bg-purple-100',
        title: 'New event',
        description: event.title,
        timestamp: new Date(event.createdAt),
        read: false,
        originalData: event
      }));
      allActivities.push(...eventActivities);
    }

    // Convert users to activity format
    if (users && users.length > 0) {
      const userActivities = users.map(user => ({
        id: `user-${user._id}`,
        type: 'user',
        icon: Users,
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-100',
        title: 'New user registered',
        description: user.fullName,
        timestamp: new Date(user.createdAt),
        read: false,
        originalData: user
      }));
      allActivities.push(...userActivities);
    }

    // Convert transactions to activity format
    if (transactions && transactions.length > 0) {
      const userActivities = transactions.map(transaction => ({
        id: `transaction-${transaction._id}`,
        type: 'transaction',
        icon: CreditCard,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-100',
        title: 'New transaction',
        description: `#${transaction.amount} paid by ${transaction.Name}`,
        timestamp: new Date(transaction.createdAt),
        read: false,
        originalData: transaction
      }));
      allActivities.push(...userActivities);
    }
    
    // Combine and sort all activities by timestamp (newest first)
    const combinedActivities = [...allActivities]
      .sort((a, b) => b.timestamp - a.timestamp);

    setActivities(combinedActivities);
  }, [announcements, events]);

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Call both refetch functions
      await Promise.all([
        refetchAnnouncements(),
        refetchEvents(),
        refetchUsers(),
        refetchTransactions()
      ]);
    } catch (error) { 
      console.error('Error refreshing activities:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mark activity as read
  const markAsRead = (id) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id ? { ...activity, read: true } : activity
      )
    );
  };

  // Delete activity
  const deleteActivity = (id) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  // Get time ago string
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Get unread count
  const unreadCount = activities.filter(a => !a.read).length;

  // Check if we're loading initial data
  const isInitialLoading = (announcementsLoading || eventsLoading || usersLoading || transactionsLoading) && activities.length === 0;

  // Check if we have any errors
  const hasErrors = announcementsError || eventsError || usersError || transactionsError;

  // Loading state
  if (isInitialLoading) {
    return (
      <div className="bg-white rounded-lg shadow h-full">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium">Recent Activity</h2>
        </div>
        <div className="p-6 flex items-center justify-center">
          <RefreshCw className="animate-spin mr-2" size={20} />
          <span>Loading activities...</span>
        </div>
      </div>
    );
  }

  // Error state (only show if there are no activities at all and we have errors)
  if (hasErrors && activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow h-full">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium">Recent Activity</h2>
        </div>
        <div className="p-6 text-center">
          <p className="text-red-600 mb-2">Failed to load activities</p>
          {announcementsError && (
            <p className="text-sm text-red-500 mb-1">Announcements: {announcementsError}</p>
          )}
          {eventsError && (
            <p className="text-sm text-red-500 mb-4">Events: {eventsError}</p>
          )}

          {usersError && (
            <p className="text-sm text-red-500 mb-4">Users: {usersError}</p>
          )}

          {transactionsError && (
            <p className="text-sm text-red-500 mb-4">Users: {transactionsError}</p>
          )}
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isRefreshing ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Recent Activity</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || announcementsLoading || eventsLoading || usersLoading || transactionsLoading}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw 
                size={16} 
                className={isRefreshing || announcementsLoading || eventsLoading || usersLoading || transactionsLoading ? 'animate-spin' : ''} 
              />
            </button>
            {hasErrors && (
              <span 
                className="text-xs text-red-500 cursor-help" 
                title={`
                  ${announcementsError ? 'Announcements: ' + announcementsError : ''}
                  ${eventsError ? ' Events: ' + eventsError : ''}
                  ${usersError ? ' Users: ' + usersError : ''}
                  ${transactionsError ? ' Transactions: ' + transactionsError : ''}
                  `}
                  
              >
                ⚠️
              </span>
            )}
          </div> 
        </div>
      </div>
      
      <div className="p-6">
        {activities.length > 0 ? (
          <ul className="space-y-4">
            {activities.slice(0, 6).map((activity) => {
              const IconComponent = activity.icon;
              return (
                <li
                  key={activity.id}
                  className={`flex items-start group ${!activity.read ? 'bg-blue-50 -mx-2 px-2 py-2 rounded-md' : ''}`}
                >
                  <div className={`${activity.bgColor} p-2 rounded-full mr-3 flex-shrink-0`}>
                    <IconComponent size={16} className={activity.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      {activity.title}: <span className="font-medium">{activity.description}</span>
                      {!activity.read && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>}
                    </p>
                    <p className="text-xs text-gray-500">{getTimeAgo(activity.timestamp)}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!activity.read && (
                      <button
                        onClick={() => markAsRead(activity.id)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Mark as read"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteActivity(activity.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Activity size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No recent activities</p>
            <p className="text-sm">Activities will appear here when available</p>
          </div>
        )}
        
        {activities.length > 6 && (
          <button className="w-full mt-4 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors">
            View All Activities ({activities.length} total)
          </button>
        )}
      </div>
    </div>
  );
};

export default Activities;