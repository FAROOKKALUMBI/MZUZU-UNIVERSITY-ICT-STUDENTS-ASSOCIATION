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
      className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] lg:h-[580px] bg-[#155429] overflow-hidden"
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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out transform scale-100"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />

            {/* Green Overlay (~70-75% green) */}
            <div className="absolute inset-0 bg-[#1B6B35]/75 backdrop-contrast-105" />

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-4 md:px-8 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                {/* H1 Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.15] tracking-tight whitespace-pre-line">
                  {slide.title}
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg md:text-xl text-white/95 font-medium leading-relaxed max-w-xl whitespace-pre-line">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4 pt-2 flex-wrap">
                  <Button
                    to={slide.primaryCta.href}
                    variant="gold-filled"
                    size="md"
                    showArrow
                    className="font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3"
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
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-2.5">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F5B83D] ${
                isActive
                  ? 'w-7 h-2.5 bg-white shadow-md'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
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
