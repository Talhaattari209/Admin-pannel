
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, unit, icon, trend, className = "" }) => {
  return (
    <div className={`flex flex-col justify-between p-6 flex-1 min-w-[240px] h-[123px] bg-[#16003F] border border-[#666666]/30 rounded-[24px] relative overflow-hidden group hover:border-[#5F00DB]/50 transition-all duration-300 shadow-xl ${className}`}>
      {/* Subtle Purple Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F00DB] opacity-10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>
      
      <div className="flex justify-between items-start z-10">
        <span className="text-white/80 text-[14px] font-bold uppercase tracking-wider leading-none">{label}</span>
        {icon && <div className="text-white/40">{icon}</div>}
      </div>

      <div className="flex items-end justify-between z-10">
        <div className="flex items-baseline gap-1">
          <span className="text-white text-[44px] font-bold tracking-tight leading-none">{value}</span>
          {unit && <span className="text-white/60 text-[18px] font-medium leading-none">{unit}</span>}
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 ${trend.isUp ? 'text-[#3ADC60]' : 'text-[#FF4E4E]'}`}>
            <svg viewBox="0 0 24 24" className={`w-5 h-5 ${!trend.isUp ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <span className="text-[20px] font-bold leading-none tracking-tight">{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
