import React, { useState, useMemo } from 'react';
import SearchInput from '../app-content/shared/SearchInput';
import SystemLogsTableRow from './SystemLogsTableRow';
import { TableFrame, Pagination, FilterSelect } from '@/components/shared/TableComponents';
import { useSystemLogs, useSystemLogFilters } from '@/services/system-logs';

const SystemLogsTable: React.FC = () => {
    const [search, setSearch] = useState('');
    const [userFilter, setUserFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [actionFilter, setActionFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    // Fetch Filters
    const { data: filters, isLoading: isLoadingFilters } = useSystemLogFilters();

    // Fetch Logs
    const { data: logsData, isLoading: isLoadingLogs } = useSystemLogs({
        page: currentPage,
        limit,
        search: search || undefined,
        userOrSystem: userFilter || undefined,
        role: roleFilter || undefined,
        action: actionFilter || undefined,
    });

    const ColumnHeader = ({ label, width, sortable = true }: { label: string; width: string; sortable?: boolean }) => (
        <div className="flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer shrink-0" style={{ width }}>
            <span className="text-[#AAAAAA] font-sans not-italic font-medium text-[0.63vw] opacity-100 group-hover:text-white transition-opacity whitespace-nowrap">
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

    const formattedLogs = useMemo(() => {
        if (!logsData?.logs) return [];
        return logsData.logs.map(log => ({
            id: log._id,
            timestamp: new Date(log.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', ' •'),
            user: log.userOrSystem,
            role: log.role || '—',
            action: log.action,
            details: log.details
        }));
    }, [logsData]);

    return (
        <TableFrame
            searchBar={<SearchInput value={search} onChange={(val) => { setSearch(val); setCurrentPage(1); }} placeholder="Search" />}
            filterBar={
                <>
                    <FilterSelect
                        label="User / System"
                        value={userFilter}
                        options={(filters?.userOrSystem || []).map(opt => ({ label: opt, value: opt }))}
                        onChange={(val) => { setUserFilter(val); setCurrentPage(1); }}
                    />
                    <FilterSelect
                        label="Role"
                        value={roleFilter}
                        options={(filters?.role || []).map(opt => ({ label: opt, value: opt }))}
                        onChange={(val) => { setRoleFilter(val); setCurrentPage(1); }}
                    />
                    <FilterSelect
                        label="Action"
                        value={actionFilter}
                        options={(filters?.action || []).map(opt => ({ label: opt, value: opt }))}
                        onChange={(val) => { setActionFilter(val); setCurrentPage(1); }}
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

            <div className="flex flex-col min-h-[10vw]">
                {isLoadingLogs ? (
                    <div className="flex items-center justify-center w-full py-[5vw] text-[#AAAAAA] text-[0.83vw]">
                        Loading logs...
                    </div>
                ) : formattedLogs.length > 0 ? (
                    formattedLogs.map((log) => (
                        <SystemLogsTableRow key={log.id} data={log} />
                    ))
                ) : (
                    <div className="flex items-center justify-center w-full py-[5vw] text-[#AAAAAA] text-[0.83vw]">
                        No logs found.
                    </div>
                )}
            </div>

            {/* Gap */}
            <div className="w-full h-[2.5vw]" />

            {/* Pagination */}
            {logsData && logsData.pagination.totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={logsData.pagination.totalPages}
                    onPageChange={setCurrentPage}
                    className="w-full px-[1.25vw] pb-[1.25vw]"
                />
            )}
        </TableFrame>
    );
};

export default SystemLogsTable;

