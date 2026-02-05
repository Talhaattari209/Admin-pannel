
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
            {/* Header: align with PageHeader specs */}
            <div className="flex flex-row items-end justify-between w-full h-[4.17vw] mb-[1.49vw] shrink-0 font-['SF_Pro_Text']">
                <div className="flex flex-col justify-center items-start gap-[0.83vw] max-w-[70vw]">
                    <h1 className="text-white text-[1.88vw] font-bold not-italic leading-[110%] tracking-[-0.04em]">Reported Problem</h1>
                    <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%] font-normal not-italic">Review and resolve user reports on inappropriate content, messages, or behavior.</p>
                </div>
                <div className="flex flex-row items-center gap-[0.83vw] h-[2.92vw]">
                    <Button
                        onClick={onExport}
                        variant="glass"
                        className="!px-[1.25vw] !py-[0.83vw] h-full gap-[0.63vw] text-[0.83vw] rounded-[2.71vw] border border-white backdrop-blur-[6px] shadow-[0px_12px_40px_rgba(0,0,0,0.05)] not-italic"
                        iconRight={
                            <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        }
                    >
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats: align with StatCard specs (h: 4.54vw, padding: 0.6vw, gap: 0.6vw) */}
            <div className="flex flex-row flex-nowrap items-center gap-[0.83vw] w-full mb-[1.25vw] font-['SF_Pro_Text']">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col justify-end items-start p-[0.6vw] gap-[0.6vw] flex-1 h-[4.54vw] bg-[rgba(22,0,63,0.5)] backdrop-blur-[12px] rounded-[0.83vw]">
                        <div className="flex items-center w-full h-[1vw]">
                            <span className="text-[#CCCCCC] font-bold not-italic text-[0.83vw] leading-[120%] tracking-[-0.04em]">{stat.label}</span>
                        </div>
                        <div className="flex flex-row justify-end items-center gap-[0.42vw] w-full h-[1.77vw]">
                            <span className="flex-grow text-white font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em]">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-row gap-[0.42vw] pl-[1.25vw] w-full mb-[-1px] z-10 shrink-0">
                {[
                    { id: 'reported', label: 'Users Reported', count: 4 },
                    { id: 'bugs', label: 'Bugs Reported', count: 4 }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex flex-row items-center justify-center px-[1.25vw] py-[0.63vw] gap-[0.42vw] h-[2.5vw] rounded-t-[0.63vw] transition-all font-medium not-italic text-[0.83vw] font-['SF_Pro_Text'] ${activeTab === tab.id ? 'bg-[#5F00DB] text-white' : 'bg-[#222222] text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {tab.label}
                        <div className="flex items-center justify-center bg-[#FF4E4E] text-white text-[0.63vw] font-bold not-italic min-w-[0.94vw] h-[0.94vw] px-[0.2vw] rounded-full">{tab.count}</div>
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
