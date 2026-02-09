import React from 'react';

interface LinkSentCardProps {
  onBack: () => void;
}

const LinkSentCard: React.FC<LinkSentCardProps> = ({ onBack }) => {
  return (
    <div className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[25vw] min-w-[320px] max-w-[480px] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.67vw]">

      {/* Icon Section */}
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

        {/* Check Icon */}
        {/* Check Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <img src="/assets/check-circle-success.svg" alt="Success" className="w-[2.92vw] h-[2.92vw] object-contain" />
        </div>
      </div>

      {/* Header Text */}
      <div className="flex flex-col items-center gap-[1.67vw] w-full">
        <h2 className=" font-medium not-italic text-[1.67vw] leading-[1.2] text-white text-center tracking-[-0.02em]">
          Link Sent!
        </h2>
        <p className=" font-normal not-italic text-[0.94vw] leading-[1.78] text-[#DDDDDD] text-center">
          Check your email inbox and follow the instructions to reset your password.
        </p>
      </div>

      {/* Action Button */}
      <div className="w-full">
        <button
          onClick={onBack}
          className="w-full flex justify-center items-center bg-[#5F00DB] shadow-[0px_8px_12px_rgba(95,0,219,0.25)] rounded-[2.7vw] py-[0.83vw] px-[1.25vw] gap-[0.625vw] hover:brightness-110 transition-all active:scale-[0.98]"
        >
          <span className=" font-medium not-italic text-[0.83vw] leading-[1.5] text-white text-center">
            Back to Login
          </span>
        </button>
      </div>
    </div>
  );
};

export default LinkSentCard;
