
import React, { useState } from 'react';
import SearchInput from '@/components/app-content/shared/SearchInput';
import FilterSelect from '@/components/app-content/shared/FilterSelect';
import UserReportedTableRow, { UserReportData } from './UserReportedTableRow';
import { Pagination } from '@/components/shared/TableComponents';

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
    const [currentPage, setCurrentPage] = useState(1);

    const ColumnHeader = ({ label, width = "auto", grow = false }: { label: string, width?: string, grow?: boolean }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
            <span className="text-[#AAAAAA] font-['SF_Pro_Text'] not-italic font-medium not-italic text-[0.63vw] opacity-100 group-hover:text-white transition-opacity truncate">
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
        <div className="flex flex-col w-full h-full bg-[#222222] rounded-[1.25vw] overflow-hidden border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-row items-center justify-between w-full h-[4.58vw] px-[0.83vw] bg-[#1C1C1E]">
                <SearchInput value={search} onChange={setSearch} />
                <div className="flex gap-[0.66vw]">
                    <FilterSelect label="Reports" value={repFilter} options={['10+', '5-10', '1-5']} onChange={setRepFilter} />
                    <FilterSelect label="Category" value={catFilter} options={['Inappropriate', 'Spam', 'Harassment']} onChange={setCatFilter} />
                    <FilterSelect label="Status" value={statusFilter} options={['New', 'Pending', 'Resolved', 'Dismissed']} onChange={setStatusFilter} />
                </div>
            </div>

            <div className="flex flex-row items-center w-full h-[48px] bg-[#1C1C1E] shrink-0">
                <ColumnHeader label="Reported By" width="12.5vw" />
                <ColumnHeader label="Reported User" width="12.5vw" />
                <ColumnHeader label="Category" width="9.38vw" />
                <ColumnHeader label="Reports" width="6.25vw" />
                <ColumnHeader label="Description" grow />
                <ColumnHeader label="Status" width="6.25vw" />
                <ColumnHeader label="Submitted On" width="10.42vw" />
                <div className="w-[2.5vw] shrink-0" />
            </div>

            <div className="flex flex-col flex-grow h-full overflow-hidden">
                <div className="flex flex-col flex-grow overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {MOCK_REPORTS.map((report) => (
                        <UserReportedTableRow key={report.id} data={report} onAction={() => onViewDetail(report)} />
                    ))}
                </div>

                {/* Gap */}
                <div className="w-full h-[2.60vw] mt-auto shrink-0" />

                {/* Pagination */}
                <div className="shrink-0">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                        className="w-full px-[1.25vw] pb-[1.25vw]"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserReportedTable;
