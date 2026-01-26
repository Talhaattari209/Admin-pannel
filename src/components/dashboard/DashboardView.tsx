
import React, { useState } from 'react';
import DAUChartCard from './DAUChartCard';
import UsageDistributionCard from './UsageDistributionCard';
import MatchesOverTimeCard from './MatchesOverTimeCard';
import EngagementChannelsCard from './EngagementChannelsCard';
import UsersReportedCard from './UsersReportedCard';
import BugsReportedCard from './BugsReportedCard';
import SubscriptionsBreakdownCard from './SubscriptionsBreakdownCard';
import MonthlyRevenueCard from './MonthlyRevenueCard';

const FILTERS = [
  'Last 7 days', 'This Month', 'Last Month', 'Last 3 Months', 
  'Last 6 Months', 'This Year', 'Last Year', 'All Time'
];

const DashboardView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Last 7 days');

  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto gap-6 p-4 md:p-8 animate-in fade-in duration-700">
      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full text-[14px] font-medium transition-all duration-300 border ${
              activeFilter === filter 
              ? 'bg-[#5F00DB] border-[#5F00DB] text-white shadow-[0_0_15px_rgba(95,0,219,0.4)]' 
              : 'bg-[#16003F] border-[#5F00DB]/30 text-white/70 hover:border-[#5F00DB] hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

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
  );
};

export default DashboardView;
