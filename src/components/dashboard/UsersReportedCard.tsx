import React, { useRef, useState, useEffect } from 'react';
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
  const { cx, cy, midAngle, outerRadius, value, name, color } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  const curveOffset = outerRadius * 0.12;
  const mx = cx + (outerRadius + curveOffset) * Math.cos(-midAngle * RADIAN);
  const my = cy + (outerRadius + curveOffset) * Math.sin(-midAngle * RADIAN);
  const labelGap = outerRadius * 0.08;
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
        y={y - labelGap}
        fill="rgba(255, 255, 255, 0.8)"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="clamp(10px, 0.62vw, 14px)"
      >
        {name}
      </text>
      <text
        x={x}
        y={y + labelGap}
        fill={color}
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="clamp(10px, 0.62vw, 14px)"
        fontWeight="bold"
      >
        {value}
      </text>
    </g>
  );
};

const UsersReportedCard: React.FC = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const chartRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

  useEffect(() => {
    if (!chartRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(chartRef.current);
    return () => ro.disconnect();
  }, []);

  const size = Math.max(80, Math.min(dimensions.width, dimensions.height) * 0.68);
  const innerRadius = size * 0.35;
  const outerRadius = size * 0.45;
  const cornerRadius = Math.max(4, outerRadius * 0.16);

  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full max-w-[39.16vw] h-[30.2vw] min-h-[280px] shadow-2xl overflow-hidden border border-white/5">
      <div className="flex flex-col items-start p-[1.25vw] gap-[0.41vw] w-full h-[6.09vw] min-h-[4rem]">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em] ">
          Users Reported
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%] ">
          Highlights the distribution of user-related reports (harassment, fake profiles, inappropriate media, etc.) to help prioritize moderation focus.
        </p>
      </div>

      <div className="relative flex flex-row w-full flex-grow min-h-0 px-[0.41vw] py-[1.05vw]">
        <div ref={chartRef} className="relative flex-grow h-full min-w-0 flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 left-1/2 -translate-x-1/2">
            <span className="text-white text-[1.66vw] font-bold not-italic translate-x-1/2">{total}</span>
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
                cx="55%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={0}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
                cornerRadius={cornerRadius}
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
        <div className="w-[9.37vw] flex flex-col justify-center gap-[0.83vw] pr-[1.25vw]">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-[0.62vw]">
              <div className="w-[0.62vw] h-[0.62vw] rounded-full border border-black/20" style={{ backgroundColor: item.color }} />
              <span className="text-white/80 text-[0.62vw] font-inter not-italic">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersReportedCard;
