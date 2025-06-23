"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineSearch, MdChevronLeft, MdChevronRight } from "react-icons/md";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const transactionsPerPage = 10;

  // Fetch user transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter and search transactions
  useEffect(() => {
    let filtered = transactions;

    // Apply filter
    if (filter === "recent") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = transactions.filter(
        (transaction) => new Date(transaction.createdAt) >= thirtyDaysAgo
      );
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.amount?.toString().includes(searchTerm) ||
          transaction.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [transactions, filter, searchTerm]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("An error occurred while fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f9f9f9] border border-white rounded-2xl h-full px-3 mt-4">
        <div className="pt-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F2C59]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] border border-white rounded-2xl h-full px-3 mt-4">
      <div className="pt-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-[#0F2C59] uppercase border-l-2 border-[#0F2C59] pl-1 text-sm">
            Transaction History
          </h1>
          <div className="flex items-center">
            <button className="bg-[#0F2C59] p-[5.3px] text-white rounded-l-md hover:text-[#0F2C59] hover:bg-gray-300 transition">
              <MdOutlineSearch size={20} />
            </button>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 text-xs outline-none border border-[#0F2C59] rounded-r-md px-2 w-[80px] sm:w-[200px] h-[31px]"
            />
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs rounded-full transition ${
              filter === "all"
                ? "bg-[#0F2C59] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("recent")}
            className={`px-3 py-1 text-xs rounded-full transition ${
              filter === "recent"
                ? "bg-[#0F2C59] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Recent Payment
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Transactions table */}
        <div className="py-8 overflow-x-auto">
          {currentTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || filter !== "all"
                ? "No transactions match your search criteria"
                : "No transactions found"}
            </div>
          ) : (
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr>
                  <th className="bg-white text-[#0F2C59] border border-gray-300 px-4 py-2">
                    Transaction ID
                  </th>
                  <th className="bg-white text-[#0F2C59] border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  <th className="bg-white text-[#0F2C59] border border-gray-300 px-4 py-2">
                    Amount
                  </th>
                  <th className="bg-white text-[#0F2C59] border border-gray-300 px-4 py-2">
                    Status
                  </th>
                  <th className="bg-white text-[#0F2C59] border border-gray-300 px-4 py-2">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {currentTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      {transaction._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {transaction.description || transaction.type || "Payment"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status || "Completed"}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatDate(transaction.createdAt || transaction.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex justify-between items-center pb-4">
            <div className="text-xs text-gray-500">
              Showing {indexOfFirstTransaction + 1} to{" "}
              {Math.min(indexOfLastTransaction, filteredTransactions.length)} of{" "}
              {filteredTransactions.length} transactions
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-200 text-[#0F2C59] hover:bg-gray-50"
                }`}
              >
                <MdChevronLeft size={20} />
              </button>
              <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-xs">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-200 text-[#0F2C59] hover:bg-gray-50"
                }`}
              >
                <MdChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;