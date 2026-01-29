import React, { useState } from 'react';
import BaseCard from './BaseCard';
import FilterSelect from './FilterSelect';

interface ExportModalProps {
  onCancel: () => void;
  onDownload: (config: any) => void;
}

const QUICK_FILTERS = [
  'Last 7 days', 'This Month', 'Last Month',
  'Last 3 Months', 'Last 6 Months', 'This Year',
  'Last Year', 'All Time'
];

const ExportModal: React.FC<ExportModalProps> = ({ onCancel, onDownload }) => {
  const [activeFilter, setActiveFilter] = useState('Last 7 days');
  const [startDate, setStartDate] = useState('Jan 01, 2025');
  const [endDate, setEndDate] = useState('Dec 31, 2025');
  const [format, setFormat] = useState('CSV / JSON');

  const downloadIcon = (
    <svg viewBox="0 0 56 56" className="w-[2.92vw] h-[2.92vw] text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 34v10a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V34" />
      <polyline points="18 22 28 32 38 22" />
      <line x1="28" y1="6" x2="28" y2="32" />
    </svg>
  );

  const actions = (
    <>
      <button
        onClick={onCancel}
        className="flex-1 h-[2.92vw] border border-white rounded-[2.71vw] text-white font-medium hover:bg-white/10 transition-all font-inter text-[0.83vw]"
      >
        Cancel
      </button>
      <button
        onClick={() => onDownload({ activeFilter, startDate, endDate, format })}
        className="flex-1 h-[2.92vw] bg-[#5F00DB] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] rounded-[2.71vw] transition-all hover:brightness-110 active:scale-95 text-white text-[0.83vw] font-medium font-inter"
      >
        Download
      </button>
    </>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-[0.83vw]">
      <BaseCard
        icon={downloadIcon}
        title="Export Data"
        description="Choose a range to export your data in CSV/JSON format."
        actions={actions}
        width="25vw"
        minHeight="35.31vw"
      >
        <div className="flex flex-col gap-[1.67vw] w-full mt-[0.83vw]">

          {/* Date Inputs Row */}
          <div className="flex flex-row gap-[0.83vw] w-full">
            <div className="flex-1 h-[3.33vw] border-b border-white flex flex-col justify-center gap-[0.21vw]">
              <span className="text-[0.63vw] font-bold uppercase tracking-wider text-white opacity-80 font-inter">Start Date</span>
              <div className="flex items-center justify-between w-full">
                <span className="text-[0.83vw] text-white font-inter">{startDate}</span>
                <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
            <div className="flex-1 h-[3.33vw] border-b border-white flex flex-col justify-center gap-[0.21vw]">
              <span className="text-[0.63vw] font-bold uppercase tracking-wider text-white opacity-80 font-inter">End Date</span>
              <div className="flex items-center justify-between w-full">
                <span className="text-[0.83vw] text-white font-inter">{endDate}</span>
                <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-[0.42vw]">
            {QUICK_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-[0.83vw] py-[0.42vw] rounded-full text-[0.73vw] font-medium transition-all font-inter ${activeFilter === filter
                    ? 'bg-[#5F00DB] text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <FilterSelect
            label="Format"
            value={format}
            options={['CSV / JSON', 'PDF', 'Excel']}
            onChange={(val) => setFormat(val)}
            width="100%"
          />
        </div>
      </BaseCard>
    </div>
  );
};

export default ExportModal;