
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
          <div className="relative w-[4.17vw] h-[4.17vw] rounded-full border-2 border-white/20 flex items-center justify-center isolation-auto">
            <svg viewBox="0 0 72 72" className="w-[3.33vw] h-[3.33vw]" fill="none">
              <circle cx="36" cy="36" r="33" stroke="#3ADC60" strokeWidth="2" className="animate-[spin_4s_linear_infinite]" strokeDasharray="4 4" />
              <path d="M23 37L31 45L49 27" stroke="#3ADC60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-in fade-in slide-in-from-top-2 duration-500 delay-200" />
            </svg>
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
