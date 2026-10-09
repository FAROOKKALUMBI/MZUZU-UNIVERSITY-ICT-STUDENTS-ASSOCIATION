import React from 'react';
import { Mail, Phone, BookOpen, GraduationCap, Linkedin, Twitter, Github } from 'lucide-react';
import { Modal } from '../common/Modal';
import { ExecutiveMember } from '../../types';

interface ExecutiveModalProps {
  member: ExecutiveMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveModal: React.FC<ExecutiveModalProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="flex flex-col items-center text-center">
        {/* Photo Avatar */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#F5B83D] shadow-md mb-4 bg-gray-100">
          <img
            src={member.image}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
            }}
            alt={member.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Name & Role */}
        <h3 className="text-xl font-extrabold text-gray-900">{member.name}</h3>
        <span className="text-xs font-bold text-[#1B6B35] bg-green-50 px-3 py-1 rounded-full mt-1 border border-green-200">
          {member.role}
        </span>

        {/* Bio */}
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-4 px-2">
          {member.bio}
        </p>

        {/* Department & Year Info */}
        <div className="w-full bg-gray-50 rounded-lg p-3.5 mt-5 text-left text-xs space-y-2 border border-gray-100">
          <div className="flex items-start gap-2 text-gray-700">
            <BookOpen size={14} className="text-[#1B6B35] shrink-0 mt-0.5" />
            <span className="font-medium">{member.department}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <GraduationCap size={14} className="text-[#1B6B35] shrink-0" />
            <span>{member.yearOfStudy}</span>
          </div>
        </div>

        {/* Contact info & Socials */}
        <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-1 text-gray-600 hover:text-[#1B6B35] font-medium"
              title="Send email"
            >
              <Mail size={13} />
              <span className="hidden sm:inline">{member.email}</span>
            </a>
            {member.phone && (
              <a
                href={`tel:${member.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1 text-gray-600 hover:text-[#1B6B35]"
                title="Call"
              >
                <Phone size={13} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            {member.socials?.linkedin && (
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B6B35]">
                <Linkedin size={15} />
              </a>
            )}
            {member.socials?.twitter && (
              <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B6B35]">
                <Twitter size={15} />
              </a>
            )}
            {member.socials?.github && (
              <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B6B35]">
                <Github size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
