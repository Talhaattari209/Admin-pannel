
import React, { useState } from 'react';
import MobileAppsCard from './MobileAppsCard';
import ContentModerationCard from './ContentModerationCard';
import BlockedWordsCard from './BlockedWordsCard';
import GeneralSettingsCard from './GeneralSettingsCard';
import MaintenanceModeCard from './MaintenanceModeCard';
import PageHeader from '../shared/PageHeader';
import SuccessModal from '../shared/SuccessModal';

const AppSettingsView: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const headerActions = (
    <>
      <button 
        onClick={() => setResetKey(prev => prev + 1)}
        className="px-8 py-4 border border-white rounded-[52px] text-white font-medium backdrop-blur-[6px] hover:bg-white/10 transition-all active:scale-95 font-inter"
      >
        Discard Changes
      </button>
      <button 
        onClick={() => setShowSuccess(true)}
        className="px-8 py-4 bg-[#5F00DB] text-white rounded-[52px] font-medium shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all font-inter"
      >
        Save Changes
      </button>
    </>
  );

  return (
    <div key={resetKey} className="flex flex-col w-full max-w-[1520px] mx-auto p-4 md:p-8 animate-in fade-in duration-500 overflow-hidden h-screen">
      <PageHeader 
        title="App Settings"
        description="Control platform-wide configurations, feature toggles, and notification templates."
        actions={headerActions}
      />

      <div className="flex flex-row gap-6 h-full overflow-hidden pb-10">
        <div className="flex-[2] flex flex-col gap-6 overflow-y-auto no-scrollbar pr-2">
          <MobileAppsCard />
          <ContentModerationCard />
          <BlockedWordsCard />
        </div>
        <div className="flex-[1] flex flex-col gap-6 overflow-y-auto no-scrollbar pl-2">
          <GeneralSettingsCard />
          <MaintenanceModeCard />
        </div>
      </div>

      {showSuccess && <SuccessModal title="App Settings Updated" onDone={() => setShowSuccess(false)} />}
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AppSettingsView;
