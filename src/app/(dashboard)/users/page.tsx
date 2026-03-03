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
import CustomCalendar from '@/components/shared/CustomCalendar';

// Helper for date display format
const fmtDisplay = (dateStr: string) => {
    if (!dateStr) return '—';
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
};

// ─── Date Range Filter (mimics FilterSelect style) ──────────────────────────
const ChevronDownIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface DateRangeFilterSelectProps {
    label: string;
    startDate: string;
    endDate: string;
    onStartChange: (v: string) => void;
    onEndChange: (v: string) => void;
    onClear: () => void;
    align?: 'left' | 'right';
}

const DateRangeFilterSelect: React.FC<DateRangeFilterSelectProps> = ({
    label, startDate, endDate, onStartChange, onEndChange, onClear, align = 'left'
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [calendarOpen, setCalendarOpen] = React.useState<'start' | 'end' | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setCalendarOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasValue = !!(startDate || endDate);
    const displayText = hasValue
        ? `${startDate || '—'}  to  ${endDate || '—'}`
        : 'All';

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-start relative"
            style={{ width: '10.1vw', height: '2.92vw', padding: 0 }}
        >
            {/* Label */}
            <div className="flex flex-row items-start self-stretch" style={{ gap: '0.21vw', height: '0.66vw' }}>
                <span className="font-sans font-bold not-italic" style={{ height: '0.66vw', fontSize: '0.70vw', lineHeight: '0.66vw' }}>
                    {label}
                </span>
            </div>

            {/* Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-row items-center border-b border-white box-border relative cursor-pointer"
                style={{ width: '100%', height: '2.26vw', minHeight: '2.26vw', padding: 0, gap: '0.66vw' }}
            >
                <span
                    className="flex-grow min-w-0 truncate pointer-events-none font-sans not-italic font-normal text-white"
                    style={{ fontSize: '0.86vw', lineHeight: '1vw', opacity: hasValue ? 1 : 0.4, zIndex: 1 }}
                >
                    {displayText}
                </span>
                {hasValue && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onClear(); }}
                        className="text-white/40 hover:text-white text-[0.7vw] leading-none cursor-pointer shrink-0"
                        style={{ zIndex: 2 }}
                    >✕</button>
                )}
                <div style={{ width: '1vw', height: '1vw', flexShrink: 0, pointerEvents: 'none', zIndex: 1 }}>
                    <ChevronDownIcon />
                </div>

                {/* Dropdown Panel */}
                {isOpen && (
                    <div
                        className={cn(
                            "absolute bg-[#1C1C1E] border border-[#333333] z-50 shadow-xl",
                            align === 'right' ? "right-0" : "left-0"
                        )}
                        style={{ top: '100%', marginTop: '0.2vw', borderRadius: '0.66vw', width: '15vw', padding: '0.83vw' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Start Date */}
                        <div className="flex flex-col gap-[0.21vw] mb-[0.63vw] relative">
                            <span className="text-white/60 font-sans" style={{ fontSize: '0.63vw' }}>Start Date</span>
                            <div className="box-border flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-full h-[2.5vw] min-h-[2.5vw] border-b border-white/20 relative">
                                <span className="flex-grow font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white flex items-center">
                                    {fmtDisplay(startDate)}
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setCalendarOpen(calendarOpen === 'start' ? null : 'start'); }}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                >
                                    <svg viewBox="0 0 24 24" className="w-[1vw] h-[1vw] text-white/60" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </button>
                            </div>
                            {calendarOpen === 'start' && (
                                <CustomCalendar
                                    selectedDate={startDate}
                                    onSelect={(date) => { onStartChange(date); setCalendarOpen(null); }}
                                    onClose={() => setCalendarOpen(null)}
                                    className={cn("top-[3vw] mt-2", align === 'right' ? "right-0" : "left-0")}
                                />
                            )}
                        </div>
                        {/* End Date */}
                        <div className="flex flex-col gap-[0.21vw] relative">
                            <span className="text-white/60 font-sans" style={{ fontSize: '0.63vw' }}>End Date</span>
                            <div className="box-border flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-full h-[2.5vw] min-h-[2.5vw] border-b border-white/20 relative">
                                <span className="flex-grow font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white flex items-center">
                                    {fmtDisplay(endDate)}
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setCalendarOpen(calendarOpen === 'end' ? null : 'end'); }}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                >
                                    <svg viewBox="0 0 24 24" className="w-[1vw] h-[1vw] text-white/60" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </button>
                            </div>
                            {calendarOpen === 'end' && (
                                <CustomCalendar
                                    selectedDate={endDate}
                                    onSelect={(date) => { onEndChange(date); setCalendarOpen(null); }}
                                    onClose={() => setCalendarOpen(null)}
                                    className={cn("top-[3vw] mt-2", align === 'right' ? "right-0" : "left-0")}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
// ─────────────────────────────────────────────────────────────────────────────



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
        { label: "Pending KYC", value: (statistics?.pendingKyc ?? 0).toLocaleString(), change: "12" },
        { label: "Suspended Accounts", value: (statistics?.suspendedAccounts ?? 0).toLocaleString(), change: "12", isUp: false },
        { label: "Verified Accounts", value: (statistics?.verifiedAccounts ?? 0).toLocaleString(), change: "12" },
        { label: "Premium Subscribers", value: (statistics?.premiumSubscription ?? 0).toLocaleString(), change: "12", isUp: false },
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
                    <button onClick={() => router.push(`/users/profile?id=${userId}`)} className="flex items-center justify-between w-full h-[2.19vw] px-[0.63vw] hover:bg-white/10 transition-colors">
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
            <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[12.15vw] h-full shrink-0">
                <div className="w-[1.875vw] h-[1.875vw] rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('/8.png')" }} />
                <span className="text-white font-sans not-italic font-normal text-[0.73vw] leading-[0.83vw] whitespace-nowrap">{user.first_name} {user.last_name}</span>
            </div>
            <div className="flex items-center px-[0.63vw] w-[12.15vw] h-full shrink-0">
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
            <div className="flex items-center px-[0.63vw] w-[12.15vw] h-full shrink-0">
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
    const [joinedStartDate, setJoinedStartDate] = useState('');
    const [joinedEndDate, setJoinedEndDate] = useState('');
    const [activeStartDate, setActiveStartDate] = useState('');
    const [activeEndDate, setActiveEndDate] = useState('');
    const ITEMS_PER_PAGE = 10;

    // Debounce search to avoid firing API calls on every keystroke
    // API only supports a single name token — take the first word when there's a space
    useEffect(() => {
        const timer = setTimeout(() => {
            const normalized = searchValue.trim().split(/\s+/)[0] || '';
            setDebouncedSearch(normalized);
            setCurrentPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchValue]);

    // Fetch with all active API params — date filters go server-side
    const { data, isLoading, error } = useUsers({
        page: 1,
        limit: 100,
        search: debouncedSearch || undefined,
        joinedStartDate: joinedStartDate || undefined,
        joinedEndDate: joinedEndDate || undefined,
        lastActiveStartDate: activeStartDate || undefined,
        lastActiveEndDate: activeEndDate || undefined,
    });

    const filteredUsers = useMemo(() => {
        if (!data?.data) return [];
        // Client-side post-filter: re-apply the full typed search string
        // (the API only received the first word; here we narrow by the full query)
        const fullSearch = searchValue.trim().toLowerCase();

        return data.data.filter((user: User) => {
            // Full-name / email post-filter
            if (fullSearch) {
                const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim().toLowerCase();
                const email = (user.email || '').toLowerCase();
                if (!fullName.includes(fullSearch) && !email.includes(fullSearch)) return false;
            }
            // Subscription filter (client-side — API doesn't have a subscription param yet)
            if (subFilter) {
                if (!user.status) return false;
                if (user.status.toLowerCase() !== subFilter.toLowerCase()) return false;
            }
            return true;
        });
    }, [data?.data, searchValue, subFilter]);

    // Reset to page 1 when client-side filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [subFilter, joinedStartDate, joinedEndDate, activeStartDate, activeEndDate]);

    // Handle pagination entirely client-side 
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));

    // Slice results locally for the current page
    const displayedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full h-[4.58vw] bg-[#1C1C1E] rounded-t-[0.83vw] px-[0.83vw]">
                <SearchBar value={searchValue} onChange={setSearchValue} className="!bg-[#111111]/50 !border-[#666666]/50 !w-[17.16vw] !h-[2.92vw] !p-[0.66vw] !rounded-[0.66vw] !gap-[0.66vw]" />
                <div className="flex flex-row items-center gap-[0.66vw]">
                    <div className="w-[10.1vw] h-[2.92vw] relative">
                        <FilterSelect label="Subscription" value={subFilter} options={[{ label: 'Premium', value: 'premium' }, { label: 'Free', value: 'free' }]} onChange={setSubFilter} />
                    </div>
                    {/* Joined Date Range – dropdown picker */}
                    <DateRangeFilterSelect
                        label="Joined Date Range"
                        startDate={joinedStartDate}
                        endDate={joinedEndDate}
                        onStartChange={(v) => { setJoinedStartDate(v); setCurrentPage(1); }}
                        onEndChange={(v) => { setJoinedEndDate(v); setCurrentPage(1); }}
                        onClear={() => { setJoinedStartDate(''); setJoinedEndDate(''); }}
                    />
                    {/* Last Active Date Range – dropdown picker */}
                    <DateRangeFilterSelect
                        label="Last Active Date Range"
                        startDate={activeStartDate}
                        endDate={activeEndDate}
                        onStartChange={(v) => { setActiveStartDate(v); setCurrentPage(1); }}
                        onEndChange={(v) => { setActiveEndDate(v); setCurrentPage(1); }}
                        onClear={() => { setActiveStartDate(''); setActiveEndDate(''); }}
                        align="right"
                    />
                </div>
            </div>

            <div className="flex flex-row items-center w-full h-[48px] bg-[#1C1C1E] border-b border-[#333333] mt-0">
                {[['User ID', '6.77vw'], ['Name', '12.15vw'], ['Email', '12.15vw'], ['Phone', '11.65vw'], ['Subscription', '11.65vw'], ['Joined On', '12.15vw'], ['Last Active', '11.65vw']].map(([label, width]) => (
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
                    ) : displayedUsers && displayedUsers.length > 0 ? (
                        displayedUsers.map((user: User, index: number) => (
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

        const fmt = config.format.toLowerCase();
        const format = fmt === 'json' ? 'json' : fmt === 'pdf' ? 'pdf' : 'csv';
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
            <div className="flex flex-col items-start w-full max-w-[84.83vw]"
                style={{ paddingLeft: '2.08vw', paddingTop: '1.77vw', paddingBottom: '2.08vw', paddingRight: '2.08vw' }}
            >
                <div className="w-[80.67vw] flex items-center justify-between">
                    <PageHeader title="Users Management" description="View, verify, and manage all registered users — including KYC status, bans, and account details." />
                    {/* <button
                        onClick={() => setIsExportModalOpen(true)}
                        className="flex items-center justify-center gap-[0.62vw] px-[1.25vw] py-[0.41vw] rounded-full border border-white backdrop-blur-[6px] cursor-pointer hover:bg-white/10 transition-all shrink-0"
                    >
                        <img src="/assets/Icons_figma/download.svg" alt="Export" className="w-[1.25vw] h-[1.25vw]" />
                        <span className="text-white text-[0.83vw] font-medium leading-[120%]">{exportUsersMutation.isPending ? 'Exporting...' : 'Export'}</span>
                    </button> */}
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
