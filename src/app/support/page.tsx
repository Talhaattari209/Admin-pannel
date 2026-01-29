
'use client';

import React, { useState } from 'react';
import SideNavigation from '@/components/SideNavigation';
// Relative imports to access components in google_build from src/app/support
// src/app/support -> ../ -> src/app -> ../ -> src -> ../ -> root -> google_build
import SupportRequestsView from '../../../google_build/components/support/SupportRequestsView';
import SupportTicketDetailView from '../../../google_build/components/support/SupportTicketDetailView';
import { SupportTicketData } from '../../../google_build/components/support/SupportTableRow';
import ExportModal from '@/components/shared/ExportModal';

export default function SupportPage() {
    const [selectedTicket, setSelectedTicket] = useState<SupportTicketData | null>(null);
    const [showExportModal, setShowExportModal] = useState(false);

    return (
        <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-['SF_Pro_Text'] text-white">
            {/* Background Layer */}
            <div
                className="fixed inset-0 z-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/8.png')` }}
            />

            {/* Sidebar */}
            <SideNavigation activeId="support-requests" />

            {/* Main Content */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto">
                <div className="flex flex-col items-start w-full max-w-[83.33vw] py-[2.08vw] px-[2.08vw] pl-[2.92vw]">
                    {selectedTicket ? (
                        <SupportTicketDetailView
                            ticket={selectedTicket}
                            onBack={() => setSelectedTicket(null)}
                        />
                    ) : (
                        <SupportRequestsView
                            onViewDetail={(ticket) => setSelectedTicket(ticket)}
                            onExport={() => setShowExportModal(true)}
                        />
                    )}
                </div>
            </main>

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
}
