
import React, { useState, useRef, useEffect } from 'react';
import SearchInput from '../prompts/SearchInput';
import AddRoleModal from './modals/AddRoleModal';
import RemoveConfirmModal from './modals/RemoveConfirmModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';

const MOCK_ROLES = [
  { id: '1', role: 'Admin', description: 'Full access to all system features, data, and configurations.', memberCount: 2 },
  { id: '2', role: 'Moderator', description: 'Oversees community interactions to maintain a safe and respectful environment.', memberCount: 1 },
  { id: '3', role: 'Support Agent', description: 'Handles user inquiries and technical issues.', memberCount: 1 },
  { id: '4', role: 'Editor', description: 'Manages and updates platform content such as prompts, FAQs, and general app information.', memberCount: 1 },
  { id: '5', role: 'Viewer', description: 'Read-only access to dashboards, analytics, and reports.', memberCount: 1 },
];

const RolesTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modal, setModal] = useState<null | 'EDIT_ROLE' | 'DELETE_ROLE' | 'SUCCESS_EDIT' | 'SUCCESS_DELETE'>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    };
    if (openMenuId) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const ColumnHeader = ({ label, width }: { label: string; width: string }) => (
    <div className="flex flex-row items-center gap-2 px-3 h-[38px] shrink-0 group cursor-pointer" style={{ width }}>
      <span className="text-white text-[12px] font-normal font-['SF_Pro_Text'] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
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
        <ColumnHeader label="Role" width="240px" />
        <ColumnHeader label="Description" width="992px" />
        <ColumnHeader label="Members" width="240px" />
        <div className="w-[48px] shrink-0" />
      </div>

      {/* Rows: Exactly 56px height per CSS */}
      <div className="flex flex-col">
        {MOCK_ROLES.map((role) => (
          <div 
            key={role.id} 
            className={`flex flex-row items-center w-full h-[56px] border-b border-[#666666]/50 bg-[#222222] hover:bg-white/5 transition-colors relative ${openMenuId === role.id ? 'z-50' : 'z-10'}`}
          >
            <div className="w-[240px] px-3 text-white text-[14px] font-['SF_Pro_Text'] truncate shrink-0">{role.role}</div>
            <div className="w-[992px] px-3 text-white text-[14px] font-['SF_Pro_Text'] truncate shrink-0">{role.description}</div>
            <div className="w-[240px] px-3 text-white text-[14px] font-['SF_Pro_Text'] shrink-0">{role.memberCount}</div>
            
            <div className="w-[48px] h-[56px] flex items-center justify-center shrink-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === role.id ? null : role.id);
                }} 
                className="w-8 h-8 flex items-center justify-center rounded-[52px] hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <svg viewBox="0 0 16 16" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="3" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="currentColor"/></svg>
              </button>
            </div>

            {openMenuId === role.id && (
              <div 
                ref={menuRef} 
                className="absolute top-[85%] right-4 w-[240px] bg-[#1a1a1a] border border-[#666666]/50 rounded-[16px] shadow-2xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-white/5"
              >
                <button onClick={() => { setModal('EDIT_ROLE'); setOpenMenuId(null); }} className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/5 group transition-colors">
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    <span className="text-white text-[16px] font-['SF_Pro_Text']">Edit Role</span>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <button onClick={() => { setModal('DELETE_ROLE'); setOpenMenuId(null); }} className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/5 group transition-colors text-[#FF4E4E]">
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    <span className="text-[16px] font-['SF_Pro_Text']">Delete Role</span>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF4E4E]/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {modal === 'EDIT_ROLE' && <AddRoleModal onCancel={() => setModal(null)} onAdd={() => setModal('SUCCESS_EDIT')} initialData={{ role: 'Admin', description: 'Full access to all system features.' }} />}
      {modal === 'DELETE_ROLE' && <RemoveConfirmModal type="role" onCancel={() => setModal(null)} onConfirm={() => setModal('SUCCESS_DELETE')} />}
      {modal === 'SUCCESS_EDIT' && <TeamRolesSuccessModal title="Role Updated" onDone={() => setModal(null)} />}
      {modal === 'SUCCESS_DELETE' && <TeamRolesSuccessModal title="Role Deleted" onDone={() => setModal(null)} />}
    </div>
  );
};

export default RolesTable;
