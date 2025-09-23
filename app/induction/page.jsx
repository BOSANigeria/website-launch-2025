"use client";
import { useState } from "react";
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Eye,
  Download,
  Share2,
  CheckCircle,
} from "lucide-react";

const categories = [
  {
    title: "Induction Must-Haves",
    description:
      "Essential documents that every inductee must review before the induction process.",
    files: [
      {
        name: "BOSAN INDUCTION PRE-READING MATERIAL",
        url: "/assets/induction/BOSAN INDUCTION PRE-READING MATERIAL_compressed.pdf",
      },
      {
        name: "BOSAN ETHICS COMMITTEE GUIDELINES PROCEDURAL RULES 2023",
        url: "BOSAN ETHICS COMMITTEE GUIDELINES PROCEDURAL RULES 2023 (2).pdf",
      },
      {
        name: "CODE OF DRESSING FOR SENIOR ADVOCATES OF NIGERIA",
        url: "/assets/induction/CODE OF DRESSING FOR SENIOR ADVOCATES OF NIGERIA .pdf",
      }
    ],
  },
  {
    title: "2025 Induction",
    description:
      "Documents, schedules, and resources specific to the 2025 induction year.",
    files: [
      {
        name: "Ethics and Essence of the Inner Bar by  Prof. Fabian Ajogwu, SAN",
        url: "/assets/induction/Ethics and Essence of the Inner Bar by  Prof. Fabian Ajogwu, SAN.pdf",
      },
      {
        name: "ETHICS OF PROFESSIONS AND PROFESSIONALISM (Extracts from ‘Law & Society’ by Professor Fabian Ajogwu, SAN, FCIArb)",
        url: "/assets/induction/ETHICS OF PROFESSIONS AND PROFESSIONALISM (Extracts from ‘Law & Society’ by Professor Fabian Ajogwu, SAN, FCIArb).pdf",
      },
      {
        name: "Legal Ethics and Professional Responsibility in the Legal Profession by Jingwei Xu, Zhengmin Liz,",
        url: "/assets/induction/Legal Ethics and Professional Responsibility in the Legal Profession by Jingwei Xu, Zhengmin Liz,.pdf",
      },
      {
        name: "PAPER DELIVERED BY HON. JUSTICE M. B. DONGBAN-MENSEM AT THE PRE-SWEARING-IN INDUCTION FOR NEW SANs 250924",
        url: "/assets/induction/PAPER DELIVERED BY HON. JUSTICE M. B. DONGBAN-MENSEM AT THE PRE-SWEARING-IN INDUCTION FOR NEW SANs 250924.pdf",
      },
      {
        name: "Taking silk an empirical study of the award of Queen’s Counsel status 1981-2015 by Michael Blackwell",
        url: "/assets/induction/SENIOR ADVOCATES AND OTHER LAWYERS.pdf",
      },
      {
        name: "The Duty of the Senior Advocate of Nigeria to the Society and the Profession - Mrs. Mia Essien, SAN",
        url: "/assets/induction/The Duty of the Senior Advocate of Nigeria to the Society and the Profession - Mrs. Mia Essien, SAN.pdf",
      },
      {
        name: "THE EVOLVING ROLE OF SENIOR ADVOCATES IN THE ADMINISTRATION OF JUSTICE AND NATION BUILDING BY FIDELIS ODITAH, KC, SAN",
        url: "/assets/induction/THE EVOLVING ROLE OF SENIOR ADVOCATES IN THE ADMINISTRATION OF JUSTICE AND NATION BUILDING BY FIDELIS ODITAH, KC, SAN.pdf",
      },
      {
        name: "Mentorship & Knowledge Transfer - Preserving The Standard of The Inner Bar",
        url: "/assets/induction/Mentorship & Knowledge Transfer - Preserving The Standard of The Inner Bar.pptx",
      },
    ],
  },
  {
    title: "2025 Facilitators' Papers",
    description:
      "Papers and presentations from facilitators for the 2025 induction sessions.",
    files: [
      {
        name: "Access to Justice - Role of the SAN",
        url: "/assets/induction/facilitators/Access to Justice - Role of the SAN.pdf",
      },
      {
        name: "EXCELLENCE AT THE BAR BY DR ONYECHI IKPEAZU OON SAN",
        url: "/assets/induction/facilitators/EXCELLENCE AT THE BAR BY DR ONYECHI IKPEAZU OON SAN.pdf",
      },
      {
        name: "NIGERIAN JURISPRUDENCE THE CONTRIBUTIONS AND IMPACT OF SENIOR ADVOCATES OF NIGERIA TO AND ON THE ADMINISTRATION OF JUSTICE IN NIGERIA BY HON JUSTICE EJEMBI EKO, JSC",
        url: "/assets/induction/facilitators/NIGERIAN JURISPRUDENCE THE CONTRIBUTIONS AND IMPACT OF SENIOR ADVOCATES OF NIGERIA.pdf",
      },
      {
        name: "PAPER BY HON. JUSTICE MOSUNMOLA DIPEOLU, CHIEF JUDGE OGUN STATE AT THE 2025 BOSAN INDUCTION PROGRAMME",  
        url: "/assets/induction/facilitators/PAPER BY HON. JUSTICE MOSUNMOLA DIPEOLU, CHIEF JUDGE OGUN STATE AT THE 2025 BOSAN INDUCTION PROGRAMME_compressed.pdf",
      },
      {
        name: "TECHNOLOGY IN LEGAL PRACTICE.pdf",
        url: "/assets/induction/facilitators/TECHNOLOGY IN LEGAL PRACTICE_compressed.pdf",
      },
      {
        name: "THE SENIOR ADVOCATE OF NIGERIA RANK PAPER -PROF YUSUF ALI SAN",
        url: "/assets/induction/facilitators/THE SENIOR ADVOCATE OF NIGERIA RANK PAPER -PROF YUSUF ALI SAN.pdf",
      },
      {
        name: "PROF. Yusuf Ali SAN - SAN RANK PAPER POWERPOINT",
        url: "/assets/induction/PROF. Yusuf Ali SAN - SAN RANK PAPER POWERPOINT.pptx",
      },
      {
        name: "Access to Justice - Role of the SAN",
        url: "/assets/induction/Access to Justice - Role of the SAN.pdf",
      }
    ],
  },
];

const Category = ({ category, isOpen, onToggle }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "BOSAN Induction Document", url });
      } catch (err) {
        console.log("Share cancelled:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full px-6 py-4 bg-black text-white font-semibold text-lg"
      >
        <span>{category.title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Body */}
      {isOpen && (
        <div className="px-6 py-5 space-y-4">
          <p className="text-gray-700">{category.description}</p>
          {category.files.length > 0 ? (
            <ul className="space-y-3">
              {category.files.map((file, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#D4AF37]" size={22} />
                    <span className="text-black font-medium text-sm sm:text-base">
                      {file.name}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-[#D4AF37]"
                      title="View"
                    >
                      <Eye size={20} />
                    </a>
                    <a
                      href={file.url}
                      download
                      className="text-black hover:text-[#D4AF37]"
                      title="Download"
                    >
                      <Download size={20} />
                    </a>
                    <button
                      onClick={() => handleShare(file.url)}
                      className="text-black hover:text-[#D4AF37]"
                      title="Share"
                    >
                      {copied ? <CheckCircle size={20} /> : <Share2 size={20} />}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No files uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

const InductionsPage = () => {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-12">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          BOSAN Inductions
        </h1>
        <div className="h-1 w-24 bg-[#D4AF37] mx-auto mt-3 rounded"></div>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Access all induction documents, guidelines, and resources categorized
          for your convenience.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto">
        {categories.map((category, index) => (
          <Category
            key={index}
            category={category}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex(openIndex === index ? -1 : index)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default InductionsPage;
