
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
    <div key={resetKey} className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="w-full">
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

      <div className="flex flex-row gap-[1.25vw] pb-[2.08vw] mt-[1.49vw] items-start">
        <div className="flex-[2] flex flex-col gap-[1.25vw]">
          <MobileAppsCard />
          <ContentModerationCard />
          <BlockedWordsCard />
        </div>
        <div className="flex-[1] flex flex-col gap-[1.25vw]">
          <GeneralSettingsCard />
          <MaintenanceModeCard />
        </div>
      </div>

      {showSuccess && <SettingsSuccessCard onDone={() => setShowSuccess(false)} />}
    </div >
  );
};

export default AppSettingsView;
