
import React, { useState } from 'react';
import { UserReportData } from './UserReportedTableRow';
import { DeactivationCard } from '../../PopCards';
import { useAuthStore } from '@/store/auth-store';
import { canEditModule, canDeleteModule } from '@/utils/permissions';

interface UserReportDetailsViewProps {
    report: UserReportData | null;
    onBack: () => void;
    onDeactivate: () => void;
    onUpdateStatus: (status: string, notes: string) => void;
    onWarnUser?: () => void;
}

const UserReportDetailsView: React.FC<UserReportDetailsViewProps> = ({ report, onBack, onDeactivate, onUpdateStatus, onWarnUser }) => {
    const [status, setStatus] = useState(report?.status || 'New');
    const [notes, setNotes] = useState('');
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    // Permission checks
    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
    const canEdit = isSuperAdmin || canEditModule(permissions, 'reported problems');
    const canDelete = isSuperAdmin || canDeleteModule(permissions, 'reported problems');

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
                    className="w-[2.5vw] h-[2.5vw] flex items-center justify-center bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                    <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="flex flex-col flex-grow">
                    <h1 className="text-white text-[1.88vw] font-bold not-italic tracking-tight leading-tight">User Report Details</h1>
                    <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%] opacity-60">
                        Review the report, inspect the evidence, and take appropriate action.
                    </p>
                </div>

                <div className="flex gap-[0.83vw]">
                    <button
                        onClick={() => onWarnUser?.()}
                        className="px-[1.67vw] py-[0.83vw] border border-white rounded-[2.71vw] text-white text-[0.83vw] font-medium not-italic hover:bg-white/10 backdrop-blur-[6px] transition-all cursor-pointer"
                    >
                        Warn User
                    </button>
                    {canDelete && (
                        <button
                            onClick={() => setShowDeactivateModal(true)}
                            className="px-[1.67vw] py-[0.83vw] bg-[#FF4E4E] rounded-[2.71vw] text-white text-[0.83vw] font-medium not-italic shadow-[0px_4px_12px_rgba(255,78,78,0.25)] hover:brightness-110 transition-all cursor-pointer">
                            Deactivate User
                        </button>
                    )}
                </div>
            </div>

            {/* Main Layout Row */}
            <div className="flex flex-row gap-[0.83vw] w-full items-start justify-start">

                {/* Left Column: Details & Activity */}
                <div className="flex flex-col gap-[1.67vw] w-full max-w-[calc(100%-20vw)] flex-shrink">

                    {/* Reported User Card */}
                    <div className="flex flex-col p-[1.67vw] bg-[#222222] border border-[#666666]/30 rounded-[1.25vw]">
                        <div className="flex items-center justify-between mb-[1.67vw]">
                            <h3 className="text-white text-[1.46vw] font-bold not-italic leading-tight">Reported User</h3>
                            {getStatusBadge(report.status)}
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-[2.08vw] mb-[2.08vw] w-full">
                            <div
                                className="w-[4.17vw] h-[4.17vw] rounded-full bg-cover bg-center border-2 border-[#5F00DB] shrink-0"
                                style={{ backgroundImage: `url(${report.reportedUser.avatar})` }}
                            />
                            <div className="flex flex-col flex-grow min-w-0 w-full">
                                <div className="flex items-center gap-[0.83vw] flex-wrap">
                                    <span className="text-white text-[1.88vw] font-bold not-italic tracking-tight leading-none truncate">
                                        {report.reportedUser.name}, {report.reportedUser.age}
                                    </span>
                                    <div className="w-[1.67vw] h-[1.67vw] flex items-center justify-center bg-white rounded-full mt-[0.83vw] shrink-0 shadow-lg">
                                        <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-[#5F00DB]" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-[0.42vw] mt-[0.83vw]">
                                    {['Straight', 'He/Him', 'Austin, TX', '2 miles', 'Stanford University', 'Software Engineer'].map((chip) => (
                                        <div key={chip} className="px-[0.63vw] py-[0.21vw] bg-[#5F00DB] rounded-full text-white text-[0.63vw] font-medium not-italic">
                                            {chip}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[0.42vw]">
                            <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-60">Reason</label>
                            <p className="text-white text-[0.94vw] font-normal not-italic leading-relaxed">{report.category}</p>
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
                                    <span className="text-white text-[0.83vw] font-normal not-italic opacity-90">{report.submittedOn}</span>
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
                {canEdit && (
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
                                onClick={() => onUpdateStatus(status, notes)}
                                className="w-full h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-semibold not-italic text-[0.83vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all mt-[0.83vw] cursor-pointer"
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Deactivation Modal - Using component from PopCards.tsx */}
            <DeactivationCard
                isOpen={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
                onConfirm={() => {
                    onDeactivate();
                    setShowDeactivateModal(false);
                }}
            />
        </div >
    );
};

export default UserReportDetailsView;
