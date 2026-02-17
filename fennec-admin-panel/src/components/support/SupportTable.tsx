
import React, { useState } from 'react';
import SearchInput from '../app-content/shared/SearchInput';
import { Pagination, FilterSelect } from '@/components/shared/TableComponents';
import SupportTableRow, { SupportTicketData } from './SupportTableRow';

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
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
            <span className="text-[#AAAAAA]  not-italic font-medium not-italic text-[0.63vw] opacity-100 group-hover:text-white transition-opacity">
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
        <div className="flex flex-col w-full bg-[#222222] rounded-[0.83vw] overflow-visible border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700  not-italic">
            {/* Toolbar: 4.58vw */}
            <div className="flex flex-row items-center px-[0.83vw] h-[4.58vw] gap-[0.83vw] bg-[#222222] border-b border-white/10 shrink-0">
                <div className="w-[21.45vw]">
                    <SearchInput value={search} onChange={setSearch} placeholder="Search" />
                </div>
                <div className="flex-grow" />
                <div className="w-[10.42vw] mr-[-0.94vw]">
                    <FilterSelect
                        label="Status"
                        value={statusFilter}
                        options={['New', 'Pending', 'Reviewing', 'Resolved', 'Closed'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setStatusFilter}
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
                {MOCK_TICKETS.map((ticket) => (
                    <SupportTableRow
                        key={ticket.id}
                        data={ticket}
                        onAction={(action) => onViewDetail(ticket)}
                    />
                ))}
            </div>

            {/* Gap */}
            <div className="w-full h-[2.5vw]" />

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
