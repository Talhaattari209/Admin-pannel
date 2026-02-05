import React from 'react';

interface BaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  actions: React.ReactNode;
  width?: string;
  minHeight?: string;
  iconGlowColor?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({ 
  icon, 
  title, 
  description, 
  children, 
  actions, 
  width = "480px",
  minHeight = 'auto',
  iconGlowColor = '#5F00DB'
}) => {
  return (
    <div 
      className="relative flex flex-col items-center p-8 gap-8 bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[32px] box-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
      style={{ width, minHeight }}
    >
      {/* Icon Section */}
      <div className="relative flex flex-col justify-center items-center w-[120px] h-[120px] shrink-0 isolation-auto">
        <div 
          className="absolute -inset-[60px] opacity-50 blur-2xl pointer-events-none rounded-full"
          style={{ background: `linear-gradient(180deg, ${iconGlowColor} 30%, transparent 70%)` }}
        ></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
        <div className="relative z-10 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-4 text-center self-stretch">
        <h2 className="text-[32px] font-medium not-italic leading-[38px] tracking-[-0.02em] text-white font-inter not-italic">
          {title}
        </h2>
        <div className="text-white">
          {typeof description === 'string' ? (
            <p className="text-[18px] font-normal not-italic leading-[32px] opacity-90 font-inter not-italic">{description}</p>
          ) : (
            description
          )}
        </div>
      </div>

      {/* Custom Middle Content */}
      {children && (
        <div className="flex flex-col self-stretch gap-8 overflow-hidden">
          {children}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-row items-center justify-center gap-[24px] self-stretch mt-auto">
        {actions}
      </div>
    </div>
  );
};

export default BaseCard;