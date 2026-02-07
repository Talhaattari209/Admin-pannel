import React, { useState } from 'react';
import Link from 'next/link';
import SearchInput from '../app-content/shared/SearchInput';
// import FilterSelect from '../app-content/shared/FilterSelect'; // Removed
import SystemLogsTableRow, { LogEntryData } from './SystemLogsTableRow';
import { TableFrame, Pagination, FilterSelect } from '@/components/shared/TableComponents'; // Updated import

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
    const [userFilter, setUserFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [actionFilter, setActionFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const ColumnHeader = ({ label, width, sortable = true }: { label: string; width: string; sortable?: boolean }) => (
        <div className="flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer shrink-0" style={{ width }}>
            <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[0.63vw] opacity-100 group-hover:text-white transition-opacity whitespace-nowrap">
                {label}
            </span>
            {sortable && (
                <img
                    src="/assets/chevron_up_down.png"
                    alt="Sort"
                    style={{ width: '0.73vw', height: '0.73vw', margin: '-0.21vw 0px' }}
                    className="shrink-0 opacity-100"
                />
            )}
        </div>
    );

    return (
        <TableFrame
            searchBar={<SearchInput value={search} onChange={setSearch} placeholder="Search" />}
            filterBar={
                <>
                    <FilterSelect
                        label="User / System"
                        value={userFilter}
                        options={['System', 'John Doe', 'Sarah Li'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setUserFilter}
                    />
                    <FilterSelect
                        label="Role"
                        value={roleFilter}
                        options={['Admin', 'Moderator', 'Editor', '—'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setRoleFilter}
                    />
                    <FilterSelect
                        label="Action"
                        value={actionFilter}
                        options={['Backup', 'Suspension', 'Login', 'Removal', 'Creation'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setActionFilter}
                    />
                </>
            }
            className="w-full h-full font-sans not-italic"
            hideHeaderBorder={true}
        >
            <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1C1C1E] shrink-0">
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

            {/* Gap */}
            <div className="w-full h-[2.60vw]" />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                className="w-full px-[1.25vw] pb-[1.25vw]"
            />
        </TableFrame>
    );
};

export default SystemLogsTable;
