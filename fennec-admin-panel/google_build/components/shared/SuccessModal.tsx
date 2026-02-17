
import React from 'react';

interface SuccessModalProps {
  title: string;
  description?: string;
  onDone: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ title, description, onDone }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center p-8 gap-8 w-[440px] bg-[#16003F] border border-white/20 rounded-[32px] shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Animated Check Icon */}
        <div className="relative flex items-center justify-center w-[120px] h-[120px]">
           <div className="absolute inset-0 bg-[#3ADC60] opacity-10 blur-2xl rounded-full"></div>
           <div className="relative w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center isolation-auto overflow-hidden">
             <svg viewBox="0 0 72 72" className="w-16 h-16" fill="none">
               <circle cx="36" cy="36" r="33" stroke="#3ADC60" strokeWidth="2" className="animate-[spin_4s_linear_infinite]" strokeDasharray="4 4" />
               <path d="M23 37L31 45L49 27" stroke="#3ADC60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-in fade-in slide-in-from-top-2 duration-500 delay-200" />
             </svg>
           </div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-white text-[32px] font-medium tracking-tight font-inter">{title}</h2>
          {description && <p className="text-[#CCCCCC] text-[16px] opacity-60 leading-[150%]">{description}</p>}
        </div>
        
        <button 
          onClick={onDone}
          className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all font-inter"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
