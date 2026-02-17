import React from 'react';
import StatsRow from '../shared/StatsRow';

const LogStats: React.FC = () => {
  const stats = [
    { label: "Total Logs", value: "12,345", trend: { value: 12, isUp: true } },
    { label: "Security Events", value: "123", trend: { value: 12, isUp: false } },
    { label: "Admin Actions", value: "1,234", trend: { value: 12, isUp: true } },
    { label: "System Errors", value: "12", trend: { value: 12, isUp: false } },
    { label: "Active Sessions", value: "123", trend: { value: 12, isUp: true } },
    { label: "Data Exports", value: "45", trend: { value: 12, isUp: false } },
  ];

  return <StatsRow stats={stats} />;
};

export default LogStats;