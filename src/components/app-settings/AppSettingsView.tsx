import React, { useState, useEffect } from 'react';
import MobileAppsCard from './MobileAppsCard';
import ContentModerationCard from './ContentModerationCard';
import BlockedWordsCard from './BlockedWordsCard';
import GeneralSettingsCard from './GeneralSettingsCard';
import MaintenanceModeCard from './MaintenanceModeCard';
import SettingsSuccessCard from './SettingsSuccessCard';
import { PageHeader } from '@/components/Headers';
import { useAuthStore } from '@/store/auth-store';
import { canEditModule } from '@/utils/permissions';
import { useAppSettings, useUpdateAppSettings, DEFAULT_APP_SETTINGS } from '@/services/app-settings';
import type { AppSettings, AppSettingsUpdate } from '@/types/api';

const AppSettingsView: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [draft, setDraft] = useState<AppSettings>(DEFAULT_APP_SETTINGS);

  const { data, isLoading, isError, error, refetch } = useAppSettings();
  const updateMutation = useUpdateAppSettings();

  const permissions = useAuthStore((state) => state.permissions);
  const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
  const canEdit = isSuperAdmin || canEditModule(permissions, 'app settings');

  useEffect(() => {
    if (data) setDraft(data);
  }, [data]);

  const handleSave = () => {
    const payload: AppSettingsUpdate = {
      mobileApps: draft.mobileApps,
      general: draft.general,
      pokeProducts: draft.pokeProducts,
      contentModeration: draft.contentModeration,
      blockedWords: draft.blockedWords,
      maintenanceMode: draft.maintenanceMode,
    };
    updateMutation.mutate(payload, {
      onSuccess: (updated) => {
        setDraft(updated);
        setShowSuccess(true);
      },
    });
  };

  const handleDiscard = () => {
    if (data) setDraft(data);
    else refetch();
  };

  if (isLoading && !data) {
    return (
      <div className="flex flex-col w-full animate-in fade-in duration-500">
        <PageHeader title="App Settings" description="Control platform-wide configurations, feature toggles, and notification templates." />
        <div className="flex flex-row gap-[1.25vw] pb-[2.08vw] mt-[1.49vw] items-start">
          <div className="flex-[2] flex flex-col gap-[1.25vw]">
            <div className="h-[12vw] bg-[#222222] rounded-[0.83vw] animate-pulse" />
            <div className="h-[24vw] bg-[#222222] rounded-[0.83vw] animate-pulse" />
            <div className="h-[16vw] bg-[#222222] rounded-[0.83vw] animate-pulse" />
          </div>
          <div className="flex-[1] flex flex-col gap-[1.25vw]">
            <div className="h-[22vw] bg-[#222222] rounded-[0.83vw] animate-pulse" />
            <div className="h-[33vw] bg-[#222222] rounded-[0.83vw] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col w-full animate-in fade-in duration-500">
        <PageHeader title="App Settings" description="Control platform-wide configurations." />
        <div className="mt-[1.49vw] p-[1.25vw] bg-red-500/10 border border-red-500/30 rounded-[0.83vw] text-red-400 text-[0.83vw]">
          Failed to load app settings. {(error?.response?.data as any)?.message || (error?.response?.data as any)?.detail || error?.message || 'Unknown error.'}
          <button onClick={() => refetch()} className="ml-2 underline">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="w-full">
        <PageHeader
          title="App Settings"
          description="Control platform-wide configurations, feature toggles, and notification templates."
          primaryAction={canEdit ? {
            label: "Save Changes",
            onClick: handleSave,
            disabled: updateMutation.isPending,
          } : undefined}
          secondaryAction={canEdit ? {
            label: "Discard Changes",
            onClick: handleDiscard,
            disabled: updateMutation.isPending,
          } : undefined}
        />
      </div>

      {updateMutation.isError && (
        <div className="mt-[1.25vw] p-[0.83vw] bg-red-500/10 border border-red-500/30 rounded-[0.83vw] text-red-400 text-[0.83vw]">
          {(updateMutation.error?.response?.data as any)?.message || (updateMutation.error?.response?.data as any)?.detail || updateMutation.error?.message || 'Failed to save app settings.'}
        </div>
      )}

      <div className="flex flex-row gap-[1.25vw] pb-[2.08vw] mt-[1.49vw] items-start">
        <div className="flex-[2] flex flex-col gap-[1.25vw]">
          <MobileAppsCard canEdit={canEdit} value={draft.mobileApps} onChange={(v) => setDraft((p) => ({ ...p, mobileApps: v }))} />
          <ContentModerationCard canEdit={canEdit} value={draft.contentModeration} onChange={(v) => setDraft((p) => ({ ...p, contentModeration: v }))} />
          <BlockedWordsCard canEdit={canEdit} value={draft.blockedWords} onChange={(v) => setDraft((p) => ({ ...p, blockedWords: v }))} />
        </div>
        <div className="flex-[1] flex flex-col gap-[1.25vw]">
          <GeneralSettingsCard canEdit={canEdit} value={draft.general} onChange={(v) => setDraft((p) => ({ ...p, general: v }))} />
          <MaintenanceModeCard canEdit={canEdit} value={draft.maintenanceMode} onChange={(v) => setDraft((p) => ({ ...p, maintenanceMode: v }))} />
        </div>
      </div>

      {showSuccess && <SettingsSuccessCard onDone={() => setShowSuccess(false)} />}
    </div>
  );
};

export default AppSettingsView;
