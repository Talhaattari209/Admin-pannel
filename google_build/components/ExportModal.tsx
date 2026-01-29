
import React, { useState } from 'react';
import BaseCard from './BaseCard';

interface ExportModalProps {
    onClose: () => void;
    onExport: (format: string, dateRange: string) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose, onExport }) => {
    const [format, setFormat] = useState('CSV');
    const [dateRange, setDateRange] = useState('Last 30 Days');

    const icon = (
        <svg className="w-[3.75vw] h-[3.75vw]" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="36" fill="#5F00DB" fillOpacity="0.1" />
            <path d="M48 24V40C48 42.2091 46.2091 44 44 44H28C25.7909 44 24 42.2091 24 40V24" stroke="#5F00DB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M36 48V32" stroke="#5F00DB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M42 38L36 32L30 38" stroke="#5F00DB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    // Custom SVG icon matching the theme (Download/Export icon)
    const ExportIcon = (
        <div className="relative w-[3.75vw] h-[3.75vw] flex items-center justify-center">
            <svg className="w-[2.5vw] h-[2.5vw]" viewBox="0 0 24 24" fill="none" stroke="#5F00DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                className="flex-1 h-[2.92vw] border border-white/30 rounded-[2.7vw] text-white text-[0.83vw] font-medium hover:bg-white/5 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={() => onExport(format, dateRange)}
                className="flex-1 h-[2.92vw] bg-[#5F00DB] rounded-[2.7vw] text-white text-[0.83vw] font-medium shadow-lg hover:brightness-110 active:scale-95 transition-all"
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
            <div className="flex flex-col gap-[1.25vw] w-full">

                {/* Format Selection */}
                <div className="flex flex-col gap-[0.63vw]">
                    <label className="text-white text-[0.63vw] font-bold uppercase tracking-wider opacity-80">Format</label>
                    <div className="flex gap-[0.83vw]">
                        {['CSV', 'PDF', 'Excel'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFormat(f)}
                                className={`flex-1 h-[2.5vw] rounded-[0.63vw] border flex items-center justify-center text-[0.73vw] font-medium transition-all ${format === f
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
                <div className="flex flex-col gap-[0.63vw]">
                    <label className="text-white text-[0.63vw] font-bold uppercase tracking-wider opacity-80">Date Range</label>
                    <div className="relative">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full h-[2.92vw] bg-[#222222] border border-white/20 rounded-[0.63vw] px-[0.83vw] text-white text-[0.83vw] appearance-none focus:outline-none focus:border-[#5F00DB] transition-colors"
                        >
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>All Time</option>
                        </select>
                        <div className="absolute right-[0.83vw] top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                            <svg className="w-[1.04vw] h-[1.04vw]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                    </div>
                </div>

            </div>
        </BaseCard>
    );
};

export default ExportModal;
