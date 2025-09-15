"use client";
import React, { useState } from 'react';

const BosanProgramsUI = () => {
  const [selectedProgram, setSelectedProgram] = useState("scholarship");
  const [expandedCard, setExpandedCard] = useState(null);

  const bosanPrograms = [
    {
      id: "scholarship",
      title: "BOSAN Scholarship Awards",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      ),
      description: "Excellence in legal education through scholarship awards",
      content: `
        <h3 class="text-2xl font-bold text-gray-900 mb-4">BOSAN Scholarship Awards</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">In 2018, BOSAN became very concerned about the falling standard of practice in the Legal Profession and decided to take steps to arrest the trend. BOSAN believed that the problem could be addressed at the University as well as the Nigerian Law School levels by setting targets that will motivate Law Students to aspire to scholarly excellence.</p>
        <p class="mb-6 text-gray-700 leading-relaxed">To positively impact the standard and quality of Legal Education on a sustainable basis, BOSAN came up with the idea of producing BOSAN SCHOLARS. The maiden award program was established in 2019, during which five deserving students were awarded the scholarship at a prize of ₦1,000,000.00 (One Million Naira) each. Since then, BOSAN has consistently presented the award, except in 2020 due to the COVID-19 pandemic.</p>
        
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4 class="text-xl font-semibold text-blue-900 mb-3">The Award</h4>
          <p class="text-blue-800">Successful Applicants shall receive the Scholarship Award in the sum of ₦500,000.00 (Five Hundred Thousand Naira) in the final year, and ₦500,000.00 (Five Hundred Thousand Naira) at the Nigerian Law School.</p>
        </div>
        
        <h4 class="text-xl font-semibold text-gray-900 mb-3">Eligibility Criteria</h4>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Institution of Study:</strong> Nigerian Universities (both public and private)</li>
          <li><strong>Course of Study:</strong> Law</li>
          <li><strong>Level of Study:</strong> The student being nominated must be in his/her 400 Level in the University.</li>
          <li><strong>Cumulative Grade Point Average (CGPA):</strong> The student being nominated must be on a CGPA of 4.5 or above on a scale of 5.0. or equivalent for institutions that are not on 5-grade points given the overriding objective of the Scheme.</li>
          <li>The student being nominated must have consistently demonstrated good character, honesty, and integrity throughout his/her period in the University</li>
          <li>Nominees shall be subjected to both written examination and oral interviews to be conducted and superintended by BOSAN</li>
          <li>There shall be a minimum of five (5) Scholarship Awardees in all from the total number of shortlisted candidates nationwide who will eventually become the BOSAN SCHOLARS.</li>
        </ul>
      `
    },
    {
      id: "induction",
      title: "BOSAN Mandatory Induction Program",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      ),
      description: "Orientation program for newly appointed Senior Advocates",
      content: `
        <h3 class="text-2xl font-bold text-gray-900 mb-4">BOSAN Mandatory Induction Program</h3>
        <p class="mb-6 text-gray-700 leading-relaxed">The mandatory pre-swearing-in Induction program is designed to provide orientation for newly appointed Senior Advocates of Nigeria, on their pivotal leadership roles in the legal profession, professional ethics, and the conduct expected of them while executing their responsibilities towards their Clients, the Courts, and Society at large.</p>
        
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6">
          <h4 class="text-xl font-semibold text-indigo-900 mb-4">Dress Code for the Induction Programme</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h5 class="font-semibold text-gray-900 mb-3">For Men:</h5>
              <ul class="space-y-2 text-gray-700">
                <li>• Dark Lounge Suit (black, charcoal grey or navy Blue)</li>
                <li>• A button-up collared shirt with a dark tie</li>
                <li>• Black socks</li>
                <li>• Black shoes</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h5 class="font-semibold text-gray-900 mb-3">For Women:</h5>
              <ul class="space-y-2 text-gray-700">
                <li>• Dark pantsuits, a suit dress, or skirt suit (black, charcoal grey or navy blue)</li>
                <li>• Moderate accessories and hairstyle</li>
                <li>• Black shoes</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
          <p class="text-red-800 font-medium">Bold colours and patterns or traditional attires are NOT acceptable for the Induction Programme</p>
        </div>
        
        <p class="text-gray-700 italic">BOSAN strongly advise that inductees do not promote or encourage the placing of any form of advertisements in newspapers and other social media platforms, as these acts are not in accordance with the values of the Inner Bar.</p>
      `
    },
    {
      id: "dinners",
      title: "BOSAN Dinners",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M3 2h18a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
          <path d="M8 10h8"></path>
          <path d="M8 14h8"></path>
          <path d="M8 18h8"></path>
        </svg>
      ),
      description: "Annual celebration and networking events",
      content: `
        <h3 class="text-2xl font-bold text-gray-900 mb-4">BOSAN Dinners</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">The BOSAN Annual Dinner is a double celebratory event. Apart from welcoming our new members who were sworn-in to the inner Bar, as is our practice, we also award BOSAN Scholarships to carefully selected law students in Nigerian Universities who have proved themselves worthy of flying the flag as "BOSAN Scholars".</p>
        
        <div class="bg-amber-50 p-6 rounded-lg">
          <p class="text-amber-900 leading-relaxed">Most of all, the Annual Dinners traditionally serve as bonding and camaraderie evenings and sessions for all our members as well as a semi-family gathering seeing as our members and guests are always encouraged to attend with their spouses. Members are encouraged to attend with their spouses and make the evening a grand and memorable one for all of us and our guests.</p>
        </div>
      `
    },
    {
      id: "meetings",
      title: "BOSAN General Meetings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      description: "Quarterly meetings and Annual General Meeting",
      content: `
        <h3 class="text-2xl font-bold text-gray-900 mb-4">BOSAN General Meetings</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">In line with the BOSAN Constitution, general meetings of the Body are held quarterly, while the Annual General Meeting holds annually.</p>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <p class="text-green-800 font-medium">The meetings are rotated from one location to another within Nigeria.</p>
        </div>
      `
    },
    {
      id: "webinars",
      title: "BOSAN Webinar Series",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      description: "Continuous legal education for members",
      content: `
        <h3 class="text-2xl font-bold text-gray-900 mb-4">BOSAN Webinar Series</h3>
        <p class="text-gray-700 leading-relaxed">The BOSAN Webinar Series is designed as an avenue for continuous legal education amongst members, in line with the objectives of the Body.</p>
      `
    }
  ];

  const selectedProgramData = bosanPrograms.find(program => program.id === selectedProgram);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            BOSAN Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the various programs and initiatives by the Body of Senior Advocates of Nigeria
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {bosanPrograms.map((program) => (
            <div
              key={program.id}
              onClick={() => setSelectedProgram(program.id)}
              className={`cursor-pointer p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                selectedProgram === program.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {program.icon}
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-2">
                  {program.title}
                </h3>
                <p className={`text-xs md:text-sm ${
                  selectedProgram === program.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedProgramData?.content }}
          />
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Programs</h2>
          <div className="space-y-4">
            {bosanPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div
                  onClick={() => setExpandedCard(expandedCard === program.id ? null : program.id)}
                  className="p-4 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{program.title}</h3>
                      <p className="text-sm text-gray-500">{program.description}</p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedCard === program.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {expandedCard === program.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div 
                      className="prose prose-sm max-w-none mt-4"
                      dangerouslySetInnerHTML={{ __html: program.content }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            Body of Senior Advocates of Nigeria (BOSAN) - Promoting Excellence in Legal Practice
          </p>
        </div>
      </div>
    </div>
  );
};

export default BosanProgramsUI;