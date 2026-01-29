
import React, { useState } from 'react';
import { UserReportData } from './UserReportedTableRow';

interface UserReportDetailsViewProps {
    report: UserReportData | null;
    onBack: () => void;
    onDeactivate: () => void;
    onUpdateStatus: (status: string, notes: string) => void;
}

const UserReportDetailsView: React.FC<UserReportDetailsViewProps> = ({ report, onBack, onDeactivate, onUpdateStatus }) => {
    const [status, setStatus] = useState(report?.status || 'New');
    const [notes, setNotes] = useState('');

    if (!report) return null;

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
        <div className="flex flex-col w-full max-w-[95vw] mx-auto p-[1vw] md:p-[2vw] animate-in fade-in duration-500 overflow-y-auto no-scrollbar max-h-screen font-['SF_Pro_Text']">

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
                    <h1 className="text-white text-[36px] font-bold tracking-tight font-['Michroma'] leading-tight">User Report Details</h1>
                    <p className="text-[#CCCCCC] text-[16px] leading-[150%] opacity-60">
                        Review the report, inspect the evidence, and take appropriate action to maintain safety and compliance.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button className="px-8 py-4 border border-white rounded-[52px] text-white font-medium hover:bg-white/10 backdrop-blur-[6px] transition-all">
                        View User's Profile
                    </button>
                    <button
                        onClick={onDeactivate}
                        className="px-8 py-4 bg-[#FF4E4E] rounded-[52px] text-white font-medium shadow-[0px_4px_12px_rgba(255,78,78,0.25)] hover:brightness-110 transition-all">
                        Deactivate User
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 w-full items-start">

                {/* Left Column */}
                <div className="flex flex-col gap-6 flex-[3] min-w-0 w-full">

                    <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px] shadow-lg w-full">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-white text-[28px] font-bold leading-tight">Reported User</h3>
                            {getStatusBadge(report.status)}
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-10 mb-10 w-full">
                            <div
                                className="w-[80px] h-[80px] rounded-full bg-cover bg-center border-2 border-[#5F00DB] shrink-0"
                                style={{ backgroundImage: `url(${report.reportedUser.avatar})` }}
                            />
                            <div className="flex flex-col flex-grow min-w-0 w-full">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <span className="text-white text-[4vw] md:text-[72px] font-bold tracking-tight leading-none truncate">
                                        {report.reportedUser.name}, {report.reportedUser.age}
                                    </span>
                                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full mt-4 shrink-0 shadow-lg">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#5F00DB]" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['Straight', 'He/Him', 'Austin, TX', '2 miles', 'Stanford University', 'Software Engineer'].map((chip) => (
                                        <div key={chip} className="px-3 py-1 bg-[#5F00DB] rounded-full text-white text-[12px] font-medium">
                                            {chip}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="px-6 py-4 border border-white rounded-[52px] text-white font-medium hover:bg-white/10 transition-all shrink-0 mt-4 md:mt-0">
                                View User's Profile
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Reason</label>
                            <p className="text-white text-[18px] font-normal leading-relaxed">{report.category}</p>
                        </div>
                    </div>

                    <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px] shadow-xl w-full">
                        <h3 className="text-white text-[28px] font-bold">Activity</h3>
                        <GradientLine />
                        <div className="flex flex-col relative pl-8 gap-12 pb-10">
                            <div className="absolute left-[11px] top-2 bottom-10 w-[2px] bg-white/10 rounded-full" />

                            <div className="relative flex flex-col items-start gap-4">
                                <div className="absolute -left-[30px] top-1 w-6 h-6 bg-[#5F00DB] rounded-full border-2 border-white z-10 shadow-[0_0_10px_rgba(95,0,219,0.5)]" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-white text-[12px] font-bold uppercase tracking-wider">Reported Submitted</span>
                                    <span className="text-white/60 text-[16px]">{report.submittedOn}</span>
                                </div>

                                <div className="flex flex-col p-5 bg-[#16003F] border border-white/5 rounded-[16px] w-[280px] gap-4 mt-2 group shadow-2xl transition-all hover:border-[#5F00DB]/40 cursor-default">
                                    <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Submitted By</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-cover bg-center border border-white/10 shrink-0" style={{ backgroundImage: `url(${report.reportedBy.avatar})` }} />
                                        <div className="flex flex-col flex-grow min-w-0">
                                            <span className="text-white text-[14px] font-semibold truncate leading-none mb-1">{report.reportedBy.name}</span>
                                            <span className="text-white/40 text-[11px] truncate leading-none font-light">{report.reportedBy.email}</span>
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
                                {/* 8px padding note as per requirement */}
                                <div className="bg-[#16003F] p-2 rounded-[12px] border border-white/5 inline-block self-start italic text-white/80 text-[15px] mt-2 shadow-lg">
                                    User Deactivated
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions Sidebar */}
                <div className="flex-[1] flex flex-col gap-6 bg-[#222222] border border-[#666666]/30 rounded-[24px] p-8 lg:sticky lg:top-8 min-w-[340px] w-full shadow-2xl">
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
                    <button
                        onClick={() => onUpdateStatus(status, notes)}
                        className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-semibold text-[16px] shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all mt-4">
                        Update Status
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserReportDetailsView;
