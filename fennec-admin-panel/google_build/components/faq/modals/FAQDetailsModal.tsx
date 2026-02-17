
import React from 'react';

interface FAQDetailsModalProps {
  question: string;
  answer: string;
  onClose: () => void;
}

const FAQDetailsModal: React.FC<FAQDetailsModalProps> = ({ question, answer, onClose }) => {
  return (
    <div className="flex flex-col items-center p-8 gap-8 w-[956px] h-[304px] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[32px] box-border shadow-2xl relative overflow-hidden">
      {/* Header Row */}
      <div className="flex flex-row items-center justify-between w-full h-[48px] shrink-0">
        <h2 className="flex-grow text-center text-white text-[32px] font-medium leading-[38px] tracking-[-0.02em]">
          FAQ Details
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

      {/* View Fields */}
      <div className="flex flex-col gap-6 w-full overflow-hidden">
        {/* Question View */}
        <div className="flex flex-col gap-2 shrink-0">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-100">Question</label>
          <p className="text-white text-[16px] font-normal leading-[24px] truncate">{question}</p>
        </div>

        {/* Answer View */}
        <div className="flex flex-col gap-2 shrink-0 overflow-hidden">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-100">Answer</label>
          <p className="text-white text-[16px] font-normal leading-[150%] max-h-[48px] overflow-y-auto no-scrollbar">
            {answer}
          </p>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FAQDetailsModal;
