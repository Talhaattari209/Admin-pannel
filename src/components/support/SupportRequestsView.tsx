
import React from 'react';
import { PageHeader } from '../Headers'; // Use shared PageHeader
import SupportStatsCards from './SupportStatsCards';
import SupportTable from './SupportTable';
import { SupportTicketData } from './SupportTableRow';
import { Button } from '../shared/Button';
import { useAuthStore } from '@/store/auth-store';
import { canExportModule } from '@/utils/permissions';

interface SupportRequestsViewProps {
    onViewDetail: (ticket: SupportTicketData) => void;
    onExport?: () => void;
}

const SupportRequestsView: React.FC<SupportRequestsViewProps> = ({
    onViewDetail,
    onExport
}) => {
    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
    const canExport = isSuperAdmin || canExportModule(permissions, 'support requests');

    return (
        <div className="flex flex-col items-center w-full animate-in fade-in duration-700 ">
            <PageHeader
                title="Support Requests"
                description="Track and respond to user support messages, inquiries, and feedback submissions."
                primaryAction={canExport ? {
                    label: "Export",
                    onClick: onExport || (() => { }),
                    icon: (
                        <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    )
                } : undefined}
            />

            {/* Gap match: 0.97vw */}
            <div className="w-full mt-[1.49vw] mb-[0.97vw]">
                <SupportStatsCards />
            </div>

            <div className="w-full">
                <SupportTable onViewDetail={onViewDetail} />
            </div>

            <div className="h-[2.08vw]" />
        </div>
    );
};

export default SupportRequestsView;
