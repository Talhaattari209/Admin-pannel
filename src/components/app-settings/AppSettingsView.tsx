
import React, { useState } from 'react';
import MobileAppsCard from './MobileAppsCard';
import ContentModerationCard from './ContentModerationCard';
import BlockedWordsCard from './BlockedWordsCard';
import GeneralSettingsCard from './GeneralSettingsCard';
import MaintenanceModeCard from './MaintenanceModeCard';
import SettingsSuccessCard from './SettingsSuccessCard';
import { PageHeader } from '@/components/Headers';
import { useAuthStore } from '@/store/auth-store';
import { canEditModule } from '@/utils/permissions';

const AppSettingsView: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Permission checks
  const permissions = useAuthStore((state) => state.permissions);
  const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
  const canEdit = isSuperAdmin || canEditModule(permissions, 'app settings');

  return (
    <div key={resetKey} className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="w-full">
        <PageHeader
          title="App Settings"
          description="Control platform-wide configurations, feature toggles, and notification templates."
          primaryAction={canEdit ? {
            label: "Save Changes",
            onClick: () => setShowSuccess(true)
          } : undefined}
          secondaryAction={canEdit ? {
            label: "Discard Changes",
            onClick: () => setResetKey(prev => prev + 1)
          } : undefined}
        />
      </div>

      <div className="flex flex-row gap-[1.25vw] pb-[2.08vw] mt-[1.49vw] items-start">
        <div className="flex-[2] flex flex-col gap-[1.25vw]">
          <MobileAppsCard canEdit={canEdit} />
          <ContentModerationCard canEdit={canEdit} />
          <BlockedWordsCard canEdit={canEdit} />
        </div>
        <div className="flex-[1] flex flex-col gap-[1.25vw]">
          <GeneralSettingsCard canEdit={canEdit} />
          <MaintenanceModeCard canEdit={canEdit} />
        </div>
      </div>

      {showSuccess && <SettingsSuccessCard onDone={() => setShowSuccess(false)} />}
    </div >
  );
};

export default AppSettingsView;
