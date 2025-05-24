"use client";
import { useState } from "react";

const committees = [
  {
    title: "BOSAN Executive Committee",
    description:
      "The BOSAN Executive Committee is an elective committee created by the BOSAN Constitution. It is charged with the day-to-day administrative responsibility of the Body.",
    members: [
      "The BOSAN General Secretary",
      "Assistant Secretary",
      "Treasurer",
      "Financial Secretary",
      "Publicity Secretary",
    ],
    icon: "🏛️",
  },
  {
    title: "BOSAN Leadership Committee",
    description:
      "The BOSAN Leadership Committee is a constitutionally recognized committee of the Body charged with the implementation of the utilization of the BOSAN Funds. The Committee is further divided into Sub-Committees in order to actualize its objectives effectively.",
    members: [
      "The BOSAN Ethics Committee",
      "The Continuing Legal Education Sub-Committee",
      "The Scholarship Sub-Committee",
      "The Dinner Sub-Committee",
    ],
    icon: "⚖️",
  },
  {
    title: "BOSAN Special-Purpose Committee",
    description:
      "The BOSAN Special Purpose Committees are committees set up at the general meetings of BOSAN tasked with specific assignments.",
    members: [
      "Committee on Conflicting Judgement of the Superior Courts",
      "Committee on the Reforms of the Supreme Court",
      "Committee on Bills before the National Assembly",
      "BOSAN Constitutional Review Committee",
    ],
    icon: "📝",
  },
];

const CommitteeContent = ({ committee, index }) => (
  <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden mb-10">
    {/* Header */}
    <div className="bg-black p-5">
      <h2 className="text-2xl font-bold text-white">{committee.title}</h2>
    </div>

    {/* Body */}
    <div className="p-4">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-3">
          About this Committee
        </h3>
        <p className="text-gray-700 text-justify">{committee.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#0F2C59] mb-4">
          Committee Structure
        </h3>
        <div className="rounded-lg p-2">
          <ul className="space-y-3">
            {committee.members.map((member, idx) => (
              <li key={idx} className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                  <span className="text-[#0F2C59] font-bold">{idx + 1}</span>
                </div>
                <span className="text-gray-800">{member}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Committee = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          BOSAN Committees
        </h1>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-2"></div>
      </div>

      {/* Tab Navigation (Desktop) */}
      <div className="hidden md:block mb-8">
        <div className="border-b border-gray-200">
          <div className="flex -mb-px">
            {committees.map((committee, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-4 px-6 text-lg font-medium mr-4 border-b-2 transition-colors duration-300 ${
                  activeTab === index
                    ? "border-yellow-500 text-[#0F2C59]"
                    : "border-transparent text-gray-500 hover:text-[#0F2C59] hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{committee.icon}</span>
                {committee.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Active Tab */}
      <div className="hidden md:block">
        <CommitteeContent committee={committees[activeTab]} index={activeTab} />
      </div>

      {/* Mobile: All Stacked */}
      <div className="block md:hidden">
        {committees.map((committee, index) => (
          <CommitteeContent key={index} committee={committee} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Committee;
