
import React, { useState } from 'react';
import EditProfileContent from './EditProfileContent';
import ChangePasswordContent from './ChangePasswordContent';
import SuccessModal from '../shared/SuccessModal';
import PageHeader from '../shared/PageHeader';

type SettingsTab = 'edit-profile' | 'change-password';

interface SidebarItemProps {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (id: SettingsTab) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ id, label, icon, isActive, onClick }) => {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`flex flex-row items-center p-4 gap-4 w-[368px] h-[56px] transition-all duration-300 relative group shrink-0 ${isActive ? 'bg-gradient-to-r from-[#5F00DB] to-[rgba(22,0,63,0)]' : 'hover:bg-white/5'}`}
    >
      <div className={`shrink-0 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
        {icon}
      </div>
      <span className="flex-grow text-left text-white text-[16px] font-['SF_Pro_Text'] leading-[24px] font-normal">
        {label}
      </span>
      <svg viewBox="0 0 16 16" className={`w-4 h-4 transition-opacity ${isActive ? 'text-white opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 12 10 8 6 4" />
      </svg>
    </button>
  );
};

const AccountSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('edit-profile');
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Account Settings" 
        description="Update your admin profile, change password, and configure personal preferences."
      />

      <div className="flex flex-row flex-wrap items-start content-start gap-4 w-full shrink-0">
        <div className="flex flex-col justify-end items-start py-4 w-[368px] h-[144px] bg-[#222222] border border-[#666666]/50 rounded-[16px] overflow-hidden shrink-0">
          <SidebarItem 
            id="edit-profile" 
            label="Edit Profile" 
            isActive={activeTab === 'edit-profile'}
            onClick={setActiveTab}
            icon={<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>} 
          />
          <SidebarItem 
            id="change-password" 
            label="Change Password" 
            isActive={activeTab === 'change-password'}
            onClick={setActiveTab}
            icon={<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} 
          />
        </div>

        <div className="flex flex-col justify-end items-start p-8 gap-8 w-[752px] min-h-[378px] bg-[#222222] border border-[#666666]/50 rounded-[16px] shrink-0 overflow-hidden">
           {activeTab === 'edit-profile' ? (
             <EditProfileContent onSave={() => setShowSuccess(true)} onDiscard={() => setActiveTab('edit-profile')} />
           ) : (
             <ChangePasswordContent onUpdate={() => setShowSuccess(true)} />
           )}
        </div>

        <div className="w-[368px] h-[200px] bg-transparent shrink-0 pointer-events-none"></div>
      </div>

      {showSuccess && (
        <SuccessModal 
          title={activeTab === 'edit-profile' ? "Profile Updated" : "Password Updated"} 
          onDone={() => setShowSuccess(false)} 
        />
      )}
    </div>
  );
};

export default AccountSettingsView;
