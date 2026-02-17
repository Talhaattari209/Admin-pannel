import React from 'react';
import PageHeader from '../shared/PageHeader';
import SupportStatsCards from './SupportStatsCards';
import SupportTable from './SupportTable';
import { SupportTicketData } from './SupportTableRow';
import Button from '../shared/Button';

interface SupportRequestsViewProps {
  onViewDetail: (ticket: SupportTicketData) => void;
  onExport?: () => void;
}

const SupportRequestsView: React.FC<SupportRequestsViewProps> = ({
  onViewDetail,
  onExport
}) => {
  const actions = (
    <Button variant="outline" onClick={onExport} className="gap-3">
      <span>Export</span>
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </Button>
  );

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-8 py-4 animate-in fade-in duration-700">
      <PageHeader
        title="Support Requests"
        description="Track and respond to user support messages, inquiries, and feedback submissions."
        actions={actions}
      />
      <SupportStatsCards />
      <div className="w-full max-w-[1520px]">
        <SupportTable onViewDetail={onViewDetail} />
      </div>
      <div className="h-10" />
    </div>
  );
};

export default SupportRequestsView;