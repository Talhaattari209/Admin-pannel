
import React from 'react';

export interface LogEntryData {
    id: string;
    timestamp: string;
    user: string;
    role: string;
    action: string;
    details: string;
}

interface SystemLogsTableRowProps {
    data: LogEntryData;
}

const SystemLogsTableRow: React.FC<SystemLogsTableRowProps> = ({ data }) => {
    return (
        <div className="group flex flex-row items-center w-full h-[2.92vw] bg-[#222222] border-b border-[rgba(102,102,102,0.5)] hover:bg-white/[0.05] transition-colors shrink-0 relative ">
            {/* Timestamp: 15% */}
            <div className="w-[15%] h-full px-[0.63vw] flex items-center gap-[0.42vw] shrink-0">
                <span className="text-white text-[0.73vw] leading-[0.83vw]">
                    {data.timestamp.split(' • ')[0]}
                </span>
                <div className="w-[0.16vw] h-[0.16vw] bg-white rounded-full opacity-100" />
                <span className="text-white text-[0.73vw] leading-[0.83vw]">
                    {data.timestamp.split(' • ')[1]}
                </span>
            </div>

            {/* User: 15% */}
            <div className="w-[15%] h-full px-[0.63vw] flex flex-col justify-center shrink-0">
                <span className="text-white text-[0.73vw] leading-[0.83vw] truncate">
                    {data.user}
                </span>
            </div>

            {/* Role: 15% */}
            <div className="w-[15%] h-full px-[0.63vw] flex flex-col justify-center shrink-0">
                <span className="text-white text-[0.73vw] leading-[0.83vw] truncate opacity-100">
                    {data.role}
                </span>
            </div>

            {/* Action: 20% */}
            <div className="w-[20%] h-full px-[0.63vw] flex flex-col justify-center shrink-0">
                <span className="text-white text-[0.73vw] leading-[0.83vw] truncate font-normal not-italic">
                    {data.action}
                </span>
            </div>

            {/* Details: 35% */}
            <div className="w-[35%] h-full px-[0.63vw] flex flex-col justify-center shrink-0">
                <span className="text-white text-[0.73vw] leading-[0.83vw] truncate">
                    {data.details}
                </span>
            </div>
        </div>
    );
};

export default SystemLogsTableRow;
