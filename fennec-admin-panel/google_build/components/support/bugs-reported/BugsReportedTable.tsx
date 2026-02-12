
import React, { useState } from 'react';
import SearchInput from '../../prompts/SearchInput';
import FilterSelect from '../../prompts/FilterSelect';
import BugsReportedTableRow, { BugReportData } from './BugsReportedTableRow';

const MOCK_BUGS: BugReportData[] = [
  { 
    id: 'bug-1', 
    reportedBy: { name: 'Amelia Young', email: 'ameliayoung@email.com', avatar: 'https://i.pravatar.cc/150?u=amelia' },
    subject: 'Performance Issue',
    message: 'App running slow on older devices.',
    status: 'New',
    submittedOn: 'Jan 11, 2026 • 11:59 PM',
    attachments: ['https://picsum.photos/320/320?random=1']
  },
  { 
    id: 'bug-2', 
    reportedBy: { name: 'Lucas Walker', email: 'lucaswalker@email.com', avatar: 'https://i.pravatar.cc/150?u=lucas2' },
    subject: 'Login loop',
    message: 'Stuck in login screen after verification.',
    status: 'Pending',
    submittedOn: 'Jan 12, 2026 • 10:20 AM'
  }
];

interface BugsReportedTableProps {
  onViewDetail: (bug: BugReportData) => void;
}

const BugsReportedTable: React.FC<BugsReportedTableProps> = ({ onViewDetail }) => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Select');
  const [statusFilter, setStatusFilter] = useState('Select');

  const ColumnHeader = ({ label, grow = false, width = "auto" }: { label: string, grow?: boolean, width?: string }) => (
    <div className={`flex flex-row items-center gap-2 px-4 h-[38px] group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
      <span className="text-white text-[12px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
          <FilterSelect label="Category" value={catFilter} options={['UI', 'Security', 'Performance']} onChange={setCatFilter} />
          <FilterSelect label="Status" value={statusFilter} options={['New', 'Pending', 'Resolved', 'Closed']} onChange={setStatusFilter} />
        </div>
      </div>

      <div className="flex flex-row items-center w-full border-b border-white/10 bg-[#1a1a1a]/50">
        <ColumnHeader label="Reported By" width="240px" />
        <ColumnHeader label="Subject" width="200px" />
        <ColumnHeader label="Message" grow />
        <ColumnHeader label="Status" width="120px" />
        <ColumnHeader label="Submitted On" width="200px" />
        <div className="w-[60px] shrink-0" />
      </div>

      <div className="flex flex-col min-h-[400px]">
        {MOCK_BUGS.map((bug) => (
          <BugsReportedTableRow key={bug.id} data={bug} onAction={() => onViewDetail(bug)} />
        ))}
        <div className="flex-grow bg-[#222222]" />
      </div>
    </div>
  );
};

export default BugsReportedTable;
