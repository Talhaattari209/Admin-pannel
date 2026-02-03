
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
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full max-w-[25.83vw] h-[30.2vw] shadow-2xl overflow-hidden border border-white/5">
      <div className="flex flex-col items-start p-[1.25vw] gap-[0.41vw] w-full">
        <h4 className="text-white text-[1.25vw] font-bold leading-[120%] tracking-[-0.04em] font-['SF_Pro_Text']">
          Top Engagement Channels
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%] font-['SF_Pro_Text']">
          Breaks down where users spend most of their time—prompts, groups, media, or profile discovery.
        </p>
      </div>

      <div className="relative flex-grow w-full px-[0.41vw] pt-[1.25vw] pb-[0.41vw] flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-white text-[1.66vw] font-bold font-inter">{total}</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{ backgroundColor: '#16003F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.41vw' }}
              itemStyle={{ color: 'white' }}
              labelStyle={{ display: 'none' }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={91}
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
                <div className="flex flex-wrap items-center justify-center gap-x-[1.25vw] gap-y-[0.41vw] mt-[0.83vw] px-[1.66vw]">
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-[0.41vw]">
                      <div className="w-[0.62vw] h-[0.62vw] rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-white/80 text-[0.62vw] font-normal whitespace-nowrap">{entry.value}</span>
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
