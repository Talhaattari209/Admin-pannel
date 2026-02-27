import React, { useState } from 'react';
import IconBackgroundAnimation from '../shared/IconBackgroundAnimation';
import CustomCalendar from '../shared/CustomCalendar';

const QUICK_FILTERS = [
  'Last 7 days', 'This Month', 'Last Month',
  'Last 3 Months', 'Last 6 Months', 'This Year',
  'Last Year', 'All Time'
];

// Compute [startDate, endDate] ISO strings for a given quick-filter label
function computeDateRange(filter: string): [string, string] {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const fmt = (d: Date) => d.toISOString().split('T')[0];

  const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

  switch (filter) {
    case 'Last 7 days': {
      const start = new Date(now); start.setDate(now.getDate() - 6);
      return [fmt(start), today];
    }
    case 'This Month':
      return [fmt(startOfMonth(now)), fmt(endOfMonth(now))];
    case 'Last Month': {
      const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return [fmt(first), fmt(endOfMonth(first))];
    }
    case 'Last 3 Months': {
      const start = new Date(now); start.setMonth(now.getMonth() - 3); start.setDate(1);
      return [fmt(start), today];
    }
    case 'Last 6 Months': {
      const start = new Date(now); start.setMonth(now.getMonth() - 6); start.setDate(1);
      return [fmt(start), today];
    }
    case 'This Year':
      return [`${now.getFullYear()}-01-01`, `${now.getFullYear()}-12-31`];
    case 'Last Year':
      return [`${now.getFullYear() - 1}-01-01`, `${now.getFullYear() - 1}-12-31`];
    case 'All Time':
    default:
      return ['2020-01-01', today];
  }
}

interface ExportDataCardProps {
  onCancel?: () => void;
  onDownload?: (config: { startDate: string; endDate: string; format: string; activeFilter: string }) => void;
  className?: string;
}

const ExportDataCard: React.FC<ExportDataCardProps> = ({ onDownload, className }) => {
  const [activeFilter, setActiveFilter] = useState('All Time');
  const [startDate, setStartDate] = useState(() => computeDateRange('All Time')[0]);
  const [endDate, setEndDate] = useState(() => computeDateRange('All Time')[1]);
  const [format, setFormat] = useState<'JSON' | 'CSV'>('JSON');
  const [formatOpen, setFormatOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState<'start' | 'end' | null>(null);

  // When a chip is clicked — update both dates AND active filter
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const [s, e] = computeDateRange(filter);
    setStartDate(s);
    setEndDate(e);
  };

  // When user manually picks a date, deselect the quick-filter
  const handleStartChange = (val: string) => {
    setStartDate(val);
    setActiveFilter('');
  };
  const handleEndChange = (val: string) => {
    setEndDate(val);
    setActiveFilter('');
  };

  const fmtDisplay = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

  return (
    <div className={`box-border flex flex-col items-center p-[1.67vw] gap-[1.67vw] relative w-[27vw] h-[35.4vw] bg-[#16003F] border border-[rgba(102,102,102,0.5)] backdrop-blur-[0.625vw] rounded-[1.67vw] ${className || ''}`}>

      {/* Icon Section */}
      <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
        {/* Lottie Icon Animation */}
        <IconBackgroundAnimation />
        <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0" />
        <svg viewBox="0 0 56 56" className="w-[2.92vw] h-[2.92vw] z-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 34v10a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V34" />
          <polyline points="18 22 28 32 38 22" />
          <line x1="28" y1="6" x2="28" y2="32" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="w-[21.67vw] h-[1.98vw] font-medium not-italic text-[1.67vw] leading-[1.98vw] flex items-center text-center text-white flex-none order-1 self-stretch flex-grow-0 tracking-[-0.02em] justify-center">
        Export Data
      </h2>

      {/* Inputs */}
      <div className="flex flex-col gap-[1.67vw] w-[21.67vw] flex-none order-2 flex-grow-0">

        {/* Date Row */}
        <div className="flex flex-row items-start gap-[0.83vw] w-[21.67vw] h-[3.33vw] flex-none order-2 self-stretch flex-grow-0">

          {/* Start Date */}
          <div className="flex flex-col items-start w-[10.42vw] h-[3.33vw] flex-none order-0 flex-grow-1 relative">
            <div className="flex flex-row items-start gap-[0.21vw] w-[10.42vw] h-[0.83vw] flex-none order-0 self-stretch flex-grow-0">
              <span className="h-[0.83vw] font-bold not-italic text-[0.625vw] leading-[0.83vw] text-white">Start Date</span>
            </div>
            <div className="box-border flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-[10.42vw] h-[2.5vw] min-h-[2.5vw] border-b border-white flex-none order-1 self-stretch flex-grow-0 relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleStartChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <span className="w-[8.33vw] h-[1.25vw] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white flex items-center">
                {fmtDisplay(startDate)}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setCalendarOpen(calendarOpen === 'start' ? null : 'start'); }}
                className="z-20 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
            {calendarOpen === 'start' && (
              <CustomCalendar
                selectedDate={startDate}
                onSelect={handleStartChange}
                onClose={() => setCalendarOpen(null)}
                className="top-full left-0 mt-2"
              />
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col items-start w-[10.42vw] h-[3.33vw] flex-none order-1 flex-grow-1 relative">
            <div className="flex flex-row items-start gap-[0.21vw] w-[10.42vw] h-[0.83vw] flex-none order-0 self-stretch flex-grow-0">
              <span className="h-[0.83vw] font-bold not-italic text-[0.625vw] leading-[0.83vw] text-white">End Date</span>
            </div>
            <div className="box-border flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-[10.42vw] h-[2.5vw] min-h-[2.5vw] border-b border-white flex-none order-1 self-stretch flex-grow-0 relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleEndChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <span className="w-[8.33vw] h-[1.25vw] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white flex items-center">
                {fmtDisplay(endDate)}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setCalendarOpen(calendarOpen === 'end' ? null : 'end'); }}
                className="z-20 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
            {calendarOpen === 'end' && (
              <CustomCalendar
                selectedDate={endDate}
                onSelect={handleEndChange}
                onClose={() => setCalendarOpen(null)}
                className="top-full right-0 mt-2"
              />
            )}
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-row flex-wrap items-start content-start gap-[0.42vw] w-[21.67vw] h-[5.83vw] flex-none order-3 self-stretch flex-grow-0">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`flex flex-row justify-center items-center px-[0.625vw] py-[0.21vw] gap-[0.42vw] h-[1.67vw] rounded-[1.25vw] transition-all font-normal not-italic text-[0.83vw] leading-[150%] text-white cursor-pointer ${activeFilter === filter ? 'bg-[#8022FF] ring-1 ring-white/50' : 'bg-[#5F00DB] hover:bg-[#7010F0]'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Format — dropdown: JSON / CSV */}
        <div className="flex flex-col items-start w-[21.67vw] flex-none order-4 self-stretch flex-grow-0">
          <div className="flex flex-row items-start gap-[0.21vw] w-[21.67vw] h-[0.83vw] flex-none order-0 self-stretch flex-grow-0">
            <span className="h-[0.83vw] font-bold not-italic text-[0.625vw] leading-[0.83vw] text-white">Format</span>
          </div>
          <div className="relative w-[21.67vw]">
            {/* Trigger */}
            <button
              onClick={() => setFormatOpen((o) => !o)}
              className="box-border flex flex-row items-center justify-between py-[0.42vw] w-[21.67vw] h-[2.5vw] border-b border-white text-white w-full cursor-pointer"
            >
              <span className="font-normal not-italic text-[0.83vw]">{format}</span>
              <svg viewBox="0 0 24 24" className={`w-[1.25vw] h-[1.25vw] transition-transform ${formatOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {/* Dropdown menu */}
            {formatOpen && (
              <div className="absolute top-full left-0 w-[21.67vw] bg-[#16003F] border border-white/20 rounded-[0.63vw] overflow-hidden z-50 shadow-xl">
                {(['JSON', 'CSV'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setFormat(opt); setFormatOpen(false); }}
                    className={`w-full px-[0.83vw] py-[0.63vw] text-left text-[0.83vw] font-normal not-italic transition-colors cursor-pointer ${format === opt ? 'bg-[#5F00DB] text-white' : 'text-white hover:bg-white/10'
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        <div className="flex flex-row justify-center items-center gap-[1.25vw] w-[21.67vw] h-[2.92vw] flex-none order-5 self-stretch flex-grow-0">
          <button
            onClick={() => onDownload && onDownload({ startDate, endDate, format, activeFilter })}
            className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.625vw] w-[21.67vw] h-[2.92vw] bg-[#5F00DB] shadow-[0px_-0.42vw_0.625vw_rgba(95,0,219,0.25),0px_0.42vw_0.625vw_rgba(95,0,219,0.25)] rounded-[2.71vw] text-white cursor-pointer hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="h-[1.25vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] flex items-end text-center">
              Download
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExportDataCard;
