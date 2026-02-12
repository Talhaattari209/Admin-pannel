import React from 'react';

export type StatusType = 'New' | 'Pending' | 'Reviewing' | 'Resolved' | 'Closed' | 'Active' | 'Disabled' | 'Invited' | 'Successful' | 'Failed' | 'Draft' | 'Published' | 'Matched' | 'Unmatched' | 'Premium' | 'Free' | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "", size = 'md' }) => {
  const getColors = (s: string) => {
    switch (s) {
      case 'New':
      case 'Invited':
      case 'Draft':
      case 'Matched':
      case 'Premium':
        return 'bg-[#5F00DB] text-white';
      case 'Pending':
        return 'bg-[#F37600] text-white';
      case 'Reviewing':
        return 'bg-[#0099FF] text-white';
      case 'Resolved':
      case 'Active':
      case 'Successful':
        return 'bg-[#3ADC60] text-black';
      case 'Closed':
      case 'Disabled':
      case 'Failed':
      case 'Unmatched':
        return 'bg-[#FF4E4E] text-white';
      case 'Published':
        return 'bg-[#5F00DB] text-white shadow-[0_0_10px_rgba(95,0,219,0.3)]';
      case 'Free':
        return 'bg-[#111111] text-white/60';
      default:
        return 'bg-white/10 text-white/60';
    }
  };

  const height = size === 'sm' ? 'h-[24px]' : 'h-[32px]';

  return (
    <div className={`${height} px-4 rounded-full text-[13px] font-bold flex items-center justify-center min-w-[84px] leading-none text-center font-inter ${getColors(status)} ${className}`}>
      <span className="mt-[1px]">{status}</span>
    </div>
  );
};

export default StatusBadge;