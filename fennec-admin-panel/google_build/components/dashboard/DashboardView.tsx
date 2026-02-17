import React, { useState } from 'react';
import DAUChartCard from './DAUChartCard';
import UsageDistributionCard from './UsageDistributionCard';
import MatchesOverTimeCard from './MatchesOverTimeCard';
import EngagementChannelsCard from './EngagementChannelsCard';
import UsersReportedCard from './UsersReportedCard';
import BugsReportedCard from './BugsReportedCard';
import SubscriptionsBreakdownCard from './SubscriptionsBreakdownCard';
import MonthlyRevenueCard from './MonthlyRevenueCard';
import PageHeader from '../shared/PageHeader';
import StatsRow from '../shared/StatsRow';

const FILTERS = [
  'Last 7 days', 'This Month', 'Last Month', 'Last 3 Months', 
  'Last 6 Months', 'This Year', 'Last Year', 'All Time'
];

const DashboardView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Last 7 days');

  const stats = [
    { label: "Active Users (30d)", value: "142,980", trend: { value: "8.2%", isUp: true } },
    { label: "New Signups (7d)", value: "6,412", trend: { value: "3.5%", isUp: true } },
    { label: "Daily Matches Created", value: "18,204", trend: { value: "12.7%", isUp: true } },
    { label: "Total Groups Created", value: "3,940", trend: { value: "4.1%", isUp: true } },
    { label: "Subscription Revenue (MTD)", value: "$42,730", trend: { value: "16.3%", isUp: true } },
  ];

  return (
    <div className="flex flex-col w-full h-[calc(100vh-100px)] overflow-hidden">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-20 bg-transparent px-[2vw] pt-[1vw] flex flex-col gap-[1.5vw] shrink-0 pb-4 border-b border-white/5 backdrop-blur-md">
        <PageHeader 
          title="Analytics"
          description="Get a quick overview of user activity, group interactions, and overall platform performance."
        />

        <StatsRow stats={stats as any} />

        {/* Filter Chips - Also Sticky */}
        <div className="flex flex-wrap items-center gap-[0.5vw]">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-[1.2vw] py-[0.5vw] rounded-full text-[0.8vw] font-bold transition-all ${
                activeFilter === filter 
                ? 'bg-[#5F00DB] text-white shadow-[0_0_15px_rgba(95,0,219,0.4)]' 
                : 'bg-[#16003F] text-white/60 hover:text-white border border-white/10 hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scrollable Area */}
      <div className="flex-grow overflow-y-auto no-scrollbar px-[2vw] pt-[1.5vw] pb-[5vw]">
        <div className="flex flex-col gap-[1.5vw] w-full">
          <div className="flex flex-row gap-[1.5vw] w-full">
            <div className="w-[66.3%] shrink-0"><DAUChartCard /></div>
            <div className="w-[32.6%] shrink-0"><UsageDistributionCard /></div>
          </div>
          <div className="flex flex-row gap-[1.5vw] w-full">
            <div className="w-[66.3%] shrink-0"><MatchesOverTimeCard /></div>
            <div className="w-[32.6%] shrink-0"><EngagementChannelsCard /></div>
          </div>
          <div className="flex flex-row gap-[1.5vw] w-full">
            <div className="w-[49.4%] shrink-0"><UsersReportedCard /></div>
            <div className="w-[49.4%] shrink-0"><BugsReportedCard /></div>
          </div>
          <div className="flex flex-row gap-[1.5vw] w-full">
            <div className="w-[32.6%] shrink-0"><SubscriptionsBreakdownCard /></div>
            <div className="w-[66.3%] shrink-0"><MonthlyRevenueCard /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;