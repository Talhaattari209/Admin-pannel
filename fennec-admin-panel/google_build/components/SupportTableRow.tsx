import React, { useState, useRef, useEffect } from 'react';
import StatusBadge from './shared/StatusBadge';

export interface SupportTicketData {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
    age: number;
  };
  subject: string;
  message: string;
  status: 'New' | 'Pending' | 'Reviewing' | 'Resolved' | 'Closed';
  timestamp: string;
}

interface SupportTableRowProps {
  data: SupportTicketData;
  onAction: (action: 'DETAILS' | 'STATUS' | 'PROFILE', data: SupportTicketData) => void;
}

const SupportTableRow: React.FC<SupportTableRowProps> = ({ data, onAction }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="group flex flex-row items-center w-full h-[72px] bg-[#222222] border-b border-[#666666]/20 hover:bg-white/[0.02] transition-colors relative shrink-0">
      <div className="w-[200px] px-4 flex items-center gap-3 shrink-0">
        <div 
          className="w-10 h-10 rounded-full bg-cover bg-center border border-white/10 shrink-0" 
          style={{ backgroundImage: `url(${data.user.avatar})` }}
        />
        <div className="flex flex-col min-w-0">
          <span className="text-white text-[14px] font-semibold truncate leading-none mb-1 font-inter">{data.user.name}</span>
          <span className="text-white/40 text-[11px] font-light truncate leading-none font-inter">{data.user.email}</span>
        </div>
      </div>

      <div className="flex-[1] px-4 min-w-0">
        <p className="text-white text-[14px] font-medium truncate font-inter">{data.subject}</p>
      </div>

      <div className="flex-[1] px-4 min-w-0">
        <p className="text-white/60 text-[14px] font-normal truncate font-inter">{data.message}</p>
      </div>

      <div className="w-[140px] px-4 flex items-center shrink-0">
        <StatusBadge status={data.status} size="sm" />
      </div>

      <div className="w-[220px] px-4 flex items-center gap-2 shrink-0">
        <span className="text-white text-[14px] font-inter">{data.timestamp.split(' • ')[0]}</span>
        <div className="w-[3px] h-[3px] bg-white rounded-full opacity-40" />
        <span className="text-white text-[14px] opacity-40 font-inter">{data.timestamp.split(' • ')[1]}</span>
      </div>

      <div className="w-[60px] px-2 flex justify-center relative shrink-0">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-full transition-colors ${isMenuOpen ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="absolute top-[80%] right-full mr-2 w-[240px] bg-[#1a1a1a] border border-[#666666]/50 rounded-[16px] shadow-2xl z-[60] overflow-hidden py-2 animate-in fade-in slide-in-from-right-2 duration-200">
             <button onClick={() => { onAction('DETAILS', data); setIsMenuOpen(false); }} className="flex items-center w-full px-4 py-3 gap-4 hover:bg-white/5 transition-colors text-left text-white text-[14px] font-inter"><svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>View Details</button>
             <button onClick={() => { onAction('PROFILE', data); setIsMenuOpen(false); }} className="flex items-center w-full px-4 py-3 gap-4 hover:bg-white/5 transition-colors text-left text-white text-[14px] font-inter"><svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>View Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTableRow;