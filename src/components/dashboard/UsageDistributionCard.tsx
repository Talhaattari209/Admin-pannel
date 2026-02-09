
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
  { name: 'iOS', value: 12339, color: '#5F00DB' },     // Purple on the right
  { name: 'Android', value: 10460, color: '#3ADC60' }, // Green on the left
];

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, name } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Line endpoint for the anchor
  const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  // Control point for the curve
  const mx = cx + (outerRadius + 15) * Math.cos(-midAngle * RADIAN);
  const my = cy + (outerRadius + 15) * Math.sin(-midAngle * RADIAN);

  const isRight = x > cx;

  return (
    <g>
      {/* Connector Line */}
      <path
        d={`M${sx},${sy} Q${mx},${my} ${x},${y}`}
        stroke="white"
        fill="none"
        strokeWidth={1}
        opacity={0.4}
      />
      {/* Label Text */}
      <text
        x={x}
        y={y}
        fill="rgba(255, 255, 255, 0.8)"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="0.62vw"
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 16}
        fill="white"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="0.62vw"
        fontWeight="bold"
      >
        {value.toLocaleString()}
      </text>
    </g>
  );
};

const UsageDistributionCard: React.FC = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex flex-col items-start bg-[#222222] rounded-[0.83vw] w-full h-[30.2vw] shadow-2xl overflow-hidden border border-white/5">
      {/* Heading Section */}
      <div className="flex flex-col items-start p-[0.83vw] md:p-[1.25vw] gap-[0.41vw] w-full">
        <h4 className="text-white text-[1.25vw] font-bold not-italic leading-[120%] tracking-[-0.04em]">
          Platform Usage Distribution
        </h4>
        <p className="text-[#CCCCCC] opacity-50 text-[0.83vw] leading-[150%]">
          Compare user activity between iOS and Android.
        </p>
      </div>

      {/* Chart Section */}
      <div className="relative flex-grow w-full min-w-0 min-h-0">
        <div className="absolute inset-0 px-[0.41vw] pt-[1.25vw] pb-[0.41vw] flex items-center justify-center">
          {/* Total Display Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span className="text-white text-[1.66vw] font-bold not-italic leading-none">
              {total.toLocaleString()}
            </span>
          </div>

          <div className="w-full h-full">
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
                  innerRadius={94}
                  outerRadius={118}
                  paddingAngle={0}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  cornerRadius={20} // Added rounded corners as requested
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
                            className="w-[0.62vw] h-[0.62vw] rounded-full border border border-black/20"
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
      </div>
    </div>
  );
};

export default UsageDistributionCard;
