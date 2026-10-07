"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function TopBar() {
  const { contact } = siteConfig;

  return (
    <div className="w-full bg-[#0B6B35] text-white relative z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-11 text-xs md:text-[13px] font-medium tracking-wide">
          {/* Left: Contact Info */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <a
              href={contact.phoneHref}
              className="flex items-center gap-2 text-white/95 hover:text-white transition-colors duration-150 group"
              title="Call MUISA"
            >
              <Phone className="w-3.5 h-3.5 text-white/90 group-hover:scale-105 transition-transform" />
              <span className="tabular-nums font-normal">{contact.phone}</span>
            </a>

            <a
              href={contact.emailHref}
              className="hidden sm:flex items-center gap-2 text-white/95 hover:text-white transition-colors duration-150 group"
              title="Email MUISA"
            >
              <Mail className="w-3.5 h-3.5 text-white/90 group-hover:scale-105 transition-transform" />
              <span className="font-normal">{contact.email}</span>
            </a>
          </div>

          {/* Right: Join MUISA Button */}
          <div className="flex items-center">
            <Link
              href="/join"
              className="inline-flex items-center justify-center bg-[#F6D365] hover:bg-[#F8C84A] text-[#172033] font-bold text-xs uppercase px-4 py-1.5 rounded-[4px] shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] tracking-wider"
            >
              JOIN MUISA
            </Link>
          </div>
        </div>
      </div>

      {/* Thin blue accent line matching the screenshot */}
      <div className="w-full h-[3px] bg-[#1684C7]" />
    </div>
  );
}
