import React, { useRef, useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const data = [
  { name: 'iOS', value: 12339, color: '#5F00DB' },
  { name: 'Android', value: 10460, color: '#3ADC60' },
];

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value, name } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  const curveOffset = outerRadius * 0.13;
  const mx = cx + (outerRadius + curveOffset) * Math.cos(-midAngle * RADIAN);
  const my = cy + (outerRadius + curveOffset) * Math.sin(-midAngle * RADIAN);
  const labelOffset = outerRadius * 0.14;
  const isRight = x > cx;

  return (
    <g>
      <path
        d={`M${sx},${sy} Q${mx},${my} ${x},${y}`}
        stroke="white"
        fill="none"
        strokeWidth={1}
        opacity={0.4}
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
        y={y + labelOffset}
        fill="white"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="clamp(10px, 0.62vw, 14px)"
        fontWeight="bold"
      >
        {value.toLocaleString()}
      </text>
    </g>
  );
};

const UsageDistributionCard: React.FC = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const chartRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 180, height: 180 });

  useEffect(() => {
    if (!chartRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(chartRef.current);
    return () => ro.disconnect();
  }, []);

  const size = Math.max(80, Math.min(dimensions.width, dimensions.height) * 0.72);
  const innerRadius = size * 0.35;
  const outerRadius = size * 0.45;
  const cornerRadius = Math.max(4, outerRadius * 0.17);

  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full h-[30.2vw] min-h-[280px] shadow-2xl overflow-hidden border border-white/5">
      <div className="flex flex-col items-start p-[0.83vw] md:p-[1.25vw] gap-[0.41vw] w-full">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em]">
          Platform Usage Distribution
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%]">
          Compare user activity between iOS and Android.
        </p>
      </div>

      <div ref={chartRef} className="relative flex-grow w-full min-h-0 px-[0.41vw] pt-[1.25vw] pb-[0.41vw] flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-white text-[1.66vw] font-bold not-italic leading-none">
            {total.toLocaleString()}
          </span>
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
            <Legend
              verticalAlign="bottom"
              align="center"
              height={36}
              content={({ payload }) => (
                <div className="flex items-center justify-center gap-[1.25vw] mt-[0.83vw]">
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-[0.41vw]">
                      <div
                        className="w-[0.62vw] h-[0.62vw] rounded-full border border-black/20"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-white/80 text-[0.62vw] font-normal not-italic">{entry.value}</span>
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
