
import React from 'react';

interface BaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  actions: React.ReactNode;
  minHeight?: string;
  iconGlowColor?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({
  icon,
  title,
  description,
  children,
  actions,
  minHeight = 'auto',
  iconGlowColor = '#5F00DB'
}) => {
  return (
    <div
      className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[95vw] max-w-[25vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.67vw] box-border shadow-2xl overflow-hidden"
      style={{ minHeight }}
    >
      {/* Icon Section */}
      <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
        {/* Glow behind icon */}
        <div
          className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
          style={{ background: `linear-gradient(180deg, ${iconGlowColor} 30%, transparent 70%)` }}
        ></div>
        {/* Icon BG Layer */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
        {/* Actual Icon Content */}
        <div className="relative z-10 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
        <h2 className="text-[1.67vw] font-medium leading-[2vw] tracking-[-0.02em] text-white">
          {title}
        </h2>
        <div className="text-white">
          {typeof description === 'string' ? (
            <p className="text-[0.94vw] font-normal leading-[1.67vw] opacity-90">{description}</p>
          ) : (
            description
          )}
        </div>
      </div>

      {/* Custom Middle Content (Lists, Inputs, etc.) */}
      {children && (
        <div className="flex flex-col self-stretch gap-[1.67vw]">
          {children}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
        {actions}
      </div>
    </div>
  );
};

export default BaseCard;
