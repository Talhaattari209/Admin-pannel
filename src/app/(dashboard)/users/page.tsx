'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/Headers';
import { SearchBar, Pagination, FilterSelect } from '@/components/shared/TableComponents';
import { ArrowUp, ArrowDown, ChevronDown, MoreVertical, Eye, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { useUsers, useUserStatistics, useExportUsers } from '@/services/users';
import { downloadFileFromUrl } from '@/utils/download';
import ExportModal from '@/components/shared/ExportModal';
import { User } from '@/types/api';
import { useAuthStore } from '@/store/auth-store';
import { canDeleteModule } from '@/utils/permissions';
import DeactivationCard from '@/components/pop-cards/DeactivationCard';
import { useDeactivateUser } from '@/services/users';

// --- Stat Cards Components ---

interface StatCardProps {
    label: string;
    value: string;
    change: string;
    isUp?: boolean;
}

const StatCard = ({ label, value, change, isUp = true }: StatCardProps) => {
    return (
        <div className="flex flex-col justify-end items-start p-[0.6vw] gap-[0.6vw] w-full h-[4.54vw] bg-[rgba(22,0,63,0.5)] border border-[rgba(102,102,102,0.5)] backdrop-blur-[12px] rounded-[0.83vw] ">

            {/* Label */}
            <h6 className="w-full text-[#CCCCCC] font-bold not-italic text-[0.83vw] leading-[120%] tracking-[-0.04em] flex items-center">
                {label}
            </h6>

            {/* Value and Change Row */}
            <div className="flex flex-row justify-end items-center w-full h-[1.77vw]">
                {/* Main Number */}
                <span className="flex-grow text-white font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em]">
                    {value}
                </span>

                {/* Change Indicator */}
                <div className="flex items-center gap-[0.42vw]">
                    <div className={cn(
                        "relative w-[1.25vw] h-[1.25vw]",
                        !isUp && "rotate-180"
                    )}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071C19.3166 13.0976 18.6834 13.0976 18.2929 12.7071L13 7.41421V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V7.41422L5.70711 12.7071C5.31658 13.0976 4.68342 13.0976 4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4Z" fill={isUp ? "#3ADC60" : "#FF4D4F"} />
                        </svg>
                    </div>
                    <span className={cn(
                        "font-bold not-italic text-[1.04vw] leading-[120%] tracking-[-0.04em]",
                        isUp ? "text-[#3ADC60]" : "text-[#FF4D4F]"
                    )}>
                        {change}
                    </span>
                </div>
            </div>
        </div>
    );
};

const StatRow = () => {
    const { data: statistics, isLoading } = useUserStatistics();

    const stats = [
        { label: "Total Users", value: (statistics?.totalUsers ?? 0).toLocaleString(), change: "12" },
        { label: "Active This Week", value: (statistics?.activeThisWeek ?? 0).toLocaleString(), change: "12", isUp: false },
        { label: "Pending KYC", value: (statistics?.pendingKYC ?? 0).toLocaleString(), change: "12" },
        { label: "Suspended Accounts", value: (statistics?.suspendedAccounts ?? 0).toLocaleString(), change: "12", isUp: false },
        { label: "Verified Accounts", value: (statistics?.verifiedAccounts ?? 0).toLocaleString(), change: "12" },
        { label: "Premium Subscribers", value: (statistics?.premiumSubscriptions ?? 0).toLocaleString(), change: "12", isUp: false },
    ];

    if (isLoading) {
        return (
            <div className="flex flex-wrap items-center gap-[0.83vw] w-full min-h-[4.54vw]">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex-1 h-[4.54vw] bg-[rgba(22,0,63,0.5)] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-[0.83vw] w-full min-h-[4.54vw]">
            {stats.map((stat, index) => (
                <div key={index} className="flex-1">
                    <StatCard {...stat} />
                </div>
            ))}
        </div>
    );
};

const SortIcon = () => (
    <img src="/assets/chevron_up_down.png" alt="Sort" style={{ width: '14px', height: '14px', margin: '-4px 0px' }} className="shrink-0 opacity-100" />
);

const UserActionContext = React.createContext<{ onDeactivate: (id: string) => void }>({ onDeactivate: () => { } });
const useUserActions = () => React.useContext(UserActionContext);

const RowActions = ({ userId }: { userId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { onDeactivate } = useUserActions();
    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
    const canDeactivate = isSuperAdmin || canDeleteModule(permissions, 'users management');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center text-white hover:text-white/80 transition-colors cursor-pointer">
                <MoreVertical className="w-[0.83vw] h-[0.83vw]" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-[0.42vw] w-[12.5vw] bg-[#222222] backdrop-blur-[12px] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] z-50 py-[0.42vw] shadow-2xl animate-in fade-in zoom-in duration-150 flex flex-col">
                    <button onClick={() => router.push(`/users/profile`)} className="flex items-center justify-between w-full h-[2.19vw] px-[0.63vw] hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-[0.83vw]">
                            <Eye className="w-[0.83vw] h-[0.83vw] text-white" />
                            <span className="font-normal text-[0.73vw] leading-[0.94vw] text-white whitespace-nowrap">View Details</span>
                        </div>
                        <ChevronRight className="w-[0.83vw] h-[0.83vw] text-white" />
                    </button>

                    {canDeactivate && (
                        <button onClick={() => { setIsOpen(false); onDeactivate(userId); }} className="flex items-center justify-between w-full h-[2.19vw] px-[0.63vw] hover:bg-[#FF4E4E]/10 transition-colors">
                            <div className="flex items-center gap-[0.83vw]">
                                <img src="/assets/slash-Deactivate.svg" alt="Deactivate" className="w-[0.83vw] h-[0.83vw]" />
                                <span className="font-normal text-[0.73vw] leading-[0.94vw] text-[#FF4E4E] whitespace-nowrap">Deactivate User</span>
                            </div>
                            <ChevronRight className="w-[0.83vw] h-[0.83vw] text-[#FF4E4E]" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const UserTableRow = ({ user }: { user: User }) => {
    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    return (
        <div className="flex flex-row items-center w-full h-[2.92vw] border-b border-[rgba(102,102,102,0.5)] bg-[#222222] hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center px-[0.63vw] w-[6.77vw] h-full shrink-0">
                <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap">{user.id ? user.id.substring(0, 8) : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] h-full shrink-0">
                <div className="w-[1.875vw] h-[1.875vw] rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('/8.png')" }} />
                <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap">{user.first_name} {user.last_name}</span>
            </div>
            <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
                <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap overflow-hidden text-ellipsis">{user.email}</span>
            </div>
            <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
                <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap">{user.phone || 'N/A'}</span>
            </div>
            <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
                <div className={`flex items-center justify-center gap-[0.52vw] w-[4.32vw] h-[1.67vw] rounded-[0.83vw] ${user.status === 'premium' ? 'bg-[#3ADC60]' : 'bg-[#5F00DB]'}`}>
                    <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap capitalize">{user.status || 'Free'}</span>
                </div>
            </div>
            <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
                <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap">{formatDate(user.created_at)}</span>
            </div>
            <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
                <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap">{formatDate(user.last_active)}</span>
            </div>
            <div className="flex justify-center items-center w-[2.5vw] h-full shrink-0">
                <RowActions userId={user.id} />
            </div>
        </div>
    );
};

const UserTableSection = () => {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [subFilter, setSubFilter] = useState('');
    const [joinedFilter, setJoinedFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState('');

    // Debounce search to avoid firing API calls on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('[Users Page] Setting debounced search:', searchValue);
            setDebouncedSearch(searchValue);
            setCurrentPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchValue]);

    const { data, isLoading, error } = useUsers({ page: currentPage, limit: 10, search: debouncedSearch || undefined });

    const filteredUsers = useMemo(() => {
        if (!data?.data) return [];
        return data.data.filter((user: User) => {
            // Subscription filter
            if (subFilter) {
                if (!user.status) return false;
                if (user.status.toLowerCase() !== subFilter.toLowerCase()) return false;
            }
            if (joinedFilter) {
                if (!user.created_at) return false;
                const joinedDate = new Date(user.created_at);
                const now = new Date();
                if (joinedFilter === 'this-week') {
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    if (joinedDate < weekAgo) return false;
                } else if (joinedFilter === 'this-month') {
                    if (joinedDate.getMonth() !== now.getMonth() || joinedDate.getFullYear() !== now.getFullYear()) return false;
                }
            }
            if (activeFilter) {
                if (!user.last_active) return false;
                const lastActive = new Date(user.last_active);
                const now = new Date();
                if (activeFilter === 'today') {
                    if (lastActive.toDateString() !== now.toDateString()) return false;
                } else if (activeFilter === '7-days') {
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    if (lastActive < weekAgo) return false;
                }
            }
            return true;
        });
    }, [data?.data, subFilter, joinedFilter, activeFilter]);

    const totalPages = data?.pages || 1;

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full h-[4.58vw] bg-[#1C1C1E] rounded-t-[0.83vw] px-[0.83vw]">
                <SearchBar value={searchValue} onChange={setSearchValue} className="!bg-[#111111]/50 !border-[#666666]/50 !w-[17.16vw] !h-[2.92vw] !p-[0.66vw] !rounded-[0.66vw] !gap-[0.66vw]" />
                <div className="flex flex-row items-center gap-[0.66vw]">
                    <div className="w-[10.1vw] h-[2.92vw] relative">
                        <FilterSelect label="Subscription" value={subFilter} options={[{ label: 'Premium', value: 'premium' }, { label: 'Free', value: 'free' }]} onChange={setSubFilter} />
                    </div>
                    <div className="w-[10.1vw] h-[2.92vw] relative">
                        <FilterSelect label="Joined Date Range" value={joinedFilter} options={[{ label: 'This Week', value: 'this-week' }, { label: 'This Month', value: 'this-month' }]} onChange={setJoinedFilter} />
                    </div>
                    <div className="w-[10.1vw] h-[2.92vw] relative">
                        <FilterSelect label="Last Active" value={activeFilter} options={[{ label: 'Today', value: 'today' }, { label: '7 Days', value: '7-days' }]} onChange={setActiveFilter} />
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center w-full h-[48px] bg-[#1C1C1E] border-b border-[#333333] mt-0">
                {[['User ID', '6.77vw'], ['Name', '11.65vw'], ['Email', '11.65vw'], ['Phone', '11.65vw'], ['Subscription', '11.65vw'], ['Joined On', '11.65vw'], ['Last Active', '11.65vw']].map(([label, width]) => (
                    <div key={label} className={`flex items-center gap-[8px] px-[12px] w-[${width}] shrink-0 group cursor-pointer`}>
                        <span className="text-[#AAAAAA] font-sans not-italic font-medium text-[12px]">{label}</span>
                        <SortIcon />
                    </div>
                ))}
                <div className="w-[2.5vw] shrink-0" />
            </div>

            <div className="flex flex-col w-full bg-[#222222] rounded-b-[0.83vw] overflow-hidden pb-[1.25vw]">
                <div className="flex flex-col w-full">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={`user-skeleton-${i}`} className="flex flex-row items-center w-full h-[2.92vw] border-b border-[rgba(102,102,102,0.5)] bg-[#222222] animate-pulse">
                                <div className="mx-[0.63vw] w-[6vw] h-[0.83vw] bg-white/10 rounded" />
                                <div className="mx-[0.63vw] w-[10vw] h-[0.83vw] bg-white/10 rounded" />
                                <div className="mx-[0.63vw] w-[10vw] h-[0.83vw] bg-white/10 rounded" />
                                <div className="mx-[0.63vw] w-[10vw] h-[0.83vw] bg-white/10 rounded" />
                                <div className="mx-[0.63vw] w-[4vw] h-[0.83vw] bg-white/10 rounded" />
                                <div className="mx-[0.63vw] w-[10vw] h-[0.83vw] bg-white/10 rounded" />
                                <div className="mx-[0.63vw] w-[10vw] h-[0.83vw] bg-white/10 rounded" />
                            </div>
                        ))
                    ) : error ? (
                        <div className="flex items-center justify-center w-full h-[20vw] text-red-400">
                            <p>Error loading users. Please try again later.</p>
                        </div>
                    ) : filteredUsers && filteredUsers.length > 0 ? (
                        filteredUsers.map((user: User, index: number) => (
                            <UserTableRow key={user.id || `user-${index}`} user={user} />
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full h-[20vw] text-white/50">
                            <p>No users found</p>
                        </div>
                    )}
                </div>

                <div className="w-full h-[2.60vw]" />

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="w-full px-[1.25vw]" />
            </div>
        </div>
    );
};

export default function UserManagementPage() {
    const [selectedUserForDeactivation, setSelectedUserForDeactivation] = useState<string | null>(null);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const deactivateUserMutation = useDeactivateUser();
    const exportUsersMutation = useExportUsers();

    const handleExportDownload = (config: { format: string; activeFilter: string; startDate: string; endDate: string }) => {
        const timelaps = config.activeFilter === 'All Time' ? 'allTime' :
            config.activeFilter === 'Last 7 days' ? 'last7days' :
                config.activeFilter === 'This Month' ? 'thisMonth' :
                    config.activeFilter === 'Last Month' ? 'lastMonth' :
                        config.activeFilter === 'Last 3 Months' ? 'last3Months' :
                            config.activeFilter === 'Last 6 Months' ? 'last6Months' :
                                config.activeFilter === 'This Year' ? 'thisYear' :
                                    config.activeFilter === 'Last Year' ? 'lastYear' : 'allTime';

        const format = config.format.toLowerCase() === 'json' ? 'json' : 'csv';
        const params = { format, timelaps, startDate: config.startDate, endDate: config.endDate };

        exportUsersMutation.mutate(params, {
            onSuccess: (data) => {
                if (data?.fileUrl) {
                    const dateStr = new Date().toISOString().split('T')[0];
                    downloadFileFromUrl(data.fileUrl, `users-export-${dateStr}.${format}`);
                }
                setIsExportModalOpen(false);
            },
        });
    };

    return (
        <UserActionContext.Provider value={{ onDeactivate: (id) => setSelectedUserForDeactivation(id) }}>
            <div className="flex flex-col items-start w-full max-w-[83.33vw]"
                style={{ paddingLeft: '2.08vw', paddingTop: '1.77vw', paddingBottom: '2.08vw', paddingRight: '2.08vw' }}
            >
                <div className="w-[79.17vw] flex items-center justify-between">
                    <PageHeader title="Users Management" description="View, verify, and manage all registered users — including KYC status, bans, and account details." />
                    <button
                        onClick={() => setIsExportModalOpen(true)}
                        className="flex items-center justify-center gap-[0.62vw] px-[1.25vw] py-[0.41vw] rounded-full border border-white backdrop-blur-[6px] cursor-pointer hover:bg-white/10 transition-all shrink-0"
                    >
                        <img src="/assets/Icons_figma/download.svg" alt="Export" className="w-[1.25vw] h-[1.25vw]" />
                        <span className="text-white text-[0.83vw] font-medium leading-[120%]">{exportUsersMutation.isPending ? 'Exporting...' : 'Export'}</span>
                    </button>
                </div>
                <div className="h-[1.49vw]" />
                <StatRow />
                <div className="h-[1.25vw]" />
                <UserTableSection />
            </div>

            {selectedUserForDeactivation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <DeactivationCard
                        onCancel={() => setSelectedUserForDeactivation(null)}
                        onDeactivate={() => {
                            if (selectedUserForDeactivation) {
                                deactivateUserMutation.mutate(selectedUserForDeactivation, {
                                    onSuccess: () => setSelectedUserForDeactivation(null)
                                });
                            }
                        }}
                    />
                </div>
            )}

            {isExportModalOpen && (
                <ExportModal
                    onCancel={() => setIsExportModalOpen(false)}
                    onDownload={handleExportDownload}
                />
            )}
        </UserActionContext.Provider>
    );
}
