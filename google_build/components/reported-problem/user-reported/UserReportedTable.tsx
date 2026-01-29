
import React, { useState } from 'react';
import SearchInput from '../../prompts/SearchInput';
import FilterSelect from '../../prompts/FilterSelect';
import UserReportedTableRow, { UserReportData } from './UserReportedTableRow';

const MOCK_REPORTS: UserReportData[] = [
  { 
    id: 'rep-1', 
    reportedBy: { name: 'Jackson Scott', email: 'jacksonscott@email.com', avatar: 'https://i.pravatar.cc/150?u=jack' },
    reportedUser: { name: 'Mason Green', email: 'masongreen@email.com', avatar: 'https://i.pravatar.cc/150?u=mason', age: 24 },
    category: 'Inadequate profile info',
    reports: 4,
    description: 'Profile lacks necessary details.',
    status: 'New',
    submittedOn: 'Jun 25, 2026 • 11:45 AM'
  },
  { 
    id: 'rep-2', 
    reportedBy: { name: 'Emily Johnson', email: 'emilyjohnson@email.com', avatar: 'https://i.pravatar.cc/150?u=emily' },
    reportedUser: { name: 'Michael Davis', email: 'michaeldavis@email.com', avatar: 'https://i.pravatar.cc/150?u=mike', age: 28 },
    category: 'Inappropriate content',
    reports: 4,
    description: 'Offensive language in posts.',
    status: 'Pending',
    submittedOn: 'Feb 02, 2026 • 03:45 PM'
  }
];

interface UserReportedTableProps {
  onViewDetail: (report: UserReportData) => void;
}

const UserReportedTable: React.FC<UserReportedTableProps> = ({ onViewDetail }) => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Select');
  const [repFilter, setRepFilter] = useState('Select');
  const [statusFilter, setStatusFilter] = useState('Select');

  const ColumnHeader = ({ label, width = "auto", grow = false }: { label: string, width?: string, grow?: boolean }) => (
    <div className={`flex flex-row items-center gap-2 px-4 h-[38px] group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
      <span className="text-white text-[12px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-inter">
        {label}
      </span>
      <div className="flex flex-col opacity-20 group-hover:opacity-100 transition-opacity shrink-0">
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full bg-[#222222] rounded-[16px] rounded-tl-none overflow-hidden border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between p-4 gap-4 bg-[#1a1a1a]/30">
        <SearchInput value={search} onChange={setSearch} />
        <div className="flex gap-4">
          <FilterSelect label="Category" value={catFilter} options={['Harassment', 'Spam', 'Nudity']} onChange={setCatFilter} />
          <FilterSelect label="Reports" value={repFilter} options={['1-2', '3-5', '5+']} onChange={setRepFilter} />
          <FilterSelect label="Status" value={statusFilter} options={['New', 'Pending', 'Resolved', 'Closed']} onChange={setStatusFilter} />
        </div>
      </div>

      <div className="flex flex-row items-center w-full border-b border-white/10 bg-[#1a1a1a]/50">
        <ColumnHeader label="Reported By" width="240px" />
        <ColumnHeader label="Reported User" width="240px" />
        <ColumnHeader label="Category" width="180px" />
        <ColumnHeader label="Reports" width="120px" />
        <ColumnHeader label="Description" grow />
        <ColumnHeader label="Status" width="120px" />
        <ColumnHeader label="Submitted On" width="200px" />
        <div className="w-[60px]" />
      </div>

      <div className="flex flex-col min-h-[400px]">
        {MOCK_REPORTS.map((report) => (
          <UserReportedTableRow key={report.id} data={report} onAction={() => onViewDetail(report)} />
        ))}
        <div className="flex-grow bg-[#222222]" />
      </div>
    </div>
  );
};

export default UserReportedTable;
