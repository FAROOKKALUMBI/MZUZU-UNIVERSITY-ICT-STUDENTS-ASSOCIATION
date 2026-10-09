import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionLabelProps {
  label: string;
  to?: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ label, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#1B6B35] text-white text-xs font-semibold px-4 py-1.5 rounded-[2px] shadow-sm tracking-wide ${className}`}>
      <span>{label}</span>
      <ArrowRight size={13} className="text-white" />
    </div>
  );
};
