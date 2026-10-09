import React from 'react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-6xl font-extrabold text-[#1B6B35]">404</span>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h1>
      <p className="text-gray-600 text-sm max-w-md mb-8">
        The page you are looking for might have been moved or does not exist. Let's get you back on track.
      </p>
      <Button to="/" variant="gold-filled" size="md" showArrow>
        Return to Home
      </Button>
    </div>
  );
};
