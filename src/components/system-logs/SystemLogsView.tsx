
import React, { useState } from 'react';
import SystemLogsTable from './SystemLogsTable';
import { PageHeader } from '../Headers';
import LogStats from './LogStats';
import ExportModal from '../shared/ExportModal';
import { Button } from '../shared/Button';

const SystemLogsView: React.FC = () => {
    const [showExportModal, setShowExportModal] = useState(false);

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-500 overflow-x-hidden font-['SF_Pro_Text']">
            <PageHeader
                title="System Logs"
                description="Monitor key admin activities, security events, and automated system actions."
                primaryAction={{
                    label: "Export",
                    onClick: () => setShowExportModal(true),
                    icon: (
                        <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    )
                }}
            />

            {/* Gap between Header and Stats: 1.49vw */}
            <div className="mt-[1.49vw] w-full">
                <LogStats />
            </div>

            {/* Gap between Stats and Table: 1.25vw */}
            <div className="w-full bg-[#222222] rounded-[0.83vw] border border-white/5 shadow-2xl overflow-hidden mt-[1.25vw]">
                <SystemLogsTable />
            </div>

            <div className="h-[5vw]" />

            {/* Modals */}
            {showExportModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <ExportModal
                        onCancel={() => setShowExportModal(false)}
                        onDownload={(config) => {
                            console.log('Exporting', config);
                            setShowExportModal(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default SystemLogsView;
