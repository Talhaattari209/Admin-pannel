
import React, { useState } from 'react';
import UserReportedTable from './user-reported/UserReportedTable';
import BugsReportedTable from './bugs-reported/BugsReportedTable';
import { UserReportData } from './user-reported/UserReportedTableRow';
import { BugReportData } from './bugs-reported/BugsReportedTableRow';
import { Button } from '../shared/Button';

interface ReportedProblemViewProps {
    onViewReportDetail: (report: UserReportData) => void;
    onViewBugDetail: (bug: BugReportData) => void;
    onExport?: () => void;
}

const ReportedProblemView: React.FC<ReportedProblemViewProps> = ({
    onViewReportDetail,
    onViewBugDetail,
    onExport
}) => {
    const [activeTab, setActiveTab] = useState<'reported' | 'bugs'>('reported');

    const stats = [
        { label: 'Total User Reports', value: '248' },
        { label: 'Pending Review', value: '37' },
        { label: 'Resolved Reports', value: '197' },
        { label: 'Repeat Offenders', value: '8' }
    ];

    return (
        <div className="flex flex-col items-center w-full animate-in fade-in duration-700 font-['SF_Pro_Text']">
            {/* Header: align with PageHeader specs (h: 3.47vw, title: 2.25vw, mb: 1.49vw) */}
            <div className="flex flex-row items-end justify-between w-full h-[3.47vw] mb-[1.49vw] shrink-0">
                <div className="flex flex-col justify-center items-start gap-[0.83vw] max-w-[70vw]">
                    <h1 className="text-white text-[2.25vw] font-bold tracking-tight font-['Michroma'] leading-tight">Reported Problem</h1>
                    <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%] opacity-60 font-['SF_Pro_Text']">Review and resolve user reports on inappropriate content, messages, or behavior.</p>
                </div>
                <Button
                    onClick={onExport}
                    variant="glass"
                    className="!px-[1.25vw] !py-[0.83vw] h-[2.92vw] gap-[0.63vw] text-[0.83vw]"
                    iconRight={
                        <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    }
                >
                    Export
                </Button>
            </div>

            {/* Stats: align with StatCard specs (h: 4.54vw, padding: 0.6vw, gap: 0.6vw, mb: 1.25vw) */}
            <div className="flex flex-row gap-[0.83vw] w-full mb-[1.25vw] overflow-hidden shrink-0 flex-wrap lg:flex-nowrap">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col justify-end items-start p-[0.6vw] gap-[0.6vw] flex-1 lg:h-[4.54vw] min-w-[200px] bg-[#16003F] border border-[#666666]/30 rounded-[0.83vw] relative overflow-hidden group shadow-lg">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F00DB] opacity-10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>
                        <span className="text-white/80 text-[0.83vw] font-bold uppercase tracking-wider z-10 font-['SF_Pro_Text']">{stat.label}</span>
                        <span className="text-white text-[1.46vw] font-bold tracking-tight leading-none z-10 font-['SF_Pro_Text']">{stat.value}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-row gap-2 pl-4 w-full mb-[-1px] z-10 shrink-0">
                {[
                    { id: 'reported', label: 'Users Reported', count: 4 },
                    { id: 'bugs', label: 'Bugs Reported', count: 4 }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex flex-row items-center justify-center px-[2vw] py-[0.8vw] gap-2 h-[48px] rounded-t-[12px] transition-all font-medium text-[0.9vw] font-['SF_Pro_Text'] ${activeTab === tab.id ? 'bg-[#5F00DB] text-white' : 'bg-[#222222] text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {tab.label}
                        <div className="bg-[#FF4E4E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{tab.count}</div>
                    </button>
                ))}
            </div>

            <div className="w-full shrink-0">
                {activeTab === 'reported' && <UserReportedTable onViewDetail={onViewReportDetail} />}
                {activeTab === 'bugs' && <BugsReportedTable onViewDetail={onViewBugDetail} />}
            </div>

            <div className="h-[5vw]" />
        </div>
    );
};

export default ReportedProblemView;
