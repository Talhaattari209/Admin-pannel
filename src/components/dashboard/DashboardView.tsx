
import React, { useState } from 'react';
import DAUChartCard from './DAUChartCard';
import UsageDistributionCard from './UsageDistributionCard';
import MatchesOverTimeCard from './MatchesOverTimeCard';
import EngagementChannelsCard from './EngagementChannelsCard';
import UsersReportedCard from './UsersReportedCard';
import BugsReportedCard from './BugsReportedCard';
import SubscriptionsBreakdownCard from './SubscriptionsBreakdownCard';
import MonthlyRevenueCard from './MonthlyRevenueCard';
import StatCard from './StatCard';

const FILTERS = [
  'Last 7 days', 'This Month', 'Last Month', 'Last 3 Months',
  'Last 6 Months', 'This Year', 'Last Year', 'All Time'
];

const DashboardView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Last 7 days');

  return (
    <div className="flex flex-col w-full max-w-[79.16vw] mx-auto gap-[1.25vw] p-[1.66vw] animate-in fade-in duration-700">

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-[0.83vw] w-full mb-[0.33vw]">
        <div>
          <StatCard title="Active Users (30d)" value="142,980" change="8.2%" isPositive={true} />
        </div>
        <div>
          <StatCard title="New Signups (7d)" value="9,540" change="6.8%" isPositive={true} />
        </div>
        <div>
          <StatCard title="Revenue (30d)" value="$124,500" change="3.3%" isPositive={true} />
        </div>
        <div>
          <StatCard title="Avg. Session" value="14m 32s" change="12.5%" isPositive={false} />
        </div>
        <div>
          <StatCard title="Avg. Session" value="14m 32s" change="12.5%" isPositive={false} />
        </div>
        <div>
          <StatCard title="Total Downloads" value="1,240" change="5.2%" isPositive={true} />
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-nowrap items-center gap-[0.41vw] mb-[0.33vw] w-[70%] overflow-x-auto scrollbar-hide">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 px-[1.25vw] py-[0.27vw] rounded-full text-[0.72vw] font-medium transition-all duration-300 border ${activeFilter === filter
              ? 'bg-[#5F00DB] border-[#5F00DB] text-white shadow-[0_0_15px_rgba(95,0,219,0.4)]'
              : 'bg-[#16003F] border-[#5F00DB]/30 text-white/70 hover:border-[#5F00DB] hover:text-white'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-12 gap-[1.25vw] w-full">
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
