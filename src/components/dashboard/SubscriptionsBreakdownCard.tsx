
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
  const radius = outerRadius * 1.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  
  const mx = cx + (outerRadius + 15) * Math.cos(-midAngle * RADIAN);
  const my = cy + (outerRadius + 15) * Math.sin(-midAngle * RADIAN);
  
  const isRight = x > cx;

  return (
    <g>
      <path d={`M${sx},${sy} Q${mx},${my} ${x},${y}`} stroke={color} fill="none" strokeWidth={1} opacity={0.6} />
      <text x={x} y={y - 8} fill="rgba(255, 255, 255, 0.6)" textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central" fontSize={12} className="font-inter">
        {name}
      </text>
      <text x={x} y={y + 8} fill={color} textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold" className="font-inter">
        {value}
      </text>
    </g>
  );
};

const SubscriptionsBreakdownCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[16px] w-full h-[580px] shadow-2xl overflow-hidden border border-white/5">
      <div className="flex flex-col items-start p-6 gap-2 w-full">
        <h4 className="text-white text-[24px] font-bold leading-[120%] tracking-[-0.04em] font-michroma">
          Subscriptions Breakdown
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[16px] leading-[150%]">
          Shows the proportion of free vs premium users, conversion rates and adoption.
        </p>
      </div>

      <div className="relative flex-grow w-full flex items-center justify-center p-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-white text-[32px] font-bold font-inter">100</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
              contentStyle={{ backgroundColor: '#16003F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
              itemStyle={{ color: 'white' }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={120}
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
                <div className="flex items-center justify-center gap-6 mt-4">
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-white/60 text-[12px] font-inter">{entry.value}</span>
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

export default SubscriptionsBreakdownCard;
