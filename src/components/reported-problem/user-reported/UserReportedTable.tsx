import React, { useState, useMemo, useEffect } from 'react';
import SearchInput from '@/components/app-content/shared/SearchInput';
import { Pagination, FilterSelect } from '@/components/shared/TableComponents';
import UserReportedTableRow, { UserReportData } from './UserReportedTableRow';
import { useUserReports } from '@/services/reported-problems';

interface UserReportedTableProps {
    onViewDetail: (report: UserReportData) => void;
}

const UserReportedTable: React.FC<UserReportedTableProps> = ({ onViewDetail }) => {
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('');
    const [repFilter, setRepFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 100; // Fetch more for client-side pagination
    const { data: rawData, isLoading } = useUserReports({
        page: 1, // Always fetch first 100
        limit,
        search: search || undefined,
        status: statusFilter || undefined,
        category: catFilter || undefined,
    });

    const reports = useMemo(() => rawData?.reports ?? [], [rawData]);

    // Standardized Runtime Pagination
    const ITEMS_PER_PAGE = 20;
    const totalPages = Math.max(1, Math.ceil(reports.length / ITEMS_PER_PAGE));
    const displayedReports = useMemo(() => {
        return reports.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    }, [reports, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter, catFilter, repFilter]);

    const ColumnHeader = ({ label, width = "auto", grow = false }: { label: string, width?: string, grow?: boolean }) => (
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
        <div className="flex flex-col w-full h-full bg-[#222222] rounded-[1.25vw] overflow-visible border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-row items-center justify-between w-full h-[4.58vw] px-[0.83vw] bg-[#1C1C1E]">
                <SearchInput value={search} onChange={setSearch} />
                <div className="flex gap-[0.66vw]">
                    <FilterSelect
                        label="Reports"
                        value={repFilter}
                        options={['10+', '5-10', '1-5'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setRepFilter}
                    />
                    <FilterSelect
                        label="Category"
                        value={catFilter}
                        options={['Inappropriate', 'Spam', 'Harassment'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setCatFilter}
                    />
                    <FilterSelect
                        label="Status"
                        value={statusFilter}
                        options={['New', 'Pending', 'Resolved', 'Dismissed'].map(opt => ({ label: opt, value: opt }))}
                        onChange={setStatusFilter}
                    />
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

            <div className="flex flex-col flex-grow h-full overflow-visible">
                <div className="flex flex-col flex-grow overflow-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-[3vw] text-white/60 text-[0.83vw]">Loading...</div>
                    ) : displayedReports.length === 0 ? (
                        <div className="flex items-center justify-center py-[3vw] text-white/60 text-[0.83vw]">No reports found.</div>
                    ) : (
                        displayedReports.map((report) => (
                            <UserReportedTableRow key={report.id} data={report} onAction={(_action, r) => onViewDetail(r)} />
                        ))
                    )}
                </div>

                {/* Gap */}
                <div className="w-full h-[2.60vw] mt-auto shrink-0" />

                {/* Pagination */}
                <div className="shrink-0">
                    {reports.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            className="w-full px-[1.25vw] pb-[1.25vw]"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserReportedTable;
