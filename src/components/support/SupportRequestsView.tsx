
import React, { useState } from 'react';
import { PageHeader } from '../Headers';
import SupportStatsCards from './SupportStatsCards';
import SupportTable from './SupportTable';
import { SupportTicketData } from './SupportTableRow';
import { useAuthStore } from '@/store/auth-store';
import { canExportModule } from '@/utils/permissions';
import { useExportSupportRequests } from '@/services/support';
import ExportModal from '@/components/shared/ExportModal';

interface SupportRequestsViewProps {
    onViewDetail: (ticket: SupportTicketData) => void;
}

// Map ExportDataCard quick-filter label → API timelaps value
const QUICK_FILTER_MAP: Record<string, string> = {
    'Last 7 days': 'last7days',
    'This Month': 'thisMonth',
    'Last Month': 'lastMonth',
    'Last 3 Months': 'last3Months',
    'Last 6 Months': 'last6Months',
    'This Year': 'thisYear',
    'Last Year': 'lastYear',
    'All Time': 'allTime',
};

const SupportRequestsView: React.FC<SupportRequestsViewProps> = ({ onViewDetail }) => {
    const [showExportModal, setShowExportModal] = useState(false);

    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
    const canExport = isSuperAdmin || canExportModule(permissions, 'support requests');

    const exportMutation = useExportSupportRequests();

    // Called when user clicks "Download" inside ExportModal → ExportDataCard
    const handleDownload = (config: { startDate: string; endDate: string; format: string; activeFilter: string }) => {
        const timelaps = QUICK_FILTER_MAP[config.activeFilter] ?? 'allTime';
        const format = config.format.toLowerCase().includes('csv') ? 'csv' : 'json';

        exportMutation.mutate(
            { format, timelaps, startDate: config.startDate, endDate: config.endDate },
            {
                onSuccess: (result) => {
                    // Programmatically trigger a file download from the returned S3 URL
                    const a = document.createElement('a');
                    a.href = result.fileUrl;
                    a.download = `support-requests.${format.toLowerCase()}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setShowExportModal(false);
                },
            }
        );
    };

    return (
        <div className="flex flex-col items-center w-full animate-in fade-in duration-700">
            <PageHeader
                title="Support Requests"
                description="Track and respond to user support messages, inquiries, and feedback submissions."
                primaryAction={canExport ? {
                    label: exportMutation.isPending ? 'Exporting...' : 'Export',
                    onClick: () => setShowExportModal(true),
                    icon: (
                        <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    )
                } : undefined}
            />

            <div className="w-full mt-[1.49vw] mb-[0.97vw]">
                <SupportStatsCards />
            </div>

            <div className="w-full">
                <SupportTable onAction={(action, ticket) => {
                    onViewDetail(ticket);
                }} />
            </div>

            <div className="h-[2.08vw]" />

            {/* Export Modal */}
            {showExportModal && (
                <ExportModal
                    onCancel={() => setShowExportModal(false)}
                    onDownload={handleDownload}
                />
            )}
        </div>
    );
};

export default SupportRequestsView;
