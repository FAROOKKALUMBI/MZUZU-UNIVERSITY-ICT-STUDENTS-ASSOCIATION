import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { WhoAreWe } from '../components/home/WhoAreWe';
import { UpdatesSection } from '../components/home/UpdatesSection';
import { JoinCTA } from '../components/home/JoinCTA';
import { ExecutiveGrid } from '../components/home/ExecutiveGrid';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Who Are We Section */}
      <WhoAreWe />

      {/* 3. Updates Section */}
      <UpdatesSection />

      {/* 4. Join CTA Section */}
      <JoinCTA />

      {/* 5. Executive Team Section */}
      <ExecutiveGrid />
    </div>
  );
};
