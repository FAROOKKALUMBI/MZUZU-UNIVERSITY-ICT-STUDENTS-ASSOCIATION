import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import { useContent } from '../../context/ContentContext';
import { ExecutiveMember } from '../../types';
import { ExecutiveModal } from './ExecutiveModal';

export const ExecutiveGrid: React.FC = () => {
  const { executives } = useContent();
  const [selectedMember, setSelectedMember] = useState<ExecutiveMember | null>(null);

  return (
    <section className="bg-[#F9FAFB] py-14 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Label Tab (Top Left) */}
        <div className="mb-8">
          <SectionLabel label="Executive Team" />
        </div>

        {/* 4-column x 2-row Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {executives.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="group relative h-80 sm:h-88 md:h-96 rounded-xl overflow-hidden shadow-card bg-gray-900 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedMember(member);
                }
              }}
              aria-label={`View profile of ${member.name}, ${member.role}`}
            >
              {/* Portrait Photo */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Overlay at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4.5 sm:p-5">
                <div className="flex items-end justify-between gap-2">
                  {/* Left: Name & Role */}
                  <div className="min-w-0 pr-2">
                    <h3 className="text-white font-bold text-base sm:text-lg leading-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-[#F5B83D] text-xs sm:text-[13px] font-medium mt-1 truncate">
                      {member.role}
                    </p>
                  </div>

                  {/* Right: Circular Green + Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                    className="w-8 h-8 rounded-full bg-[#1B6B35] text-white flex items-center justify-center shrink-0 shadow-md transform transition-all duration-200 group-hover:bg-[#155429] group-hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-[#F5B83D]"
                    aria-label={`Open details for ${member.name}`}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Bio Modal */}
      <ExecutiveModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
};
