import React, { useState } from 'react';
import TeamMembersTable from './TeamMembersTable';
import RolesTable from './RolesTable';
import AddMemberModal from './modals/AddMemberModal';
import AddRoleModal from './modals/AddRoleModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';
import { Button } from '../shared/Button';
import { Tabs } from '../shared/TableComponents';
import { useAuthStore } from '@/store/auth-store';
import { canEditModule } from '@/utils/permissions';

const TeamRolesView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('members');
    const [modal, setModal] = useState<null | 'ADD_MEMBER' | 'ADD_ROLE' | 'SUCCESS_INVITE' | 'SUCCESS_ROLE'>(null);

    // Permission checks
    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);

    // User can add if they have edit permission for Team & Roles module
    const canAdd = isSuperAdmin || canEditModule(permissions, 'teams & roles');

    const tabs = [
        { id: 'members', label: 'Team Members', count: 5 },
        { id: 'roles', label: 'Roles', count: 5 }
    ];

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-500">
            {/* Page Header */}
            {/* Page Header */}
            <div className="flex flex-row items-end justify-between w-full h-[3.47vw] mb-[1.49vw] shrink-0">
                <div className="flex flex-col justify-center items-start gap-[0.23vw]">
                    <h1 className="text-white text-[2.25vw] font-bold not-italic tracking-tight ">Team & Roles</h1>
                    <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%]  not-italic">
                        Manage admin accounts, assign permissions, and define moderator or reviewer roles.
                    </p>
                </div>
                {canAdd && (
                    <Button
                        onClick={() => setModal(activeTab === 'members' ? 'ADD_MEMBER' : 'ADD_ROLE')}
                        variant="filled"
                        className="!px-[1.67vw]  not-italic text-[0.83vw]"
                    >
                        {activeTab === 'members' ? 'Add Team Member' : 'Add Role'}
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="w-full mb-[-1px] z-10 flex flex-row">
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    className="gap-[0.42vw] pl-[0.83vw]" // 8px gap, 16px start padding
                />
            </div>

            {/* Table Content */}
            <div className="w-full flex flex-col">
                {activeTab === 'members' ? <TeamMembersTable /> : <RolesTable />}
            </div>

            {/* Modals */}
            {modal === 'ADD_MEMBER' && (
                <AddMemberModal
                    onCancel={() => setModal(null)}
                    onSuccess={() => setModal('SUCCESS_INVITE')}
                />
            )}
            {modal === 'ADD_ROLE' && (
                <AddRoleModal
                    onCancel={() => setModal(null)}
                    onSuccess={() => setModal('SUCCESS_ROLE')}
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

