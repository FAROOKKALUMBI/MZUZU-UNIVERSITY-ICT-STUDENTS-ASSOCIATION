import React from 'react';
import { Button } from '../common/Button';

export const JoinCTA: React.FC = () => {
  return (
    <section className="bg-[#D9D9D9] py-14 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Dark-green Rounded-xl Container Card */}
        <div className="bg-[#1B6B35] rounded-xl sm:rounded-2xl py-12 px-6 sm:py-16 sm:px-10 text-center shadow-lg relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#F5B83D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Gold Badge */}
            <div className="bg-[#F5B83D] text-gray-950 text-xs font-extrabold uppercase px-4 py-1.5 rounded-[2px] tracking-wider mb-5 shadow-sm">
              BECOME A MEMBER
            </div>

            {/* H2 Title */}
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white leading-snug tracking-tight mb-4">
              Join MUISA to connect, learn, build and access new opportunities
            </h2>

            {/* Sub-line */}
            <p className="text-white/85 text-xs sm:text-sm md:text-base font-normal max-w-xl leading-relaxed mb-8">
              Build your skills, expand your network, and gain valuable experience beyond the classroom.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                to="/join"
                variant="gold-filled"
                size="md"
                showArrow
                className="text-xs sm:text-sm px-6 py-2.5 font-bold"
              >
                JOIN MUISA
              </Button>

              <Button
                to="/contact"
                variant="white-outlined"
                size="md"
                showArrow
                className="text-xs sm:text-sm px-6 py-2.5 font-bold"
              >
                CONTACT US
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
