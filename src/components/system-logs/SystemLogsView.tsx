
import React, { useState } from 'react';
import SystemLogsTable from './SystemLogsTable';
import ExportModal from '../shared/ExportModal';
import { useAuthStore } from '@/store/auth-store';
import { canExportModule } from '@/utils/permissions';
import { useExportSystemLogs } from '@/services/system-logs';



const SystemLogsView: React.FC = () => {
    const [showExportModal, setShowExportModal] = useState(false);
    const { mutateAsync: exportLogs, isPending: isExporting } = useExportSystemLogs();

    // Permission checks
    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
    const canExport = isSuperAdmin || canExportModule(permissions, 'system logs');

    const handleDownload = async (config: { startDate: string; endDate: string; format: string; activeFilter: string }) => {
        try {
            console.log('Exporting System Logs:', config);

            // Map quick filter to backend 'timelaps' parameter
            const timelapsMap: Record<string, string> = {
                'Last 7 days': 'last7Days',
                'This Month': 'thisMonth',
                'Last Month': 'lastMonth',
                'Last 3 Months': 'last3Months',
                'Last 6 Months': 'last6Months',
                'This Year': 'thisYear',
                'Last Year': 'lastYear',
                'All Time': 'allTime'
            };

            const response = await exportLogs({
                format: config.format.toLowerCase(),
                timelaps: timelapsMap[config.activeFilter] || 'custom',
                startDate: config.startDate,
                endDate: config.endDate
            });

            if (response.fileUrl) {
                // Fetch the file to force download
                const fileResponse = await fetch(response.fileUrl);
                const blob = await fileResponse.blob();
                const downloadUrl = window.URL.createObjectURL(blob);

                // Get filename from URL
                const filename = response.fileUrl.split('/').pop() || `system-logs-${new Date().toISOString()}.${config.format.toLowerCase()}`;

                // Trigger download
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.remove();

                // Cleanup
                window.URL.revokeObjectURL(downloadUrl);
                setShowExportModal(false);
            }
        } catch (error) {
            console.error('Failed to export system logs:', error);
            // You might want to show a toast error here
        }
    };

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-500 overflow-x-hidden  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Header matching page header_css.txt */}
            <div className="flex flex-row items-end p-0 gap-[0.83vw] w-[79.17vw] h-[4.17vw] flex-none order-0 flex-grow-0">
                {/* Text */}
                <div className="flex flex-col justify-center items-start p-0 gap-[0.83vw] flex-1 h-[4.17vw] order-0">
                    {/* System Logs Title */}
                    <div className="w-[71.30vw] h-[2.08vw]  font-bold text-[1.875vw] leading-[110%] flex items-center tracking-[-0.04em] text-white flex-none order-1 self-stretch flex-grow-0">
                        System Logs
                    </div>
                    {/* Description */}
                    <div className="w-[71.30vw] h-[1.25vw]  font-normal text-[0.83vw] leading-[150%] flex items-center text-[#CCCCCC] flex-none order-2 self-stretch flex-grow-0">
                        Monitor key admin activities, security events, and automated system actions.
                    </div>
                </div>

                {/* Actions */}
                {canExport && (
                    <div className="flex flex-row items-center p-0 gap-[0.83vw] w-[7.03vw] h-[2.92vw] flex-none order-1 flex-grow-0 mr-[1.04vw] mb-[0.625vw]">
                        {/* Button - Export */}
                        <button
                            onClick={() => setShowExportModal(true)}
                            disabled={isExporting}
                            className="box-border flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.625vw] w-[7.03vw] h-[2.92vw] border border-white backdrop-blur-[6px] rounded-[2.71vw] flex-none order-0 flex-grow-0 drop-shadow-[0px_12px_40px_rgba(0,0,0,0.05)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="w-[2.66vw] h-[1.25vw]  font-medium text-[0.83vw] leading-[1.25vw] flex items-end text-center text-white flex-none order-1 flex-grow-0">
                                {isExporting ? '...' : 'Export'}
                            </span>
                            {/* Download Icon */}
                            <div className="w-[1.25vw] h-[1.25vw] flex-none order-2 flex-grow-0">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-full h-full'>
                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* Gap between Stats and Table: 1.25vw - Adjusted top margin since Stats are gone */}
            <div className="w-full mt-[1.25vw]">
                <SystemLogsTable />
            </div>

            <div className="h-[5vw]" />

            {/* Modals */}
            {showExportModal && (
                <ExportModal
                    onCancel={() => setShowExportModal(false)}
                    onDownload={handleDownload}
                />
            )}
        </div>
    );
};

export default SystemLogsView;

