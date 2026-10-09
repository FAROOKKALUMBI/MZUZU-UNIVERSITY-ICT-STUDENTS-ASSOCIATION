import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { topBarContact } from '../../data/navigation';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#1B6B35] text-white text-xs py-2 px-4 md:px-8 border-b border-green-800/40 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Contact Info (Left) */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <a
            href={topBarContact.phoneHref}
            className="flex items-center gap-1.5 hover:text-gray-200 transition-colors duration-150"
            aria-label="Call MUISA"
          >
            <Phone size={13} className="text-white/90" />
            <span className="font-medium tracking-wide">{topBarContact.phone}</span>
          </a>
          <a
            href={topBarContact.emailHref}
            className="hidden xs:flex sm:flex items-center gap-1.5 hover:text-gray-200 transition-colors duration-150"
            aria-label="Email MUISA"
          >
            <Mail size={13} className="text-white/90" />
            <span className="font-medium tracking-wide">{topBarContact.email}</span>
          </a>
        </div>

        {/* Action Button (Right) */}
        <div className="flex items-center">
          <Link
            to={topBarContact.ctaHref}
            className="bg-[#F5B83D] text-gray-950 font-bold text-[11px] sm:text-xs px-3.5 py-1 rounded-[2px] hover:bg-[#e5aa32] transition-colors duration-150 tracking-wider shadow-sm"
          >
            {topBarContact.ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};
