'use client';

import React, { useState } from 'react';
import SideNavigation from '@/components/SideNavigation';
import { PageHeader } from '@/components/Headers';
import { ArrowUp, ArrowDown, Download } from 'lucide-react';
import { cn } from "@/lib/utils";
import ExportModal from '@/components/shared/ExportModal';

// Chart Components from Dashboard
import DAUChartCard from '@/components/dashboard/DAUChartCard';
import UsageDistributionCard from '@/components/dashboard/UsageDistributionCard';
import MatchesOverTimeCard from '@/components/dashboard/MatchesOverTimeCard';
import EngagementChannelsCard from '@/components/dashboard/EngagementChannelsCard';
import UsersReportedCard from '@/components/dashboard/UsersReportedCard';
import BugsReportedCard from '@/components/dashboard/BugsReportedCard';
import SubscriptionsBreakdownCard from '@/components/dashboard/SubscriptionsBreakdownCard';
import MonthlyRevenueCard from '@/components/dashboard/MonthlyRevenueCard';

// --- Stat Cards Components (Reused from UserManagement) ---

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
        <div className="flex flex-row flex-wrap items-center gap-[0.83vw] w-full min-h-[5.68vw]">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

const FILTERS = [
    'Last 7 days', 'This Month', 'Last Month', 'Last 3 Months',
    'Last 6 Months', 'This Year', 'Last Year', 'All Time'
];

export default function LoginDashboard() {
    const [activeFilter, setActiveFilter] = useState('Last 7 days');
    const [showExportModal, setShowExportModal] = useState(false);

    return (
        <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-['SF_Pro_Text'] text-white">

            {/* 1. Background Layer */}
            <div
                className="fixed inset-0 z-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/8.png')` }}
            />

            {/* 2. Reusable Sidebar (fixed position) */}
            <SideNavigation activeId="dashboard" />

            {/* 3. Main Content Container - Flex Column Layout for Sticky Header effect */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen flex flex-col overflow-hidden">

                {/* --- TOP FIXED SECTION (Header, Stats, Filters) --- */}
                <div
                    className="flex flex-col items-start w-full shrink-0 z-20 transition-all text-white"
                    style={{
                        paddingLeft: '2.92vw',   // 56px
                        paddingTop: '2.08vw',    // 40px
                        paddingRight: '3.75vw',  // Increased by 32px (1.67vw) -> 2.08 + 1.67 = 3.75
                        paddingBottom: '1.04vw'
                    }}
                >
                    {/* Page Header */}
                    <div className="w-full">
                        <PageHeader
                            title="Dashboard"
                            description="Get a quick overview of user activity, group interactions, and overall platform performance."
                            action={
                                <button
                                    onClick={() => setShowExportModal(true)}
                                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-[7.03vw] h-[2.92vw] border border-white backdrop-blur-[6px] rounded-full shadow-[0px_12px_40px_rgba(0,0,0,0.05)] hover:bg-white/10 transition-colors"
                                >
                                    <span className="font-medium text-[0.83vw] leading-[1.25vw] text-white">
                                        Export
                                    </span>
                                    <Download className="text-white w-[1.25vw] h-[1.25vw]" />
                                </button>
                            }
                        />
                    </div>

                    <div className="h-[2.08vw]" />

                    {/* Stat Cards */}
                    <StatRow />

                    <div className="h-[2.08vw]" />

                    {/* Filters Row (Timeline) - Moved to sticky section */}
                    <div className="flex flex-wrap items-center gap-2">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-full text-[14px] font-medium transition-all duration-300 border ${activeFilter === filter
                                    ? 'bg-[#5F00DB] border-[#5F00DB] text-white shadow-[0_0_15px_rgba(95,0,219,0.4)]'
                                    : 'bg-[#16003F] border-[#5F00DB]/30 text-white/70 hover:border-[#5F00DB] hover:text-white'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- BOTTOM SCROLLABLE SECTION (Charts) --- */}
                <div
                    className="flex-grow w-full overflow-y-auto custom-scrollbar"
                    style={{
                        paddingLeft: '2.92vw',
                        paddingRight: '3.75vw',    // Same increased right padding
                        paddingBottom: '2.08vw',
                        paddingTop: '1.04vw'
                    }}
                >
                    <div className="flex flex-col w-full animate-in fade-in duration-700">
                        {/* Analytics Grid */}
                        <div className="grid grid-cols-12 gap-6 w-full">
                            {/* Row 1 */}
                            <div className="col-span-12 lg:col-span-8">
                                <DAUChartCard />
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                                <UsageDistributionCard />
                            </div>

                            {/* Row 2 */}
                            <div className="col-span-12 lg:col-span-8">
                                <MatchesOverTimeCard />
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                                <EngagementChannelsCard />
                            </div>

                            {/* Row 3 */}
                            <div className="col-span-12 lg:col-span-6">
                                <UsersReportedCard />
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <BugsReportedCard />
                            </div>

                            {/* Row 4 */}
                            <div className="col-span-12 lg:col-span-4">
                                <SubscriptionsBreakdownCard />
                            </div>
                            <div className="col-span-12 lg:col-span-8">
                                <MonthlyRevenueCard />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Export Modal */}
            {showExportModal && (
                <ExportModal
                    onCancel={() => setShowExportModal(false)}
                    onDownload={(config) => {
                        console.log("Exporting Dashboard with config:", config);
                        setShowExportModal(false);
                    }}
                />
            )}
        </div>
    );
}
