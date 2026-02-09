
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { name: 'Free', value: 56, color: '#5F00DB' },
  { name: 'Premium', value: 44, color: '#3ADC60' },
];

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, name, color } = props;
  const RADIAN = Math.PI / 180;
  // Adjusted radius for better fit within the container
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  const mx = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
  const my = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);

  const isRight = x > cx;

  return (
    <g>
      <path d={`M${sx},${sy} Q${mx},${my} ${x},${y}`} stroke={color} fill="none" strokeWidth={1} opacity={0.6} />
      <text x={x} y={y - 8} fill="rgba(255, 255, 255, 0.6)" textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central" fontSize="0.62vw" className="font-inter not-italic">
        {name}
      </text>
      <text x={x} y={y + 8} fill={color} textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central" fontSize="0.62vw" fontWeight="bold" className="font-inter not-italic">
        {value}
      </text>
    </g>
  );
};


const SubscriptionsBreakdownCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full h-[30.2vw] shadow-2xl overflow-hidden border border-white/5">
      <div className="flex flex-col items-start p-[1.25vw] gap-[0.41vw] w-full">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em] font-['SF_Pro_Text']">
          Subscriptions Breakdown
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%] font-['SF_Pro_Text']">
          Shows the proportion of free vs premium users, conversion rates and adoption.
        </p>
      </div>

      <div className="relative flex-grow w-full min-w-0 min-h-0">
        <div className="absolute inset-0 flex items-center justify-center p-[0.83vw]">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span className="text-white text-[1.66vw] font-bold not-italic font-inter not-italic">100</span>
          </div>

          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{ backgroundColor: '#16003F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.41vw' }}
                  itemStyle={{ color: 'white' }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={94}
                  outerRadius={118}
                  paddingAngle={0}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
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
                    <div className="flex items-center justify-center gap-[1.25vw] mt-[0.83vw]">
                      {payload?.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-[0.41vw]">
                          <div className="w-[0.62vw] h-[0.62vw] rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-white/60 text-[0.62vw] font-inter not-italic">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsBreakdownCard;
