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

  const downloadIcon = (
    <svg viewBox="0 0 56 56" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 34v10a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V34" />
      <polyline points="18 22 28 32 38 22" />
      <line x1="28" y1="6" x2="28" y2="32" />
    </svg>
  );

  const actions = (
    <>
      <button 
        onClick={onCancel}
        className="flex-1 h-[56px] border border-white rounded-[52px] text-white font-medium hover:bg-white/10 transition-all"
      >
        Cancel
      </button>
      <button
        onClick={() => onDownload({ activeFilter })}
        className="flex-1 h-[56px] bg-[#5F00DB] shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)] rounded-[52px] transition-all hover:brightness-110 active:scale-95 text-white text-[16px] font-medium"
      >
        Download
      </button>
    </>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <BaseCard
        icon={downloadIcon}
        title="Export Data"
        description="Choose a range to export your data in CSV/JSON format."
        actions={actions}
        width="480px"
        minHeight="600px"
      >
        <div className="flex flex-col gap-6 w-full mt-4">
          <div className="flex flex-row gap-4">
             <div className="flex-1 h-[56px] border-b border-white flex flex-col justify-center gap-1">
                <span className="text-[12px] font-bold uppercase tracking-wider text-white opacity-80">Start Date</span>
                <span className="text-[16px] text-white">Jan 01, 2025</span>
             </div>
             <div className="flex-1 h-[56px] border-b border-white flex flex-col justify-center gap-1">
                <span className="text-[12px] font-bold uppercase tracking-wider text-white opacity-80">End Date</span>
                <span className="text-[16px] text-white">Dec 31, 2025</span>
             </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                  activeFilter === filter 
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
            value="CSV / JSON" 
            options={['CSV', 'JSON', 'PDF']} 
            onChange={() => {}} 
            width="100%"
          />
        </div>
      </BaseCard>
    </div>
  );
};

export default ExportModal;