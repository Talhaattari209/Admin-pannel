
import React, { useState } from 'react';
import BaseCard from '../BaseCard';

interface ExportDataCardProps {
  onCancel: () => void;
  onDownload: (config: any) => void;
}

const QUICK_FILTERS = [
  'Last 7 days', 'This Month', 'Last Month',
  'Last 3 Months', 'Last 6 Months', 'This Year',
  'Last Year', 'All Time'
];

const ExportDataCard: React.FC<ExportDataCardProps> = ({ onCancel, onDownload }) => {
  const [startDate, setStartDate] = useState('Jan 01, 2025');
  const [endDate, setEndDate] = useState('Dec 31, 2025');
  const [format, setFormat] = useState('CSV / JSON');
  const [activeFilter, setActiveFilter] = useState('Last 7 days');

  const downloadIcon = (
    <svg viewBox="0 0 56 56" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 34v10a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V34" />
      <polyline points="18 22 28 32 38 22" />
      <line x1="28" y1="6" x2="28" y2="32" />
    </svg>
  );

  const actions = (
    <button
      onClick={() => onDownload({ startDate, endDate, format, activeFilter })}
      className="flex-1 h-[56px] bg-[#5F00DB] shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)] rounded-[52px] transition-all hover:brightness-110 active:scale-95 text-white text-[16px] font-medium"
    >
      Download
    </button>
  );

  return (
    <BaseCard
      icon={downloadIcon}
      title="Export Data"
      description=""
      actions={actions}
      minHeight="678px"
    >
      <div className="flex flex-col gap-8 w-full">
        {/* Date Inputs Row */}
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col flex-1 items-start gap-1 border-b border-white py-2">
            <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80">Start Date</label>
            <div className="flex items-center justify-between w-full">
              <span className="text-white text-[16px]">{startDate}</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-start gap-1 border-b border-white py-2">
            <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80">End Date</label>
            <div className="flex items-center justify-between w-full">
              <span className="text-white text-[16px]">{endDate}</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Chips Container */}
        <div className="flex flex-wrap gap-2 w-full">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[14px] transition-all duration-200 ${
                activeFilter === filter 
                ? 'bg-[#5F00DB] text-white' 
                : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Format Dropdown */}
        <div className="flex flex-col items-start gap-1 w-full border-b border-white py-2">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80">Format</label>
          <div className="flex items-center justify-between w-full">
            <span className="text-white text-[16px]">{format}</span>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default ExportDataCard;
