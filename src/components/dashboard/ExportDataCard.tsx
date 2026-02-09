import React, { useState } from 'react';

const QUICK_FILTERS = [
  'Last 7 days', 'This Month', 'Last Month',
  'Last 3 Months', 'Last 6 Months', 'This Year',
  'Last Year', 'All Time'
];

interface ExportDataCardProps {
  onCancel?: () => void;
  onDownload?: (config: any) => void;
  className?: string; // Allow external positioning if needed
}

const ExportDataCard: React.FC<ExportDataCardProps> = ({ onDownload, className }) => {
  const [startDate, setStartDate] = useState('Jan 01, 2025');
  const [endDate, setEndDate] = useState('Dec 31, 2025');
  const [format, setFormat] = useState('CSV / JSON');
  const [activeFilter, setActiveFilter] = useState('Last 7 days');

  return (
    <div className={`box-border flex flex-col items-center p-[1.67vw] gap-[1.67vw] relative w-[27vw] h-[35.4vw] bg-[#16003F] border border-[rgba(102,102,102,0.5)] backdrop-blur-[0.625vw] rounded-[1.67vw] ${className || ''}`}>

      {/* Icon Section */}
      <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
        {/* Glow */}
        {/* <div className="absolute -left-[3.125vw] -right-[3.125vw] -top-[3.125vw] -bottom-[3.125vw] opacity-50 bg-[linear-gradient(180deg,#5F00DB_30%,rgba(17,17,17,0)_70%)] pointer-events-none"></div> */}

        {/* Rotating Border Animation & Glow */}
        <div className="absolute inset-0 z-[1] rounded-full">
          {/* Glow Layer */}
          <div
            className="absolute -inset-[0.5vw] rounded-full animate-[spin_3s_linear_infinite]"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
              filter: 'blur(0.25vw)',
              WebkitMask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)',
              mask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)'
            }}
          />
          {/* Sharp Border Layer */}
          <div
            className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)',
              WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))',
              mask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))'
            }}
          />
        </div>

        {/* Icon BG */}
        <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>

        {/* Download Icon SVG */}
        <svg viewBox="0 0 56 56" className="w-[2.92vw] h-[2.92vw] z-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 34v10a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V34" />
          <polyline points="18 22 28 32 38 22" />
          <line x1="28" y1="6" x2="28" y2="32" />
        </svg>
      </div>

      {/* Export Data Title */}
      <h2 className="w-[21.67vw] h-[1.98vw]  font-medium not-italic text-[1.67vw] leading-[1.98vw] flex items-center text-center text-white flex-none order-1 self-stretch flex-grow-0 tracking-[-0.02em] justify-center">
        Export Data
      </h2>

      {/* Inputs Container */}
      <div className="flex flex-col gap-[1.67vw] w-[21.67vw] flex-none order-2 flex-grow-0">

        {/* Date Row */}
        <div className="flex flex-row items-start gap-[0.83vw] w-[21.67vw] h-[3.33vw] flex-none order-2 self-stretch flex-grow-0">

          {/* Start Date */}
          <div className="flex flex-col items-start w-[10.42vw] h-[3.33vw] flex-none order-0 flex-grow-1">
            <div className="flex flex-row items-start gap-[0.21vw] w-[10.42vw] h-[0.83vw] flex-none order-0 self-stretch flex-grow-0">
              <span className="h-[0.83vw]  font-bold not-italic text-[0.625vw] leading-[0.83vw] text-white">Start Date</span>
            </div>
            <div className="box-border flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-[10.42vw] h-[2.5vw] min-h-[2.5vw] border-b border-white flex-none order-1 self-stretch flex-grow-0 relative">
              <input
                type="date"
                value={startDate === 'Jan 01, 2025' ? '2025-01-01' : startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <span className="w-[8.33vw] h-[1.25vw]  font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white flex items-center">
                {startDate === 'Jan 01, 2025' ? 'Jan 01, 2025' : new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </span>
              <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>

          {/* End Date */}
          <div className="flex flex-col items-start w-[10.42vw] h-[3.33vw] flex-none order-1 flex-grow-1">
            <div className="flex flex-row items-start gap-[0.21vw] w-[10.42vw] h-[0.83vw] flex-none order-0 self-stretch flex-grow-0">
              <span className="h-[0.83vw]  font-bold not-italic text-[0.625vw] leading-[0.83vw] text-white">End Date</span>
            </div>
            <div className="box-border flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-[10.42vw] h-[2.5vw] min-h-[2.5vw] border-b border-white flex-none order-1 self-stretch flex-grow-0 relative">
              <input
                type="date"
                value={endDate === 'Dec 31, 2025' ? '2025-12-31' : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <span className="w-[8.33vw] h-[1.25vw]  font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white flex items-center">
                {endDate === 'Dec 31, 2025' ? 'Dec 31, 2025' : new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </span>
              <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>

        </div>

        {/* Chips Row */}
        <div className="flex flex-row flex-wrap items-start content-start gap-[0.42vw] w-[21.67vw] h-[5.83vw] flex-none order-3 self-stretch flex-grow-0">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="flex flex-row justify-center items-center px-[0.625vw] py-[0.21vw] gap-[0.42vw] h-[1.67vw] rounded-[1.25vw] transition-all  font-normal not-italic text-[0.83vw] leading-[150%] text-white bg-[#5F00DB] hover:bg-[#8022FF]"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Format Field */}
        <div className="flex flex-col items-start w-[21.67vw] h-[3.33vw] flex-none order-4 self-stretch flex-grow-0">
          <div className="flex flex-row items-start gap-[0.21vw] w-[21.67vw] h-[0.83vw] flex-none order-0 self-stretch flex-grow-0">
            <span className="h-[0.83vw]  font-bold not-italic text-[0.625vw] leading-[0.83vw] text-white">Format</span>
          </div>
          <div className="box-border flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-[21.67vw] h-[2.5vw] min-h-[2.5vw] border-b border-white flex-none order-1 self-stretch flex-grow-0">
            <span className="w-[19.58vw] h-[1.25vw]  font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white flex items-center">{format}</span>
            <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-row justify-center items-center gap-[1.25vw] w-[21.67vw] h-[2.92vw] flex-none order-5 self-stretch flex-grow-0">
          <button
            onClick={() => onDownload && onDownload({ startDate, endDate, format, activeFilter })}
            className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.625vw] w-[21.67vw] h-[2.92vw] bg-[#5F00DB] shadow-[0px_-0.42vw_0.625vw_rgba(95,0,219,0.25),0px_0.42vw_0.625vw_rgba(95,0,219,0.25)] rounded-[2.71vw] text-white cursor-pointer hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="h-[1.25vw]  font-medium not-italic text-[0.83vw] leading-[1.25vw] flex items-end text-center">
              Download
            </span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ExportDataCard;
