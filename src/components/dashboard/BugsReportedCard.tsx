import React, { useRef, useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Critical', value: 32, color: '#5F00DB' },
  { name: 'High', value: 25, color: '#3ADC60' },
  { name: 'Medium', value: 21, color: '#FF8754' },
  { name: 'Low', value: 15, color: '#1DF2FF' },
];

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value, name, color } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  const curveOffset = outerRadius * 0.16;
  const mx = cx + (outerRadius + curveOffset) * Math.cos(-midAngle * RADIAN);
  const my = cy + (outerRadius + curveOffset) * Math.sin(-midAngle * RADIAN);
  const labelGap = outerRadius * 0.13;
  const isRight = x > cx;

  return (
    <g>
      <path
        d={`M${sx},${sy} Q${mx},${my} ${x},${y}`}
        stroke={color}
        fill="none"
        strokeWidth={1}
        opacity={0.6}
      />
      <text
        x={x}
        y={y}
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

const BugsReportedCard: React.FC = () => {
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

  const size = Math.max(80, Math.min(dimensions.width, dimensions.height) * 0.62);
  const innerRadius = size * 0.37;
  const outerRadius = size * 0.47;
  const cornerRadius = Math.max(4, outerRadius * 0.16);

  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full max-w-[39.16vw] h-[27.2vw] min-h-[220px] shadow-2xl overflow-hidden border border-white/5">
      <div className="flex flex-col items-start p-[1.25vw] gap-[0.41vw] w-full h-[6.09vw] min-h-[4rem]">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em] ">
          Bugs Reported
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%] ">
          Shows how reported bugs are categorized by severity, aiding development teams in assessing impact and response priority.
        </p>
      </div>

      <div className="relative flex flex-row w-full flex-grow min-h-0 px-[0.41vw] py-[1.25vw]">
        <div ref={chartRef} className="relative flex-grow h-full min-w-0 flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span className="text-white text-[1.66vw] font-bold not-italic">{total}</span>
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

        <div className="w-[3.65vw] flex flex-col justify-center gap-[0.21vw] pr-[1.25vw]">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-[0.41vw]">
              <div
                className="w-[0.62vw] h-[0.62vw] rounded-full border border-[#1A1F26]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white/80 text-[0.62vw]">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BugsReportedCard;
