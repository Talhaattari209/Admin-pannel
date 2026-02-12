
import React, { useState } from 'react';
import { SupportTicketData } from './SupportTableRow';

interface SupportTicketDetailViewProps {
  ticket: SupportTicketData | null;
  onBack: () => void;
}

const SupportTicketDetailView: React.FC<SupportTicketDetailViewProps> = ({ ticket, onBack }) => {
  const [status, setStatus] = useState(ticket?.status || 'New');
  const [notes, setNotes] = useState('');

  if (!ticket) return null;

  const getStatusBadge = (s: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-[#5F00DB] text-white',
      'Pending': 'bg-[#F37600] text-white',
      'Reviewing': 'bg-[#0099FF] text-white',
      'Resolved': 'bg-[#3ADC60] text-black',
      'Closed': 'bg-[#FF4E4E] text-white',
    };
    return (
      <div className={`h-[32px] px-4 rounded-full text-[13px] font-bold flex items-center justify-center min-w-[84px] leading-none text-center ${colors[s] || 'bg-white/10 text-white'}`}>
        <span className="mt-[1px]">{s}</span>
      </div>
    );
  };

  const GradientLine = () => (
    <div className="h-[1px] w-full bg-gradient-to-r from-[#5F00DB] to-white opacity-40 mt-4 mb-8" />
  );

  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">

      {/* Profile Details Header */}
      <div className="flex flex-row items-center gap-4 w-full h-[80px] mb-10">
        <button
          onClick={onBack}
          className="w-12 h-12 flex items-center justify-center bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className="w-[80px] h-[80px] rounded-full bg-cover bg-center border-2 border-[#5F00DB]"
          style={{ backgroundImage: `url(${ticket.user.avatar})` }}
        />

        <div className="flex flex-col flex-grow">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-[36px] font-bold tracking-tight">{ticket.user.name}, {ticket.user.age}</h1>
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#5F00DB]" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Straight', 'He/Him', 'Austin, TX', '2 miles', 'Stanford University', 'Software Engineer'].map((chip, idx) => (
              <div key={chip} className="px-3 py-1 bg-[#5F00DB] rounded-full text-white text-[12px] font-medium backdrop-blur-[6px]">
                {chip}
              </div>
            ))}
          </div>
        </div>

        <button className="px-8 py-4 border border-white rounded-[52px] text-white font-medium hover:bg-white/10 transition-all">
          View User's Profile
        </button>
      </div>

      {/* Main Layout Row - Details/Activity (1136px) : Actions (368px) */}
      <div className="flex flex-row gap-4 w-full items-start justify-center">

        {/* Left Column: Details & Activity */}
        <div className="flex flex-col gap-8 w-full max-w-[1136px] flex-shrink">

          {/* Support Ticket Details Card */}
          <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px]">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-[28px] font-bold leading-tight">Support Ticket Details</h3>
              {getStatusBadge(ticket.status)}
            </div>
            <GradientLine />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Subject</label>
                <p className="text-white text-[18px] font-normal">{ticket.subject}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Message</label>
                <p className="text-white text-[18px] font-normal leading-relaxed opacity-90">{ticket.message}</p>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="flex flex-col p-8 bg-[#222222] border border-[#666666]/30 rounded-[24px]">
            <h3 className="text-white text-[28px] font-bold">Activity</h3>
            <GradientLine />
            <div className="flex flex-col relative pl-8 gap-10">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/20 rounded-full" />

              {[
                { label: 'Ticket Created', time: 'Jan 11, 2026 • 11:59 PM', content: null },
                {
                  label: 'Status Updated', time: 'Jan 11, 2026 • 11:59 PM', content: (
                    <div className="flex items-center gap-4 mt-2">
                      {getStatusBadge('New')}
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white opacity-40" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                      {getStatusBadge('Pending')}
                    </div>
                  )
                },
                {
                  label: 'Status Updated', time: 'Jan 11, 2026 • 11:59 PM', content: (
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="flex items-center gap-4">
                        {getStatusBadge('Pending')}
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white opacity-40" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                        {getStatusBadge('Resolved')}
                      </div>
                      <div className="bg-[#16003F] p-4 rounded-[12px] border border-white/5 inline-block self-start italic text-white/80 text-[14px]">
                        "No proof found in this report."
                      </div>
                    </div>
                  )
                }
              ].map((act, i) => (
                <div key={i} className="relative flex flex-col items-start gap-2">
                  <div className="absolute -left-[30px] top-1 w-6 h-6 bg-[#5F00DB] rounded-full border-2 border-white flex items-center justify-center z-10" />
                  <span className="text-white text-[12px] font-bold uppercase tracking-wider">{act.label}</span>
                  <span className="text-white/60 text-[16px]">{act.time}</span>
                  {act.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions Sidebar (368px) */}
        <div className="flex flex-col gap-[10px] w-[368px] shrink-0 sticky top-8">
          <div className="flex flex-col p-4 gap-4 bg-[#222222] border border-[#666666]/50 rounded-[16px] h-[426px]">
            <h3 className="text-white text-[28px] font-bold">Actions</h3>
            <GradientLine />

            {/* Status Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-[12px] font-bold uppercase tracking-wider">Status</label>
              <div className="relative border-b border-white py-2 group">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-transparent text-white text-[18px] appearance-none focus:outline-none cursor-pointer"
                >
                  <option className="bg-[#222222]" value="New">New</option>
                  <option className="bg-[#222222]" value="Pending">Pending</option>
                  <option className="bg-[#222222]" value="Reviewing">Reviewing</option>
                  <option className="bg-[#222222]" value="Resolved">Resolved</option>
                  <option className="bg-[#222222]" value="Closed">Closed</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/60 group-hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
            </div>

            {/* Notes Textarea */}
            <div className="flex flex-col gap-2 flex-grow mt-4">
              <label className="text-white text-[12px] font-bold uppercase tracking-wider">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type here.."
                className="w-full h-[180px] bg-transparent text-white text-[16px] leading-[150%] focus:outline-none border-b border-white py-2 resize-none placeholder:text-white/40"
              />
            </div>

            {/* Update Button */}
            <button
              className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-semibold text-[16px] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all mt-4"
            >
              Update Status
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportTicketDetailView;
