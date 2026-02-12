
import React, { useState } from 'react';

interface ExportModalProps {
    onClose: () => void;
    onExport: (format: string, dateRange: string) => void;
}

const ExportPopCard: React.FC<ExportModalProps> = ({ onClose, onExport }) => {
    const [format, setFormat] = useState('CSV');
    const [dateRange, setDateRange] = useState('Last 30 Days');

    return (
        <div className="relative flex flex-col items-center p-[2.5vw] gap-[2.5vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[2.5vw] box-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 w-[25vw] min-w-[320px]">
            {/* Icon Section */}
            <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
                <div
                    className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
                    style={{ background: `linear-gradient(180deg, #5F00DB 30%, transparent 70%)` }}
                ></div>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
                <div className="relative z-10 flex items-center justify-center">
                    <svg className="w-[2.92vw] h-[2.92vw] text-white" viewBox="0 0 24 24" fill="none" stroke="#5F00DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                <h2 className="text-[1.67vw] font-medium not-italic leading-[2.08vw] tracking-[-0.02em] text-white font-inter">
                    Export Data
                </h2>
                <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] opacity-90 font-inter text-white">
                    Choose the format and date range for your export.
                </p>
            </div>

            {/* Form Content */}
            <div className="flex flex-col gap-[1.25vw] w-full ">
                {/* Format Selection */}
                <div className="flex flex-col gap-[0.63vw]">
                    <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-80">Format</label>
                    <div className="flex gap-[0.83vw]">
                        {['CSV', 'PDF', 'Excel'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFormat(f)}
                                className={`flex-1 h-[2.5vw] rounded-[0.63vw] border flex items-center justify-center text-[0.73vw] font-medium not-italic transition-all ${format === f
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
                    <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-80">Date Range</label>
                    <div className="relative">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full h-[2.92vw] bg-[#222222] border border-white/20 rounded-[0.63vw] px-[0.83vw] text-white appearance-none focus:outline-none focus:border-[#5F00DB] transition-colors cursor-pointer text-[0.83vw]"
                        >
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>All Time</option>
                        </select>
                        <div className="absolute right-[0.83vw] top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                <button
                    onClick={onClose}
                    className="flex-1 h-[3.5vw] border border-white/30 bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] hover:bg-white/5 transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onExport(format, dateRange)}
                    className="flex-1 h-[3.5vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                    Export Data
                </button>
            </div>
        </div>
    );
};

export default ExportPopCard;
