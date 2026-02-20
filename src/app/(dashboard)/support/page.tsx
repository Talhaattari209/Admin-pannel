'use client';

import React, { useState } from 'react';
import SupportRequestsView from '@/components/support/SupportRequestsView';
import SupportTicketDetailView from '@/components/support/SupportTicketDetailView';
import { SupportTicketData } from '@/components/support/SupportTableRow';
import ExportModal from '@/components/shared/ExportModal';

export default function SupportPage() {
    const [selectedTicket, setSelectedTicket] = useState<SupportTicketData | null>(null);
    const [showExportModal, setShowExportModal] = useState(false);

    return (
        <>
            <div className="flex flex-col items-start w-full max-w-[83.33vw] px-[2.08vw] py-[2.08vw]">
                {selectedTicket ? (
                    <SupportTicketDetailView ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
                ) : (
                    <SupportRequestsView
                        onViewDetail={(ticket) => setSelectedTicket(ticket)}
                        onExport={() => setShowExportModal(true)}
                    />
                )}
            </div>

            {showExportModal && (
                <ExportModal
                    onCancel={() => setShowExportModal(false)}
                    onDownload={(config) => {
                        console.log('Exporting', config);
                        setShowExportModal(false);
                    }}
                />
            )}
        </>
    );
}
