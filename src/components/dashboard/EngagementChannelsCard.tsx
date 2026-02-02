
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Prompts Interaction', value: 38, color: '#5F00DB' },
  { name: 'Group Activity', value: 24, color: '#3ADC60' },
  { name: 'Swipes & Matches', value: 20, color: '#0099FF' },
  { name: 'Media', value: 11, color: '#FF4E4E' },
  { name: 'Pokes', value: 7, color: '#FF932F' },
];

const EngagementChannelsCard: React.FC = () => {
  const total = 100; // As per design mockup

  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[16px] w-full max-w-[496px] h-[580px] shadow-2xl overflow-hidden border border-white/5">
      <div className="flex flex-col items-start p-6 gap-2 w-full">
        <h4 className="text-white text-[24px] font-bold leading-[120%] tracking-[-0.04em]">
          Top Engagement Channels
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[16px] leading-[150%]">
          Breaks down where users spend most of their time—prompts, groups, media, or profile discovery.
        </p>
      </div>

      <div className="relative flex-grow w-full px-2 pt-6 pb-2 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-white text-[32px] font-bold">{total}</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{ backgroundColor: '#16003F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: 'white' }}
              labelStyle={{ display: 'none' }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={110}
              outerRadius={140}
              paddingAngle={0}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              cornerRadius={20}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              align="center"
              content={({ payload }) => (
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 px-8">
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-white/80 text-[12px] font-normal whitespace-nowrap">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementChannelsCard;
