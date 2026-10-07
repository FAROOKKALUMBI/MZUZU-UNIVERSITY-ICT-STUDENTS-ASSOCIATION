"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleExpand = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    <div className="md:hidden fixed inset-x-0 top-[123px] bottom-0 bg-black/50 z-50 animate-in fade-in-0 duration-200">
      <div className="bg-white max-h-[calc(100vh-123px)] overflow-y-auto shadow-2xl border-t border-gray-100 flex flex-col justify-between">
        <div className="p-5 space-y-3">
          {siteConfig.navigation.map((item) => (
            <div key={item.label} className="border-b border-gray-100 pb-2">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-base font-semibold text-[#172033] hover:text-[#0B6B35] py-2 transition-colors"
                >
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="p-2 text-gray-500 hover:text-[#0B6B35]"
                    aria-label={`Expand ${item.label}`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedSection === item.label ? "rotate-180 text-[#0B6B35]" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.hasDropdown && expandedSection === item.label && item.dropdownItems && (
                <div className="pl-4 py-2 space-y-2 bg-[#F8FAF9] rounded-md mt-1">
                  {item.dropdownItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={onClose}
                      className="block text-sm text-gray-600 hover:text-[#0B6B35] py-1 font-medium"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Direct CTA button in mobile drawer */}
          <div className="pt-4">
            <Link
              href="/join"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-[#F6D365] hover:bg-[#F8C84A] text-[#172033] font-bold py-3 px-6 rounded-md shadow uppercase tracking-wider text-sm transition-all"
            >
              <span>JOIN MUISA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Contact Quick Links */}
        <div className="p-5 bg-[#0B6B35] text-white space-y-3 mt-4">
          <div className="text-xs uppercase font-bold text-white/70 tracking-wider">
            Contact Direct
          </div>
          <div className="space-y-2 text-xs">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 text-white hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={siteConfig.contact.emailHref}
              className="flex items-center gap-2 text-white hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
