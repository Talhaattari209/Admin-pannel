
import React from 'react';

interface ContentDetailsModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const ContentDetailsModal: React.FC<ContentDetailsModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="flex flex-col items-center p-8 gap-8 w-[956px] h-[806px] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[32px] box-border shadow-2xl relative overflow-hidden">
      {/* Header Row */}
      <div className="flex flex-row items-center justify-between w-full h-[48px] shrink-0">
        <h2 className="flex-grow text-center text-white text-[32px] font-medium leading-[38px] tracking-[-0.02em] font-sans">
          Content Details
        </h2>
        <button 
          onClick={onClose}
          className="absolute right-8 w-12 h-12 flex items-center justify-center bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all z-10"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-8 w-full h-full overflow-hidden">
        {/* Title View */}
        <div className="flex flex-col gap-3 shrink-0">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-100">Content Title</label>
          <p className="text-white text-[16px] font-normal leading-[24px] border-b border-white pb-3">{title}</p>
        </div>

        {/* Content View */}
        <div className="flex flex-col gap-3 flex-grow overflow-hidden">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-100">Content</label>
          <div className="flex-grow w-full bg-[#111111] border border-[#666666]/50 rounded-[16px] overflow-y-auto no-scrollbar p-6">
            <div className="text-white text-[16px] font-normal leading-[150%] whitespace-pre-wrap opacity-100">
              {content}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ContentDetailsModal;
