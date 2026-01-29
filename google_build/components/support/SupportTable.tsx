import React, { useState } from 'react';
import SearchInput from '../shared/SearchInput';
import FilterSelect from '../shared/FilterSelect';
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

  const ColumnHeader = ({ label, width = "auto", grow = false }: { label: string, width?: string, grow?: boolean }) => (
    <div className={`flex flex-row items-center gap-2 px-4 h-[38px] group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
      <span className="text-white text-[12px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
      <div className="flex flex-col opacity-20 group-hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z" /></svg>
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z" /></svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full max-w-[1520px] bg-[#222222] rounded-[16px] overflow-hidden border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
      {/* Toolbar: 88px */}
      <div className="flex flex-row items-center px-4 h-[88px] gap-[16px] bg-[#222222] border-b border-white/10 shrink-0">
        <SearchInput value={search} onChange={setSearch} width="412px" />
        <div className="flex-grow" />
        <FilterSelect
          label="Status"
          value={statusFilter}
          options={['New', 'Pending', 'Reviewing', 'Resolved', 'Closed']}
          onChange={setStatusFilter}
          width="200px"
        />
      </div>

      {/* Header Row */}
      <div className="flex flex-row items-center w-full border-b border-white/10 bg-[#1a1a1a]/50">
        <ColumnHeader label="User" width="200px" />
        <ColumnHeader label="Subject" grow />
        <ColumnHeader label="Message" grow />
        <ColumnHeader label="Status" width="200px" />
        <ColumnHeader label="Timestamp" width="200px" />
        <div className="w-[48px] shrink-0" />
      </div>

      <div className="flex flex-col min-h-[400px]">
        {MOCK_TICKETS.map((ticket) => (
          <SupportTableRow
            key={ticket.id}
            data={ticket}
            onAction={(action) => onViewDetail(ticket)}
          />
        ))}
      </div>
    </div>
  );
};

export default SupportTable;