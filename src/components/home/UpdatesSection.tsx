import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import { Button } from '../common/Button';
import { mosaicCards } from '../../data/updates';
import { useContent } from '../../context/ContentContext';

export const UpdatesSection: React.FC = () => {
  const { updates } = useContent();
  const displayUpdates = updates.slice(0, 4);

  const tallCard = mosaicCards[0];
  const gridCards = mosaicCards.slice(1, 5);

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Label Tab (Top Left) */}
        <div className="mb-8">
          <SectionLabel label="UPDATES" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 5-Card News Grid with Gradient & Headings (matching reference) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 h-full min-h-[420px] md:min-h-[460px]">
              {/* 1. Tall Left News Card (Spans 5 columns on desktop) */}
              <Link
                to={`/updates/${tallCard.updateId}`}
                className="sm:col-span-5 relative h-72 sm:h-full min-h-[320px] rounded-xl overflow-hidden shadow-md group cursor-pointer bg-gray-900 block"
              >
                {/* Background Image */}
                <img
                  src={tallCard.src}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = tallCard.fallback;
                  }}
                  alt={tallCard.alt}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Category Badge (Top Left) */}
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span
                    className={`${tallCard.badgeBg} text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-[3px] tracking-wider shadow-sm`}
                  >
                    {tallCard.category}
                  </span>
                </div>

                {/* Dark Gradient Overlay & Heading (Bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent z-10 flex flex-col justify-end p-4 sm:p-5">
                  <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug line-clamp-3 group-hover:text-[#F5B83D] transition-colors drop-shadow-xs">
                    {tallCard.title}
                  </h3>
                  <span className="text-[11px] text-white/70 font-medium mt-1.5">
                    {tallCard.time}
                  </span>
                </div>
              </Link>

              {/* 2. 2x2 Grid of News Cards on the Right (Spans 7 columns on desktop) */}
              <div className="sm:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {gridCards.map((card) => (
                  <Link
                    key={card.id}
                    to={`/updates/${card.updateId}`}
                    className="relative h-44 sm:h-[220px] rounded-xl overflow-hidden shadow-md group cursor-pointer bg-gray-900 block"
                  >
                    {/* Background Image */}
                    <img
                      src={card.src}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = card.fallback;
                      }}
                      alt={card.alt}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category Badge (Top Left) */}
                    <div className="absolute top-3 left-3 z-20">
                      <span
                        className={`${card.badgeBg} text-white text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-[3px] tracking-wider shadow-xs`}
                      >
                        {card.category}
                      </span>
                    </div>

                    {/* Dark Gradient Overlay & Heading (Bottom) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent z-10 flex flex-col justify-end p-3 sm:p-3.5">
                      <h3 className="text-white font-bold text-xs sm:text-[13px] leading-snug line-clamp-2 group-hover:text-[#F5B83D] transition-colors drop-shadow-xs">
                        {card.title}
                      </h3>
                      <span className="text-[10.5px] text-white/70 font-medium mt-1">
                        {card.time}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: TOP EVENTS & NEWS List (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
            {/* Header row: Title + View All Button */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3.5 mb-2">
              <h2 className="text-base sm:text-lg font-bold text-[#1B6B35] tracking-tight">
                TOP EVENTS & NEWS
              </h2>
              <Button
                to="/updates"
                variant="gold-filled"
                size="sm"
                showArrow
                className="text-[11px] px-3 py-1 font-bold"
              >
                VIEW ALL UPDATES
              </Button>
            </div>

            {/* List of items */}
            <div className="divide-y divide-gray-200">
              {displayUpdates.map((item) => (
                <article
                  key={item.id}
                  className="py-4 first:pt-2 last:pb-0 flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Number (01-04) in Green */}
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1B6B35] leading-none shrink-0 tracking-tight select-none">
                      {item.number}
                    </span>

                    {/* Title + Meta */}
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <Link to={`/updates/${item.id}`} className="block">
                        <h3 className="text-xs sm:text-[13.5px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#1B6B35] transition-colors">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-3 text-[11px] text-gray-500">
                        <span>{item.relativeTime}</span>
                        <span className="text-gray-300">•</span>
                        <Link
                          to={`/updates/${item.id}`}
                          className="font-bold text-[#1B6B35] inline-flex items-center gap-0.5 hover:underline"
                        >
                          <span>READ MORE</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <Link
                    to={`/updates/${item.id}`}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-md overflow-hidden bg-gray-100 shrink-0 shadow-xs group-hover:opacity-90 transition"
                  >
                    <img
                      src={item.thumbnail}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/who-are-we.jpg?v=2';
                      }}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
