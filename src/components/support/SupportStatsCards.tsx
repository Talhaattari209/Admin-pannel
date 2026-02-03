
import React from 'react';
import StatCard, { StatCardProps } from '../dashboard/StatCard';

const SupportStatsCards: React.FC = () => {
    const stats: (StatCardProps & { unit?: string })[] = [
        { title: 'Total Requests', value: '789', change: '12%', isPositive: true },
        { title: 'Open Requests', value: '456', change: '5%', isPositive: false },
        { title: 'Closed Requests', value: '321', change: '18%', isPositive: true },
        { title: 'Avg. Resolution Time', value: '30m', change: '3%', isPositive: true }
    ];

    return (
        <div className="flex flex-wrap items-center gap-[0.83vw] w-full min-h-[4.54vw] mb-[1.25vw]">
            {stats.map((stat, i) => (
                <div key={i} className="flex-1 min-w-[200px]">
                    <StatCard {...stat} />
                </div>
            ))}
        </div>
    );
};

export default SupportStatsCards;
