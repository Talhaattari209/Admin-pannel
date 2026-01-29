
import React, { useState } from 'react';
import { BugReportData } from './BugsReportedTableRow';

interface BugReportDetailsViewProps {
    bug: BugReportData | null;
    onBack: () => void;
}

const BugReportDetailsView: React.FC<BugReportDetailsViewProps> = ({ bug, onBack }) => {
    const [status, setStatus] = useState(bug?.status || 'New');
    const [notes, setNotes] = useState('');
    const [revealedImages, setRevealedImages] = useState<Record<number, boolean>>({});

    if (!bug) return null;

    const toggleReveal = (index: number) => {
        setRevealedImages(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const getStatusBadge = (s: string) => {
        const colors: Record<string, string> = {
            'New': 'bg-[#5F00DB] text-white',
            'Pending': 'bg-[#F37600] text-white',
            'Reviewing': 'bg-[#0099FF] text-white',
            'Resolved': 'bg-[#3ADC60] text-black',
            'Closed': 'bg-[#FF4E4E] text-white',
        };
        return (
            <div className={`h-[32px] px-4 rounded-full text-[13px] font-bold flex items-center justify-center min-w-[84px] leading-none text-center ${colors[s] || 'bg-white/10 text-white'}`}>
                <span className="mt-[1px] font-['SF_Pro_Text']">{s}</span>
            </div>
        );
    };

    const GradientLine = () => (
        <div className="h-[1px] w-full bg-gradient-to-r from-[#5F00DB] to-white opacity-40 mt-4 mb-8" />
    );

    return (
        <div className="flex flex-col w-full max-w-[95vw] mx-auto p-[1vw] md:p-[2vw] h-screen animate-in fade-in duration-500 overflow-hidden font-['SF_Pro_Text']">

            {/* Window Header */}
            <div className="flex flex-row items-center gap-4 w-full h-[80px] mb-10 shrink-0">
                <button
                    onClick={onBack}
                    className="w-12 h-12 flex items-center justify-center bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all"
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="flex flex-col flex-grow">
                    <h1 className="text-white text-[36px] font-bold tracking-tight font-['Michroma']">Bug Report Details</h1>
                    <p className="text-[#CCCCCC] text-[16px] leading-[150%]">
                        Review the report, inspect the bugs, and take appropriate action to maintain a smoother experience for your users.
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 w-full items-start h-full overflow-hidden pb-10">

                {/* Left Column: Details & Activity (flex-[3]) - scrollable */}
                <div className="flex flex-col gap-6 flex-[3] min-w-0 h-full overflow-y-auto no-scrollbar pb-10 w-full">

                    {/* Reported Bug Card */}
                    <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px] shrink-0 shadow-lg w-full">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-white text-[28px] font-bold leading-tight">Reported Bug</h3>
                            {getStatusBadge(bug.status)}
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Subject</label>
                                <p className="text-white text-[18px] font-normal">{bug.subject}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Message</label>
                                <p className="text-white text-[18px] font-normal leading-relaxed opacity-90">{bug.message}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Attachments</label>
                                <div className="flex flex-wrap gap-4">
                                    {(bug.attachments || ['https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800']).map((img, i) => (
                                        <div
                                            key={i}
                                            className="relative w-[320px] h-[320px] rounded-[12px] border border-[#666666]/50 overflow-hidden group shadow-lg bg-[#111111]"
                                        >
                                            <img
                                                src={img}
                                                className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${revealedImages[i] ? 'blur-0 scale-100' : 'blur-3xl scale-110 opacity-70'}`}
                                                alt="Attachment"
                                            />
                                            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${revealedImages[i] ? 'bg-transparent' : 'bg-black/40'}`}>
                                                <button
                                                    onClick={() => toggleReveal(i)}
                                                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 hover:scale-110 active:scale-95 transition-all shadow-2xl"
                                                >
                                                    <svg viewBox="0 0 24 24" className={`w-10 h-10 text-white transition-all duration-300 ${revealedImages[i] ? 'opacity-40' : 'opacity-100'}`} fill="none" stroke="currentColor" strokeWidth="2">
                                                        {revealedImages[i] ? (
                                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                                                        ) : (
                                                            <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                                                        )}
                                                    </svg>
                                                </button>
                                                {!revealedImages[i] && <span className="text-white text-[12px] font-bold mt-4 tracking-widest uppercase opacity-80 select-none">Click to reveal</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Card */}
                    <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px] shrink-0 shadow-xl w-full">
                        <h3 className="text-white text-[28px] font-bold">Activity</h3>
                        <GradientLine />
                        <div className="flex flex-col relative pl-8 gap-12 pb-10">
                            <div className="absolute left-[11px] top-2 bottom-10 w-[2px] bg-white/10 rounded-full" />

                            <div className="relative flex flex-col items-start gap-4">
                                <div className="absolute -left-[30px] top-1 w-6 h-6 bg-[#5F00DB] rounded-full border-2 border-white z-10 shadow-[0_0_10px_rgba(95,0,219,0.5)]" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-white text-[12px] font-bold uppercase tracking-wider">Reported Submitted</span>
                                    <span className="text-white/60 text-[16px]">{bug.submittedOn}</span>
                                </div>

                                <div className="flex flex-col p-5 bg-[#16003F] border border-white/5 rounded-[16px] w-[280px] gap-4 mt-2 group shadow-2xl transition-all hover:border-[#5F00DB]/40 cursor-default">
                                    <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Submitted By</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${bug.reportedBy.avatar})` }} />
                                        <div className="flex flex-col flex-grow min-w-0">
                                            <span className="text-white text-[14px] font-semibold truncate leading-none mb-1">{bug.reportedBy.name}</span>
                                            <span className="text-white/40 text-[11px] truncate leading-none font-light">{bug.reportedBy.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-col items-start gap-3">
                                <div className="absolute -left-[30px] top-1 w-6 h-6 bg-[#5F00DB] rounded-full border-2 border-white z-10" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-white text-[12px] font-bold uppercase tracking-wider">Status Updated</span>
                                    <span className="text-white/60 text-[16px]">Jan 12, 2026 • 10:20 AM</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 bg-white/5 p-2 rounded-full pr-4">
                                    {getStatusBadge('New')}
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white opacity-40" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                                    {getStatusBadge('Pending')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions Sidebar - Sticky */}
                <div className="flex-[1] flex flex-col gap-6 bg-[#222222] border border-[#666666]/30 rounded-[24px] p-8 lg:sticky lg:top-0 min-w-[340px] w-full shadow-2xl">
                    <h3 className="text-white text-[28px] font-bold">Actions</h3>
                    <GradientLine />
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[12px] font-bold uppercase tracking-wider">Status</label>
                        <div className="relative border-b border-white py-2 group">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="w-full bg-transparent text-white text-[18px] appearance-none focus:outline-none cursor-pointer font-['SF_Pro_Text']"
                            >
                                <option className="bg-[#222222]" value="New">New</option>
                                <option className="bg-[#222222]" value="Pending">Pending</option>
                                <option className="bg-[#222222]" value="Resolved">Resolved</option>
                                <option className="bg-[#222222]" value="Closed">Closed</option>
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/60 group-hover:text-white transition-colors">
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-grow mt-4">
                        <label className="text-white text-[12px] font-bold uppercase tracking-wider">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Type here.."
                            className="w-full h-[220px] bg-transparent text-white text-[16px] leading-[150%] focus:outline-none border-b border-white py-2 resize-none placeholder:text-white/40 font-['SF_Pro_Text']"
                        />
                    </div>
                    <button className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-semibold text-[16px] shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all mt-4">
                        Update Status
                    </button>
                </div>
            </div>
            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
};

export default BugReportDetailsView;
