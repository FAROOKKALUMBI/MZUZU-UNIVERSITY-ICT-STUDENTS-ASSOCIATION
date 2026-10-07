"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white relative z-30 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-[76px]">
          {/* Left: MUISA Brand Tagline / Logo as in screenshot */}
          <Link
            href="/"
            className="group flex flex-col justify-center text-[#0B6B35] leading-tight select-none"
          >
            <span className="text-[13px] md:text-[15px] font-bold tracking-tight text-[#0B6B35]">
              {siteConfig.tagline.line1}
            </span>
            <span className="text-[13px] md:text-[15px] font-bold tracking-tight text-[#0B6B35]">
              {siteConfig.tagline.line2}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {siteConfig.navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setOpenDropdown(item.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13.5px] font-semibold transition-all duration-150 rounded-[4px] ${
                      isActive
                        ? "bg-[#F0F5F2] text-[#172033]"
                        : "text-[#172033] hover:text-[#0B6B35] hover:bg-[#F8FAF9]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#172033]/70 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180 text-[#0B6B35]" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && item.dropdownItems && openDropdown === item.label && (
                    <div className="absolute top-full left-0 w-56 pt-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                      <div className="bg-white rounded-md shadow-lg border border-gray-100 py-2">
                        {item.dropdownItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-[#F0F5F2] hover:text-[#0B6B35] font-medium transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#0B6B35] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0B6B35]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
