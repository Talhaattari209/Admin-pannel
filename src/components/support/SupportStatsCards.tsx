
import React from 'react';
import StatCard, { StatCardProps } from '../dashboard/StatCard';

const SupportStatsCards: React.FC = () => {
    const stats = [
        { title: 'Total Requests', value: '789' },
        { title: 'Open Requests', value: '456' },
        { title: 'Closed Requests', value: '321' },
        { title: 'Avg. Resolution Time', value: '30m' }
    ];

    return (
        <div className="flex flex-row flex-nowrap items-center gap-[0.83vw] w-full mb-[1.25vw]">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col justify-end items-start p-[0.83vw] gap-[1.25vw] flex-1 h-[5.68vw] bg-[rgba(22,0,63,0.5)] backdrop-blur-[12px] rounded-[0.83vw] font-['SF_Pro_Text']">
                    {/* Title */}
                    <div className="flex items-center w-full h-[1vw]">
                        <span className="text-[#CCCCCC] font-bold not-italic text-[0.83vw] leading-[120%] tracking-[-0.04em]">
                            {stat.title}
                        </span>
                    </div>

                    {/* Value Row */}
                    <div className="flex flex-row justify-end items-center gap-[0.42vw] w-full h-[1.77vw]">
                        {/* Value */}
                        <span className="flex-grow text-white font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em]">
                            {stat.value}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SupportStatsCards;
