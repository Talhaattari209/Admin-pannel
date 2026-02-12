import React from 'react';
import UserTable from './UserTable';
import PageHeader from '../shared/PageHeader';
import UserStats from './UserStats';
import Button from '../shared/Button';

interface UserManagementViewProps {
  onViewProfile: (userId: string) => void;
}

const UserManagementView: React.FC<UserManagementViewProps> = ({ onViewProfile }) => {
  const exportAction = (
    <Button variant="outline" className="gap-3">
      <span>Export Data</span>
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </Button>
  );

  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto p-[2vw] animate-in fade-in duration-500 overflow-x-hidden">
      <PageHeader 
        title="User Management"
        description="View, verify, and manage all registered users — including KYC status, bans, and account details."
        actions={exportAction}
      />

      <UserStats />

      <div className="w-full bg-[#222222] rounded-[16px] border border-white/5 shadow-2xl overflow-hidden">
        <UserTable onViewProfile={onViewProfile} />
      </div>
      
      <div className="h-10" />
    </div>
  );
};

export default UserManagementView;