import React, { useState } from 'react';
import SearchInput from '../shared/SearchInput';
import FilterSelect from '../shared/FilterSelect';
import UserTableRow, { UserRowData } from './UserTableRow';

const MOCK_USERS: UserRowData[] = [
  { id: '1', userId: 'U-00***24543', name: 'John Doe', email: 'johndoe@email.com', phone: '+1 416-883-2410', subscription: 'Premium', joinedOn: 'Dec 31, 2025 • 11:59 PM', lastActive: 'Dec 31, 2025 • 11:59 PM', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: '2', userId: 'U-00***24544', name: 'Jane Smith', email: 'janesmith@email.com', phone: '+1 415-874-3210', subscription: 'Free', joinedOn: 'Jan 15, 2026 • 10:00 AM', lastActive: 'Jan 15, 2026 • 10:00 AM', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { id: '3', userId: 'U-00***24545', name: 'Alice Johnson', email: 'alicej@email.com', phone: '+1 416-555-0199', subscription: 'Premium', joinedOn: 'Feb 28, 2026 • 02:00 PM', lastActive: 'Feb 28, 2026 • 02:00 PM', avatar: 'https://i.pravatar.cc/150?u=alice' },
  { id: '4', userId: 'U-00***24546', name: 'Bob Brown', email: 'bobbrown@email.com', phone: '+1 416-555-0132', subscription: 'Free', joinedOn: 'Mar 30, 2026 • 03:30 PM', lastActive: 'Mar 30, 2026 • 03:30 PM', avatar: 'https://i.pravatar.cc/150?u=bob' },
  { id: '5', userId: 'U-00***24547', name: 'Charlie White', email: 'charliew@email.com', phone: '+1 416-555-0177', subscription: 'Premium', joinedOn: 'Apr 20, 2026 • 09:15 AM', lastActive: 'Apr 20, 2026 • 09:15 AM', avatar: 'https://i.pravatar.cc/150?u=charlie' },
];

interface UserTableProps {
  onViewProfile: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ onViewProfile }) => {
  const [search, setSearch] = useState('');
  const [subFilter, setSubFilter] = useState('');

  const ColumnHeader = ({ label, width = "auto" }: { label: string; width?: string }) => (
    <div className={`flex flex-row items-center gap-2 px-4 h-[38px] group cursor-pointer shrink-0`} style={{ width }}>
      <span className="text-white text-[0.8vw] font-normal uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-inter whitespace-nowrap">
        {label}
      </span>
      <div className="flex flex-col opacity-20 group-hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Table Header Row: 88px */}
      <div className="flex flex-row items-center px-4 h-[88px] gap-[16px] bg-[#222222] border-b border-white/10 shrink-0">
        <SearchInput value={search} onChange={setSearch} placeholder="Search" width="412px" />
        <div className="flex-grow" />
        <div className="flex flex-row gap-[16px] items-center h-full">
           <FilterSelect label="Subscription" value={subFilter} options={['Free', 'Premium']} onChange={setSubFilter} width="200px" />
           <FilterSelect label="Joined Date Range" value="" options={['Today', 'Last 7 Days']} onChange={() => {}} width="200px" />
           <FilterSelect label="Last Active Date Range" value="" options={['Today', 'Last 7 Days']} onChange={() => {}} width="200px" />
        </div>
      </div>

      <div className="flex flex-row items-center w-full h-[38px] bg-[#1a1a1a]/50 border-b border-white/10 shrink-0">
        <ColumnHeader label="User ID" width="10%" />
        <ColumnHeader label="Name" width="18%" />
        <ColumnHeader label="Email" width="22%" />
        <ColumnHeader label="Phone" width="15%" />
        <ColumnHeader label="Subscription" width="10%" />
        <ColumnHeader label="Joined On" width="10%" />
        <ColumnHeader label="Last Active" width="11%" />
        <div className="w-[4%]" />
      </div>

      <div className="flex flex-col">
        {MOCK_USERS.map((user) => (
          <UserTableRow key={user.id} data={user} onViewProfile={onViewProfile} />
        ))}
      </div>
    </div>
  );
};

export default UserTable;