import React, { useState } from 'react';
import StatusBadge from '../shared/StatusBadge';
import TabGroup from '../shared/TabGroup';

interface PokeActivity {
  id: string;
  user: { name: string; email: string; avatar: string };
  type: 'Profile' | 'Prompt' | 'Photo' | 'Video';
  details: string;
  status: 'Viewed' | 'Accepted' | 'Ignored';
  timestamp: string;
}

const MOCK_SENT_POKES: PokeActivity[] = [
  { id: 's1', user: { name: 'Jackson Scott', email: 'jacksonscott@email.com', avatar: 'https://i.pravatar.cc/150?u=jack' }, type: 'Profile', details: 'Would love to chat!', status: 'Viewed', timestamp: 'Dec 31, 2025 • 11:59 PM' },
  { id: 's2', user: { name: 'Emily Chen', email: 'emilychen@email.com', avatar: 'https://i.pravatar.cc/150?u=emily' }, type: 'Prompt', details: 'You seem awesome 😄', status: 'Accepted', timestamp: 'Jan 1, 2026 • 12:00 PM' },
  { id: 's3', user: { name: 'Michael Johnson', email: 'michaeljohnson@email.com', avatar: 'https://i.pravatar.cc/150?u=mike' }, type: 'Photo', details: 'That smile tho 😍', status: 'Ignored', timestamp: 'Jan 2, 2026 • 3:15 PM' },
  { id: 's4', user: { name: 'Sophia Brown', email: 'sophiabrown@email.com', avatar: 'https://i.pravatar.cc/150?u=sophia' }, type: 'Profile', details: 'Excited to collaborate!', status: 'Viewed', timestamp: 'Jan 3, 2026 • 9:45 AM' },
];

const MOCK_RECEIVED_POKES: PokeActivity[] = [
  { id: 'r1', user: { name: 'Liam Smith', email: 'liamsmith@email.com', avatar: 'https://i.pravatar.cc/150?u=liam' }, type: 'Prompt', details: "Let's brainstorm ideas!", status: 'Accepted', timestamp: 'Jan 4, 2026 • 2:30 PM' },
  { id: 'r2', user: { name: 'Ava Wilson', email: 'avawilson@email.com', avatar: 'https://i.pravatar.cc/150?u=ava' }, type: 'Video', details: 'Looking forward to your feedback!', status: 'Ignored', timestamp: 'Jan 5, 2026 • 10:00 AM' },
  { id: 'r3', user: { name: 'James Taylor', email: 'jamestaylor@email.com', avatar: 'https://i.pravatar.cc/150?u=james' }, type: 'Profile', details: 'Can we reschedule?', status: 'Viewed', timestamp: 'Jan 6, 2026 • 1:15 PM' },
  { id: 'r4', user: { name: 'Isabella Davis', email: 'isabelladavis@email.com', avatar: 'https://i.pravatar.cc/150?u=isabella' }, type: 'Prompt', details: 'Checking in on our last chat.', status: 'Accepted', timestamp: 'Jan 7, 2026 • 4:20 PM' },
];

const ProfilePokesContent: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'Sent' | 'Received'>('Sent');
  const currentData = activeSubTab === 'Sent' ? MOCK_SENT_POKES : MOCK_RECEIVED_POKES;

  const subTabs = [
    { id: 'Sent', label: 'Sent', count: 4 },
    { id: 'Received', label: 'Received', count: 4 }
  ];

  const ColumnHeader = ({ label, width = "auto", grow = false }: { label: string, width?: string, grow?: boolean }) => (
    <div className={`flex flex-row items-center gap-2 px-3 h-[38px] group cursor-pointer ${grow ? 'flex-grow' : ''}`} style={{ width: !grow ? width : undefined }}>
      <span className="text-white text-[12px] font-normal uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-inter">
        {label}
      </span>
      <div className="flex flex-col opacity-20 group-hover:opacity-100 transition-opacity shrink-0">
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-start gap-8 w-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 w-full border-b border-white/10 pb-6">
        <h3 className="text-white text-[28px] font-bold font-inter leading-tight">Pokes Activity</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60 font-inter">Track sent and received pokes, along with their context and outcomes.</p>
      </div>

      <TabGroup tabs={subTabs} activeId={activeSubTab} onChange={(id) => setActiveSubTab(id as any)} variant="sub" />

      <div className="w-full bg-[#111111] border border-[#666666]/50 rounded-[16px] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex flex-row items-center w-full h-[38px] bg-[#222222]/50 border-b border-white/10">
          <ColumnHeader label="User" width="200px" />
          <ColumnHeader label="Type" width="140px" />
          <ColumnHeader label="Details" grow />
          <ColumnHeader label="Status" width="140px" />
          <ColumnHeader label="Timestamp" width="200px" />
        </div>

        <div className="flex flex-col">
          {currentData.map((poke) => (
            <div key={poke.id} className="flex flex-row items-center w-full h-[56px] border-b border-[#666666]/20 bg-[#111111] hover:bg-white/[0.02] transition-colors shrink-0">
              <div className="w-[200px] h-full px-3 flex items-center gap-3 shrink-0">
                <div className="w-9 h-9 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${poke.user.avatar})` }} />
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-[14px] font-medium truncate leading-none mb-1 font-inter">{poke.user.name}</span>
                  <span className="text-white/40 text-[11px] truncate leading-none font-light font-inter">{poke.user.email}</span>
                </div>
              </div>
              <div className="w-[140px] px-3 text-white text-[14px] font-inter shrink-0">{poke.type}</div>
              <div className="flex-grow px-3 text-white text-[14px] font-inter truncate">"{poke.details}"</div>
              <div className="w-[140px] px-3 flex items-center shrink-0"><StatusBadge status={poke.status} size="sm" /></div>
              <div className="w-[200px] px-3 flex items-center gap-2 shrink-0">
                <span className="text-white text-[14px] font-inter">{poke.timestamp.split(' • ')[0]}</span>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-white text-[14px] font-inter opacity-60">{poke.timestamp.split(' • ')[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePokesContent;