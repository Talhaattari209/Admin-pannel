'use client';

import React, { useState, useRef, useEffect } from 'react';
import SideNavigation from '@/components/SideNavigation';
import { PageHeader } from '@/components/Headers';
import { SearchBar, Pagination, FilterSelect } from '@/components/shared/TableComponents';
import { ArrowUp, ArrowDown, ChevronDown, MoreVertical, Eye, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

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
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071C19.3166 13.0976 18.6834 13.0976 18.2929 12.7071L13 7.41421V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V7.41422L5.70711 12.7071C5.31658 13.0976 4.68342 13.0976 4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4Z"
                                fill={isUp ? "#3ADC60" : "#FF4D4F"}
                            />
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
    const stats = [
        { label: "Total Users", value: "123,456", change: "12" },
        { label: "Active This Week", value: "12,345", change: "12", isUp: false },
        { label: "Pending KYC", value: "123", change: "12" },
        { label: "Suspended Accounts", value: "123", change: "12", isUp: false },
        { label: "Verified Accounts", value: "123,210", change: "12" },
        { label: "Premium Subscribers", value: "120,234", change: "12", isUp: false },
    ];

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

// --- New Table Components ---

// Local TableSearchBar removed in favor of shared component

// --- Table Rows & Structure ---

// --- Table Rows & Structure ---

// Sort Icon Component
const SortIcon = () => (
    <img
        src="/assets/chevron_up_down.png"
        alt="Sort"
        style={{ width: '14px', height: '14px', margin: '-4px 0px' }}
        className="shrink-0 opacity-100"
    />
);

const RowActions = ({ userId }: { userId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
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
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center text-white hover:text-white/80 transition-colors cursor-pointer"
            >
                <MoreVertical className="w-[0.83vw] h-[0.83vw]" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-[0.42vw] w-[12.5vw] bg-[#222222] backdrop-blur-[12px] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] z-50 py-[0.42vw] shadow-2xl animate-in fade-in zoom-in duration-150 flex flex-col">
                    <button
                        onClick={() => router.push(`/users/profile`)}
                        className="flex items-center justify-between w-full h-[2.19vw] px-[0.63vw] hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-[0.83vw]">
                            <Eye className="w-[0.83vw] h-[0.83vw] text-white" />
                            <span className="font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.94vw] text-white whitespace-nowrap">View Details</span>
                        </div>
                        <ChevronRight className="w-[0.83vw] h-[0.83vw] text-white" />
                    </button>

                    <button
                        className="flex items-center justify-between w-full h-[2.19vw] px-[0.63vw] hover:bg-[#FF4E4E]/10 transition-colors"
                    >
                        <div className="flex items-center gap-[0.83vw]">
                            <img src="/assets/slash-Deactivate.svg" alt="Deactivate" className="w-[0.83vw] h-[0.83vw]" />
                            <span className="font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.94vw] text-[#FF4E4E] whitespace-nowrap">Deactivate User</span>
                        </div>
                        <ChevronRight className="w-[0.83vw] h-[0.83vw] text-[#FF4E4E]" />
                    </button>
                </div>
            )}
        </div>
    );
};

const UserTableRow = () => (
    <div className="flex flex-row items-center w-full h-[2.92vw] border-b border-[rgba(102,102,102,0.5)] bg-[#222222] hover:bg-white/[0.05] transition-colors">
        {/* User ID */}
        <div className="flex items-center px-[0.63vw] w-[6.77vw] h-full shrink-0">
            <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] whitespace-nowrap">U-00***24543</span>
        </div>

        {/* Name */}
        <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <div className="w-[1.875vw] h-[1.875vw] rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('/8.png')" }} />
            <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] whitespace-nowrap">John Doe</span>
        </div>

        {/* Email */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] whitespace-nowrap">johndoe@email.com</span>
        </div>

        {/* Phone */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] whitespace-nowrap">+1 416-883-2410</span>
        </div>

        {/* Subscription */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <div className="flex items-center justify-center gap-[0.52vw] w-[4.32vw] h-[1.67vw] bg-[#5F00DB] rounded-[0.83vw]">
                <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] whitespace-nowrap">Premium</span>
            </div>
        </div>

        {/* Joined On */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] whitespace-nowrap">Dec 31, 2025 • 11:59 PM</span>
        </div>

        {/* Last Active */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] whitespace-nowrap">Dec 31, 2025 • 11:59 PM</span>
        </div>

        {/* Action */}
        <div className="flex justify-center items-center w-[2.5vw] h-full shrink-0">
            <RowActions userId="mock-id" />
        </div>
    </div>
);

const UserTableSection = () => {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter states
    const [subFilter, setSubFilter] = useState('');
    const [joinedFilter, setJoinedFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState('');

    return (
        <div className="flex flex-col w-full">
            {/* 1. Header with Filters */}
            <div className="flex flex-row items-center justify-between w-full h-[4.58vw] bg-[#1C1C1E] rounded-t-[0.83vw] px-[0.83vw]">
                {/* Left: Search (Reusable) - Scaled by 0.8 */}
                {/* Original: 412x56. New: 17.16vw x 2.33vw */}
                <SearchBar
                    value={searchValue}
                    onChange={setSearchValue}
                    className="!bg-[#111111]/50 !border-[#666666]/50 !w-[17.16vw] !h-[2.92vw] !p-[0.66vw] !rounded-[0.66vw] !gap-[0.66vw]"
                />

                {/* Right: Filters - Scaled by 0.8 */}
                {/* Each FilterSelect is originally ~10.42vw width. Scaled 0.8 -> ~8.33vw width. Canvas space needs to be explicit. */}
                <div className="flex flex-row items-center gap-[0.66vw]">
                    <div className="w-[10.1vw] h-[2.92vw] relative">
                        <FilterSelect
                            label="Subscription"
                            value={subFilter}
                            options={[{ label: 'Premium', value: 'premium' }, { label: 'Free', value: 'free' }]}
                            onChange={setSubFilter}
                        />
                    </div>
                    <div className="w-[10.1vw] h-[2.92vw] relative">
                        <FilterSelect
                            label="Joined Date Range"
                            value={joinedFilter}
                            options={[{ label: 'This Week', value: 'this-week' }, { label: 'This Month', value: 'this-month' }]}
                            onChange={setJoinedFilter}
                        />
                    </div>
                    <div className="w-[10.1vw] h-[2.92vw] relative">
                        <FilterSelect
                            label="Last Active"
                            value={activeFilter}
                            options={[{ label: 'Today', value: 'today' }, { label: '7 Days', value: '7-days' }]}
                            onChange={setActiveFilter}
                        />
                    </div>
                </div>
            </div>

            {/* 2. Table Column Headers */}
            <div className="flex flex-row items-center w-full h-[48px] bg-[#1C1C1E] border-b border-[#333333] mt-0">
                <div className="flex items-center gap-[8px] px-[12px] w-[6.77vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[12px]">User ID</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[8px] px-[12px] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[12px]">Name</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[8px] px-[12px] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[12px]">Email</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[8px] px-[12px] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[12px]">Phone</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[8px] px-[12px] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[12px]">Subscription</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[8px] px-[12px] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[12px]">Joined On</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[8px] px-[12px] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[12px]">Last Active</span>
                    <SortIcon />
                </div>
                {/* Empty Header for Action Column */}
                <div className="w-[2.5vw] shrink-0" />
            </div>

            {/* 3. Table Wrapper: Rows + Gap + Pagination */}
            <div className="flex flex-col w-full bg-[#222222] rounded-b-[0.83vw] overflow-hidden pb-[1.25vw]">
                {/* Rows */}
                <div className="flex flex-col w-full">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <UserTableRow key={i} />
                    ))}
                </div>

                {/* Gap: 50px -> 2.60vw */}
                <div className="w-full h-[2.60vw]" />

                {/* 4. Pagination (Inside) */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    className="w-full px-[1.25vw]"
                />
            </div>
        </div>
    );
};

export default function UserManagementPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            {/* Reusable Sidebar (fixed position) */}
            <SideNavigation activeId="users" />

            {/* 3. Main Content Container (positioned at left 320px/16.67vw) */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto scrollbar-hide">

                {/* Content Wrapper */}
                <div
                    className="flex flex-col items-start w-full max-w-[83.33vw]"
                    style={{
                        paddingLeft: '2.08vw',   // 40px Left
                        paddingTop: '1.77vw',    // Adjusted Top
                        paddingBottom: '2.08vw', // 40px Bottom
                        paddingRight: '2.08vw'   // 40px Right
                    }}
                >

                    {/* Page Header (Title/Subtitle) */}
                    <div className="w-[79.17vw]">
                        <PageHeader
                            title="Users Management"
                            description="View, verify, and manage all registered users — including KYC status, bans, and account details."
                        />
                    </div>

                    {/* Gap of 40px (2.08vw) */}
                    <div className="h-[1.49vw]" />

                    {/* Stat Cards Row */}
                    <StatRow />

                    <div className="h-[1.25vw]" />

                    {/* Table Section */}
                    <UserTableSection />

                </div>
            </main>
        </div>
    );
}
