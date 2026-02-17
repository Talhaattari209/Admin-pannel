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
  { day: '1', dau: 12931 },
  { day: '2', dau: 11075 },
  { day: '3', dau: 9171 },
  { day: '4', dau: 12804 },
  { day: '5', dau: 12990 },
  { day: '6', dau: 10014 },
  { day: '7', dau: 12414 },
  { day: '8', dau: 9336 },
  { day: '9', dau: 10607 },
  { day: '10', dau: 9144 },
  { day: '11', dau: 9441 },
  { day: '12', dau: 11947 },
  { day: '13', dau: 11199 },
  { day: '14', dau: 12766 },
];

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="white" strokeOpacity="0.25" />
      <circle cx={cx} cy={cy} r="4" fill="white" stroke="#1A1F26" strokeWidth="1" />
    </g>
  );
};

const DAUChartCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full h-[27.2vw] shadow-2xl overflow-hidden border border-white/5 transition-all hover:border-white/10">
      <div className="flex flex-col items-start p-[0.83vw] gap-[0.41vw] w-full h-[3.84vw]">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em] ">
          Daily Active Users (DAU)
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%] max-w-[50.83vw] ">
          Shows the number of users active each day, helping track engagement trends and overall platform health.
        </p>
      </div>

      <div className="relative flex-grow w-full min-w-0 min-h-0">
        <div className="absolute inset-0 pl-[0.66vw] pr-[1.62vw] pt-[0.62vw] pb-[0.28vw]">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDauFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F00DB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5F00DB" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={true}
                  horizontal={true}
                  stroke="rgba(217, 217, 255, 0.1)"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: '0.62vw' }}
                  dy={15}
                  height={50}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: '0.62vw' }}
                  domain={[0, 20000]}
                  ticks={[0, 5000, 10000, 15000, 20000]}
                  width={45}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#16003F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area
                  type="monotone"
                  dataKey="dau"
                  stroke="#FFFFFF"
                  strokeWidth="0.1vw"
                  fillOpacity={1}
                  fill="url(#colorDauFull)"
                  dot={<CustomDot />}
                  activeDot={{ r: 6, fill: '#5F00DB' }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  content={() => (
                    <div className="flex items-center justify-center gap-[0.62vw] mt-[0.02vw]">
                      <div className="w-[0.83vw] h-[0.1vw] bg-[#5F00DB]" />
                      <div className="w-[0.41vw] h-[0.41vw] bg-[#5F00DB] rounded-full -ml-[0.62vw]" />
                      <span className="text-white/60 text-[0.62vw] font-inter not-italic">DAU</span>
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

export default DAUChartCard;
