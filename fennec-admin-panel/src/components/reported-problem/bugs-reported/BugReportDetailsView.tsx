
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
            <div className={`h-[1.67vw] px-[0.83vw] rounded-full text-[0.68vw] font-bold not-italic flex items-center justify-center min-w-[4.38vw] leading-none text-center ${colors[s] || 'bg-white/10 text-white'}`}>
                <span className="mt-[0.05vw]">{s}</span>
            </div>
        );
    };

    const GradientLine = () => (
        <div className="h-[1px] w-full bg-gradient-to-r from-[#5F00DB] to-white opacity-40 mt-[0.83vw] mb-[1.67vw]" />
    );

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-500  overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

            {/* Header */}
            <div className="flex flex-row items-center gap-[0.83vw] w-full h-[4.17vw] mb-[2.08vw] shrink-0">
                <button
                    onClick={onBack}
                    className="w-[2.5vw] h-[2.5vw] flex items-center justify-center bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all"
                >
                    <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="flex flex-col flex-grow">
                    <h1 className="text-white text-[1.88vw] font-bold not-italic tracking-tight leading-tight">Bug Report Details</h1>
                    <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%] opacity-60">
                        Review the report, inspect the bugs, and take appropriate action to maintain user experience.
                    </p>
                </div>
            </div>

            {/* Main Layout Row */}
            <div className="flex flex-row gap-[0.83vw] w-full items-start justify-center">

                {/* Left Column: Details & Activity */}
                <div className="flex flex-col gap-[1.67vw] w-full flex-grow flex-shrink">

                    {/* Reported Bug Card */}
                    <div className="flex flex-col p-[1.67vw] bg-[#222222] border border-[#666666]/30 rounded-[1.25vw]">
                        <div className="flex items-center justify-between mb-[1.67vw]">
                            <h3 className="text-white text-[1.46vw] font-bold not-italic leading-tight">Reported Bug</h3>
                            {getStatusBadge(bug.status)}
                        </div>

                        <div className="flex flex-col gap-[1.67vw]">
                            <div className="flex flex-col gap-[0.42vw]">
                                <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-60">Subject</label>
                                <p className="text-white text-[0.94vw] font-normal not-italic">{bug.subject}</p>
                            </div>

                            <div className="flex flex-col gap-[0.42vw]">
                                <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-60">Message</label>
                                <p className="text-white text-[0.94vw] font-normal not-italic leading-relaxed opacity-90">{bug.message}</p>
                            </div>

                            <div className="flex flex-col gap-[0.63vw]">
                                <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-60">Attachments</label>
                                <div className="flex flex-wrap gap-[0.83vw]">
                                    {(bug.attachments || ['https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800']).map((img, i) => (
                                        <div
                                            key={i}
                                            className="relative w-[16.67vw] h-[16.67vw] rounded-[0.63vw] border border-[#666666]/50 overflow-hidden group shadow-lg bg-[#111111]"
                                        >
                                            <img
                                                src={img}
                                                className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${revealedImages[i] ? 'blur-0 scale-100' : 'blur-3xl scale-110 opacity-70'}`}
                                                alt="Attachment"
                                            />
                                            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${revealedImages[i] ? 'bg-transparent' : 'bg-black/40'}`}>
                                                <button
                                                    onClick={() => toggleReveal(i)}
                                                    className="w-[3.33vw] h-[3.33vw] rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 hover:scale-110 active:scale-95 transition-all shadow-2xl"
                                                >
                                                    <svg viewBox="0 0 24 24" className={`w-[2.08vw] h-[2.08vw] text-white transition-all duration-300 ${revealedImages[i] ? 'opacity-40' : 'opacity-100'}`} fill="none" stroke="currentColor" strokeWidth="2">
                                                        {revealedImages[i] ? (
                                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                                                        ) : (
                                                            <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                                                        )}
                                                    </svg>
                                                </button>
                                                {!revealedImages[i] && <span className="text-white text-[0.63vw] font-bold not-italic mt-[0.83vw] tracking-widest uppercase opacity-80 select-none">Click to reveal</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Card */}
                    <div className="flex flex-col p-[1.67vw] bg-[#222222] border border-[#666666]/30 rounded-[1.25vw]">
                        <h3 className="text-white text-[1.46vw] font-bold not-italic leading-tight mb-[1.67vw]">Activity</h3>

                        <div className="flex flex-col">
                            {/* Item 1: Ticket Created */}
                            <div className="flex gap-[0.83vw] relative pb-[1.67vw]">
                                {/* Line */}
                                <div className="absolute left-[0.625vw] top-[0.625vw] bottom-0 w-[2px] bg-white rounded-full -translate-x-[50%]"></div>
                                {/* Dot */}
                                <div className="flex-shrink-0 w-[1.25vw] h-[1.25vw] rounded-full bg-[#5F00DB] border-[1.5px] border-white z-10 box-border"></div>

                                <div className="flex flex-col gap-[0.42vw]">
                                    <span className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider">Report Submitted</span>
                                    <span className="text-white text-[0.83vw] font-normal not-italic opacity-90">{bug.submittedOn}</span>
                                </div>
                            </div>

                            {/* Item 2: Status Updated (New -> Pending) */}
                            <div className="flex gap-[0.83vw] relative pb-[1.67vw]">
                                {/* Line */}
                                <div className="absolute left-[0.625vw] top-[0.625vw] bottom-0 w-[2px] bg-white rounded-full -translate-x-[50%]"></div>
                                {/* Dot */}
                                <div className="flex-shrink-0 w-[1.25vw] h-[1.25vw] rounded-full bg-[#5F00DB] border-[1.5px] border-white z-10 box-border"></div>

                                <div className="flex flex-col gap-[0.42vw]">
                                    <span className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider">Status Updated</span>
                                    <span className="text-white text-[0.83vw] font-normal not-italic opacity-90">Jan 11, 2026 • 11:59 PM</span>
                                    <div className="flex items-center gap-[0.63vw] mt-[0.21vw]">
                                        {getStatusBadge('New')}
                                        <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        {getStatusBadge('Pending')}
                                    </div>
                                </div>
                            </div>

                            {/* Item 3: Status Updated (Pending -> Resolved) + Note */}
                            <div className="flex gap-[0.83vw] relative">
                                {/* Dot */}
                                <div className="flex-shrink-0 w-[1.25vw] h-[1.25vw] rounded-full bg-[#5F00DB] border-[1.5px] border-white z-10 box-border"></div>

                                <div className="flex flex-col gap-[0.42vw]">
                                    <span className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider">Status Updated</span>
                                    <span className="text-white text-[0.83vw] font-normal not-italic opacity-90">Jan 11, 2026 • 11:59 PM</span>
                                    <div className="flex items-center gap-[0.63vw] mt-[0.21vw]">
                                        {getStatusBadge('Pending')}
                                        <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        {getStatusBadge('Resolved')}
                                    </div>

                                    {/* Note */}
                                    <div className="mt-[0.63vw] p-[0.83vw] bg-[#16003F] rounded-[0.63vw] self-start">
                                        <p className="text-white text-[0.73vw] italic font-normal">No proof found in this report.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Actions Sidebar */}
                <div className="flex flex-col gap-[0.52vw] w-[19.17vw] shrink-0 sticky top-[1.67vw]">
                    <div className="flex flex-col p-[0.83vw] gap-[0.83vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] h-auto">
                        <h3 className="text-white text-[1.46vw] font-bold not-italic">Actions</h3>
                        <GradientLine />

                        {/* Status Dropdown */}
                        <div className="flex flex-col gap-[0.42vw]">
                            <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider">Status</label>
                            <div className="relative border-b border-white py-[0.42vw] group">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="w-full bg-transparent text-white text-[0.94vw] appearance-none focus:outline-none cursor-pointer"
                                >
                                    <option className="bg-[#222222]" value="New">New</option>
                                    <option className="bg-[#222222]" value="Pending">Pending</option>
                                    <option className="bg-[#222222]" value="Reviewing">Reviewing</option>
                                    <option className="bg-[#222222]" value="Resolved">Resolved</option>
                                    <option className="bg-[#222222]" value="Closed">Closed</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/60 group-hover:text-white transition-colors">
                                    <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Notes Textarea */}
                        <div className="flex flex-col gap-[0.42vw] flex-grow mt-[0.83vw]">
                            <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider">Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Type here.."
                                className="w-full h-[9.38vw] bg-transparent text-white text-[0.83vw] leading-[150%] focus:outline-none border-b border-white py-[0.42vw] resize-none placeholder:text-white/40"
                            />
                        </div>

                        {/* Update Button */}
                        <button
                            className="w-full h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-semibold not-italic text-[0.83vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all mt-[0.83vw]"
                        >
                            Update Status
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BugReportDetailsView;
