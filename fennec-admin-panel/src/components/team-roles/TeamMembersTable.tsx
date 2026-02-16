import React, { useState, useRef, useEffect } from 'react';
import AddMemberModal from './modals/AddMemberModal';
import ChangeRoleModal from './modals/ChangeRoleModal';
import RemoveConfirmModal from './modals/RemoveConfirmModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';
import { TableFrame, SearchBar, FilterSelect, FilterGroup, Pagination } from '../shared/TableComponents';
import { useTeamMembers, useDeleteTeamMember, useUpdateTeamMember } from '@/services/team-members';
import { useRoles } from '@/services/roles';
import { TeamMember } from '@/types/api';

const TeamMembersTable: React.FC = () => {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [modal, setModal] = useState<null | 'ADD_MEMBER' | 'CHANGE_ROLE' | 'REMOVE_MEMBER' | 'SUCCESS'>(null);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const limit = 10;
    const { data, isLoading, error } = useTeamMembers({ page: currentPage, limit, search });
    const { data: rolesData } = useRoles({ limit: 100 });
    const deleteMutation = useDeleteTeamMember();
    const updateMutation = useUpdateTeamMember();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
        };
        if (openMenuId) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

    const handleChangeRole = (member: TeamMember) => {
        setSelectedMember(member);
        setModal('CHANGE_ROLE');
        setOpenMenuId(null);
    };

    const handleDeleteMember = (member: TeamMember) => {
        setSelectedMember(member);
        setModal('REMOVE_MEMBER');
        setOpenMenuId(null);
    };

    const confirmDelete = () => {
        if (selectedMember) {
            deleteMutation.mutate(selectedMember.id, {
                onSuccess: () => {
                    setModal('SUCCESS');
                    setSelectedMember(null);
                },
                onError: (error: any) => {
                    alert(error?.response?.data?.detail || 'Failed to delete member');
                    setModal(null);
                }
            });
        }
    };

    const handleUpdateRole = (roleId: string) => {
        if (selectedMember) {
            updateMutation.mutate(
                { id: selectedMember.id, data: { role: roleId } },
                {
                    onSuccess: () => {
                        setModal('SUCCESS');
                        setSelectedMember(null);
                    },
                    onError: (error: any) => {
                        alert(error?.response?.data?.detail || 'Failed to update role');
                        setModal(null);
                    }
                }
            );
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-[#34C759] text-white';
            case 'invited': return 'bg-[#FF9500] text-white';
            case 'inactive': return 'bg-[#8E8E93] text-white';
            default: return 'bg-[#8E8E93] text-white';
        }
    };

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const ColumnHeader = ({ label, width }: { label: string; width: string }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full shrink-0 group cursor-pointer ${width}`}>
            <span className="text-[#AAAAAA] font-sans not-italic font-medium text-[0.63vw] group-hover:text-white transition-opacity">
                {label}
            </span>
            <img src="/assets/chevron_up_down.png" alt="Sort" style={{ width: '0.73vw', height: '0.73vw' }} className="shrink-0" />
        </div>
    );

    const roles = rolesData?.data || [];
    const roleOptions = roles.map(r => ({ label: r.title, value: r.id }));

    return (
        <TableFrame
            searchBar={<SearchBar value={search} onChange={setSearch} placeholder="Search" />}
            hideHeaderBorder={true}
            className="w-full h-full"
        >
            {/* Column Headers */}
            <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1C1C1E]">
                <ColumnHeader label="Name" width="flex-1 min-w-[10vw]" />
                <ColumnHeader label="Email" width="flex-1 min-w-[10vw]" />
                <ColumnHeader label="Role" width="w-[10%]" />
                <ColumnHeader label="Status" width="w-[10%]" />
                <ColumnHeader label="Added On" width="w-[12%]" />
                <ColumnHeader label="Last Active" width="w-[12%]" />
                <div className="w-[3.13vw] shrink-0" />
            </div>

            {/* Rows */}
            <div className="flex flex-col flex-grow overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {isLoading ? (
                    <div className="flex items-center justify-center w-full h-[10vw] text-white/60">
                        Loading team members...
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center w-full h-[10vw] text-red-500">
                        Error loading team members
                    </div>
                ) : !data || data.data.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-[10vw] text-white/60">
                        No team members found
                    </div>
                ) : (
                    data.data.map((member) => (
                        <div
                            key={member.id}
                            className={`flex flex-row items-center w-full h-[2.92vw] border-b border-[rgba(102,102,102,0.5)] bg-[#222222] hover:bg-white/[0.05] transition-colors relative ${openMenuId === member.id ? 'z-50' : 'z-10'}`}
                        >
                            <div className="flex-1 min-w-[10vw] px-[0.42vw] text-white text-[0.73vw] truncate">{member.name}</div>
                            <div className="flex-1 min-w-[10vw] px-[0.42vw] text-white text-[0.73vw] truncate">{member.email}</div>
                            <div className="w-[10%] px-[0.42vw] text-white text-[0.73vw]">{member.role?.title || 'N/A'}</div>
                            <div className="w-[10%] px-[0.42vw]">
                                <div className={`inline-block px-[0.63vw] py-[0.21vw] rounded-[0.42vw] text-[0.63vw] font-medium ${getStatusStyle(member.status)}`}>
                                    {member.status}
                                </div>
                            </div>
                            <div className="w-[12%] px-[0.42vw] text-white text-[0.73vw]">{formatDate(member.created_at)}</div>
                            <div className="w-[12%] px-[0.42vw] text-white text-[0.73vw]">{formatDate(member.last_login)}</div>

                            <div className="w-[3.13vw] h-[2.92vw] flex items-center justify-center shrink-0">
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                                    className="w-[1.46vw] h-[1.46vw] flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                                >
                                    <svg viewBox="0 0 16 16" className="w-[0.73vw] h-[0.73vw]" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="8" cy="3" r="1" fill="currentColor" />
                                        <circle cx="8" cy="8" r="1" fill="currentColor" />
                                        <circle cx="8" cy="13" r="1" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>

                            {openMenuId === member.id && (
                                <div ref={menuRef} className="absolute top-[85%] right-[0.83vw] w-[12.5vw] bg-[#1a1a1a] border border-[#666666]/50 rounded-[0.83vw] shadow-2xl z-[100] py-[0.42vw]">
                                    <button onClick={() => handleChangeRole(member)} className="flex items-center justify-between w-full px-[0.83vw] py-[0.63vw] hover:bg-white/5 group transition-colors">
                                        <div className="flex items-center gap-[0.83vw]">
                                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-white/60 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                            <span className="text-white text-[0.83vw]">Change Role</span>
                                        </div>
                                    </button>
                                    <button onClick={() => handleDeleteMember(member)} className="flex items-center justify-between w-full px-[0.83vw] py-[0.63vw] hover:bg-white/5 group transition-colors text-[#FF4E4E]">
                                        <div className="flex items-center gap-[0.83vw]">
                                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                            <span className="text-[0.83vw]">Remove Member</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Gap */}
            <div className="w-full h-[2.5vw]" />

            {/* Pagination */}
            {data && data.pages > 1 && (
                <Pagination currentPage={currentPage} totalPages={data.pages} onPageChange={setCurrentPage} className="w-full px-[1.25vw] pb-[1.25vw]" />
            )}

            {modal === 'ADD_MEMBER' && <AddMemberModal onCancel={() => setModal(null)} onSuccess={() => setModal('SUCCESS')} />}
            {modal === 'CHANGE_ROLE' && selectedMember && <ChangeRoleModal member={selectedMember} roles={roles} onCancel={() => setModal(null)} onUpdate={handleUpdateRole} isLoading={updateMutation.isPending} />}
            {modal === 'REMOVE_MEMBER' && <RemoveConfirmModal type="member" onCancel={() => setModal(null)} onConfirm={confirmDelete} />}
            {modal === 'SUCCESS' && <TeamRolesSuccessModal title="Success" onDone={() => setModal(null)} />}
        </TableFrame>
    );
};

export default TeamMembersTable;
