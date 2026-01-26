'use client';

import React, { useState, useRef, useEffect } from 'react';
import SideNavigation from '@/components/SideNavigation';
import { PageHeader } from '@/components/Headers';
import { ArrowUp, ArrowDown, Search, ChevronDown, MoreVertical, UserCircle, UserX } from 'lucide-react';
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
        <div className="flex flex-col justify-end items-start p-[0.83vw] gap-[1.25vw] w-[12.5vw] h-[5.68vw] bg-[rgba(22,0,63,0.5)] border border-[rgba(102,102,102,0.5)] backdrop-blur-[12px] rounded-[0.83vw] shrink-0 font-['SF_Pro_Text']">

            {/* Label */}
            <h6 className="w-full text-[#CCCCCC] font-bold text-[0.83vw] leading-[120%] tracking-[-0.04em] flex items-center">
                {label}
            </h6>

            {/* Value and Change Row */}
            <div className="flex flex-row justify-end items-center w-full h-[1.77vw]">
                {/* Main Number */}
                <span className="flex-grow text-white font-bold text-[1.46vw] leading-[120%] tracking-[-0.04em]">
                    {value}
                </span>

                {/* Change Indicator */}
                <div className="flex items-center gap-[0.42vw]">
                    {isUp ? (
                        <ArrowUp className="text-[#3ADC60] w-[1.25vw] h-[1.25vw]" />
                    ) : (
                        <ArrowDown className="text-red-500 w-[1.25vw] h-[1.25vw]" />
                    )}
                    <span className={cn(
                        "font-bold text-[1.04vw] leading-[120%] tracking-[-0.04em]",
                        isUp ? "text-[#3ADC60]" : "text-red-500"
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
        <div className="flex flex-row items-center gap-[0.83vw] w-[79.17vw] h-[5.68vw]">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

// --- New Table Components ---

const TableSearchBar = () => (
    <div className="flex flex-row items-center p-[0.83vw] gap-[0.83vw] w-[21.46vw] h-[2.92vw] bg-[#111111]/50 border border-[#666666]/50 rounded-[0.83vw]">
        <Search className="text-[#FFFFFF] opacity-40 w-[1.25vw] h-[1.25vw] shrink-0" strokeWidth={1.5} />
        <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-white font-['SF_Pro_Text'] text-[0.83vw] leading-[1.25vw] w-full placeholder:text-[#FFFFFF]/40"
        />
    </div>
);

interface TableFilterProps {
    label: string;
}

const TableFilter = ({ label }: TableFilterProps) => (
    <div className="flex flex-col gap-[0.21vw] w-[10.42vw]">
        <span className="text-[#FFFFFF] font-['SF_Pro_Text'] font-bold text-[0.63vw] leading-[133%]">
            {label}
        </span>
        <div className="flex flex-row items-center justify-between py-[0.42vw] h-[2.08vw] border-b border-[#FFFFFF] cursor-pointer hover:border-white/80 transition-colors">
            <span className="text-[#FFFFFF] opacity-40 font-['SF_Pro_Text'] text-[0.83vw] leading-[1.25vw]">Select</span>
            <ChevronDown className="text-white w-[1.25vw] h-[1.25vw]" />
        </div>
    </div>
);

const TableHeaderActions = () => (
    <div className="flex flex-row items-center justify-between w-[79.17vw] h-[4.58vw] bg-[#1C1C1E] rounded-t-[0.83vw] p-[0.83vw]">
        {/* Left: Search */}
        <TableSearchBar />

        {/* Right: Filters */}
        <div className="flex flex-row gap-[0.83vw]">
            <TableFilter label="Subscription" />
            <TableFilter label="Joined Date Range" />
            <TableFilter label="Last Active Date Range" />
        </div>
    </div>
);

// --- Table Rows & Structure ---

// Sort Icon Component
const SortIcon = () => (
    <div className="flex flex-col gap-[0.1vw]">
        <ArrowUp className="w-[0.42vw] h-[0.42vw] text-[#666666]" />
        <ArrowDown className="w-[0.42vw] h-[0.42vw] text-[#666666]" />
    </div>
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
                className="flex items-center justify-center text-white hover:text-white/80 transition-colors"
            >
                <MoreVertical className="w-[0.83vw] h-[0.83vw]" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-[0.42vw] w-[11.46vw] bg-[rgba(22,0,63,0.95)] backdrop-blur-[12px] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] z-50 py-[0.42vw] shadow-2xl animate-in fade-in zoom-in duration-150">
                    <button
                        onClick={() => router.push(`/users/profile`)}
                        className="flex items-center gap-[0.83vw] w-full px-[1.25vw] py-[0.83vw] text-white hover:bg-white/10 text-[0.83vw] transition-colors"
                    >
                        <UserCircle size={18} className="text-purple-400" />
                        View Details
                    </button>

                    <div className="h-[1px] bg-white/10 mx-[0.83vw]" />

                    <button
                        className="flex items-center gap-[0.83vw] w-full px-[1.25vw] py-[0.83vw] text-red-400 hover:bg-red-500/10 text-[0.83vw] transition-colors"
                    >
                        <UserX size={18} />
                        Deactivate User
                    </button>
                </div>
            )}
        </div>
    );
};

const UserTableRow = () => (
    <div className="flex flex-row items-center w-[79.17vw] h-[2.92vw] border-b border-[rgba(102,102,102,0.5)] bg-[#222222] hover:bg-white/[0.05] transition-colors">
        {/* User ID - 130px */}
        <div className="flex items-center px-[0.63vw] w-[6.77vw] h-full shrink-0">
            <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw]">U-00***24543</span>
        </div>

        {/* Name - 223.67px */}
        <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <div className="w-[1.875vw] h-[1.875vw] rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('/8.png')" }} />
            <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw]">John Doe</span>
        </div>

        {/* Email - 223.67px */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw]">johndoe@email.com</span>
        </div>

        {/* Phone - 223.67px */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw]">+1 416-883-2410</span>
        </div>

        {/* Subscription - 223.67px */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <div className="flex items-center justify-center gap-[0.52vw] w-[4.32vw] h-[1.67vw] bg-[#5F00DB] rounded-[0.83vw]">
                <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw]">Premium</span>
            </div>
        </div>

        {/* Joined On - 223.67px */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw]">Dec 31, 2025 • 11:59 PM</span>
        </div>

        {/* Last Active - 223.67px */}
        <div className="flex items-center px-[0.63vw] w-[11.65vw] h-full shrink-0">
            <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw]">Dec 31, 2025 • 11:59 PM</span>
        </div>

        {/* Action - 48px */}
        <div className="flex justify-center items-center w-[2.5vw] h-full shrink-0">
            <RowActions userId="mock-id" />
        </div>
    </div>
);

const UserTableSection = () => {
    return (
        <div className="flex flex-col w-[79.17vw]">
            {/* 1. Header with Filters */}
            <TableHeaderActions />

            {/* 2. Table Column Headers */}
            <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1C1C1E] border-b border-[#333333] mt-0">
                <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[6.77vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-['SF_Pro_Text'] font-medium text-[0.63vw]">User ID</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-['SF_Pro_Text'] font-medium text-[0.63vw]">Name</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-['SF_Pro_Text'] font-medium text-[0.63vw]">Email</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-['SF_Pro_Text'] font-medium text-[0.63vw]">Phone</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-['SF_Pro_Text'] font-medium text-[0.63vw]">Subscription</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-['SF_Pro_Text'] font-medium text-[0.63vw]">Joined On</span>
                    <SortIcon />
                </div>
                <div className="flex items-center gap-[0.42vw] px-[0.63vw] w-[11.65vw] shrink-0 group cursor-pointer">
                    <span className="text-[#AAAAAA] font-['SF_Pro_Text'] font-medium text-[0.63vw]">Last Active</span>
                    <SortIcon />
                </div>
                {/* Empty Header for Action Column */}
                <div className="w-[2.5vw] shrink-0" />
            </div>

            {/* 3. Table Rows */}
            <div className="flex flex-col w-full bg-[#222222] rounded-b-[0.83vw] overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <UserTableRow key={i} />
                ))}
            </div>
        </div>
    );
};

export default function UserManagementPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-['SF_Pro_Text'] text-white">

            {/* 1. Background Layer */}
            <div
                className="fixed inset-0 z-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/8.png')` }}
            />

            {/* 2. Reusable Sidebar (fixed position) */}
            <SideNavigation activeId="users" />

            {/* 3. Main Content Container (positioned at left 320px/16.67vw) */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto">

                {/* Content Wrapper */}
                <div
                    className="flex flex-col items-start w-full max-w-[83.33vw]"
                    style={{
                        paddingLeft: '2.92vw',   // 56px from Nav (left)
                        paddingTop: '2.08vw',    // 40px Top
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
                    <div className="h-[2.08vw]" />

                    {/* Stat Cards Row */}
                    <StatRow />

                    <div className="h-[2.08vw]" />

                    {/* Table Section */}
                    <UserTableSection />

                </div>
            </main>
        </div>
    );
}
