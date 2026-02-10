
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 24715 },
  { month: 'Feb', revenue: 26784 },
  { month: 'Mar', revenue: 26688 },
  { month: 'Apr', revenue: 28780 },
  { month: 'May', revenue: 30461 },
  { month: 'Jun', revenue: 32090 },
  { month: 'Jul', revenue: 31697 },
  { month: 'Aug', revenue: 31684 },
  { month: 'Sep', revenue: 33737 },
  { month: 'Oct', revenue: 33631 },
  { month: 'Nov', revenue: 33230 },
];

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <g>
      {/* Ripple/Halo */}
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="white" strokeOpacity="0.25" />
      {/* Solid Inner Dot */}
      <circle cx={cx} cy={cy} r="4" fill="white" stroke="#1A1F26" strokeWidth="1" />
    </g>
  );
};

const MonthlyRevenueCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full h-[27.2vw] shadow-2xl overflow-hidden border border-white/5">
      {/* Heading */}
      <div className="flex flex-col items-start p-[0.83vw] gap-[0.41vw] w-full h-[3.84vw]">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em] ">
          Monthly Revenue
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%] ">
          Visualizes revenue generated each month from subscriptions and poke pack purchases, indicating financial performance.
        </p>
      </div>

      {/* Chart */}
      <div className="relative flex-grow w-full min-w-0 min-h-0">
        <div className="absolute inset-0 pl-[0.66vw] pr-[0.62vw] pt-0 pb-[0.28vw]">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F00DB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5F00DB" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={true}
                  horizontal={true}
                  stroke="rgba(217, 217, 255, 0.15)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: '0.62vw' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: '0.62vw' }}
                  domain={[0, 40000]}
                  ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000]}
                  width={45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16003F',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  itemStyle={{ color: 'white' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FFFFFF"
                  strokeWidth="0.20vw"
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  dot={<CustomDot />}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#FFFFFF' }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  height={36}
                  content={({ payload }) => (
                    <div className="flex items-center justify-center gap-3 mt-[0.02vw]">
                      <div className="relative flex items-center justify-center w-[20px] h-[20px]">
                        <div className="absolute w-full h-[2px] bg-[#5F00DB]" />
                        <div className="relative w-[10px] h-[10px] bg-[#5F00DB] rounded-full border-2 border-[#1A1F26]" />
                      </div>
                      <span className="text-white/80 text-[12px] font-normal not-italic">Revenue</span>
                    </div>
                  )}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenueCard;
