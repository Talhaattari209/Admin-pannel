
import React, { useState, useRef, useEffect } from 'react';
import SearchInput from '../prompts/SearchInput';
import ChangeRoleModal from './modals/ChangeRoleModal';
import RemoveConfirmModal from './modals/RemoveConfirmModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';

const MOCK_MEMBERS = [
  { id: '1', name: 'Liam Martinez', email: 'liammartinez@email.com', role: 'Admin', status: 'Active', addedOn: 'Jun 30, 2025 • 3:30 PM', lastActive: 'Jun 30, 2025 • 3:30 PM' },
  { id: '2', name: 'Jane Smith', email: 'janesmith@email.com', role: 'Moderator', status: 'Disabled', addedOn: 'Jan 15, 2026 • 10:00 AM', lastActive: 'Jan 15, 2026 • 10:00 AM' },
  { id: '3', name: 'Michael Brown', email: 'michaelbrown@email.com', role: 'Support Agent', status: 'Invited', addedOn: 'Feb 20, 2025 • 2:30 PM', lastActive: 'Feb 20, 2025 • 2:30 PM' },
  { id: '4', name: 'Emily Davis', email: 'emilydavis@email.com', role: 'Editor', status: 'Active', addedOn: 'Mar 10, 2026 • 8:00 AM', lastActive: 'Mar 10, 2026 • 8:00 AM' },
  { id: '5', name: 'James Wilson', email: 'jameswilson@email.com', role: 'Viewer', status: 'Disabled', addedOn: 'Apr 5, 2026 • 12:15 PM', lastActive: 'Apr 5, 2026 • 12:15 PM' },
];

const TeamMembersTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modal, setModal] = useState<null | 'CHANGE_ROLE' | 'REMOVE_CONFIRM' | 'SUCCESS_REMOVE' | 'SUCCESS_UPDATED'>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    };
    if (openMenuId) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-[#3ADC60] text-[#000000]';
      case 'Disabled': return 'bg-[#FF4E4E] text-[#FFFFFF]';
      case 'Invited': return 'bg-[#5F00DB] text-[#FFFFFF]';
      default: return 'bg-white/10 text-white';
    }
  };

  const getStatusWidth = (status: string) => {
    switch (status) {
      case 'Active': return '65px';
      case 'Disabled': return '82px';
      case 'Invited': return '69px';
      default: return 'auto';
    }
  };

  const ColumnHeader = ({ label, width }: { label: string; width: string }) => (
    <div className="flex flex-row items-center gap-2 px-[12px] h-[38px] group cursor-pointer shrink-0" style={{ width }}>
      <span className="text-white text-[12px] font-normal uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-['SF_Pro_Text']">
        {label}
      </span>
      <div className="flex flex-col opacity-20 group-hover:opacity-100 transition-opacity shrink-0">
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full min-w-[1520px] pb-40">
      {/* Table Header: Search bar only */}
      <div className="p-4 bg-[#1a1a1a]/30 border-b border-white/10">
        <SearchInput value={search} onChange={setSearch} placeholder="Search" />
      </div>

      {/* Column Headers: 1520px wide */}
      <div className="flex flex-row items-center w-full h-[38px] bg-[#1a1a1a]/50">
        <ColumnHeader label="Name" width="245.33px" />
        <ColumnHeader label="Email" width="245.33px" />
        <ColumnHeader label="Role" width="245.33px" />
        <ColumnHeader label="Status" width="245.33px" />
        <ColumnHeader label="Added On" width="245.33px" />
        <ColumnHeader label="Last Active" width="245.33px" />
        <div className="w-[48px] shrink-0" />
      </div>

      {/* Rows: Exactly 56px height per CSS */}
      <div className="flex flex-col">
        {MOCK_MEMBERS.map((member) => (
          <div 
            key={member.id} 
            className={`flex flex-row items-center w-full h-[56px] border-b border-[#666666]/50 bg-[#222222] hover:bg-white/5 transition-colors relative ${openMenuId === member.id ? 'z-50' : 'z-10'}`}
          >
            <div className="w-[245.33px] px-[12px] text-white text-[14px] font-['SF_Pro_Text'] leading-[16px] truncate shrink-0">{member.name}</div>
            <div className="w-[245.33px] px-[12px] text-white text-[14px] font-['SF_Pro_Text'] leading-[16px] truncate shrink-0">{member.email}</div>
            <div className="w-[245.33px] px-[12px] text-white text-[14px] font-['SF_Pro_Text'] leading-[16px] truncate shrink-0">{member.role}</div>
            
            {/* Status Cell */}
            <div className="w-[245.33px] px-[12px] flex items-center shrink-0">
              <div 
                className={`flex flex-row justify-center items-center px-[12px] py-[8px] h-[32px] rounded-[16px] text-[14px] font-normal leading-[16px] font-['SF_Pro_Text'] isolation-auto ${getStatusStyle(member.status)}`}
                style={{ width: getStatusWidth(member.status) }}
              >
                <span className="flex items-center">{member.status}</span>
              </div>
            </div>

            <div className="w-[245.33px] px-[12px] flex items-center gap-[8px] shrink-0">
              <span className="text-white text-[14px] font-['SF_Pro_Text'] leading-[16px]">{member.addedOn.split(' • ')[0]}</span>
              <div className="w-[3px] h-[3px] bg-white rounded-[4px] shrink-0" />
              <span className="text-white text-[14px] font-['SF_Pro_Text'] leading-[16px]">{member.addedOn.split(' • ')[1]}</span>
            </div>
            
            <div className="w-[245.33px] px-[12px] flex items-center gap-[8px] shrink-0">
              <span className="text-white text-[14px] font-['SF_Pro_Text'] leading-[16px]">{member.lastActive.split(' • ')[0]}</span>
              <div className="w-[3px] h-[3px] bg-white rounded-[4px] shrink-0" />
              <span className="text-white text-[14px] font-['SF_Pro_Text'] leading-[16px]">{member.lastActive.split(' • ')[1]}</span>
            </div>
            
            <div className="w-[48px] h-[56px] flex items-center justify-center shrink-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === member.id ? null : member.id);
                }} 
                className="w-8 h-8 flex items-center justify-center rounded-[52px] hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <svg viewBox="0 0 16 16" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="3" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="currentColor"/></svg>
              </button>
            </div>

            {openMenuId === member.id && (
              <div 
                ref={menuRef} 
                className="absolute top-[85%] right-4 w-[280px] bg-[#1a1a1a] border border-[#666666]/50 rounded-[16px] shadow-2xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-white/5"
              >
                <button onClick={() => { setModal('CHANGE_ROLE'); setOpenMenuId(null); }} className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/5 group transition-colors">
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    <span className="text-white text-[16px] font-['SF_Pro_Text']">Change Role</span>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <button onClick={() => { setModal('REMOVE_CONFIRM'); setOpenMenuId(null); }} className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/5 group transition-colors">
                  <div className="flex items-center gap-4 text-[#FF4E4E]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    <span className="text-[16px] font-['SF_Pro_Text']">Remove Team Member</span>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF4E4E]/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {modal === 'CHANGE_ROLE' && <ChangeRoleModal onCancel={() => setModal(null)} onUpdate={() => setModal('SUCCESS_UPDATED')} />}
      {modal === 'REMOVE_CONFIRM' && <RemoveConfirmModal type="member" onCancel={() => setModal(null)} onConfirm={() => setModal('SUCCESS_REMOVE')} />}
      {modal === 'SUCCESS_REMOVE' && <TeamRolesSuccessModal title="Team Member Removed" onDone={() => setModal(null)} />}
      {modal === 'SUCCESS_UPDATED' && <TeamRolesSuccessModal title="Role Updated" onDone={() => setModal(null)} />}
    </div>
  );
};

export default TeamMembersTable;
