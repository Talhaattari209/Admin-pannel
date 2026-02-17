import React from 'react';
import StatsCard from './StatsCard';

interface StatsItem {
  label: string;
  value: string | number;
  trend?: { value: number | string; isUp: boolean };
  unit?: string;
}

interface StatsRowProps {
  stats: StatsItem[];
  className?: string;
}

const StatsRow: React.FC<StatsRowProps> = ({ stats, className = "" }) => {
  return (
    <div className={`flex flex-row gap-[1vw] w-full mb-10 shrink-0 ${className}`}>
      {stats.map((stat, i) => (
        <StatsCard 
          key={i} 
          label={stat.label} 
          value={stat.value} 
          trend={typeof stat.trend?.value === 'string' ? { value: parseFloat(stat.trend.value), isUp: stat.trend.isUp } : (stat.trend as any)} 
          unit={stat.unit}
          className="flex-1"
        />
      ))}
    </div>
  );
};

export default StatsRow;