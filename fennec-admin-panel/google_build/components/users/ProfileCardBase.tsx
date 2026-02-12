import React from 'react';

interface ProfileCardRow {
  label: string;
  value: React.ReactNode;
}

interface ProfileCardBaseProps {
  rows: ProfileCardRow[];
  children?: React.ReactNode;
  className?: string;
  width?: string;
  minHeight?: string;
}

const ProfileCardBase: React.FC<ProfileCardBaseProps> = ({ rows, children, className = "", width, minHeight }) => {
  return (
    <div 
      className={`flex flex-col p-4 gap-4 bg-[#111111] backdrop-blur-[6px] border border-white/5 rounded-[24px] shadow-xl hover:border-white/10 transition-all duration-300 ${className}`}
      style={{ width, minHeight }}
    >
      <div className="flex flex-col gap-3">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-row items-center justify-between min-h-[32px]">
            <span className="text-[#CCCCCC] text-[1vw] font-inter">{row.label}</span>
            <div className="text-white text-[1vw] font-inter text-right">
              {row.value}
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ProfileCardBase;