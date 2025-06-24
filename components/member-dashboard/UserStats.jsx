"use client";
import { useAuth } from "@/hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useEffect, useState } from "react";
import { useRecentTransactions } from '@/hooks/useRecentTransactions';

export default function UserStats() {
  const { user } = useAuth();
  
  // Fetch user's payment summary
  const { data: paymentData, isLoading } = useQuery({
    queryKey: ['/api/payments'],
    queryFn: () => apiRequest('GET', '/api/payments?limit=5'),
  });

  const recentPayments = paymentData?.payments || [];
  const totalPaid = recentPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const [transactions, setTransactions] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          const fetchTransactionCount = async () => {
              try {
                  setLoading(true);
                  const response = await fetch('/api/transactions/user');
                  
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  
                  const data = await response.json();
                  
                  if (data.success) {
                      setTransactions(data.transactions || []);
                  } else {
                      setError(data.message || 'Failed to fetch transactions');
                  }
              } catch (error) {
                  console.error('Error fetching transaction count:', error);
                  setError('Failed to fetch transactions');
              } finally {
                  setLoading(false);
              }
          };
  
          fetchTransactionCount();
      }, []);
  
      if (loading) {
          return <div className="flex justify-center items-center p-8">Loading...</div>;
      }
  
      if (error) {
          return <div className="text-red-500 p-4">Error: {error}</div>;
      }
  
      // Calculate stats from transactions
      const totalTransactions = transactions.length;
      const nextPayment = 0; 
      const outstandingPayment = 0;

  return (
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome back, {user?.fullName}!
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">₦</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Payments
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ₦{totalPaid.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">#</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Payment Records
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {totalTransactions}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Outstanding Balance
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ₦{user?.debitBalance?.toLocaleString() || '0'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Payments
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your latest payment records
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {isLoading ? (
                <li className="px-4 py-4">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </li>
              ) : recentPayments.length === 0 ? (
                <li className="px-4 py-4 text-center text-gray-500">
                  No payment records found
                </li>
              ) : (
                recentPayments.map((payment) => (
                  <li key={payment._id} className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">₦</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.description}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(payment.paymentDate).toLocaleDateString()} • {payment.paymentType}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ₦{payment.amount.toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="bg-gray-50 px-4 py-3">
              <a
                href="/member-dashboard/payments"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View all payments →
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}