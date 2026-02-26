'use client';

import React, { useState, useMemo } from 'react';
import ReportedProblemView from '@/components/reported-problem/ReportedProblemView';
import UserReportDetailsView from '@/components/reported-problem/user-reported/UserReportDetailsView';
import BugReportDetailsView from '@/components/reported-problem/bugs-reported/BugReportDetailsView';
import { UserReportData } from '@/components/reported-problem/user-reported/UserReportedTableRow';
import { BugReportData } from '@/components/reported-problem/bugs-reported/BugsReportedTableRow';
import ExportModal from '@/components/shared/ExportModal';
import DeactivationCard from '@/components/pop-cards/DeactivationCard';
import SuccessCard from '@/components/pop-cards/SuccessCard';
import { downloadFileFromUrl } from '@/utils/download';
import {
    useUserReportDetail,
    useBugReportDetail,
    useUpdateUserReportStatus,
    useUpdateBugReportStatus,
    useExportUserReports,
    useExportBugReports,
    useWarnUser,
    useUpdateAccountStatus,
    activeFilterToTimelaps,
} from '@/services/reported-problems';

export default function ReportedProblemsPage() {
    const [viewState, setViewState] = useState<'list' | 'user-detail' | 'bug-detail'>('list');
    const [selectedUserReport, setSelectedUserReport] = useState<UserReportData | null>(null);
    const [selectedBugReport, setSelectedBugReport] = useState<BugReportData | null>(null);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [exportType, setExportType] = useState<'users' | 'bugs'>('users');
    const [isDeactivationModalOpen, setIsDeactivationModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

    const { data: userReportDetail } = useUserReportDetail(selectedUserReport?.id ?? null);
    const { data: bugReportDetail } = useBugReportDetail(selectedBugReport?.id ?? null);

    const updateUserStatus = useUpdateUserReportStatus();
    const updateBugStatus = useUpdateBugReportStatus();
    const exportUserReports = useExportUserReports();
    const exportBugReports = useExportBugReports();
    const warnUserMutation = useWarnUser();
    const accountStatusMutation = useUpdateAccountStatus();

    const userReportToShow = useMemo((): UserReportData | null => {
        if (!selectedUserReport) return null;
        const age = userReportDetail?.reportedUser?.age ?? selectedUserReport.reportedUser.age;
        return {
            ...selectedUserReport,
            reportedUser: { ...selectedUserReport.reportedUser, age },
        };
    }, [selectedUserReport, userReportDetail]);

    const handleViewUserReport = (report: UserReportData) => { setSelectedUserReport(report); setViewState('user-detail'); };
    const handleViewBugReport = (bug: BugReportData) => { setSelectedBugReport(bug); setViewState('bug-detail'); };
    const handleBack = () => { setViewState('list'); setSelectedUserReport(null); setSelectedBugReport(null); };

    const handleOpenExport = (type: 'users' | 'bugs') => {
        setExportType(type);
        setIsExportModalOpen(true);
    };

    const confirmDeactivation = () => {
        if (!selectedUserReport?.id) {
            setIsDeactivationModalOpen(false);
            return;
        }
        accountStatusMutation.mutate(
            { reportId: selectedUserReport.id, status: 'deactivate' },
            {
                onSuccess: () => {
                    setIsDeactivationModalOpen(false);
                    setSuccessMessage({ title: "User Deactivated", description: "The account has been successfully deactivated. You can reactivate it anytime from the user's detail page." });
                    setIsSuccessModalOpen(true);
                },
            }
        );
    };

    const handleWarnUser = () => {
        if (!selectedUserReport?.id) return;
        warnUserMutation.mutate(
            { reportId: selectedUserReport.id },
            {
                onSuccess: () => {
                    setSuccessMessage({ title: "User Warned", description: "A warning has been sent to the user successfully." });
                    setIsSuccessModalOpen(true);
                },
            }
        );
    };

    const handleUpdateUserStatus = (status: string, notes: string) => {
        if (!selectedUserReport?.id) return;
        updateUserStatus.mutate(
            { id: selectedUserReport.id, status, notes },
            {
                onSuccess: () => {
                    setSelectedUserReport((prev) => prev ? { ...prev, status: status as UserReportData['status'] } : null);
                    setSuccessMessage({ title: "Status Updated", description: `The report status has been updated to ${status}.` });
                    setIsSuccessModalOpen(true);
                },
            }
        );
    };

    const handleUpdateBugStatus = (status: string, notes: string) => {
        if (!selectedBugReport?.id) return;
        updateBugStatus.mutate(
            { id: selectedBugReport.id, status, notes },
            {
                onSuccess: () => {
                    setSelectedBugReport((prev) => prev ? { ...prev, status: status as BugReportData['status'] } : null);
                    setSuccessMessage({ title: "Status Updated", description: `The report status has been updated to ${status}.` });
                    setIsSuccessModalOpen(true);
                },
            }
        );
    };

    const handleExportDownload = (config: { startDate: string; endDate: string; format: string; activeFilter: string }) => {
        const timelaps = activeFilterToTimelaps[config.activeFilter] || 'allTime';
        const format = (config.format || 'JSON').toLowerCase() === 'csv' ? 'csv' : 'json';
        const params = { format, timelaps, startDate: config.startDate, endDate: config.endDate };

        const dateStr = new Date().toISOString().split('T')[0];

        if (exportType === 'users') {
            exportUserReports.mutate(params, {
                onSuccess: (data) => {
                    if (data?.fileUrl) {
                        downloadFileFromUrl(data.fileUrl, `user-reports-${dateStr}.${format}`);
                    }
                    setIsExportModalOpen(false);
                },
            });
        } else {
            exportBugReports.mutate(params, {
                onSuccess: (data) => {
                    if (data?.fileUrl) {
                        downloadFileFromUrl(data.fileUrl, `bug-reports-${dateStr}.${format}`);
                    }
                    setIsExportModalOpen(false);
                },
            });
        }
    };

    return (
        <>
            <div className="w-full px-[2.08vw] pt-[1.77vw] pb-[2.08vw]">
                {viewState === 'list' && (
                    <ReportedProblemView
                        onViewReportDetail={handleViewUserReport}
                        onViewBugDetail={handleViewBugReport}
                        onExport={handleOpenExport}
                    />
                )}
                {viewState === 'user-detail' && (
                    <UserReportDetailsView
                        report={userReportToShow}
                        onBack={handleBack}
                        onDeactivate={() => setIsDeactivationModalOpen(true)}
                        onUpdateStatus={handleUpdateUserStatus}
                        onWarnUser={handleWarnUser}
                    />
                )}
                {viewState === 'bug-detail' && (
                    <BugReportDetailsView
                        bug={selectedBugReport}
                        onBack={handleBack}
                        onUpdateStatus={handleUpdateBugStatus}
                    />
                )}
            </div>

            {isExportModalOpen && (
                <ExportModal
                    onCancel={() => setIsExportModalOpen(false)}
                    onDownload={handleExportDownload}
                />
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
