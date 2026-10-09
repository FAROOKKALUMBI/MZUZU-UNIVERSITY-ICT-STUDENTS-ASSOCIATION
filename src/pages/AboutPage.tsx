import { Target, Compass, Award, ShieldCheck, Download } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Page Header Banner */}
      <section className="bg-[#1B6B35] text-white py-14 md:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <span className="text-[#F5B83D] font-bold text-xs uppercase tracking-wider mb-2 block">
            About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Mzuzu University ICT Students Association
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal">
            Fostering technical competence, ethical leadership, and innovation among ICT scholars at Mzuzu University.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B6B35]">
              Empowering Malawi's Future Digital Innovators
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              The Mzuzu University ICT Students Association (MUISA) was established under the Faculty of Science, Technology and Innovation at Mzuzu University. Our primary mandate is to unite all undergraduate and postgraduate students enrolled in computing, information systems, software engineering, and telecommunications disciplines.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Through collaborative programming bootcamps, academic peer-tutoring sessions, national hackathons, and corporate mentorship channels, MUISA bridges the transition between classroom theory and real-world technology production.
            </p>
            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <Button to="/join" variant="gold-filled" size="md" showArrow>
                Become a Member
              </Button>
              <a
                href="#constitution"
                className="text-xs sm:text-sm font-bold text-[#1B6B35] inline-flex items-center gap-2 hover:underline"
              >
                <Download size={16} />
                Download Constitution
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src="/images/who-are-we.jpg"
                alt="MUISA student community meeting"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="bg-gray-50 py-14 md:py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-green-50 text-[#1B6B35] flex items-center justify-center">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To be a premier university tech association in the SADC region, recognized for pioneering digital solutions, academic distinction, and nurturing globally competitive ICT professionals.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-[#F5B83D] flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To cultivate an inclusive and inspiring environment for ICT students through hands-on technical training, research support, industry networking, and collaborative problem-solving.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#1B6B35] flex items-center justify-center">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Core Values</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B6B35]" />
                  <span><strong>Innovation:</strong> Pioneering digital answers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B6B35]" />
                  <span><strong>Integrity:</strong> Ethical computing & open-source ethos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B6B35]" />
                  <span><strong>Collaboration:</strong> Peer growth and knowledge sharing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Constitution Section */}
      <section id="constitution" className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#1B6B35] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-[#F5B83D] text-xs font-bold uppercase">
              <ShieldCheck size={16} />
              <span>Official Governance</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">The MUISA Constitution & Operational Charter</h3>
            <p className="text-white/80 text-xs sm:text-sm">
              Read the foundational governing documents outlining our electoral code, executive portfolios, membership entitlements, and financial accountability frameworks.
            </p>
          </div>
          <Button
            to="/docs/MUISA_SPECIFICATIONS.md"
            variant="gold-filled"
            size="md"
            showArrow
            className="shrink-0 font-bold"
          >
            Download Charter (PDF)
          </Button>
        </div>
      </section>
    </div>
  );
};
