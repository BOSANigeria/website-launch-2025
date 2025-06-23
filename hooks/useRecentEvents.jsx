
import { useState, useEffect, useCallback } from 'react';

export const useRecentEvents = (limit = 2, autoRefresh = false) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/events/recent?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (err) {
      console.error('Error fetching recent events:', err);
      setError(err.message);
      // Keep existing events on error, don't clear them
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Auto-refresh if enabled
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchEvents();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents
  };
};