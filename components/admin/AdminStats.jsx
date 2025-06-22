"use client"

import React, { useState, useEffect } from "react";
import {
  Users,
  BellRing,
  Calendar,
  CreditCard,
  TrendingUp,
  Activity,
} from "lucide-react";

const AdminStats = () => {
  const [users, setUsers] = useState([]);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch announcement count from your API
  useEffect(() => {
    const fetchAnnouncementCount = async () => {
      try {
        const response = await fetch('/api/announcements'); // Adjust the path to match your API route
        const data = await response.json();
        
        if (data.success) {
          setAnnouncementCount(data.total);
        }
      } catch (error) {
        console.error('Error fetching announcement count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncementCount();
  }, []);

  // Fetch event count from your API
  useEffect(() => {
    const fetchEventCount = async () => {
      try {
        const response = await fetch('/api/events'); 
        const data = await response.json();
        
        if (data.success) {
          setEventCount(data.total);
        }
      } catch (error) {
        console.error('Error fetching event count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('/api/user'); 
        const data = await response.json();
        
        if (data.success) {
          setUsers(data.total);
        }
      } catch (error) {
        console.error('Error fetching event count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: loading ? "..." : users.toString(),
      icon: <Users className="h-4 w-4" />,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Events",
      value: loading ? "..." : eventCount.toString(),
      icon: <Calendar className="h-4 w-4" />,
      change: "+3%",
      trend: "up",
    },
    {
      title: "Total Announcements",
      value: loading ? "..." : announcementCount.toString(),
      icon: <BellRing className="h-4 w-4" />,
      change: "+5%", // You can calculate this based on previous data
      trend: "up",
    },
    // {
    //   title: "Revenue",
    //   value: "$24,395",
    //   icon: <CreditCard className="h-4 w-4" />,
    //   change: "+18%",
    //   trend: "up",
    // },
  ];

  return (
    <div>
      {/* Stats Cards bg-card text-card-foreground */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pb-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg border bg-card bg-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
              <div className="h-4 w-4 text-muted-foreground">
                {stat.icon}
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                ) : (
                  <Activity className="h-4 w-4 inline mr-1" />
                )}
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;