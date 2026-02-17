
import React from 'react';

import StatCard, { StatCardProps } from '../dashboard/StatCard';

const LogStats: React.FC = () => {
    // Mapping original stats to StatCardProps
    // Original: { label, value, trend: { value, isUp } }
    // Target: { label, value, change, isUp }

    const stats: StatCardProps[] = [
        { title: "Total Logs", value: "12,345", change: "12%", isPositive: true },
        { title: "Security Events", value: "123", change: "12%", isPositive: false },
        { title: "Admin Actions", value: "1,234", change: "12%", isPositive: true },
        { title: "System Errors", value: "12", change: "12%", isPositive: false },
        { title: "Active Sessions", value: "123", change: "12%", isPositive: true },
        { title: "Data Exports", value: "45", change: "12%", isPositive: false },
    ];

    return (
        <div className="flex flex-wrap items-center gap-[0.83vw] w-full min-h-[4.54vw]">
            {stats.map((stat, index) => (
                <div key={index} className="flex-1 min-w-[200px]">
                    <StatCard {...stat} />
                </div>
            ))}
        </div>
    );
};

export default LogStats;
