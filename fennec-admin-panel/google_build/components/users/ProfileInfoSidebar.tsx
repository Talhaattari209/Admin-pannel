import React from 'react';
import StatusBadge from '../shared/StatusBadge';

interface Stat {
  label: string;
  value: string;
  isBadge?: boolean;
}

interface ProfileInfoSidebarProps {
  title: string;
  stats: Stat[];
  className?: string;
  width?: string;
  topOffset?: string;
}

const ProfileInfoSidebar: React.FC<ProfileInfoSidebarProps> = ({ 
  title, 
  stats, 
  className = "", 
  width = "100%",
  topOffset = "2vw"
}) => {
  return (
    <div 
      className={`flex flex-col p-[1.5vw] bg-[#222222] border border-[#666666]/30 rounded-[24px] gap-[2vw] shadow-2xl sticky shrink-0 ${className}`}
      style={{ width, top: topOffset }}
    >
      <h3 className="text-white text-[1.8vw] font-bold tracking-tight font-inter">{title}</h3>
      <div className="h-[1px] w-full bg-white/10" />
      <div className="flex flex-col gap-[1.5vw]">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center justify-between min-h-[32px] gap-2">
            <span className="text-[#CCCCCC] text-[0.9vw] font-inter whitespace-nowrap">{stat.label}</span>
            {stat.isBadge ? (
              <StatusBadge status={stat.value} className="shadow-lg shrink-0" />
            ) : (
              <span className="text-white text-[0.9vw] font-medium font-inter text-right truncate pl-2">{stat.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfoSidebar;