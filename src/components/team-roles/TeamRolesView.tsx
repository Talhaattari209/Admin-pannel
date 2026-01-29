import React, { useState } from 'react';
import TeamMembersTable from './TeamMembersTable';
import RolesTable from './RolesTable';
import AddMemberModal from './modals/AddMemberModal';
import AddRoleModal from './modals/AddRoleModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';

const TeamRolesView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'members' | 'roles'>('members');
    const [modal, setModal] = useState<null | 'ADD_MEMBER' | 'ADD_ROLE' | 'SUCCESS_INVITE' | 'SUCCESS_ROLE'>(null);

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="flex flex-row items-end justify-between w-full h-[4.17vw] mb-[2.08vw] shrink-0">
                <div className="flex flex-col justify-center items-start gap-[0.83vw]">
                    <h1 className="text-white text-[1.875vw] font-bold tracking-tight font-['SF_Pro_Text']">Team & Roles</h1>
                    <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%] font-['SF_Pro_Text']">
                        Manage admin accounts, assign permissions, and define moderator or reviewer roles.
                    </p>
                </div>
                <button
                    onClick={() => setModal(activeTab === 'members' ? 'ADD_MEMBER' : 'ADD_ROLE')}
                    className="px-[1.67vw] py-[0.83vw] bg-[#5F00DB] text-white rounded-[2.7vw] font-medium shadow-[0px_0.21vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all font-['SF_Pro_Text'] text-[0.83vw]"
                >
                    {activeTab === 'members' ? 'Add Team Member' : 'Add Role'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-row gap-[0.42vw] w-full mb-[-1px] z-10">
                {[
                    { id: 'members', label: 'Team Members', count: 5 },
                    { id: 'roles', label: 'Roles', count: 5 }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex flex-row items-center justify-center px-[1.67vw] py-[0.63vw] gap-[0.63vw] h-[2.5vw] rounded-t-[0.63vw] transition-all font-medium font-['SF_Pro_Text'] border border-b-0 border-white/5 text-[0.83vw] ${activeTab === tab.id
                            ? 'bg-[#5F00DB] text-white border-[#5F00DB]'
                            : 'bg-[#222222] text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <span>{tab.label}</span>
                        <div className="bg-[#FF4E4E] text-white text-[0.57vw] font-bold px-[0.42vw] py-[0.1vw] rounded-full min-w-[1.04vw] font-['SF_Pro_Text'] flex items-center justify-center h-[1.1vw]">
                            {tab.count}
                        </div>
                    </button>
                ))}
            </div>

            {/* Table Container - fluid width */}
            <div className="w-full bg-[#222222] rounded-b-[0.83vw] rounded-tr-[0.83vw] border border-white/5 shadow-2xl flex-grow overflow-hidden flex flex-col">
                {activeTab === 'members' ? <TeamMembersTable /> : <RolesTable />}
            </div>

            {/* Modals */}
            {modal === 'ADD_MEMBER' && (
                <AddMemberModal
                    onCancel={() => setModal(null)}
                    onInvite={() => setModal('SUCCESS_INVITE')}
                />
            )}
            {modal === 'ADD_ROLE' && (
                <AddRoleModal
                    onCancel={() => setModal(null)}
                    onAdd={() => setModal('SUCCESS_ROLE')}
                />
            )}
            {modal === 'SUCCESS_INVITE' && (
                <TeamRolesSuccessModal
                    title="Team Member Invited"
                    onDone={() => setModal(null)}
                />
            )}
            {modal === 'SUCCESS_ROLE' && (
                <TeamRolesSuccessModal
                    title="New Role Added"
                    onDone={() => setModal(null)}
                />
            )}
        </div>
    );
};

export default TeamRolesView;
