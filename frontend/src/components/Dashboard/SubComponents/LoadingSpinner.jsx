import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <EllipsisHorizontalIcon
        className="w-24 h-24 text-gradient animate-spin"
        style={{
          background: 'linear-gradient(45deg, #f0f4f8, #dce2e6)',
          WebkitBackgroundClip: 'text',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
