
import React from 'react';

interface SettingsSuccessCardProps {
  onDone: () => void;
}

const SettingsSuccessCard: React.FC<SettingsSuccessCardProps> = ({ onDone }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[25vw] bg-[#16003F] border border-[#666666]/50 rounded-[1.67vw] shadow-2xl animate-in zoom-in-95 duration-300">

        {/* Animated Check Icon */}
        <div className="relative flex items-center justify-center w-[6.25vw] h-[6.25vw]">
          <div className="absolute inset-0 bg-[#5F00DB] opacity-20 blur-2xl rounded-full"></div>

          {/* Rotating Border Animation & Glow */}
          <div className="absolute inset-0 z-[1] rounded-full">
            {/* Glow Layer */}
            <div
              className="absolute -inset-[0.5vw] rounded-full animate-[spin_3s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
                filter: 'blur(0.25vw)',
                WebkitMask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)',
                mask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)'
              }}
            />
            {/* Sharp Border Layer */}
            <div
              className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(95, 0, 219, 1) 50%, transparent 100%)', // Using Purple #5F00DB
                WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))',
                mask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))'
              }}
            />
          </div>

          <div className="relative w-[4.17vw] h-[4.17vw] rounded-full border-2 border-white/10 flex items-center justify-center isolation-auto z-10 bg-white/5 backdrop-blur-[6px]">
            <img src="/assets/check-circle-success.svg" alt="Success" className="w-[3.33vw] h-[3.33vw] object-contain animate-in fade-in zoom-in duration-500 delay-200" />
          </div>
        </div>

        <h2 className="text-white text-[1.67vw] font-medium not-italic tracking-tight text-center">App Settings Updated</h2>

        <button
          onClick={onDone}
          className="w-full h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SettingsSuccessCard;
