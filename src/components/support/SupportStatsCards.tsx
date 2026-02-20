
import React from 'react';
import { useSupportStats } from '@/services/support';

const SupportStatsCards: React.FC = () => {
    const { data: stats, isLoading } = useSupportStats();

    // Format avg resolution time from ms to human-readable
    const formatAvgTime = (ms: number | null | undefined): string => {
        if (ms === null || ms === undefined || ms === 0) return '—';
        const minutes = Math.floor(ms / 60000);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        return `${minutes}m`;
    };

    const displayStats = [
        {
            title: 'Total Requests',
            value: isLoading ? '...' : String(stats?.totalRequests ?? 0)
        },
        {
            title: 'Open Requests',
            value: isLoading ? '...' : String(stats?.openRequests ?? 0)
        },
        {
            title: 'Closed Requests',
            value: isLoading ? '...' : String(stats?.closedRequests ?? 0)
        },
        {
            title: 'Avg. Resolution Time',
            value: isLoading ? '...' : formatAvgTime(stats?.avgResolutionTimeMs)
        },
    ];

    return (
        <div className="flex flex-row flex-nowrap items-center gap-[0.83vw] w-full">
            {displayStats.map((stat, i) => (
                <div key={i} className="flex flex-col justify-end items-start p-[0.83vw] gap-[1.25vw] flex-1 h-[5.68vw] bg-[rgba(22,0,63,0.5)] backdrop-blur-[12px] rounded-[0.83vw]">
                    <div className="flex items-center w-full h-[1vw]">
                        <span className="text-[#CCCCCC] font-bold not-italic text-[0.83vw] leading-[120%] tracking-[-0.04em]">
                            {stat.title}
                        </span>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-[0.42vw] w-full h-[1.77vw]">
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
