
import { useState, useEffect, useCallback } from 'react';

export const useRecentUsers = (limit = 2, autoRefresh = false) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/user/recent?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching recent users:', err);
      setError(err.message);
      // Keep existing users on error, don't clear them
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Auto-refresh if enabled
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchUsers();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers
  };
};