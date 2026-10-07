"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { HeroSlide } from "./HeroSlide";
import { HeroIndicators } from "./HeroIndicators";

export function Hero() {
  // Start at index 1 ("02") to match the screenshot default view
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const slides = siteConfig.heroSlides;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full h-[calc(100vh-123px)] min-h-[580px] max-h-[860px] flex items-center overflow-hidden bg-[#07552A]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="MUISA Hero Banner"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-reference.png"
          alt="Mzuzu University ICT students collaborating in the computer laboratory"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[center_35%] scale-100"
        />

        {/* Green Overlay - Recreates the exact green tint and contrast */}
        <div className="absolute inset-0 bg-[#0B6B35]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07552A]/90 via-[#0B6B35]/70 to-[#0B6B35]/50" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Hero Slides Content */}
      <div className="relative z-10 w-full h-full">
        {slides.map((slide, idx) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={idx === activeIndex}
          />
        ))}
      </div>

      {/* Carousel Indicators at Bottom Center */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20 flex justify-center items-center pointer-events-auto">
        <HeroIndicators
          totalSlides={slides.length}
          activeIndex={activeIndex}
          onSelect={(index) => setActiveIndex(index)}
        />
      </div>
    </section>
  );
}
