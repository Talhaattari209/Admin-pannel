
import React from 'react';

interface SuccessModalProps {
  title: string;
  description?: string;
  onDone: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ title, description, onDone }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[22.92vw] bg-[#16003F] border border-white/20 rounded-[1.67vw] shadow-2xl animate-in zoom-in-95 duration-300">

        {/* Animated Check Icon */}
        <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">

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
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)',
                WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))',
                mask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))'
              }}
            />
          </div>

          {/* Icon BG */}
          <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>

          {/* Icon Content */}
          <div className="relative z-10 flex items-center justify-center">
            <img src="/assets/check-circle-success.svg" alt="Success" className="w-[2.92vw] h-[2.92vw] object-contain animate-in fade-in zoom-in duration-500 delay-200" />
          </div>
        </div>

        <div className="flex flex-col gap-[0.42vw] text-center">
          <h2 className="text-white text-[1.67vw] font-medium not-italic tracking-tight font-inter not-italic">{title}</h2>
          {description && <p className="text-[#CCCCCC] text-[0.83vw] opacity-60 leading-[150%]">{description}</p>}
        </div>

        <button
          onClick={onDone}
          className="w-full h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all font-inter not-italic"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
