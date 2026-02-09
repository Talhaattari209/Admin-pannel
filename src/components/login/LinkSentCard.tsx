import React from 'react';

interface LinkSentCardProps {
  onBack: () => void;
}

const LinkSentCard: React.FC<LinkSentCardProps> = ({ onBack }) => {
  return (
    <div className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[25vw] min-w-[320px] max-w-[480px] bg-[#16003F]/50 border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.67vw]">

      {/* Icon Section */}
      <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] w-[6.25vw] h-[6.25vw] relative isolate rounded-[6.25vw]">
        {/* Glow */}
        <div className="absolute inset-[-3.125vw] bg-gradient-to-b from-[#5F00DB] via-[30%] to-transparent opacity-50 rounded-full blur-xl z-0" />

        {/* Icon BG */}
        <div className="absolute w-[6.25vw] h-[6.25vw] bg-white/5 backdrop-blur-[6px] rounded-full z-0" />

        {/* Check Icon */}
        <svg viewBox="0 0 72 72" fill="none" className="w-[3.75vw] h-[3.75vw] relative z-10">
          <path d="M15 36L30 51L57 24" stroke="#3ADC60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
