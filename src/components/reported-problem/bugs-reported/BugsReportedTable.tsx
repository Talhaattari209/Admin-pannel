
import React, { useState } from 'react';
import SearchInput from '@/components/app-content/shared/SearchInput';
import { Pagination, FilterSelect } from '@/components/shared/TableComponents';
import BugsReportedTableRow, { BugReportData } from './BugsReportedTableRow';

const MOCK_BUGS: BugReportData[] = [
    {
        id: 'bug-1',
        reportedBy: { name: 'Amelia Young', email: 'ameliayoung@email.com', avatar: 'https://i.pravatar.cc/150?u=amelia' },
        subject: 'Performance Issue',
        message: 'App running slow on older devices.',
        status: 'New',
        submittedOn: 'Jan 11, 2026 • 11:59 PM',
        attachments: ['https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800']
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
    const [issueTypeFilter, setIssueTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const ColumnHeader = ({ label, grow = false, width = "auto" }: { label: string, grow?: boolean, width?: string }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
            <span className="text-[#AAAAAA]  not-italic font-medium not-italic text-[0.63vw] opacity-100 group-hover:text-white transition-opacity truncate">
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
        <div className="flex flex-col w-full bg-[#222222] rounded-[1.25vw] overflow-hidden border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-row items-center justify-between w-full h-[4.58vw] px-[0.83vw] bg-[#1C1C1E]">
                <SearchInput value={search} onChange={setSearch} />
                <div className="flex gap-[0.66vw]">
                    <FilterSelect
                        label="Issue Type"
                        value={issueTypeFilter}
                        options={['UI', 'Security', 'Performance', 'Functional'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setIssueTypeFilter}
                    />
                    <FilterSelect
                        label="Status"
                        value={statusFilter}
                        options={['New', 'Pending', 'Resolved', 'Closed'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setStatusFilter}
                    />
                </div>
            </div>

            <div className="flex flex-row items-center w-full h-[48px] bg-[#1C1C1E]">
                <ColumnHeader label="Reported By" width="16.66vw" />
                <ColumnHeader label="Subject" width="13.88vw" />
                <ColumnHeader label="Message" grow />
                <ColumnHeader label="Status" width="8.33vw" />
                <ColumnHeader label="Submitted On" width="13.88vw" />
                <div className="w-[4.16vw] shrink-0" />
            </div>

            <div className="flex flex-col flex-grow h-full min-h-[400px]">
                {MOCK_BUGS.map((bug) => (
                    <BugsReportedTableRow key={bug.id} data={bug} onAction={() => onViewDetail(bug)} />
                ))}

                {/* Gap */}
                <div className="mt-auto w-full h-[2.60vw]" />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    className="w-full px-[1.25vw] pb-[1.25vw]"
                />
            </div>
        </div>
    );
};

export default BugsReportedTable;
