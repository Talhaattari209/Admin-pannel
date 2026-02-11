import React, { useState, useRef, useEffect } from 'react';
import ChangeRoleModal from './modals/ChangeRoleModal';
import RemoveConfirmModal from './modals/RemoveConfirmModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';
import { TableFrame, SearchBar, Pagination, FilterSelect } from '../shared/TableComponents';

const MOCK_MEMBERS = [
    { id: '1', name: 'Liam Martinez', email: 'liammartinez@email.com', role: 'Admin', status: 'Active', addedOn: 'Jun 30, 2025 • 3:30 PM', lastActive: 'Jun 30, 2025 • 3:30 PM' },
    { id: '2', name: 'Jane Smith', email: 'janesmith@email.com', role: 'Moderator', status: 'Disabled', addedOn: 'Jan 15, 2026 • 10:00 AM', lastActive: 'Jan 15, 2026 • 10:00 AM' },
    { id: '3', name: 'Michael Brown', email: 'michaelbrown@email.com', role: 'Support Agent', status: 'Invited', addedOn: 'Feb 20, 2025 • 2:30 PM', lastActive: 'Feb 20, 2025 • 2:30 PM' },
    { id: '4', name: 'Emily Davis', email: 'emilydavis@email.com', role: 'Editor', status: 'Active', addedOn: 'Mar 10, 2026 • 8:00 AM', lastActive: 'Mar 10, 2026 • 8:00 AM' },
    { id: '5', name: 'James Wilson', email: 'jameswilson@email.com', role: 'Viewer', status: 'Disabled', addedOn: 'Apr 5, 2026 • 12:15 PM', lastActive: 'Apr 5, 2026 • 12:15 PM' },
];

const TeamMembersTable: React.FC = () => {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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
            case 'Active': return '3.13vw';
            case 'Disabled': return '3.9vw';
            case 'Invited': return '3.38vw';
            default: return 'auto';
        }
    };

    const ColumnHeader = ({ label, width }: { label: string; width: string }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer shrink-0 ${width}`}>
            <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[0.63vw] opacity-100 group-hover:text-white transition-opacity">
                {label}
            </span>
            <img
                src="/assets/chevron_up_down.png"
                alt="Sort"
                style={{ width: '0.73vw', height: '0.73vw', margin: '-0.21vw 0px' }}
                className="shrink-0 opacity-100"
            />
        </div>
    );

    return (
        <TableFrame
            searchBar={<SearchBar value={search} onChange={setSearch} placeholder="Search" />}
            filterBar={
                <>
                    <FilterSelect
                        label="Role"
                        value={roleFilter}
                        options={[{ label: 'Admin', value: 'Admin' }, { label: 'Moderator', value: 'Moderator' }, { label: 'Support Agent', value: 'Support Agent' }, { label: 'Editor', value: 'Editor' }, { label: 'Viewer', value: 'Viewer' }]}
                        onChange={setRoleFilter}
                    />
                    <FilterSelect
                        label="Status"
                        value={statusFilter}
                        options={[{ label: 'Active', value: 'Active' }, { label: 'Disabled', value: 'Disabled' }, { label: 'Invited', value: 'Invited' }]}
                        onChange={setStatusFilter}
                    />
                </>
            }
            hideHeaderBorder={true}
            className="w-full h-full"
        >
            {/* Column Headers: Adjusted Fluid Widths */}
            < div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1C1C1E]" >
                <ColumnHeader label="Name" width="flex-1 min-w-[10vw]" />
                <ColumnHeader label="Email" width="flex-1 min-w-[10vw]" />
                <ColumnHeader label="Role" width="w-[10%]" />
                <ColumnHeader label="Status" width="w-[10%]" />
                <ColumnHeader label="Added On" width="w-[13%]" />
                <ColumnHeader label="Last Active" width="w-[13%]" />
                <div className="w-[3.13vw] shrink-0" />
            </div >

            {/* Rows */}
            < div className="flex flex-col flex-grow overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {
                    MOCK_MEMBERS.map((member) => (
                        <div
                            key={member.id}
                            className={`flex flex-row items-center w-full h-[2.92vw] border-b border-[rgba(102,102,102,0.5)] bg-[#222222] hover:bg-white/[0.05] transition-colors relative ${openMenuId === member.id ? 'z-50' : 'z-10'}`}
                        >
                            <div className="flex-1 min-w-[10vw] px-[0.42vw] text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] shrink-0 truncate"
                            >{member.name}</div>
                            <div className="flex-1 min-w-[10vw] px-[0.42vw] text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] shrink-0 truncate"
                            >{member.email}</div>
                            <div className="w-[10%] px-[0.42vw] text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw] shrink-0 truncate"
                            >{member.role}</div>

                            {/* Status Cell */}
                            <div className="w-[10%] px-[0.42vw] flex items-center shrink-0">
                                <div
                                    className={`flex flex-row justify-center items-center px-[0.52vw] py-[0.31vw] h-[1.35vw] rounded-[0.83vw] text-[0.6vw] font-normal not-italic leading-[0.73vw] font-sans not-italic isolation-auto ${getStatusStyle(member.status)}`}
                                    style={{ width: getStatusWidth(member.status) }}
                                >
                                    <span className="flex items-center">{member.status}</span>
                                </div>
                            </div>

                            <div className="w-[13%] px-[0.42vw] flex items-center gap-[0.31vw] shrink-0">
                                <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw]">{member.addedOn.split(' • ')[0]}</span>
                                <div className="w-[0.16vw] h-[0.16vw] bg-white rounded-[0.21vw] shrink-0" />
                                <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw]">{member.addedOn.split(' • ')[1]}</span>
                            </div>

                            <div className="w-[13%] px-[0.42vw] flex items-center gap-[0.31vw] shrink-0">
                                <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw]">{member.lastActive.split(' • ')[0]}</span>
                                <div className="w-[0.16vw] h-[0.16vw] bg-white rounded-[0.21vw] shrink-0" />
                                <span className="text-white font-sans not-italic font-normal not-italic text-[0.73vw] leading-[0.83vw]">{member.lastActive.split(' • ')[1]}</span>
                            </div>

                            <div className="w-[3.13vw] h-[2.92vw] flex items-center justify-center shrink-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(openMenuId === member.id ? null : member.id);
                                    }}
                                    className="w-[1.46vw] h-[1.46vw] flex items-center justify-center rounded-[2.7vw] hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer"
                                >
                                    <svg viewBox="0 0 16 16" className="w-[0.73vw] h-[0.73vw]" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="3" r="1" fill="currentColor" /><circle cx="8" cy="8" r="1" fill="currentColor" /><circle cx="8" cy="13" r="1" fill="currentColor" /></svg>
                                </button>
                            </div>

                            {openMenuId === member.id && (
                                <div
                                    ref={menuRef}
                                    className="absolute top-[85%] right-[0.83vw] w-[14.58vw] bg-[#1a1a1a] border border-[#666666]/50 rounded-[0.83vw] shadow-2xl z-[100] py-[0.42vw] animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-white/5"
                                >
                                    <button onClick={() => { setModal('CHANGE_ROLE'); setOpenMenuId(null); }} className="flex items-center justify-between w-full px-[0.83vw] py-[0.63vw] hover:bg-white/5 group transition-colors">
                                        <div className="flex items-center gap-[0.83vw]">
                                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-white/60 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                            <span className="text-white text-[0.83vw]  not-italic">Change Role</span>
                                        </div>
                                        <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw] text-white/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                    </button>
                                    <button onClick={() => { setModal('REMOVE_CONFIRM'); setOpenMenuId(null); }} className="flex items-center justify-between w-full px-[0.83vw] py-[0.63vw] hover:bg-white/5 group transition-colors">
                                        <div className="flex items-center gap-[0.83vw] text-[#FF4E4E]">
                                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                            <span className="text-[0.83vw]  not-italic">Remove Team Member</span>
                                        </div>
                                        <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw] text-[#FF4E4E]/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div >

            {/* Gap */}
            <div className="w-full h-[2.5vw]" />

            {/* Pagination */}
            < Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                className="w-full px-[1.25vw] pb-[1.25vw]"
            />

            {modal === 'CHANGE_ROLE' && <ChangeRoleModal onCancel={() => setModal(null)} onUpdate={() => setModal('SUCCESS_UPDATED')} />}
            {modal === 'REMOVE_CONFIRM' && <RemoveConfirmModal type="member" onCancel={() => setModal(null)} onConfirm={() => setModal('SUCCESS_REMOVE')} />}
            {modal === 'SUCCESS_REMOVE' && <TeamRolesSuccessModal title="Team Member Removed" onDone={() => setModal(null)} />}
            {modal === 'SUCCESS_UPDATED' && <TeamRolesSuccessModal title="Role Updated" onDone={() => setModal(null)} />}
        </TableFrame >
    );
};

export default TeamMembersTable;

