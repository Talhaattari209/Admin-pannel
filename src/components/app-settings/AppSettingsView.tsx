
import React, { useState } from 'react';
import MobileAppsCard from './MobileAppsCard';
import ContentModerationCard from './ContentModerationCard';
import BlockedWordsCard from './BlockedWordsCard';
import GeneralSettingsCard from './GeneralSettingsCard';
import MaintenanceModeCard from './MaintenanceModeCard';
import SettingsSuccessCard from './SettingsSuccessCard';
import { PageHeader } from '@/components/Headers';

const AppSettingsView: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const headerActions = (
    <>
      <button
        onClick={() => setResetKey(prev => prev + 1)}
        className="px-[1.67vw] py-[0.83vw] border border-white rounded-[2.71vw] text-white font-medium backdrop-blur-[0.31vw] hover:bg-white/10 transition-all active:scale-95 font-inter text-[0.83vw]"
      >
        Discard Changes
      </button>
      <button
        onClick={() => setShowSuccess(true)}
        className="px-[1.67vw] py-[0.83vw] bg-[#5F00DB] text-white rounded-[2.71vw] font-medium shadow-[0px_0.21vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all font-inter text-[0.83vw]"
      >
        Save Changes
      </button>
    </>
  );

  return (
    <div key={resetKey} className="flex flex-col w-full h-screen overflow-hidden animate-in fade-in duration-500">
      <div className="w-full px-[2.08vw] pt-[2.08vw]">
        <PageHeader
          title="App Settings"
          description="Control platform-wide configurations, feature toggles, and notification templates."
          action={headerActions}
        />
      </div>

      <div className="flex flex-row gap-[1.25vw] h-full overflow-hidden pb-[2.08vw] px-[2.08vw] mt-[2.08vw]">
        <div className="flex-[2] flex flex-col gap-[1.25vw] overflow-y-auto no-scrollbar pr-[0.42vw]">
          <MobileAppsCard />
          <ContentModerationCard />
          <BlockedWordsCard />
        </div>
        <div className="flex-[1] flex flex-col gap-[1.25vw] overflow-y-auto no-scrollbar pl-[0.42vw]">
          <GeneralSettingsCard />
          <MaintenanceModeCard />
        </div>
      </div>

      {showSuccess && <SettingsSuccessCard onDone={() => setShowSuccess(false)} />}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AppSettingsView;
