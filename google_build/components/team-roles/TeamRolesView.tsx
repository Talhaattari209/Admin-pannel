
import React, { useState } from 'react';
import TeamMembersTable from './TeamMembersTable';
import RolesTable from './RolesTable';
import AddMemberModal from './modals/AddMemberModal';
import AddRoleModal from './modals/AddRoleModal';
import TeamRolesSuccessModal from './modals/TeamRolesSuccessModal';

const TeamRolesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'roles'>('members');
  const [modal, setModal] = useState<null | 'ADD_MEMBER' | 'ADD_ROLE' | 'SUCCESS_INVITE' | 'SUCCESS_ROLE'>(null);

  // Note: The specific instruction "clicking change role (new window appear for roles tab with same page header but different button text , different column header and row)"
  // refers to switching context or sub-state. We handle the tables within the current structure.
  
  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-row items-end justify-between w-full h-[80px] mb-10 shrink-0">
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 className="text-white text-[36px] font-bold tracking-tight font-michroma">Team & Roles</h1>
          <p className="text-[#CCCCCC] text-[16px] leading-[150%] font-['SF_Pro_Text']">
            Manage admin accounts, assign permissions, and define moderator or reviewer roles.
          </p>
        </div>
        <button 
          onClick={() => setModal(activeTab === 'members' ? 'ADD_MEMBER' : 'ADD_ROLE')}
          className="px-8 py-4 bg-[#5F00DB] text-white rounded-[52px] font-medium shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all font-inter"
        >
          {activeTab === 'members' ? 'Add Team Member' : 'Add Role'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-row gap-2 w-full mb-[-1px] z-10">
        {[
          { id: 'members', label: 'Team Members', count: 5 },
          { id: 'roles', label: 'Roles', count: 5 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-row items-center justify-center px-8 py-3 gap-3 h-[48px] rounded-t-[12px] transition-all font-medium font-inter border border-b-0 border-white/5 ${
              activeTab === tab.id 
              ? 'bg-[#5F00DB] text-white border-[#5F00DB]' 
              : 'bg-[#222222] text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="font-['SF_Pro_Text']">{tab.label}</span>
            <div className="bg-[#FF4E4E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px]">
              {tab.count}
            </div>
          </button>
        ))}
      </div>

      {/* Table Container - Overflow handling for the 1520px wide tables */}
      <div className="w-full bg-[#222222] rounded-b-[16px] rounded-tr-[16px] overflow-x-auto no-scrollbar border border-white/5 shadow-2xl">
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
