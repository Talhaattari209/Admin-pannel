import React, { useState, useRef, useEffect } from 'react';
import AddRoleModal from './modals/AddRoleModal';
import RemoveConfirmModal from './modals/RemoveConfirmModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';
import { TableFrame, SearchBar, Pagination } from '../shared/TableComponents';
import { useRoles, useDeleteRole } from '@/services/roles';
import { Role } from '@/types/api';

const RolesTable: React.FC = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [modal, setModal] = useState<null | 'ADD_ROLE' | 'EDIT_ROLE' | 'DELETE_ROLE' | 'SUCCESS_ADD' | 'SUCCESS_EDIT' | 'SUCCESS_DELETE'>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const limit = 10;
    const { data, isLoading, error } = useRoles({ page: currentPage, limit, search });
    const deleteRoleMutation = useDeleteRole();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
        };
        if (openMenuId) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

    const handleEditRole = (role: Role) => {
        setSelectedRole(role);
        setModal('EDIT_ROLE');
        setOpenMenuId(null);
    };

    const handleDeleteRole = (role: Role) => {
        setSelectedRole(role);
        setModal('DELETE_ROLE');
        setOpenMenuId(null);
    };

    const confirmDelete = () => {
        if (selectedRole) {
            deleteRoleMutation.mutate(selectedRole.id, {
                onSuccess: () => {
                    setModal('SUCCESS_DELETE');
                    setSelectedRole(null);
                },
                onError: (error: any) => {
                    alert(error?.response?.data?.detail || 'Failed to delete role');
                    setModal(null);
                    setSelectedRole(null);
                }
            });
        }
    };

    const handleModalSuccess = () => {
        if (modal === 'ADD_ROLE') {
            setModal('SUCCESS_ADD');
        } else if (modal === 'EDIT_ROLE') {
            setModal('SUCCESS_EDIT');
        }
        setSelectedRole(null);
    };

    const ColumnHeader = ({ label, width }: { label: string; width: string }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full shrink-0 group cursor-pointer ${width}`}>
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
            hideHeaderBorder={true}
            className="w-full h-full"
        >
            {/* Column Headers: Fluid Width */}
            <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1C1C1E]">
                <ColumnHeader label="Role" width="w-[12%]" />
                <ColumnHeader label="Description" width="flex-1" />
                <ColumnHeader label="Members" width="w-[12%]" />
                <div className="w-[3.13vw] shrink-0" />
            </div>

            {/* Rows */}
            <div className="flex flex-col flex-grow overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>

                {isLoading ? (
                    <div className="flex items-center justify-center w-full h-[10vw] text-white/60">
                        Loading roles...
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center w-full h-[10vw] text-red-500">
                        Error loading roles: {error.message}
                    </div>
                ) : !data || data.data.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-[10vw] text-white/60">
                        No roles found
                    </div>
                ) : (
                    data.data.map((role) => (
                        <div
                            key={role.id}
                            className={`flex flex-row items-center w-full h-[2.92vw] border-b border-[rgba(102,102,102,0.5)] bg-[#222222] hover:bg-white/[0.05] transition-colors relative ${openMenuId === role.id ? 'z-50' : 'z-10'}`}
                        >
                            <div className="w-[12%] px-[0.42vw] text-white text-[0.73vw] leading-[0.83vw] font-normal not-italic font-sans not-italic truncate shrink-0">{role.title}</div>
                            <div className="flex-1 px-[0.42vw] text-white text-[0.73vw] leading-[0.83vw] font-normal not-italic font-sans not-italic truncate shrink-0">{role.description}</div>
                            <div className="w-[12%] px-[0.42vw] text-white text-[0.73vw] leading-[0.83vw] font-normal not-italic font-sans not-italic shrink-0">{role.member_count || 0}</div>

                            <div className="w-[3.13vw] h-[2.92vw] flex items-center justify-center shrink-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(openMenuId === role.id ? null : role.id);
                                    }}
                                    className="w-[1.46vw] h-[1.46vw] flex items-center justify-center rounded-[2.7vw] hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer"
                                >
                                    <svg viewBox="0 0 16 16" className="w-[0.73vw] h-[0.73vw]" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="3" r="1" fill="currentColor" /><circle cx="8" cy="8" r="1" fill="currentColor" /><circle cx="8" cy="13" r="1" fill="currentColor" /></svg>
                                </button>
                            </div>

                            {openMenuId === role.id && (
                                <div
                                    ref={menuRef}
                                    className="absolute top-[85%] right-[0.83vw] w-[12.5vw] bg-[#1a1a1a] border border-[#666666]/50 rounded-[0.83vw] shadow-2xl z-[100] py-[0.42vw] animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-white/5"
                                >
                                    <button onClick={() => handleEditRole(role)} className="flex items-center justify-between w-full px-[0.83vw] py-[0.63vw] hover:bg-white/5 group transition-colors">
                                        <div className="flex items-center gap-[0.83vw]">
                                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-white/60 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                            <span className="text-white text-[0.83vw]  not-italic">Edit Role</span>
                                        </div>
                                        <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw] text-white/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                    </button>
                                    <button onClick={() => handleDeleteRole(role)} className="flex items-center justify-between w-full px-[0.83vw] py-[0.63vw] hover:bg-white/5 group transition-colors text-[#FF4E4E]">
                                        <div className="flex items-center gap-[0.83vw]">
                                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw] text-[#FF4E4E]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                            <span className="text-[0.83vw]  not-italic">Delete Role</span>
                                        </div>
                                        <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw] text-[#FF4E4E]/20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={data.pages}
                    onPageChange={setCurrentPage}
                    className="w-full px-[1.25vw] pb-[1.25vw]"
                />
            )}

            {modal === 'ADD_ROLE' && <AddRoleModal onCancel={() => setModal(null)} onSuccess={handleModalSuccess} mode="add" />}
            {modal === 'EDIT_ROLE' && selectedRole && <AddRoleModal onCancel={() => setModal(null)} onSuccess={handleModalSuccess} initialData={selectedRole} mode="edit" />}
            {modal === 'DELETE_ROLE' && <RemoveConfirmModal type="role" onCancel={() => setModal(null)} onConfirm={confirmDelete} />}
            {modal === 'SUCCESS_ADD' && <TeamRolesSuccessModal title="Role Added" onDone={() => setModal(null)} />}
            {modal === 'SUCCESS_EDIT' && <TeamRolesSuccessModal title="Role Updated" onDone={() => setModal(null)} />}
            {modal === 'SUCCESS_DELETE' && <TeamRolesSuccessModal title="Role Deleted" onDone={() => setModal(null)} />}
        </TableFrame>
    );
};

export default RolesTable;
