
import React, { useState, useRef, useEffect } from 'react';

export interface SupportTicketData {
    id: string;
    user: {
        name: string;
        email: string;
        avatar: string;
        age: number;
    };
    subject: string;
    message: string;
    status: 'New' | 'Pending' | 'Reviewing' | 'Resolved' | 'Closed';
    timestamp: string;
}

interface SupportTableRowProps {
    data: SupportTicketData;
    onAction: (action: 'DETAILS' | 'STATUS' | 'PROFILE', data: SupportTicketData) => void;
}

const SupportTableRow: React.FC<SupportTableRowProps> = ({ data, onAction }) => {
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
        switch (status) {
            case 'New': return 'bg-[#5F00DB] text-white';
            case 'Pending': return 'bg-[#F37600] text-white';
            case 'Reviewing': return 'bg-[#0099FF] text-white';
            case 'Resolved': return 'bg-[#3ADC60] text-black';
            case 'Closed': return 'bg-[#FF4E4E] text-white';
            default: return 'bg-white/10 text-white';
        }
    };

    return (
        <div className="group flex flex-row items-center w-full h-[2.92vw] bg-[#222222] border-b border-[rgba(102,102,102,0.5)] hover:bg-white/[0.05] transition-colors relative shrink-0 font-['SF_Pro_Text']">
            {/* User Cell */}
            <div className="w-[10.42vw] pl-[0.63vw] pr-[0.42vw] flex items-center gap-[0.42vw] shrink-0">
                <div
                    className="w-[1.88vw] h-[1.88vw] rounded-full bg-cover bg-center border border-white/10 shrink-0"
                    style={{ backgroundImage: `url(${data.user.avatar})` }}
                />
                <div className="flex flex-col justify-center items-start gap-[0.21vw] min-w-0">
                    <span className="text-white text-[0.73vw] font-normal not-italic leading-[114%] truncate">{data.user.name}</span>
                    <span className="text-white opacity-50 text-[0.57vw] font-light not-italic leading-[145%] tracking-[0.02em] truncate">{data.user.email}</span>
                </div>
            </div>

            {/* Subject Cell */}
            <div className="flex-[1] px-[0.63vw] flex flex-col justify-center items-start min-w-0">
                <p className="text-white text-[0.73vw] font-normal not-italic leading-[114%] truncate w-full text-left">{data.subject}</p>
            </div>

            {/* Message Cell */}
            <div className="flex-[1] px-[0.63vw] flex flex-col justify-center items-start min-w-0">
                <p className="text-white text-[0.73vw] font-normal not-italic leading-[114%] truncate w-full text-left">{data.message}</p>
            </div>

            {/* Status Cell */}
            <div className="w-[10.42vw] px-[0.63vw] flex items-center shrink-0">
                <div className={`h-[1.67vw] px-[0.63vw] gap-[0.52vw] rounded-[0.83vw] text-[0.73vw] font-normal not-italic flex items-center justify-center leading-[114%] ${getStatusColor(data.status)}`}>
                    <span>{data.status}</span>
                </div>
            </div>

            {/* Timestamp Cell */}
            <div className="w-[10.42vw] px-[0.63vw] flex items-center gap-[0.42vw] shrink-0">
                <span className="text-white text-[0.73vw] font-normal not-italic leading-[114%]">{data.timestamp.split(' • ')[0]}</span>
                <div className="w-[0.16vw] h-[0.16vw] bg-white rounded-full shrink-0" />
                <span className="text-white text-[0.73vw] font-normal not-italic leading-[114%]">{data.timestamp.split(' • ')[1]}</span>
            </div>

            {/* Actions Cell */}
            <div className="w-[2.5vw] p-[0.31vw] flex justify-center items-center relative shrink-0">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex flex-row justify-center items-center p-[0.42vw] gap-[0.83vw] w-[1.67vw] h-[1.67vw] rounded-[2.71vw] transition-colors cursor-pointer ${isMenuOpen ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-white group-hover:text-white'}`}
                >
                    <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw]" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute top-[80%] right-full mr-[0.42vw] w-[12.5vw] bg-[#1a1a1a] border border-[#666666]/50 rounded-[0.83vw] shadow-2xl z-[60] overflow-hidden py-[0.42vw] animate-in fade-in slide-in-from-right-2 duration-200"
                    >
                        {[
                            {
                                id: 'DETAILS', label: 'View Details', icon: (
                                    <svg className="w-[0.83vw] h-[0.83vw]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )
                            },
                            {
                                id: 'STATUS', label: 'Update Status', icon: (
                                    <svg className="w-[0.83vw] h-[0.83vw]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                )
                            },
                            {
                                id: 'PROFILE', label: "View User's Profile", icon: (
                                    <svg className="w-[0.83vw] h-[0.83vw]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                )
                            }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onAction(item.id as any, data);
                                    setIsMenuOpen(false);
                                }}
                                className="flex flex-row items-center w-full px-[0.83vw] py-[0.63vw] gap-[0.83vw] hover:bg-white/5 transition-colors group/item text-left"
                            >
                                <span className="text-white opacity-60 group-hover/item:opacity-100 transition-opacity">{item.icon}</span>
                                <span className="flex-grow text-white text-[0.73vw] font-['SF_Pro_Text'] not-italic">{item.label}</span>
                                <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw] text-white opacity-40" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportTableRow;
