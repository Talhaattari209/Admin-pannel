
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

  return (
    <div key={resetKey} className="flex flex-col w-full h-screen overflow-hidden animate-in fade-in duration-500">
      <div className="w-full px-[2.08vw] pt-[2.08vw]">
        <PageHeader
          title="App Settings"
          description="Control platform-wide configurations, feature toggles, and notification templates."
          primaryAction={{
            label: "Save Changes",
            onClick: () => setShowSuccess(true)
          }}
          secondaryAction={{
            label: "Discard Changes",
            onClick: () => setResetKey(prev => prev + 1)
          }}
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
    </div >
  );
};

export default AppSettingsView;
