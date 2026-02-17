import React, { useState } from 'react';
import SearchInput from '../../app-content/shared/SearchInput';
import { FilterSelect } from '@/components/shared/TableComponents';
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
  },
  {
    id: 'rep-3',
    reportedBy: { name: 'David Wilson', email: 'davidwilson@email.com', avatar: 'https://i.pravatar.cc/150?u=david' },
    reportedUser: { name: 'Sarah Wilson', email: 'sarahwilson@email.com', avatar: 'https://i.pravatar.cc/150?u=sarah', age: 22 },
    category: 'Impersonation',
    reports: 4,
    description: "Using another's identity.",
    status: 'Reviewing',
    submittedOn: 'Feb 20, 2026 • 01:00 PM'
  }
];

interface UserReportedTableProps {
  onViewDetail: (report: UserReportData) => void;
}

const UserReportedTable: React.FC<UserReportedTableProps> = ({ onViewDetail }) => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [repFilter, setRepFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const ColumnHeader = ({ label, width = "auto", grow = false }: { label: string, width?: string, grow?: boolean }) => (
    <div className={`flex flex-row items-center gap-2 px-4 h-[38px] group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
      <span className="text-white text-[12px] font-bold not-italic uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-sans not-italic">
        {label}
      </span>
      <img
        src="/assets/chevron_up_down.png"
        alt="Sort"
        style={{ width: '14px', height: '14px', opacity: 0.3, margin: '-4px 0px' }}
        className="shrink-0"
      />
    </div>
  );

  return (
    <div className="flex flex-col w-full max-w-[1520px] bg-[#222222] rounded-[16px] rounded-tl-none overflow-hidden border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
      {/* Filters Row */}
      <div className="flex flex-row items-center justify-between p-4 gap-4 bg-[#1a1a1a]/30">
        <SearchInput value={search} onChange={setSearch} />
        <div className="flex gap-4">
          <FilterSelect
            label="Category"
            value={catFilter}
            options={['Harassment', 'Spam', 'Nudity'].map(opt => ({ label: opt, value: opt }))}
            onChange={setCatFilter}
          />
          <FilterSelect
            label="Reports"
            value={repFilter}
            options={['1-2', '3-5', '5+'].map(opt => ({ label: opt, value: opt }))}
            onChange={setRepFilter}
          />
          <FilterSelect
            label="Status"
            value={statusFilter}
            options={['New', 'Pending', 'Reviewing', 'Resolved', 'Closed'].map(opt => ({ label: opt, value: opt }))}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Header Row */}
      <div className="flex flex-row items-center w-full border-b border-white/10 bg-[#1a1a1a]/50">
        <ColumnHeader label="Reported By" width="240px" />
        <ColumnHeader label="Reported User" width="240px" />
        <ColumnHeader label="Category" width="180px" />
        <ColumnHeader label="Reports" width="120px" />
        <ColumnHeader label="Description" grow />
        <ColumnHeader label="Status" width="120px" />
        <ColumnHeader label="Submitted On" width="200px" />
        <div className="w-[60px] shrink-0" />
      </div>

      <div className="flex flex-col min-h-[400px]">
        {MOCK_REPORTS.map((report) => (
          <UserReportedTableRow
            key={report.id}
            data={report}
            onAction={() => onViewDetail(report)}
          />
        ))}
        <div className="flex-grow bg-[#222222]" />
      </div>
    </div>
  );
};

export default UserReportedTable;
