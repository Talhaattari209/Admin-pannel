
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
        <div className="group flex flex-row items-center w-full h-[3.75vw] px-[0.63vw] bg-[#222222] border border-[#666666]/20 hover:bg-white/[0.02] transition-colors relative mb-[0.42vw] rounded-[0.83vw] font-['SF_Pro_Text']">
            {/* User Cell */}
            <div className="w-[10.42vw] px-[0.83vw] flex items-center gap-[0.63vw] shrink-0">
                <div
                    className="w-[2.08vw] h-[2.08vw] rounded-full bg-cover bg-center border border-white/10 shrink-0"
                    style={{ backgroundImage: `url(${data.user.avatar})` }}
                />
                <div className="flex flex-col min-w-0">
                    <span className="text-white text-[0.73vw] font-semibold truncate leading-none mb-[0.2vw]">{data.user.name}</span>
                    <span className="text-white/40 text-[0.57vw] font-light truncate leading-none">{data.user.email}</span>
                </div>
            </div>

            {/* Subject Cell */}
            <div className="flex-[1] px-[0.83vw] min-w-0">
                <p className="text-white text-[0.73vw] font-medium truncate">{data.subject}</p>
            </div>

            {/* Message Cell */}
            <div className="flex-[1] px-[0.83vw] min-w-0">
                <p className="text-white/60 text-[0.73vw] font-normal truncate">{data.message}</p>
            </div>

            {/* Status Cell */}
            <div className="w-[10.42vw] px-[0.83vw] flex items-center shrink-0">
                <div className={`h-[1.67vw] px-[0.83vw] rounded-full text-[0.68vw] font-bold flex items-center justify-center min-w-[4.38vw] leading-none text-center ${getStatusColor(data.status)}`}>
                    <span className="mt-[0.05vw]">{data.status}</span>
                </div>
            </div>

            {/* Timestamp Cell */}
            <div className="w-[10.42vw] px-[0.83vw] flex items-center gap-[0.42vw] shrink-0">
                <span className="text-white text-[0.73vw] leading-none">{data.timestamp.split(' • ')[0]}</span>
                <div className="w-[0.16vw] h-[0.16vw] bg-white rounded-full opacity-40 shrink-0" />
                <span className="text-white text-[14px] opacity-40 leading-none">{data.timestamp.split(' • ')[1]}</span>
            </div>

            {/* Actions Cell */}
            <div className="w-[2.5vw] px-[0.42vw] flex justify-center relative shrink-0">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-[0.42vw] rounded-full transition-colors ${isMenuOpen ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-white/40 group-hover:text-white'}`}
                >
                    <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw]" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                                <span className="flex-grow text-white text-[0.73vw]">{item.label}</span>
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
