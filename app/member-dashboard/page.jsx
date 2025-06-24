"use client";

import UserStats from "@/components/member-dashboard/UserStats";
import Transactions from "@/components/member-dashboard/Transactions";


export default function MemberDashboard() {


  return (
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <UserStats />
          <Transactions />
        </div>
      </div>
  );
}