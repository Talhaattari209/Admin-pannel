
import React from 'react';

interface SupportHeaderProps {
  onExport?: () => void;
}

const SupportHeader: React.FC<SupportHeaderProps> = ({ onExport }) => {
  return (
    <div className="flex flex-row items-end justify-between w-full max-w-[1520px] h-[80px] mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-start gap-2 max-w-[1213px]">
        <h1 className="text-white text-[36px] font-bold leading-[110%] tracking-[-0.04em] font-michroma">
          Support Requests
        </h1>
        <p className="text-[#CCCCCC] text-[16px] leading-[150%]">
          Track and respond to user support messages, inquiries, and feedback submissions.
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex flex-row items-center gap-4 h-[56px]">
        <button 
          onClick={onExport}
          className="flex flex-row items-center justify-center px-6 py-4 gap-3 h-full border border-white rounded-[52px] backdrop-blur-[6px] transition-all hover:bg-white/10 group"
        >
          <span className="text-white text-[16px] font-medium leading-[24px]">Export</span>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SupportHeader;
