'use client';

import React, { useState } from 'react';
import ReportedProblemView from '@/components/reported-problem/ReportedProblemView';
import UserReportDetailsView from '@/components/reported-problem/user-reported/UserReportDetailsView';
import BugReportDetailsView from '@/components/reported-problem/bugs-reported/BugReportDetailsView';
import { UserReportData } from '@/components/reported-problem/user-reported/UserReportedTableRow';
import { BugReportData } from '@/components/reported-problem/bugs-reported/BugsReportedTableRow';
import ExportModal from '@/components/shared/ExportModal';
import DeactivationCard from '@/components/pop-cards/DeactivationCard';
import SuccessCard from '@/components/pop-cards/SuccessCard';

export default function ReportedProblemsPage() {
    const [viewState, setViewState] = useState<'list' | 'user-detail' | 'bug-detail'>('list');
    const [selectedUserReport, setSelectedUserReport] = useState<UserReportData | null>(null);
    const [selectedBugReport, setSelectedBugReport] = useState<BugReportData | null>(null);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isDeactivationModalOpen, setIsDeactivationModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

    const handleViewUserReport = (report: UserReportData) => { setSelectedUserReport(report); setViewState('user-detail'); };
    const handleViewBugReport = (bug: BugReportData) => { setSelectedBugReport(bug); setViewState('bug-detail'); };
    const handleBack = () => { setViewState('list'); setSelectedUserReport(null); setSelectedBugReport(null); };

    const confirmDeactivation = () => {
        setIsDeactivationModalOpen(false);
        setSuccessMessage({ title: "User Deactivated", description: "The account has been successfully deactivated. You can reactivate it anytime from the user's detail page." });
        setIsSuccessModalOpen(true);
    };

    const handleUpdateStatus = (status: string, notes: string) => {
        console.log("Updating status to", status, "with notes:", notes);
        setSuccessMessage({ title: "Status Updated", description: `The report status has been updated to ${status}.` });
        setIsSuccessModalOpen(true);
    };

    return (
        <>
            <div className="w-full px-[2.08vw] pt-[1.77vw] pb-[2.08vw]">
                {viewState === 'list' && (
                    <ReportedProblemView
                        onViewReportDetail={handleViewUserReport}
                        onViewBugDetail={handleViewBugReport}
                        onExport={() => setIsExportModalOpen(true)}
                    />
                )}
                {viewState === 'user-detail' && (
                    <UserReportDetailsView
                        report={selectedUserReport}
                        onBack={handleBack}
                        onDeactivate={() => setIsDeactivationModalOpen(true)}
                        onUpdateStatus={handleUpdateStatus}
                    />
                )}
                {viewState === 'bug-detail' && (
                    <BugReportDetailsView bug={selectedBugReport} onBack={handleBack} />
                )}
            </div>

            {isExportModalOpen && (
                <ExportModal onCancel={() => setIsExportModalOpen(false)} onDownload={(config) => { console.log('Exporting', config); setIsExportModalOpen(false); }} />
            )}
            {isDeactivationModalOpen && (
                <DeactivationCard onCancel={() => setIsDeactivationModalOpen(false)} onDeactivate={confirmDeactivation} />
            )}
            {isSuccessModalOpen && (
                <SuccessCard onDone={() => setIsSuccessModalOpen(false)} title={successMessage.title} description={successMessage.description} />
            )}
        </>
    );
}
