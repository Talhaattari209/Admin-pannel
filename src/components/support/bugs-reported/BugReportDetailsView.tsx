
import React, { useState } from 'react';
import { BugReportData } from './BugsReportedTableRow';

interface BugReportDetailsViewProps {
  bug: BugReportData | null;
  onBack: () => void;
}

const BugReportDetailsView: React.FC<BugReportDetailsViewProps> = ({ bug, onBack }) => {
  const [status, setStatus] = useState(bug?.status || 'New');
  const [notes, setNotes] = useState('');

  if (!bug) return null;

  const getStatusBadge = (s: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-[#5F00DB] text-white',
      'Pending': 'bg-[#F37600] text-white',
      'Reviewing': 'bg-[#0099FF] text-white',
      'Resolved': 'bg-[#3ADC60] text-black',
      'Closed': 'bg-[#FF4E4E] text-white',
    };
    return (
      <div className={`h-[32px] px-4 rounded-full text-[13px] font-bold not-italic flex items-center justify-center min-w-[84px] leading-none text-center ${colors[s] || 'bg-white/10 text-white'}`}>
        <span className="mt-[1px]">{s}</span>
      </div>
    );
  };

  const GradientLine = () => (
    <div className="h-[1px] w-full bg-gradient-to-r from-[#5F00DB] to-white opacity-40 mt-4 mb-8" />
  );

  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">

      {/* Window Header - No buttons on right as requested */}
      <div className="flex flex-row items-center gap-4 w-full h-[80px] mb-10">
        <button
          onClick={onBack}
          className="w-12 h-12 flex items-center justify-center bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex flex-col flex-grow">
          <h1 className="text-white text-[36px] font-bold not-italic tracking-tight">Bug Report Details</h1>
          <p className="text-[#CCCCCC] text-[16px] leading-[150%]">
            Review the report, inspect the bugs, and take appropriate action to maintain a smoother experience for your users.
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-6 w-full items-start">
        <div className="flex flex-col gap-6 flex-[3] min-w-0">

          {/* Reported Bug Card - With Vertical Scrolling */}
          <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px] max-h-[630px] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-[28px] font-bold not-italic leading-tight">Reported Bug</h3>
              {getStatusBadge(bug.status)}
            </div>
            <GradientLine />

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-white text-[12px] font-bold not-italic uppercase tracking-wider opacity-60">Subject</label>
                <p className="text-white text-[18px] font-normal not-italic">{bug.subject}</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white text-[12px] font-bold not-italic uppercase tracking-wider opacity-60">Message</label>
                <p className="text-white text-[18px] font-normal not-italic leading-relaxed opacity-90">{bug.message}</p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-white text-[12px] font-bold not-italic uppercase tracking-wider opacity-60">Attachments</label>
                <div className="flex flex-wrap gap-4">
                  {(bug.attachments || ['https://picsum.photos/320/320']).map((img, i) => (
                    <div
                      key={i}
                      className="relative w-[320px] h-[320px] rounded-[12px] border border-[#666666]/50 overflow-hidden group/img cursor-pointer"
                    >
                      <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" alt="Attachment" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px]">
            <h3 className="text-white text-[28px] font-bold not-italic">Activity</h3>
            <GradientLine />
            <div className="flex flex-col relative pl-8 gap-10">
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/20 rounded-full" />

              <div className="relative flex flex-col items-start gap-3">
                <div className="absolute -left-[30px] top-1 w-6 h-6 bg-[#5F00DB] rounded-full border-2 border-white z-10" />
                <span className="text-white text-[12px] font-bold not-italic uppercase tracking-wider">Reported Submitted</span>
                <span className="text-white/60 text-[16px]">{bug.submittedOn}</span>

                <div className="flex flex-col p-4 bg-[#16003F] border border-white/5 rounded-[16px] w-[245px] gap-3 mt-2 hover:border-[#5F00DB]/40 transition-colors cursor-pointer group/card">
                  <label className="text-white text-[12px] font-bold not-italic uppercase tracking-wider opacity-60">Submitted By</label>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${bug.reportedBy.avatar})` }} />
                    <div className="flex flex-col flex-grow min-w-0">
                      <span className="text-white text-[14px] font-semibold not-italic truncate">{bug.reportedBy.name}</span>
                      <span className="text-white/40 text-[11px] truncate">{bug.reportedBy.email}</span>
                    </div>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white opacity-40 group-hover/card:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="7 17 17 7 17 17 M17 7 7 7" strokeLinecap="round" strokeLinejoin="round" className="origin-center scale-75 rotate-[135deg]" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="flex-[1] flex flex-col gap-6 bg-[#222222] border border-[#666666]/30 rounded-[24px] p-8 sticky top-8 min-w-[320px]">
          <h3 className="text-white text-[28px] font-bold not-italic">Actions</h3>
          <GradientLine />
          <div className="flex flex-col gap-2">
            <label className="text-white text-[12px] font-bold not-italic uppercase tracking-wider">Status</label>
            <div className="relative border-b border-white py-2 group">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-transparent text-white text-[18px] appearance-none focus:outline-none cursor-pointer"
              >
                <option className="bg-[#222222]" value="New">New</option>
                <option className="bg-[#222222]" value="Pending">Pending</option>
                <option className="bg-[#222222]" value="Resolved">Resolved</option>
                <option className="bg-[#222222]" value="Closed">Closed</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/60 group-hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-grow mt-4">
            <label className="text-white text-[12px] font-bold not-italic uppercase tracking-wider">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type here.."
              className="w-full h-[180px] bg-transparent text-white text-[16px] leading-[150%] focus:outline-none border-b border-white py-2 resize-none placeholder:text-white/40"
            />
          </div>
          <button className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-semibold not-italic text-[16px] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all mt-4 cursor-pointer">
            Update Status
          </button>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default BugReportDetailsView;
