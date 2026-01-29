import React, { useState } from 'react';
import SearchInput from '../prompts/SearchInput';
import FilterSelect from '../prompts/FilterSelect';
import SystemLogsTableRow, { LogEntryData } from './SystemLogsTableRow';

const MOCK_LOGS: LogEntryData[] = [
  { id: '1', timestamp: 'Dec 31, 2025 • 11:59 PM', user: 'System', role: '—', action: 'Scheduled Backup', details: 'Daily database backup completed successfully.' },
  { id: '2', timestamp: 'Dec 31, 2025 • 11:59 PM', user: 'John Doe', role: 'Admin', action: 'User Suspension', details: 'Suspended account of user “matt.wilson@example.com” for policy violation.' },
  { id: '3', timestamp: 'Dec 31, 2025 • 11:59 PM', user: 'System', role: '—', action: 'Login Attempt', details: '3 failed login attempts detected from IP 172.16.8.44.' },
  { id: '4', timestamp: 'Dec 31, 2025 • 11:59 PM', user: 'Sarah Li', role: 'Moderator', action: 'Content Removal', details: 'Deleted image reported for inappropriate content.' },
  { id: '5', timestamp: 'Dec 31, 2025 • 11:59 PM', user: 'System', role: '—', action: 'Maintenance Mode', details: 'Platform entered maintenance mode for scheduled update.' },
  { id: '6', timestamp: 'Dec 31, 2025 • 11:59 PM', user: 'Sarah Li', role: 'Editor', action: 'FAQ Update', details: 'Updated “How to Join a Group” section in Help Center.' },
  { id: '7', timestamp: 'Jan 01, 2026 • 12:01 AM', user: 'System', role: '—', action: 'System Restart', details: 'Successfully restarted server after maintenance.' },
  { id: '8', timestamp: 'Jan 01, 2026 • 12:05 AM', user: 'John Doe', role: 'Admin', action: 'User Creation', details: 'Created new user account for “alice.johnson@example.com”.' },
];

const SystemLogsTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('Select');
  const [roleFilter, setRoleFilter] = useState('Select');
  const [actionFilter, setActionFilter] = useState('Select');

  const ColumnHeader = ({ label, width, sortable = true }: { label: string; width: string; sortable?: boolean }) => (
    <div className="flex flex-row items-center gap-2 px-3 h-[38px] group cursor-pointer shrink-0" style={{ width }}>
      <span className="text-white text-[0.63vw] font-normal font-['SF_Pro_Text'] whitespace-nowrap">
        {label}
      </span>
      {sortable && (
        <div className="flex flex-col opacity-[0.3] group-hover:opacity-100 transition-opacity shrink-0 space-y-[-4px]">
          <svg viewBox="0 0 14 14" className="w-[0.73vw] h-[0.73vw]" fill="currentColor"><path d="M7 4L3.5 7.5L7 11L10.5 7.5L7 4Z" transform="rotate(180 7 7.5)" /></svg>
          <svg viewBox="0 0 14 14" className="w-[0.73vw] h-[0.73vw]" fill="currentColor"><path d="M7 4L3.5 7.5L7 11L10.5 7.5L7 4Z" /></svg>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col w-full overflow-x-hidden font-['SF_Pro_Text']">
      <div className="flex flex-row items-center px-[0.83vw] py-[0.83vw] gap-[0.83vw] bg-[#222222] border-b border-white/10 shrink-0 h-[88px]">
        <div className="w-[21.6vw] h-[56px]">
          {/* Search Input width 412px approx 21.6vw (based on 1920) */}
          <SearchInput value={search} onChange={setSearch} placeholder="Search" />
        </div>
        <div className="flex-grow" />
        <div className="flex gap-[0.83vw]">
          <div className="w-[10.41vw]"><FilterSelect label="User / System" value={userFilter} options={['System', 'John Doe', 'Sarah Li']} onChange={setUserFilter} /></div>
          <div className="w-[10.41vw]"><FilterSelect label="Role" value={roleFilter} options={['Admin', 'Moderator', 'Editor', '—']} onChange={setRoleFilter} /></div>
          <div className="w-[10.41vw]"><FilterSelect label="Action" value={actionFilter} options={['Backup', 'Suspension', 'Login', 'Removal', 'Creation']} onChange={setActionFilter} /></div>
        </div>
      </div>

      <div className="flex flex-row items-center w-full h-[38px] bg-[#222222] border-b border-white/10 shrink-0">
        <ColumnHeader label="Timestamp" width="15%" />
        <ColumnHeader label="User / System" width="15%" />
        <ColumnHeader label="Role" width="15%" />
        <ColumnHeader label="Action" width="20%" />
        <ColumnHeader label="Details" width="35%" />
      </div>

      <div className="flex flex-col">
        {MOCK_LOGS.map((log) => (
          <SystemLogsTableRow key={log.id} data={log} />
        ))}
      </div>
    </div>
  );
};

export default SystemLogsTable;