import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X, Phone, Mail } from 'lucide-react';
import { NavItem } from '../../types';
import { topBarContact, siteIdentity } from '../../data/navigation';
import { Button } from '../common/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  currentPath,
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide Drawer */}
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-up">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold text-[#1B6B35]">{siteIdentity.name}</div>
            <div className="text-[10px] text-gray-500">{siteIdentity.fullName}</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
            const isExpanded = !!expandedItems[item.title];

            return (
              <div key={item.title} className="border-b border-gray-50 last:border-0 pb-1">
                <div className="flex items-center justify-between">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
                      active
                        ? 'bg-[#1B6B35]/10 text-[#1B6B35] font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </Link>
                  {hasDropdown && (
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className="p-2 text-gray-500 hover:text-gray-900"
                      aria-label={`Toggle ${item.title} submenu`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#1B6B35]' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {hasDropdown && isExpanded && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50/70 rounded-lg my-1">
                    {item.dropdownItems?.map((drop) => (
                      <Link
                        key={drop.title}
                        to={drop.href}
                        onClick={onClose}
                        className="block py-2 px-3 text-xs font-medium text-gray-600 hover:text-[#1B6B35] rounded transition"
                      >
                        {drop.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4">
            <Button to="/join" variant="gold-filled" fullWidth size="md">
              JOIN MUISA →
            </Button>
          </div>
        </div>

        {/* Mobile Drawer Footer Contact */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-600 space-y-2">
          <a href={topBarContact.phoneHref} className="flex items-center gap-2 hover:text-[#1B6B35]">
            <Phone size={13} className="text-[#1B6B35]" />
            <span>{topBarContact.phone}</span>
          </a>
          <a href={topBarContact.emailHref} className="flex items-center gap-2 hover:text-[#1B6B35]">
            <Mail size={13} className="text-[#1B6B35]" />
            <span>{topBarContact.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
