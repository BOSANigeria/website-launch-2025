"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import MemberCard from "@/components/ui/MemberCard";
import membersData from "@/data/members.json";

const ITEMS_PER_PAGE = 24;

const getUniqueYears = (members) =>
  [...new Set(members.map((m) => m.elevationYear))].sort((a, b) => b - a);

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [filtered, setFiltered] = useState(membersData);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let result = membersData;

    if (search.trim()) {
      result = result.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (year !== "all") {
      result = result.filter((m) => m.elevationYear === parseInt(year));
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, year]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <header className="mb-16 text-center relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-black bg-clip-text text-transparent mb-4">
            BOSAN Members
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover and connect with our distinguished community of professionals
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-2 w-24 bg-[#D4AF37] border"></div>
          </div>
        </header>

        {/* Enhanced Filters */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl shadow-blue-900/5">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
              <div className="flex-1 max-w-md">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Members
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-[#0F2C59] focus:ring-[#0F2C59] rounded-xl shadow-sm transition-all duration-200"
                  />
                </div>
              </div>

              <div className="w-full lg:w-64">
                <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Year
                </label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-[#0F2C59] focus:ring-[#0F2C59] rounded-xl shadow-sm">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-200">
                    <SelectItem value="all" className="rounded-lg">All Years</SelectItem>
                    {getUniqueYears(membersData).map((y) => (
                      <SelectItem key={y} value={y.toString()} className="rounded-lg">
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-[#0F2C59]">{filtered.length}</span> 
                {filtered.length === 1 ? ' member' : ' members'}
                {search.trim() && (
                  <span> matching "<span className="font-medium">{search}</span>"</span>
                )}
                {year !== "all" && (
                  <span> from <span className="font-medium">{year}</span></span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              We couldn't find any members matching your search criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setYear("all");
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#0F2C59] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentItems.map((member, index) => (
                <div
                  key={member.id}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <MemberCard member={member} />
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="group flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <div className="hidden sm:flex items-center gap-2 mx-4">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                            currentPage === pageNum
                              ? 'bg-[#0F2C59] text-white shadow-lg shadow-[#0F2C59]/25'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="group flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-200 shadow-sm"
                  >
                    Next
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  Page <span className="font-semibold text-[#0F2C59]">{currentPage}</span> of{' '}
                  <span className="font-semibold text-[#0F2C59]">{totalPages}</span>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}