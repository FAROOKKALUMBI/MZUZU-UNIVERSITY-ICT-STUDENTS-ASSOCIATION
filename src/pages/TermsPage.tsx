import React from 'react';
import { BookOpen, ShieldAlert, Download } from 'lucide-react';
import { Button } from '../components/common/Button';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-[#1B6B35] text-white py-14 md:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-2 text-[#F5B83D] text-xs font-bold uppercase tracking-wider">
            <BookOpen size={14} />
            <span>Association Charter & Terms</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            MUISA Terms of Service
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal leading-relaxed">
            Terms of membership, code of ethical computing, acceptable use of academic archives, and constitutional governance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20 max-w-4xl mx-auto px-4 md:px-8 text-gray-700 space-y-10 text-sm sm:text-base leading-relaxed">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 flex items-center justify-between gap-4">
          <div>
            <strong>Constitutional Ratification:</strong> Governed by the official MUISA Constitution (Articles 1-18)
          </div>
          <a
            href="/documents/MUISA_Constitution.pdf"
            download="MUISA_Constitution.pdf"
            className="text-[#1B6B35] font-bold inline-flex items-center gap-1 hover:underline text-xs"
          >
            <Download size={13} />
            <span>Download Constitution</span>
          </a>
        </div>

        {/* Section 1 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              1
            </span>
            <span>Acceptance of Terms</span>
          </h2>
          <p>
            By accessing the MUISA website, creating a membership registration, downloading learning materials from the Academic Vault, or participating in association-sponsored hackathons, workshops, and tutorials, you agree to comply with and be bound by these Terms of Service and the MUISA Constitution.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              2
            </span>
            <span>Membership Eligibility & Conduct</span>
          </h2>
          <p>
            Membership in MUISA is open to all registered students enrolled in computing, software engineering, information technology, information systems, and related technology programmes at Mzuzu University. All members are expected to uphold:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li><strong>Ethical Computing Standards:</strong> Respect for academic integrity, open-source principles, and responsible vulnerability disclosure.</li>
            <li><strong>Inclusive Collaboration:</strong> Fostering a respectful, diverse, and supportive community free of harassment, plagiarism, or discrimination.</li>
            <li><strong>Association Participation:</strong> Active participation in annual general meetings, electoral processes, and technical peer-mentorship sessions.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              3
            </span>
            <span>Academic Vault Fair Use & Intellectual Property</span>
          </h2>
          <p>
            The examination past papers, lecture presentations, notes, coding tutorials, and course syllabi made available on this platform are curated by the MUISA Academic Committee to assist university students with revision:
          </p>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <ShieldAlert size={16} className="text-amber-600" />
              <span>Strict Prohibition on Commercial Exploitation</span>
            </div>
            <p className="text-gray-600">
              No individual or organization may copy, re-distribute, or sell documents downloaded from the MUISA Academic Vault for commercial gain or unauthorized profit. All resources remain the educational property of their respective lecturers, authors, and Mzuzu University.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              4
            </span>
            <span>Administrative Governance & Elections</span>
          </h2>
          <p>
            The leadership of MUISA is elected annually through democratic student elections administered according to the electoral guidelines specified in the MUISA Constitution. The Executive Board is held accountable to the general student body and the faculty patron.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              5
            </span>
            <span>Disclaimer of Academic Guarantee</span>
          </h2>
          <p>
            While the MUISA Academic Committee strives to provide authentic, verified past examination papers and current lecture notes, materials are provided on an "as-is" basis for revision support. Students are advised to verify all syllabus topics and examination requirements directly with their respective course lecturers.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <Button to="/privacy" variant="gold-outlined" size="sm">
            ← Read Privacy Policy
          </Button>
          <Button to="/resources" variant="green-filled" size="sm">
            Explore Academic Vault
          </Button>
        </div>
      </section>
    </div>
  );
};
