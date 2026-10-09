import React, { useState, useEffect, useCallback } from 'react';
import { heroSlides } from '../../data/hero';
import { Button } from '../common/Button';

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] lg:h-[580px] bg-[#155429] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="MUISA Hero Banner Carousel"
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image - Clean raw photo without baked overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: 'center 35%',
              }}
            />

            {/* Single Green Overlay (Exact #1B6B35 green at ~70% opacity) */}
            <div className="absolute inset-0 bg-[#1B6B35]/75" />

            {/* Left-Aligned Text Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex flex-col justify-center">
              <div className="max-w-2xl">
                {/* H1 Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.14] tracking-tight whitespace-pre-line drop-shadow-xs">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-xl md:text-2xl text-white font-medium leading-snug mt-3.5 sm:mt-5 max-w-xl whitespace-pre-line drop-shadow-xs">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 flex-wrap">
                  <Button
                    to={slide.primaryCta.href}
                    variant="gold-filled"
                    size="md"
                    showArrow
                    className="font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 shadow-md"
                  >
                    {slide.primaryCta.text}
                  </Button>

                  <Button
                    to={slide.secondaryCta.href}
                    variant="gold-outlined"
                    size="md"
                    showArrow
                    className="font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3"
                  >
                    {slide.secondaryCta.text}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination Dots (Bottom Center) */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-2">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F5B83D] ${
                isActive
                  ? 'w-6 h-2 bg-white shadow-md'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </section>
  );
};
