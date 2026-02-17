
import React from 'react';

const SupportStatsCards: React.FC = () => {
  const stats = [
    { label: 'Total Requests', value: '789' },
    { label: 'Open Requests', value: '456' },
    { label: 'Closed Requests', value: '321' },
    { label: 'Avg. Resolution Time', value: '30', unit: 'min' }
  ];

  return (
    <div className="flex flex-row gap-4 w-full max-w-[1520px] mb-10 overflow-hidden no-scrollbar">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col justify-between p-6 flex-1 min-w-0 h-[123px] bg-[#16003F] border border-[#666666]/30 rounded-[24px] relative overflow-hidden group hover:border-[#5F00DB]/50 transition-all duration-300 shadow-xl"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F00DB] opacity-10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>

          <span className="text-white/80 text-[14px] font-bold uppercase tracking-wider leading-none z-10">{stat.label}</span>
          <div className="flex items-baseline gap-1 z-10">
            <span className="text-white text-[44px] font-bold tracking-tight leading-none">{stat.value}</span>
            {stat.unit && <span className="text-white/60 text-[18px] font-medium leading-none">{stat.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportStatsCards;
