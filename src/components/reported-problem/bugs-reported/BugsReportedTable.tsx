import React, { useState, useMemo, useEffect } from 'react';
import SearchInput from '@/components/app-content/shared/SearchInput';
import { Pagination, FilterSelect } from '@/components/shared/TableComponents';
import BugsReportedTableRow, { BugReportData } from './BugsReportedTableRow';
import { useBugsReports } from '@/services/reported-problems';

interface BugsReportedTableProps {
    onViewDetail: (bug: BugReportData) => void;
    canEdit?: boolean;
}

const BugsReportedTable: React.FC<BugsReportedTableProps> = ({ onViewDetail, canEdit = false }) => {
    const [search, setSearch] = useState('');
    const [issueTypeFilter, setIssueTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 100; // Fetch more for client-side pagination
    const { data: rawData, isLoading } = useBugsReports({
        page: 1, // Always fetch first 100
        limit,
        search: search || undefined,
        status: statusFilter || undefined,
        issueType: issueTypeFilter || undefined,
    });

    const reports = useMemo(() => rawData?.reports ?? [], [rawData]);

    // Standardized Runtime Pagination
    const ITEMS_PER_PAGE = 20;
    const totalPages = Math.max(1, Math.ceil(reports.length / ITEMS_PER_PAGE));
    const displayedBugs = useMemo(() => {
        return reports.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    }, [reports, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter, issueTypeFilter]);

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
        <div className="flex flex-col w-full bg-[#222222] rounded-[1.25vw] overflow-visible border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
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

            <div className="flex flex-col overflow-visible">
                {isLoading ? (
                    <div className="flex items-center justify-center py-[3vw] text-white/60 text-[0.83vw]">Loading...</div>
                ) : displayedBugs.length === 0 ? (
                    <div className="flex items-center justify-center py-[3vw] text-white/60 text-[0.83vw]">No reports found.</div>
                ) : (
                    displayedBugs.map((bug) => (
                        <BugsReportedTableRow key={bug.id} data={bug} onAction={(_action, b) => onViewDetail(b)} canEdit={canEdit} />
                    ))
                )}

                {/* Gap */}
                <div className="mt-auto w-full h-[2.5vw]" />

                {/* Pagination */}
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
    );
};

export default BugsReportedTable;
