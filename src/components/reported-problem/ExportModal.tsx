
import React, { useState } from 'react';
import BaseCard from '@/components/pop-cards/BaseCard';

interface ExportModalProps {
    onClose: () => void;
    onExport: (format: string, dateRange: string) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose, onExport }) => {
    const [format, setFormat] = useState('CSV');
    const [dateRange, setDateRange] = useState('Last 30 Days');

    // Custom SVG icon matching the theme (Download/Export icon)
    const ExportIcon = (
        <div className="relative w-[72px] h-[72px] flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5F00DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
        </div>
    );

    const actions = (
        <>
            <button
                onClick={onClose}
                className="flex-1 h-[56px] border border-white/30 rounded-[52px] text-white font-medium hover:bg-white/5 transition-colors font-['SF_Pro_Text']"
            >
                Cancel
            </button>
            <button
                onClick={() => onExport(format, dateRange)}
                className="flex-1 h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium shadow-lg hover:brightness-110 active:scale-95 transition-all font-['SF_Pro_Text']"
            >
                Export Data
            </button>
        </>
    );

    return (
        <BaseCard
            icon={ExportIcon}
            title="Export Data"
            description="Choose the format and date range for your export."
            actions={actions}
            minHeight="auto"
        >
            <div className="flex flex-col gap-6 w-full font-['SF_Pro_Text']">

                {/* Format Selection */}
                <div className="flex flex-col gap-3">
                    <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80">Format</label>
                    <div className="flex gap-4">
                        {['CSV', 'PDF', 'Excel'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFormat(f)}
                                className={`flex-1 h-[48px] rounded-[12px] border flex items-center justify-center text-[14px] font-medium transition-all ${format === f
                                    ? 'bg-[#5F00DB] border-[#5F00DB] text-white shadow-lg'
                                    : 'bg-transparent border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date Range Selection */}
                <div className="flex flex-col gap-3">
                    <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80">Date Range</label>
                    <div className="relative">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full h-[56px] bg-[#222222] border border-white/20 rounded-[12px] px-4 text-white appearance-none focus:outline-none focus:border-[#5F00DB] transition-colors cursor-pointer"
                        >
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>All Time</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                    </div>
                </div>

            </div>
        </BaseCard>
    );
};

export default ExportModal;
