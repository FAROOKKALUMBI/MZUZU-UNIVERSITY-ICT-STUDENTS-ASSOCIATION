import { ExecutiveGrid } from '../components/home/ExecutiveGrid';

export const ExecutivePage = () => {
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-[#1B6B35] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <span className="text-[#F5B83D] font-bold text-xs uppercase tracking-wider mb-2 block">
            Leadership
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            MUISA Executive Board 2026/2027
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal">
            Meet the student leaders driving academic initiatives, tech innovation, student welfare, and industry relations.
          </p>
        </div>
      </section>

      {/* Executive Grid Section */}
      <ExecutiveGrid />

      {/* Sub-Committees & Working Groups */}
      <section id="committees" className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8 border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B6B35]">
            MUISA Standing Committees
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-2">
            Working hand-in-hand with the executive board to execute day-to-day programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Technical & Dev Committee</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Maintains the MUISA website, develops student portal tools, coordinates code sprints, and manages tech infrastructure.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Media & Branding Desk</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Handles photography, livestreaming, social media content, graphic design, and tech podcast production.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Academic Mentorship Group</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Organizes peer tutoring sessions for programming, database management, mathematics for computing, and exam preparation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
