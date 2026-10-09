import React from 'react';
import { Button } from '../common/Button';

export const WhoAreWe: React.FC = () => {
  return (
    <section className="bg-[#D9D9D9] py-14 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Photo of students in computer lab */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none rounded-xl overflow-hidden shadow-md bg-gray-200">
              <img
                src="/images/who-are-we.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero-1.jpg';
                }}
                alt="MUISA ICT students collaborating around laptops in computer lab"
                className="w-full h-auto max-h-[380px] object-cover object-center transform transition-transform duration-300 hover:scale-102"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center text-center px-2 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B6B35] tracking-wide uppercase mb-5">
              WHO ARE WE
            </h2>

            <p className="text-gray-800 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl font-normal mb-7">
              The Mzuzu University ICT Students Association (MUISA) is a student-led association
              dedicated to bringing together ICT students at Mzuzu University. The association
              provides a platform for academic support, knowledge sharing, student engagement,
              professional development and collaboration.
            </p>

            <div>
              <Button
                to="/about"
                variant="green-filled"
                size="md"
                showArrow
                className="text-xs sm:text-sm px-6 py-2.5 shadow-sm"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
