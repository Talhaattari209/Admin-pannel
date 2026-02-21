
import React, { useState, useEffect } from 'react';
import { SupportTicketData } from './SupportTableRow';
import { PageHeader } from '../Headers';
import { useAuthStore } from '@/store/auth-store';
import { canEditModule } from '@/utils/permissions';
import { useSupportRequestDetail, useUpdateSupportStatus, SupportActivity } from '@/services/support';

interface SupportTicketDetailViewProps {
    ticket: SupportTicketData | null;
    onBack: () => void;
}

const SupportTicketDetailView: React.FC<SupportTicketDetailViewProps> = ({ ticket, onBack }) => {
    const [status, setStatus] = useState(ticket?.status?.toLowerCase() || 'new');
    const [notes, setNotes] = useState('');

    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
    const canEdit = isSuperAdmin || canEditModule(permissions, 'support requests');

    // Fetch detail — uses the id from the list item
    const { data: detail, isLoading, isError } = useSupportRequestDetail(ticket?.id ?? null);
    const updateStatus = useUpdateSupportStatus();

    // Sync status when detail loads
    useEffect(() => {
        if (detail?.supportRequest?.status) {
            setStatus(detail.supportRequest.status);
        }
    }, [detail]);

    if (!ticket) return null;

    const getStatusBadge = (s: string) => {
        const normalised = s?.toLowerCase();
        const colors: Record<string, string> = {
            'new': 'bg-[#5F00DB] text-white',
            'pending': 'bg-[#F37600] text-white',
            'reviewing': 'bg-[#0099FF] text-white',
            'resolved': 'bg-[#3ADC60] text-black',
            'closed': 'bg-[#FF4E4E] text-white',
        };
        const label = s.charAt(0).toUpperCase() + s.slice(1);
        return (
            <div className={`h-[1.67vw] px-[0.83vw] rounded-full text-[0.68vw] font-bold not-italic flex items-center justify-center min-w-[4.38vw] leading-none text-center ${colors[normalised] || 'bg-white/10 text-white'}`}>
                <span className="mt-[0.05vw]">{label}</span>
            </div>
        );
    };

    const GradientLine = () => (
        <div className="h-[1px] w-full bg-gradient-to-r from-[#5F00DB] to-white opacity-40 mt-[0.83vw] mb-[1.67vw]" />
    );

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            + ' • ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const handleUpdateStatus = () => {
        if (!ticket.id) return;
        updateStatus.mutate(
            { id: ticket.id, status, notes: notes || undefined },
            {
                onSuccess: () => {
                    setNotes('');
                },
            }
        );
    };

    // Use real detail data where available, fall back to list data
    const displaySubject = detail?.supportRequest?.subject ?? ticket.subject;
    const displayMessage = detail?.supportRequest?.message ?? ticket.message;
    const displayUser = detail?.user ?? null;
    const displayAvatar = displayUser?.userImage || ticket.user.avatar || '/8.png';
    const displayName = displayUser?.name ?? ticket.user.name;
    const displayCreatedAt = detail?.supportRequest?.createdAt ?? '';

    const activities: SupportActivity[] = detail?.activity ?? [];

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-500 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

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

                <div
                    className="w-[4.17vw] h-[4.17vw] rounded-full bg-cover bg-center border-2 border-[#5F00DB]"
                    style={{ backgroundImage: `url(${displayAvatar})` }}
                />

                <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-[0.42vw]">
                        <h1 className="text-white text-[1.88vw] font-bold not-italic tracking-tight">{displayName}</h1>
                        <div className="flex items-center justify-center w-[1.67vw] h-[1.67vw] bg-white rounded-full">
                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-[#5F00DB]" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-[0.42vw] mt-[0.42vw]">
                        {ticket.user.email && (
                            <div className="px-[0.63vw] py-[0.21vw] bg-[#5F00DB] rounded-full text-white text-[0.63vw] font-medium not-italic">
                                {ticket.user.email}
                            </div>
                        )}
                        {displayUser?.phone && (
                            <div className="px-[0.63vw] py-[0.21vw] bg-[#5F00DB] rounded-full text-white text-[0.63vw] font-medium not-italic">
                                {displayUser.phone}
                            </div>
                        )}
                        {displayUser?.jobTitle && (
                            <div className="px-[0.63vw] py-[0.21vw] bg-[#5F00DB] rounded-full text-white text-[0.63vw] font-medium not-italic">
                                {displayUser.jobTitle}
                            </div>
                        )}
                        {displayUser?.education && (
                            <div className="px-[0.63vw] py-[0.21vw] bg-[#5F00DB] rounded-full text-white text-[0.63vw] font-medium not-italic">
                                {displayUser.education}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="flex items-center justify-center h-[20vw] text-white/50 text-[0.83vw]">
                    Loading ticket details...
                </div>
            )}

            {/* Error state */}
            {isError && (
                <div className="flex items-center justify-center h-[10vw] text-white/50 text-[0.83vw]">
                    Failed to load ticket details.
                </div>
            )}

            {/* Main Layout */}
            {!isLoading && (
                <div className="flex flex-row gap-[0.83vw] w-full items-start justify-center">

                    {/* Left Column */}
                    <div className="flex flex-col gap-[1.67vw] w-full flex-grow flex-shrink">

                        {/* Ticket Details Card */}
                        <div className="flex flex-col p-[1.67vw] bg-[#222222] border border-[#666666]/30 rounded-[1.25vw]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white text-[1.46vw] font-bold not-italic leading-tight">Support Ticket Details</h3>
                                {getStatusBadge(detail?.supportRequest?.status ?? ticket.status)}
                            </div>
                            <GradientLine />
                            <div className="flex flex-col gap-[1.25vw]">
                                <div className="flex flex-col gap-[0.42vw]">
                                    <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-60">Subject</label>
                                    <p className="text-white text-[0.94vw] font-normal not-italic">{displaySubject}</p>
                                </div>
                                <div className="flex flex-col gap-[0.42vw]">
                                    <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-60">Message</label>
                                    <p className="text-white text-[0.94vw] font-normal not-italic leading-relaxed opacity-90">{displayMessage}</p>
                                </div>
                                {displayCreatedAt && (
                                    <div className="flex flex-col gap-[0.42vw]">
                                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider opacity-60">Submitted</label>
                                        <p className="text-white text-[0.94vw] font-normal not-italic opacity-80">{formatTime(displayCreatedAt)}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Activity Card */}
                        <div className="flex flex-col p-[1.67vw] bg-[#222222] border border-[#666666]/30 rounded-[1.25vw]">
                            <h3 className="text-white text-[1.46vw] font-bold not-italic leading-tight mb-[1.67vw]">Activity</h3>

                            {activities.length === 0 && !isLoading && (
                                <p className="text-white/40 text-[0.73vw]">No activity yet.</p>
                            )}

                            <div className="flex flex-col">
                                {activities.map((activity, idx) => {
                                    const isLast = idx === activities.length - 1;
                                    return (
                                        <div key={idx} className={`flex gap-[0.83vw] relative ${!isLast ? 'pb-[1.67vw]' : ''}`}>
                                            {/* Connector line */}
                                            {!isLast && (
                                                <div className="absolute left-[0.625vw] top-[0.625vw] bottom-0 w-[2px] bg-white rounded-full -translate-x-[50%]" />
                                            )}
                                            {/* Dot */}
                                            <div className="flex-shrink-0 w-[1.25vw] h-[1.25vw] rounded-full bg-[#5F00DB] border-[1.5px] border-white z-10 box-border" />

                                            <div className="flex flex-col gap-[0.42vw]">
                                                <span className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider">
                                                    {activity.type === 'created' ? 'Ticket Created' : 'Status Updated'}
                                                </span>
                                                <span className="text-white text-[0.83vw] font-normal not-italic opacity-90">
                                                    {formatTime(activity.timestamp)}
                                                </span>

                                                {activity.type === 'status_updated' && activity.fromStatus && activity.toStatus && (
                                                    <div className="flex items-center gap-[0.63vw] mt-[0.21vw]">
                                                        {getStatusBadge(activity.fromStatus)}
                                                        <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                                        </svg>
                                                        {getStatusBadge(activity.toStatus)}
                                                    </div>
                                                )}

                                                {activity.note && (
                                                    <div className="mt-[0.63vw] p-[0.83vw] bg-[#16003F] rounded-[0.63vw] self-start">
                                                        <p className="text-white text-[0.73vw] italic font-normal">{activity.note}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
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
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full bg-transparent text-white text-[0.94vw] appearance-none focus:outline-none cursor-pointer"
                                        >
                                            <option className="bg-[#222222]" value="new">New</option>
                                            <option className="bg-[#222222]" value="pending">Pending</option>
                                            <option className="bg-[#222222]" value="reviewing">Reviewing</option>
                                            <option className="bg-[#222222]" value="resolved">Resolved</option>
                                            <option className="bg-[#222222]" value="closed">Closed</option>
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
                                    onClick={handleUpdateStatus}
                                    disabled={updateStatus.isPending}
                                    className="w-full h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-semibold not-italic text-[0.83vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all mt-[0.83vw] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updateStatus.isPending ? 'Updating...' : 'Update Status'}
                                </button>

                                {updateStatus.isSuccess && (
                                    <p className="text-[#3ADC60] text-[0.63vw] text-center">Status updated successfully.</p>
                                )}
                                {updateStatus.isError && (
                                    <p className="text-[#FF4E4E] text-[0.63vw] text-center">Failed to update status.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SupportTicketDetailView;
