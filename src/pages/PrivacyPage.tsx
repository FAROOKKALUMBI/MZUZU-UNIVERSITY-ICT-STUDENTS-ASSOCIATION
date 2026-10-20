import React from 'react';
import { Shield, Lock, CheckCircle, Mail, MapPin } from 'lucide-react';
import { Button } from '../components/common/Button';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-[#1B6B35] text-white py-14 md:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-2 text-[#F5B83D] text-xs font-bold uppercase tracking-wider">
            <Shield size={14} />
            <span>Official Policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            MUISA Privacy Policy
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal leading-relaxed">
            How the Mzuzu University ICT Students Association protects, handles, and secures student information and administrative credentials.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20 max-w-4xl mx-auto px-4 md:px-8 text-gray-700 space-y-10 text-sm sm:text-base leading-relaxed">
        {/* Effective Date Note */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs sm:text-sm text-green-900 flex items-center justify-between gap-4">
          <div>
            <strong>Effective Date:</strong> October 2026 • <strong>Version:</strong> 2.0 (Post-Convention Edition)
          </div>
          <span className="text-[#1B6B35] font-bold">Faculty of STI Approved</span>
        </div>

        {/* Section 1 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              1
            </span>
            <span>Introduction & Scope</span>
          </h2>
          <p>
            The Mzuzu University ICT Students Association (MUISA) operates under the Department of ICT, Faculty of Science, Technology and Innovation at Mzuzu University, Malawi. This policy applies to all visitors, registered student members, and faculty coordinators using the official MUISA web portal, Academic Vault, and online service applications.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              2
            </span>
            <span>Information We Collect</span>
          </h2>
          <p>
            We respect the privacy of all students and members. We collect only necessary details to provide student services:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li><strong>Membership Registration Data:</strong> Full name, student registration number, academic programme, year of study, email, and phone contact for communication channels.</li>
            <li><strong>Academic Archive Access:</strong> Course codes, download requests, and study pack inquiries for resource optimization.</li>
            <li><strong>Contact Submissions:</strong> Message contents, partnership queries, and inquiries submitted through our official contact forms.</li>
            <li><strong>Administrative Security Logs:</strong> Cryptographic session tokens, device signatures, and audit event logs for administrative access governance.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              3
            </span>
            <span>Data Security & Cryptographic Safeguards</span>
          </h2>
          <p>
            MUISA implements modern cybersecurity best practices to safeguard user and administrator records:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                <Lock size={16} className="text-[#1B6B35]" />
                <span>PBKDF2 SHA-256 Encryption</span>
              </div>
              <p className="text-xs text-gray-600">
                Administrative credentials are protected with 100,000 rounds of PBKDF2 cryptographic hashing and unique salting.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                <CheckCircle size={16} className="text-[#1B6B35]" />
                <span>Zero-Knowledge Data Policy</span>
              </div>
              <p className="text-xs text-gray-600">
                MUISA never sells, leases, or trades student emails or registration records to third-party commercial marketing networks.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              4
            </span>
            <span>Academic Vault Fair Use</span>
          </h2>
          <p>
            All lecture slides, past examination papers, syllabus outlines, and tutorial guides hosted within the MUISA Academic Vault are distributed exclusively for academic revision and peer-study under educational fair use guidelines authorized by the student leadership and course lecturers.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-[#1B6B35] flex items-center justify-center text-sm font-black">
              5
            </span>
            <span>Contact Information & Inquiries</span>
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data correction or membership record updates, contact our Secretariat:
          </p>
          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Mail size={16} className="text-[#1B6B35]" />
              <span>Email: info@muisa.org / secretariat@muisa.org</span>
            </div>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin size={16} className="text-[#1B6B35] shrink-0 mt-0.5" />
              <span>Department of ICT, Faculty of STI, Mzuzu University, P/Bag 201, Luwinga, Mzuzu 2, Malawi</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <Button to="/terms" variant="gold-outlined" size="sm">
            Read Terms of Service →
          </Button>
          <Button to="/" variant="green-filled" size="sm">
            Return to Homepage
          </Button>
        </div>
      </section>
    </div>
  );
};
