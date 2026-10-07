"use client";

import React from "react";

interface HeroIndicatorsProps {
  totalSlides: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function HeroIndicators({
  totalSlides,
  activeIndex,
  onSelect,
}: HeroIndicatorsProps) {
  const formatIndex = (index: number) => {
    const num = index + 1;
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Active slide number label directly above the active indicator */}
      <div className="relative h-6 w-full flex justify-center items-end mb-1">
        <div
          className="transition-all duration-300 ease-out flex flex-col items-center"
          style={{
            // Position dynamically above the active dot (spacing: 12px dot + 12px gap = 24px)
            transform: `translateX(${(activeIndex - (totalSlides - 1) / 2) * 24}px)`,
          }}
        >
          <span className="text-[11px] font-bold text-white tracking-widest leading-none drop-shadow-sm">
            {formatIndex(activeIndex)}
          </span>
          <span className="w-[1px] h-2 bg-white/70 mt-0.5"></span>
        </div>
      </div>

      {/* Circular Dot Indicators */}
      <div className="flex items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`group relative p-1 focus:outline-none`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-white ring-2 ring-white/50 shadow-md scale-110"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80 group-hover:scale-110"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
