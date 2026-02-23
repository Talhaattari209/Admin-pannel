import React from 'react';
import type { AppSettingsMobileApps } from '@/types/api';

interface MobileAppsCardProps {
  canEdit?: boolean;
  value: AppSettingsMobileApps;
  onChange: (value: AppSettingsMobileApps) => void;
}

const MobileAppsCard: React.FC<MobileAppsCardProps> = ({ canEdit = true, value, onChange }) => {
  const updatePlatform = (platform: 'ios' | 'android', field: 'version' | 'storeUrl', val: string) => {
    onChange({
      ...value,
      [platform]: { ...value[platform], [field]: val },
    });
  };

  const AppTile = ({
    platform,
    platformKey,
    version,
    storeUrl,
    isAndroid,
  }: {
    platform: string;
    platformKey: 'ios' | 'android';
    version: string;
    storeUrl: string;
    isAndroid: boolean;
  }) => (
    <div className="flex-1 flex flex-row items-center p-[0.83vw] bg-[#16003F] border border-white/5 rounded-[0.83vw] gap-[0.83vw] group">
      <div className="w-[3.75vw] h-[3.75vw] bg-[#5F00DB] rounded-[0.83vw] flex items-center justify-center shrink-0 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
        <svg viewBox="0 0 100 100" className="w-[2.6vw] h-[2.6vw] relative z-10">
          <circle cx="50" cy="50" r="8" fill="white" />
          <circle cx="50" cy="28" r="3.5" fill="white" />
          <circle cx="50" cy="72" r="3.5" fill="white" />
          <circle cx="28" cy="50" r="3.5" fill="white" />
          <circle cx="72" cy="50" r="3.5" fill="white" />
          <circle cx="34" cy="34" r="5" fill="white" />
          <circle cx="66" cy="34" r="5" fill="white" />
          <circle cx="34" cy="66" r="5" fill="white" />
          <circle cx="66" cy="66" r="5" fill="white" />
          <circle cx="50" cy="14" r="2" fill="white" opacity="0.6" />
          <circle cx="50" cy="86" r="2" fill="white" opacity="0.6" />
          <circle cx="14" cy="50" r="2" fill="white" opacity="0.6" />
          <circle cx="86" cy="50" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>

      <div className="flex flex-col flex-grow min-w-0">
        <span className="text-white text-[1.04vw] font-bold not-italic font-inter not-italic leading-none mb-[0.21vw]">{platform}</span>
        {canEdit ? (
          <input
            type="text"
            value={version}
            onChange={(e) => updatePlatform(platformKey, 'version', e.target.value)}
            className="bg-transparent border-none text-white/40 text-[0.73vw] font-inter w-full focus:outline-none"
            placeholder="Version"
          />
        ) : (
          <span className="text-white/40 text-[0.73vw] font-inter not-italic font-light not-italic">Version {version}</span>
        )}
      </div>

      <div className="flex flex-row items-center gap-[0.83vw]">
        <div className="text-white/80 shrink-0">
          {isAndroid ? (
            <svg viewBox="0 0 24 24" className="w-[1.67vw] h-[1.67vw]" fill="currentColor">
              <path d="M17.523 15.3414l1.373 2.378c.11.19.044.433-.146.543a.3946.3946 0 01-.543-.146l-1.395-2.417C15.314 16.51 13.731 17 12 17c-1.731 0-3.314-.49-4.812-1.299l-1.395 2.417c-.11.19-.353.256-.543.146a.3946.3946 0 01-.146-.543l1.373-2.378C4.058 13.561 2.5 11.231 2.5 8.5h19c0 2.731-1.558 5.061-3.977 6.8414zM16 6a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-[1.67vw] h-[1.67vw]" fill="currentColor">
              <path d="M17.057 14.921c-.022 2.966 2.56 3.963 2.593 3.978-.022.072-.407 1.392-1.349 2.766-.813 1.189-1.657 2.373-3.003 2.398-1.32.024-1.748-.781-3.26-.781-1.512 0-1.988.756-3.235.805-1.298.05-2.222-1.272-3.04-2.447-1.674-2.4-2.946-6.79-1.222-9.78.855-1.485 2.383-2.424 4.05-2.449 1.27-.024 2.466.852 3.243.852.777 0 2.215-1.074 3.716-.921 1.096.046 2.394.618 3.094 1.487-1.12.656-1.884 1.836-1.887 3.092zm-2.03-9.524c.677-.822 1.133-1.966.99-3.109-1.033.041-2.28.687-3.02 1.554-.666.772-1.248 1.956-1.092 3.064 1.154.089 2.316-.549 3.122-1.509z" />
            </svg>
          )}
        </div>
        <a
          href={storeUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-[0.42vw] px-[0.83vw] py-[0.42vw] bg-[#5F00DB] rounded-[2.71vw] text-white text-[0.73vw] font-medium not-italic shadow-lg whitespace-nowrap ${canEdit && !storeUrl ? 'pointer-events-none opacity-70' : ''} hover:brightness-110`}
        >
          {isAndroid ? 'Play Store' : 'App Store'}
          <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw]" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-[1.25vw] bg-[#222222] border border-[#666666]/30 rounded-[0.83vw] gap-[1.67vw] shrink-0 shadow-lg">
      <div className="flex flex-col gap-[0.42vw]">
        <h3 className="text-white text-[1.46vw] font-bold not-italic font-inter not-italic leading-none tracking-tight">Mobile Apps</h3>
        <p className="text-[#CCCCCC] text-[0.83vw] opacity-60">Latest versions of your iOS and Android Mobile Apps</p>
      </div>
      <div className="flex flex-row gap-[0.83vw]">
        <AppTile platform="iOS" platformKey="ios" version={value.ios.version} storeUrl={value.ios.storeUrl} isAndroid={false} />
        <AppTile platform="Android" platformKey="android" version={value.android.version} storeUrl={value.android.storeUrl} isAndroid />
      </div>
    </div>
  );
};

export default MobileAppsCard;
