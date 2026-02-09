
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { month: 'Jan', matches: 111714 },
  { month: 'Feb', matches: 114449 },
  { month: 'Mar', matches: 117898 },
  { month: 'Apr', matches: 112340 },
  { month: 'May', matches: 122765 },
  { month: 'Jun', matches: 105420 },
  { month: 'Jul', matches: 113005 },
  { month: 'Aug', matches: 118058 },
  { month: 'Sep', matches: 117330 },
  { month: 'Oct', matches: 103631 },
  { month: 'Nov', matches: 113327 },
];

const MatchesOverTimeCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full h-[30.2vw] shadow-2xl overflow-hidden border border-white/5">
      {/* Heading Section */}
      <div className="flex flex-col items-start p-[0.83vw] gap-[0.41vw] w-full h-[4.84vw]">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em] font-['SF_Pro_Text']">
          Matches Over Time
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%] font-['SF_Pro_Text']">
          Displays weekly match volume to visualize growth in user interaction and compatibility success.
        </p>
      </div>

      {/* Chart Section */}
      <div className="relative flex-grow w-full min-w-0 min-h-0">
        <div className="absolute inset-0 pl-[0.66vw] pr-[0.62vw] pt-[0.62vw] pb-[0.28vw]">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                barCategoryGap={0}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={true}
                  horizontal={true}
                  stroke="rgba(217, 217, 255, 0.25)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: '0.62vw' }}
                  dy={10}
                />
                {/* Added explicit any casting for domain and ticks to solve Recharts type overload issues where number[] is mistakenly compared to string | number */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: '0.62vw' }}
                  domain={[0, 200000] as any}
                  ticks={[0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000] as any}
                  width={45}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: '#16003F',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  itemStyle={{ color: 'white' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                />
                <Bar
                  dataKey="matches"
                  fill="#5F00DB"
                  radius={[20, 20, 0, 0]}
                  barSize={50}
                  background={{ fill: 'rgba(214, 219, 237, 0.08)' }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  height={36}
                  content={({ payload }) => (
                    <div className="flex items-center justify-center gap-2 mt-[0.02vw]">
                      <div className="w-[12px] h-[12px] bg-[#5F00DB] border border-[#1A1F26]" />
                      <span className="text-white/80 text-[12px] font-normal not-italic">Matches</span>
                    </div>
                  )}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesOverTimeCard;
