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
        <div className="flex flex-col justify-end items-start p-[0.83vw] gap-[0.68vw] w-full h-[5.11vw] bg-[rgba(22,0,63,0.5)] border border-[rgba(102,102,102,0.5)] backdrop-blur-[12px] rounded-[0.83vw] font-['SF_Pro_Text']">
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
                    <div className={cn(
                        "relative w-[1.25vw] h-[1.25vw]",
                        !isUp && "rotate-180"
                    )}>
                        <Image
                            src="/assets/Icons_figma/arrow-up.svg"
                            alt={isUp ? "Up" : "Down"}
                            fill
                            className={cn(
                                "object-contain",
                                isUp ? "" : "brightness-0 saturate-100 invert-[15%] sepia-[95%] saturate-[7000%] hue-rotate-[355deg]" // Red filter for down arrow if needed, or just rely on SVG color if possible. 
                                // BUT: The SVG is likely white or green specific. Figma says arrow is green for up.
                                // If I reuse arrow-up (green) for down (red), I need to filter it.
                                // Or I can just trust the user wants the arrow shape and color is controlled by text color? No, SVG color is inside SVG.
                                // The metadata for arrow-up said "color: var(--success)".
                                // This implies the SVG itself might be colored.
                                // If I rotate the green arrow, I get a green down arrow.
                                // "Active Groups" in Figma had "9.4% arrow-down" (Red?).
                                // If the arrow is green by default, I need red for down.
                                // CSS filter to turn green to red: hue-rotate.
                            )}
                        // Actually, let's keep it simple. If the SVG is green, rotating it is green.
                        // If the user wants red, I should use a red arrow or filter.
                        // Given "minimum credits", I'll use the SVG as is with rotation. Styling exact color of SVG via CSS filter is tricky.
                        // I'll stick to the SVG + Text color.
                        />
                    </div>
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
        <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-['SF_Pro_Text'] text-white">

            {/* 1. Background Layer */}
            <div
                className="fixed inset-0 z-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/8.png')` }}
            />

            {/* 2. Reusable Sidebar (fixed position) */}
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
                                className={`flex-shrink-0 px-[1.25vw] py-[0.26vw] rounded-full text-[0.72vw] font-medium transition-all duration-300 border ${activeFilter === filter
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
