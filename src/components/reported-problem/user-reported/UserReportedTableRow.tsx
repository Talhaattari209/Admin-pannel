
import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';

export interface UserReportData {
    id: string;
    reportedBy: { name: string; email: string; avatar: string };
    reportedUser: { name: string; email: string; avatar: string; age: number };
    category: string;
    reports: number;
    description: string;
    status: 'New' | 'Pending' | 'Reviewing' | 'Resolved' | 'Closed';
    submittedOn: string;
}

interface UserReportedTableRowProps {
    data: UserReportData;
    onAction: (action: 'DETAILS', data: UserReportData) => void;
}

const UserReportedTableRow: React.FC<UserReportedTableRowProps> = ({ data, onAction }) => {
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
            'Resolved': 'bg-[#3ADC60] text-black',
            'Closed': 'bg-[#FF4E4E] text-white',
            'Reviewing': 'bg-[#0099FF] text-white',
        };
        return colors[status] || 'bg-white/10 text-white';
    };

    const UserCell = ({ user }: { user: { name: string; email: string; avatar: string } }) => (
        <div className="flex items-center gap-3 min-w-0">
            <div
                className="w-10 h-10 rounded-full bg-cover bg-center border border-white/10 shrink-0"
                style={{ backgroundImage: `url(${user.avatar})` }}
            />
            <div className="flex flex-col min-w-0">
                <span className="text-white text-[14px] font-semibold truncate leading-none mb-1 font-['SF_Pro_Text']">{user.name}</span>
                <span className="text-white/40 text-[11px] font-light truncate leading-none font-['SF_Pro_Text']">{user.email}</span>
            </div>
        </div>
    );

    return (
        <div className="group flex flex-row items-center w-full min-h-[72px] py-3 bg-[#222222] border border-[#666666]/20 hover:bg-white/[0.02] transition-colors relative">
            <div className="w-[16.66vw] max-w-[240px] px-4 shrink-0"><UserCell user={data.reportedBy} /></div>
            <div className="w-[16.66vw] max-w-[240px] px-4 shrink-0"><UserCell user={data.reportedUser} /></div>
            <div className="w-[12.5vw] max-w-[180px] px-4 shrink-0 text-white text-[14px] font-['SF_Pro_Text']">{data.category}</div>
            <div className="w-[8.33vw] max-w-[120px] px-4 shrink-0 text-white text-[14px] font-['SF_Pro_Text']">{data.reports}</div>
            <div className="flex-[1] px-4 min-w-0 text-white/60 text-[14px] truncate font-['SF_Pro_Text']">{data.description}</div>
            <div className="w-[8.33vw] max-w-[120px] px-4 flex items-center shrink-0">
                <div className={`h-[32px] px-4 rounded-full text-[13px] font-bold flex items-center justify-center min-w-[84px] leading-none text-center font-['SF_Pro_Text'] ${getStatusColor(data.status)}`}>
                    <span className="mt-[1px]">{data.status}</span>
                </div>
            </div>
            <div className="w-[13.88vw] max-w-[200px] px-4 flex items-center gap-2 shrink-0 font-['SF_Pro_Text']">
                <span className="text-white text-[14px] leading-none">{data.submittedOn.split(' • ')[0]}</span>
                <div className="w-[3px] h-[3px] bg-white rounded-full opacity-40 shrink-0" />
                <span className="text-white text-[14px] opacity-40 leading-none">{data.submittedOn.split(' • ')[1]}</span>
            </div>

            <div className="w-[4.16vw] max-w-[60px] px-2 flex justify-center relative shrink-0">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-full transition-colors ${isMenuOpen ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-white/40 group-hover:text-white'}`}
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div ref={menuRef} className="absolute top-[80%] right-full mr-2 w-[280px] bg-[#1a1a1a] border border-[#666666]/50 rounded-[16px] shadow-2xl z-[60] overflow-hidden py-2 animate-in fade-in slide-in-from-right-2 duration-200">
                        {[
                            { id: 'DETAILS', label: 'View Details', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> },
                            { id: 'UPDATE', label: 'Update Status', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> },
                            { id: 'PROFILE_REPORTER', label: "View User's Profile", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                            { id: 'PROFILE_REPORTED', label: "View Reported User's Profile", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => { onAction('DETAILS', data); setIsMenuOpen(false); }}
                                className="flex flex-row items-center w-full px-4 py-3 gap-4 hover:bg-white/5 transition-colors group/item text-left"
                            >
                                <span className="text-white opacity-60 group-hover/item:opacity-100 transition-opacity">{item.icon}</span>
                                <span className="flex-grow text-white text-[14px] font-['SF_Pro_Text']">{item.label}</span>
                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white opacity-40" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserReportedTableRow;
