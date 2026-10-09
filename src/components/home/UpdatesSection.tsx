import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import { Button } from '../common/Button';
import { mosaicImages } from '../../data/updates';
import { useContent } from '../../context/ContentContext';

export const UpdatesSection: React.FC = () => {
  const { updates } = useContent();
  const displayUpdates = updates.slice(0, 4);

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Label Tab (Top Left) */}
        <div className="mb-8">
          <SectionLabel label="UPDATES" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 5-Image Photo Mosaic (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-12 gap-3.5 h-full min-h-[360px] md:min-h-[440px]">
              {/* 1. Tall Left Image (5 cols) */}
              <div className="col-span-2 sm:col-span-5 h-64 sm:h-full rounded-lg overflow-hidden bg-gray-100 shadow-xs group">
                <img
                  src={mosaicImages[0].src}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = mosaicImages[0].fallback;
                  }}
                  alt={mosaicImages[0].alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* 2x2 Grid on the Right (7 cols) */}
              <div className="col-span-2 sm:col-span-7 grid grid-cols-2 gap-3.5">
                {mosaicImages.slice(1).map((item) => (
                  <div
                    key={item.id}
                    className="h-32 sm:h-48 md:h-[212px] rounded-lg overflow-hidden bg-gray-100 shadow-xs group"
                  >
                    <img
                      src={item.src}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.fallback;
                      }}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: TOP EVENTS & NEWS List (5 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between">
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
