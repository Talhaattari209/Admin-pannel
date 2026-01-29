import React from 'react';
import StatsRow from '../shared/StatsRow';

const UserStats: React.FC = () => {
  const stats = [
    { label: "Total Users", value: "123,456", trend: { value: 12, isUp: true } },
    { label: "Active This Week", value: "12,345", trend: { value: 12, isUp: false } },
    { label: "Pending KYC", value: "123", trend: { value: 12, isUp: true } },
    { label: "Suspended Accounts", value: "123", trend: { value: 12, isUp: false } },
    { label: "Verified Accounts", value: "123,210", trend: { value: 12, isUp: true } },
    { label: "Premium Subscribers", value: "120,234", trend: { value: 12, isUp: false } },
  ];

  return <StatsRow stats={stats} />;
};

export default UserStats;