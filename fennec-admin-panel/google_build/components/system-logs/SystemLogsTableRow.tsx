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
    <div className="group flex flex-row items-center w-full h-[56px] bg-[#222222] border-b border-[#666666]/50 hover:bg-white/[0.02] transition-colors shrink-0 relative font-['SF_Pro_Text']">
      {/* Timestamp: 15% */}
      <div className="w-[15%] h-[56px] px-3 flex items-center gap-2 shrink-0">
        <span className="text-white text-[0.73vw] leading-[0.83vw]">
          {data.timestamp.split(' • ')[0]}
        </span>
        <div className="w-[3px] h-[3px] bg-white rounded-full opacity-100" />
        <span className="text-white text-[0.73vw] leading-[0.83vw]">
          {data.timestamp.split(' • ')[1]}
        </span>
      </div>

      {/* User: 15% */}
      <div className="w-[15%] h-[56px] px-3 flex flex-col justify-center shrink-0">
        <span className="text-white text-[0.73vw] leading-[0.83vw] truncate">
          {data.user}
        </span>
      </div>

      {/* Role: 15% */}
      <div className="w-[15%] h-[56px] px-3 flex flex-col justify-center shrink-0">
        <span className="text-white text-[0.73vw] leading-[0.83vw] truncate opacity-100">
          {data.role}
        </span>
      </div>

      {/* Action: 20% */}
      <div className="w-[20%] h-[56px] px-3 flex flex-col justify-center shrink-0">
        <span className="text-white text-[0.73vw] leading-[0.83vw] truncate font-normal">
          {data.action}
        </span>
      </div>

      {/* Details: 35% */}
      <div className="w-[35%] h-[56px] px-3 flex flex-col justify-center shrink-0">
        <span className="text-white text-[0.73vw] leading-[0.83vw] truncate opacity-60">
          {data.details}
        </span>
      </div>
    </div>
  );
};

export default SystemLogsTableRow;