
import React, { useState, useRef, useEffect } from 'react';

export interface BugReportData {
    id: string;
    reportedBy: { name: string; email: string; avatar: string };
    subject: string;
    message: string;
    status: 'New' | 'Pending' | 'Reviewing' | 'Resolved' | 'Closed';
    submittedOn: string;
    attachments?: string[];
}

interface BugsReportedTableRowProps {
    data: BugReportData;
    onAction: (action: 'DETAILS', data: BugReportData) => void;
}

const BugsReportedTableRow: React.FC<BugsReportedTableRowProps> = ({ data, onAction }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'New': 'bg-[#5F00DB] text-white',
            'Pending': 'bg-[#F37600] text-white',
            'Reviewing': 'bg-[#0099FF] text-white',
            'Resolved': 'bg-[#3ADC60] text-black',
            'Closed': 'bg-[#FF4E4E] text-white',
        };
        return colors[status] || 'bg-white/10 text-white';
    };

    return (
        <div className="group flex flex-row items-center w-full h-[2.92vw] bg-[#222222] border-b border-[rgba(102,102,102,0.5)] hover:bg-white/[0.05] transition-colors relative shrink-0 ">
            <div className="w-[16.66vw] px-[0.63vw] shrink-0">
                <div className="flex items-center gap-[0.42vw]">
                    <div
                        className="w-[1.88vw] h-[1.88vw] rounded-full bg-cover bg-center border border-white/10 shrink-0"
                        style={{ backgroundImage: `url(${data.reportedBy.avatar})` }}
                    />
                    <div className="flex flex-col min-w-0 gap-[0.21vw]">
                        <span className="text-white text-[0.73vw] font-semibold not-italic truncate leading-[114%] ">{data.reportedBy.name}</span>
                        <span className="text-white/40 text-[0.57vw] font-light not-italic truncate leading-[145%] ">{data.reportedBy.email}</span>
                    </div>
                </div>
            </div>
            <div className="w-[13.88vw] px-[0.63vw] shrink-0 text-white text-[0.73vw] font-medium not-italic truncate  leading-[114%]">{data.subject}</div>
            <div className="flex-[1] px-[0.63vw] min-w-0 text-white/60 text-[0.73vw] truncate  not-italic leading-[114%]">{data.message}</div>
            <div className="w-[8.33vw] px-[0.63vw] flex items-center shrink-0">
                <div className={`h-[1.67vw] px-[0.63vw] rounded-[0.83vw] text-[0.73vw] font-bold not-italic flex items-center justify-center min-w-[2.81vw] leading-[114%] text-center  ${getStatusColor(data.status)}`}>
                    <span className="mt-[0.1vw]">{data.status}</span>
                </div>
            </div>
            <div className="w-[13.88vw] px-[0.63vw] flex items-center gap-[0.42vw] shrink-0  not-italic">
                <span className="text-white text-[0.73vw] leading-[114%]">{data.submittedOn.split(' • ')[0]}</span>
                <div className="w-[0.16vw] h-[0.16vw] bg-white rounded-full opacity-40 shrink-0" />
                <span className="text-white text-[0.73vw] opacity-40 leading-[114%]">{data.submittedOn.split(' • ')[1]}</span>
            </div>

            <div className="w-[4.16vw] px-[0.42vw] flex justify-center relative shrink-0">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex flex-row justify-center items-center p-[0.42vw] gap-[0.83vw] w-[1.67vw] h-[1.67vw] rounded-[2.71vw] transition-colors cursor-pointer ${isMenuOpen ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-white/40 group-hover:text-white'}`}
                >
                    <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw]" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div ref={menuRef} className="absolute top-[80%] right-full mr-[0.42vw] w-[14.58vw] bg-[#1a1a1a] border border-[#666666]/50 rounded-[0.83vw] shadow-2xl z-[60] overflow-hidden py-[0.42vw] animate-in fade-in slide-in-from-right-2 duration-200">
                        {[
                            { id: 'DETAILS', label: 'View Details', icon: <svg className="w-[0.83vw] h-[0.83vw]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> },
                            { id: 'UPDATE', label: 'Update Status', icon: <svg className="w-[0.83vw] h-[0.83vw]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => { onAction('DETAILS', data); setIsMenuOpen(false); }}
                                className="flex flex-row items-center w-full px-[0.83vw] py-[0.63vw] gap-[0.83vw] hover:bg-white/5 transition-colors group/item text-left"
                            >
                                <span className="text-white opacity-60 group-hover/item:opacity-100 transition-opacity">{item.icon}</span>
                                <span className="flex-grow text-white text-[0.73vw]  not-italic">{item.label}</span>
                                <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw] text-white opacity-40" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BugsReportedTableRow;
