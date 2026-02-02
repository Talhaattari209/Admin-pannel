
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Harassment', value: 32, color: '#5F00DB' },
  { name: 'Fake Profile', value: 25, color: '#3ADC60' },
  { name: 'Inappropriate Media', value: 21, color: '#FF8754' },
  { name: 'Spam / Scams', value: 15, color: '#1DF2FF' },
  { name: 'Other', value: 7, color: '#FF4E4E' },
];

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, name, color } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  const mx = cx + (outerRadius + 15) * Math.cos(-midAngle * RADIAN);
  const my = cy + (outerRadius + 15) * Math.sin(-midAngle * RADIAN);

  const isRight = x > cx;

  return (
    <g>
      <path
        d={`M${sx},${sy} Q${mx},${my} ${x},${y}`}
        stroke={color}
        fill="none"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={x}
        y={y - 8}
        fill="rgba(255, 255, 255, 0.8)"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        className="font-inter"
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 10}
        fill={color}
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
        className="font-inter"
      >
        {value}
      </text>
    </g>
  );
};

const UsersReportedCard: React.FC = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[16px] w-full max-w-[752px] h-[580px] shadow-2xl overflow-hidden border border-white/5">
      {/* Heading */}
      <div className="flex flex-col items-start p-6 gap-2 w-full h-[117px]">
        <h4 className="text-white text-[24px] font-bold leading-[120%] tracking-[-0.04em] font-michroma">
          Users Reported
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[16px] leading-[150%]">
          Highlights the distribution of user-related reports (harassment, fake profiles, inappropriate media, etc.) to help prioritize moderation focus.
        </p>
      </div>

      {/* Main Chart Area */}
      <div className="relative flex flex-row w-full h-[463px] px-2 py-6">
        <div className="relative flex-grow h-full flex items-center justify-center">
          {/* Central Total */}
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
                innerRadius={100}
                outerRadius={130}
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-[180px] flex flex-col justify-center gap-4 pr-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: item.color }} />
              <span className="text-white/80 text-[12px] font-inter">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersReportedCard;
