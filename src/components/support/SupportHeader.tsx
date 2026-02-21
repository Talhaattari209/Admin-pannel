import React from 'react';

interface SupportHeaderProps {
  onExport?: () => void;
}

const SupportHeader: React.FC<SupportHeaderProps> = ({ onExport }) => {
  return (
    <div className="flex flex-row items-end justify-between w-full h-[4.17vw] mb-[2.08vw] animate-in fade-in slide-in-from-top-4 duration-700 ">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-start gap-[0.83vw] max-w-[71.3vw]">
        <h1 className="text-white text-[1.88vw] font-bold not-italic leading-[110%] tracking-[-0.04em]">
          Support Requests
        </h1>
        <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%] font-normal not-italic">
          Track and respond to user support messages, inquiries, and feedback submissions.
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex flex-row items-center gap-[0.83vw] h-[2.92vw]">
        <button
          onClick={onExport}
          className="flex flex-row items-center justify-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-full border border-white rounded-[2.71vw] backdrop-blur-[6px] transition-all hover:bg-white/10 group box-border shadow-[0px_12px_40px_rgba(0,0,0,0.05)] cursor-pointer"
        >
          <span className="text-white text-[0.83vw] font-medium not-italic leading-[150%]">Export</span>
          <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
