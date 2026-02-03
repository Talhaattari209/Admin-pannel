
import React, { useState } from 'react';
import SearchInput from '../app-content/shared/SearchInput';
import FilterSelect from '../app-content/shared/FilterSelect';
import SupportTableRow, { SupportTicketData } from './SupportTableRow';
import { Pagination } from '@/components/shared/TableComponents';

const MOCK_TICKETS: SupportTicketData[] = [
    {
        id: '1',
        user: { name: 'Lucas Thomas', email: 'lucasthomas@email.com', avatar: 'https://i.pravatar.cc/150?u=lucas', age: 23 },
        subject: 'Video call quality poor',
        message: 'The video call quality is very low, how can I improve it?',
        status: 'New',
        timestamp: 'Jan 11, 2026 • 8:45 AM'
    },
    {
        id: '2',
        user: { name: 'Jane Smith', email: 'janesmith@email.com', avatar: 'https://i.pravatar.cc/150?u=jane', age: 25 },
        subject: 'Unable to send messages',
        message: "I can't send text messages at all. Is there a fix?",
        status: 'Pending',
        timestamp: 'Jan 2, 2026 • 10:15 AM'
    },
    {
        id: '3',
        user: { name: 'Michael Brown', email: 'michaelbrown@email.com', avatar: 'https://i.pravatar.cc/150?u=mike', age: 29 },
        subject: 'App crashes on startup',
        message: 'The app crashes every time I open it. Please assist!',
        status: 'Reviewing',
        timestamp: 'Jan 3, 2026 • 1:30 PM'
    },
    {
        id: '4',
        user: { name: 'Emily Davis', email: 'emilydavis@email.com', avatar: 'https://i.pravatar.cc/150?u=emily', age: 22 },
        subject: 'No notifications received',
        message: 'I am not receiving any notifications for messages!',
        status: 'Resolved',
        timestamp: 'Jan 4, 2026 • 3:45 PM'
    }
];

interface SupportTableProps {
    onViewDetail: (ticket: SupportTicketData) => void;
}

const SupportTable: React.FC<SupportTableProps> = ({ onViewDetail }) => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const ColumnHeader = ({ label, width = "auto", grow = false }: { label: string, width?: string, grow?: boolean }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.83vw] h-[1.98vw] group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
            <span className="text-white text-[0.63vw] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-['SF_Pro_Text']">
                {label}
            </span>
            <div className="flex flex-col opacity-20 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 10 6" className="w-[0.52vw] h-[0.31vw] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z" /></svg>
                <svg viewBox="0 0 10 6" className="w-[0.52vw] h-[0.31vw]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z" /></svg>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col w-full bg-[#222222] rounded-[0.83vw] overflow-hidden border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700 font-['SF_Pro_Text']">
            {/* Toolbar: 4.58vw */}
            <div className="flex flex-row items-center px-[0.83vw] h-[4.58vw] gap-[0.83vw] bg-[#222222] border-b border-white/10 shrink-0">
                <div className="w-[21.45vw]">
                    <SearchInput value={search} onChange={setSearch} placeholder="Search" />
                </div>
                <div className="flex-grow" />
                <div className="w-[10.42vw]">
                    <FilterSelect
                        label="Status"
                        value={statusFilter}
                        options={['New', 'Pending', 'Reviewing', 'Resolved', 'Closed']}
                        onChange={setStatusFilter}
                    />
                </div>
            </div>

            {/* Header Row */}
            <div className="flex flex-row items-center w-full border-b border-white/10 bg-[#1a1a1a]/50 h-[1.98vw]">
                <ColumnHeader label="User" width="10.42vw" />
                <ColumnHeader label="Subject" grow />
                <ColumnHeader label="Message" grow />
                <ColumnHeader label="Status" width="10.42vw" />
                <ColumnHeader label="Timestamp" width="10.42vw" />
                <div className="w-[2.5vw] shrink-0" />
            </div>

            <div className="flex flex-col min-h-[20.83vw] p-[0.42vw]">
                {MOCK_TICKETS.map((ticket) => (
                    <SupportTableRow
                        key={ticket.id}
                        data={ticket}
                        onAction={(action) => onViewDetail(ticket)}
                    />
                ))}
            </div>

            {/* Gap */}
            <div className="w-full h-[2.60vw]" />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                className="w-full px-[1.25vw] pb-[1.25vw]"
            />
        </div>
    );
};

export default SupportTable;
