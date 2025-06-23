"use client"

import React, { useEffect, useState } from 'react'
import { getAllEvents } from "@/app/api/services/eventsService";
import { AlertTriangle, Calendar } from 'lucide-react';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllEvents(); 
      console.log(response);
      
      if (Array.isArray(response)) {
        setEvents(response);
      } else if (response && response.data) {
        setEvents(response.data);
      } else {
        setError("No data received from API");
      }
    } catch (err) {
      setError(`Failed to fetch events: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original if formatting fails
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="grid grid-rows-1 gap-4">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow h-full">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                Upcoming Events
              </h2>

            </div>
          </div>
          
          <div className="p-6">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-gray-600">Loading events...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-red-800">{error}</span>
                </div>
                <button 
                  onClick={fetchEvents}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Events List */}
            {!loading && !error && (
              <div>
                {events.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No upcoming events found</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {events.map((event, index) => (
                      <li key={event.id || index} className="py-3 flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{event.name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(event.date)}
                          </p>
                          {event.location && (
                            <p className="text-sm text-gray-400 mt-1">{event.location}</p>
                          )}
                        </div>
                        {event.status && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            event.status === 'upcoming' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingEvents