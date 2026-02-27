
import React, { useState, useMemo, useEffect } from 'react';
import SearchInput from '../app-content/shared/SearchInput';
import { Pagination, FilterSelect } from '@/components/shared/TableComponents';
import SupportTableRow, { SupportTicketData } from './SupportTableRow';
import { useSupportRequests, SupportRequest } from '@/services/support';

interface SupportTableProps {
    onAction: (action: 'DETAILS' | 'STATUS' | 'PROFILE', ticket: SupportTicketData) => void;
}

// Capitalise first letter for display (API returns lowercase: 'new', 'pending' etc.)
const capitaliseStatus = (s: string): SupportTicketData['status'] => {
    const map: Record<string, SupportTicketData['status']> = {
        'new': 'New',
        'pending': 'Pending',
        'reviewing': 'Reviewing',
        'resolved': 'Resolved',
        'closed': 'Closed',
    };
    return map[s?.toLowerCase()] ?? 'New';
};

const toTableRow = (sr: SupportRequest): SupportTicketData => ({
    id: sr.id,
    user: {
        name: sr.user.name,
        email: sr.user.email,
        avatar: sr.user.image || '/8.png',
        age: 0,
    },
    subject: sr.subject,
    message: sr.message,
    status: capitaliseStatus(sr.status),
    timestamp: new Date(sr.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    }) + ' • ' + new Date(sr.createdAt).toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', hour12: true
    }),
});

const SupportTable: React.FC<SupportTableProps> = ({ onAction }) => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 100; // Fetch more for client-side pagination
    const { data, isLoading, isError, refetch } = useSupportRequests({
        page: 1, // Always fetch first 100
        limit,
        search: search || undefined,
        status: statusFilter ? statusFilter.toLowerCase() : undefined,
    });

    const allTickets = useMemo(() => (data?.supportRequests ?? []).map(toTableRow), [data]);

    // Standardized Runtime Pagination
    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.max(1, Math.ceil(allTickets.length / ITEMS_PER_PAGE));
    const displayedTickets = useMemo(() => {
        return allTickets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    }, [allTickets, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter]);

    const ColumnHeader = ({ label, width = 'auto', grow = false }: { label: string; width?: string; grow?: boolean }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
            <span className="text-[#AAAAAA] not-italic font-medium text-[0.63vw] opacity-100 group-hover:text-white transition-opacity">
                {label}
            </span>
            <img
                src="/assets/chevron_up_down.png"
                alt="Sort"
                style={{ width: '0.73vw', height: '0.73vw', margin: '-0.21vw 0px' }}
                className="shrink-0 opacity-100"
            />
        </div>
    );

    return (
        <div className="flex flex-col w-full bg-[#222222] rounded-[0.83vw] overflow-visible border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700 not-italic">
            {/* Toolbar */}
            <div className="flex flex-row items-center px-[0.83vw] h-[4.58vw] gap-[0.83vw] bg-[#222222] border-b border-white/10 shrink-0">
                <div className="w-[21.45vw]">
                    <SearchInput value={search} onChange={(v) => { setSearch(v); setCurrentPage(1); }} placeholder="Search" />
                </div>
                <div className="flex-grow" />
                <div className="w-[10.42vw] mr-[-0.94vw]">
                    <FilterSelect
                        label="Status"
                        value={statusFilter}
                        options={['New', 'Pending', 'Reviewing', 'Resolved', 'Closed'].map(opt => ({ label: opt, value: opt }))}
                        onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
                    />
                </div>
            </div>

            {/* Header Row */}
            <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1C1C1E] border-b border-[#333333]">
                <ColumnHeader label="User" width="10.42vw" />
                <ColumnHeader label="Subject" grow />
                <ColumnHeader label="Message" grow />
                <ColumnHeader label="Status" width="10.42vw" />
                <ColumnHeader label="Timestamp" width="10.42vw" />
                <div className="w-[2.5vw] shrink-0" />
            </div>

            <div className="flex flex-col w-full overflow-visible">
                {isLoading && (
                    <div className="flex items-center justify-center h-[10vw] text-white/50 text-[0.83vw]">
                        Loading...
                    </div>
                )}

                {isError && (
                    <div className="flex flex-col items-center justify-center h-[10vw] gap-[0.83vw]">
                        <span className="text-white/50 text-[0.83vw]">Failed to load support requests.</span>
                        <button onClick={() => refetch()} className="text-[#5F00DB] text-[0.73vw] underline cursor-pointer">Retry</button>
                    </div>
                )}

                {!isLoading && !isError && displayedTickets.length === 0 && (
                    <div className="flex items-center justify-center h-[10vw] text-white/50 text-[0.83vw]">
                        No support requests found.
                    </div>
                )}

                {!isLoading && !isError && displayedTickets.map((ticket) => (
                    <SupportTableRow
                        key={ticket.id}
                        data={ticket}
                        onAction={onAction}
                    />
                ))}
            </div>

            <div className="w-full h-[2.5vw]" />

            {allTickets.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="w-full px-[1.25vw] pb-[1.25vw]"
                />
            )}
        </div>
    );
};

export default SupportTable;
