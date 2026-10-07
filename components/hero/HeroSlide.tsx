"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSlideData } from "@/lib/config";

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
}

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center transition-opacity duration-700 ease-in-out ${
        isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-20">
        <div className="max-w-2xl lg:max-w-3xl text-left">
          {/* Main Large Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-sm">
            <span className="block">{slide.headingLine1}</span>
            <span className="block">{slide.headingLine2}</span>
          </h1>

          {/* Subheading */}
          <div className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-bold text-white/95 tracking-tight leading-snug drop-shadow-sm">
            <p>{slide.subheadingLine1}</p>
            <p>{slide.subheadingLine2}</p>
          </div>

          {/* Action CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            {/* Primary CTA (Gold/Yellow) */}
            <Link
              href={slide.primaryCtaLink}
              className="inline-flex items-center gap-2.5 bg-[#F6D365] hover:bg-[#F8C84A] text-[#172033] font-bold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-[6px] shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] group tracking-wider uppercase"
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-[#172033] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA (Outline Yellow/Gold) */}
            <Link
              href={slide.secondaryCtaLink}
              className="inline-flex items-center gap-2.5 bg-transparent hover:bg-black/15 text-[#F6D365] hover:text-white border-[1.5px] border-[#F6D365] font-bold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-[6px] shadow-sm hover:border-white transition-all duration-200 active:scale-[0.98] group tracking-wider uppercase backdrop-blur-xs"
            >
              <span>{slide.secondaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-[#F6D365] group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
