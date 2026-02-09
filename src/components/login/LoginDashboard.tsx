'use client';

import React, { useState } from 'react';
import SideNavigation from '@/components/SideNavigation';
import { PageHeader } from '@/components/Headers';
import Image from 'next/image';
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
        <div className="flex flex-col justify-end items-start p-[0.83vw] gap-[0.68vw] w-full h-[5.11vw] bg-[rgba(22,0,63,0.5)] border border-[rgba(102,102,102,0.5)] backdrop-blur-[12px] rounded-[0.83vw] ">
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
        { label: "Active Users (30d)", value: "142,980", change: "8.2%" },
        { label: "New Signups (7d)", value: "32,540", change: "16.3%" },
        { label: "Active Groups (30d)", value: "8,420", change: "9.4%", isUp: false },
        { label: "Net Revenue", value: "$482,090", change: "2.5%" },
    ];

    return (
        <div className="flex flex-row flex-wrap items-center gap-[0.83vw] w-full min-h-[5.68vw]">
            {stats.map((stat, index) => (
                <div key={index} className="flex-1">
                    <StatCard {...stat} />
                </div>
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
        <div className="relative min-h-screen w-full overflow-hidden text-white">

            {/* Reusable Sidebar (fixed position) */}
            <SideNavigation activeId="dashboard" />

            {/* 3. Main Content Container - Single Scroll Flow */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto scrollbar-hide">

                {/* Content Wrapper */}
                <div
                    className="flex flex-col items-start w-full text-white"
                    style={{
                        paddingLeft: '2.08vw',
                        paddingTop: '2.08vw',
                        paddingRight: '2.08vw',
                        paddingBottom: '2.08vw'
                    }}
                >
                    {/* Page Header */}
                    <div className="w-full">
                        <PageHeader
                            title="Dashboard"
                            description="Get a quick overview of user activity, group interactions, and overall platform performance."
                            variant="dashboard"
                            secondaryAction={{
                                label: "Export",
                                onClick: () => setShowExportModal(true),
                                icon: (
                                    <div className="relative w-[1.25vw] h-[1.25vw] flex items-center justify-center">
                                        <Image
                                            src="/assets/Icons_figma/download.svg"
                                            alt="Export"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )
                            }}
                        />

                    </div>

                    <div className="h-[1.66vw]" />

                    {/* Stat Cards */}
                    <StatRow />

                    <div className="h-[1.66vw]" />

                    {/* Filters Row (Timeline) */}
                    <div className="flex flex-nowrap items-center gap-[0.41vw] mb-[0.83vw] w-[70%] overflow-x-auto scrollbar-hide">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex-shrink-0 px-[1.25vw] py-[0.26vw] rounded-full text-[0.72vw] font-medium not-italic transition-all duration-300 border ${activeFilter === filter
                                    ? 'bg-[#5F00DB] border-[#5F00DB] text-white shadow-[0_0_15px_rgba(95,0,219,0.4)]'
                                    : 'bg-[#16003F] border-[#5F00DB]/30 text-white/70 hover:border-[#5F00DB] hover:text-white'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Analytics Grid */}
                    <div className="flex flex-col w-full animate-in fade-in duration-700">
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
