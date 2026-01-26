
import React from 'react';

const Logo: React.FC = () => {
  // SVG-based implementation of the dot pattern for better scaling/centering
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Center Dot (5) */}
        <circle cx="100" cy="100" r="16.3" fill="white" />

        {/* Inner Ring - Larger Dots (2, 8, 9, 10) */}
        <circle cx="100" cy="65.28" r="12.7" fill="white" /> {/* 2 */}
        <circle cx="65.22" cy="100.17" r="12.7" fill="white" /> {/* 8 */}
        <circle cx="99.84" cy="134.76" r="12.7" fill="white" /> {/* 9 */}
        <circle cx="134.77" cy="99.8" r="12.7" fill="white" /> {/* 10 */}

        {/* Inner Ring - Medium Dots (1, 3, 6, 7) */}
        <circle cx="63.79" cy="63.25" r="10.6" fill="white" /> {/* 1 */}
        <circle cx="136.21" cy="63.27" r="10.6" fill="white" /> {/* 3 */}
        <circle cx="63.79" cy="136.73" r="10.6" fill="white" /> {/* 6 */}
        <circle cx="136.21" cy="136.72" r="10.6" fill="white" /> {/* 7 */}

        {/* Outer Ring - Smaller Dots (4, 11, 12, 13) */}
        <circle cx="100" cy="32.93" r="7.9" fill="white" /> {/* 4 */}
        <circle cx="99.99" cy="167.06" r="7.9" fill="white" /> {/* 11 */}
        <circle cx="32.94" cy="99.98" r="7.9" fill="white" /> {/* 12 */}
        <circle cx="167.06" cy="100" r="7.9" fill="white" /> {/* 13 */}
      </svg>
    </div>
  );
};

export default Logo;
