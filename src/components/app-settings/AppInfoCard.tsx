
import React from 'react';

interface AppInfoCardProps {
  platform: 'iOS' | 'Android';
  version: string;
}

const AppInfoCard: React.FC<AppInfoCardProps> = ({ platform, version }) => {
  const isAndroid = platform === 'Android';

  return (
    <div className="flex flex-row items-center p-5 bg-[#16003F] border border-[#666666]/30 rounded-[16px] gap-6 shrink-0 shadow-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5F00DB] opacity-10 blur-3xl rounded-full"></div>

      {/* Reimagined App Icon */}
      <div className="w-20 h-20 bg-[#5F00DB] rounded-[24px] flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(95,0,219,0.3)] border border-white/10">
        <div className="w-12 h-12 flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Central Large Dot */}
            <circle cx="50" cy="50" r="10" fill="white" />
            {/* Inner Ring */}
            <circle cx="50" cy="22" r="4" fill="white" />
            <circle cx="50" cy="78" r="4" fill="white" />
            <circle cx="22" cy="50" r="4" fill="white" />
            <circle cx="78" cy="50" r="4" fill="white" />
            {/* Medium Ring */}
            <circle cx="30" cy="30" r="6" fill="white" />
            <circle cx="70" cy="30" r="6" fill="white" />
            <circle cx="30" cy="70" r="6" fill="white" />
            <circle cx="70" cy="70" r="6" fill="white" />
            {/* Outer Edge Dots */}
            <circle cx="10" cy="50" r="2.5" fill="white" />
            <circle cx="90" cy="50" r="2.5" fill="white" />
            <circle cx="50" cy="10" r="2.5" fill="white" />
            <circle cx="50" cy="90" r="2.5" fill="white" />
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-white text-[24px] font-bold not-italic font-inter not-italic leading-none mb-2">{platform}</h3>
        <span className="text-white/40 text-[14px] font-inter not-italic font-light not-italic">Version {version}</span>
      </div>

      {/* Mascot & Button Container */}
      <div className="flex flex-row items-center gap-6">
        {/* Mascot Icon */}
        <div className="text-white/80 group-hover:scale-110 transition-transform duration-300">
          {isAndroid ? (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M17.523 15.3414l1.373 2.378c.11.19.044.433-.146.543a.3946.3946 0 01-.543-.146l-1.395-2.417C15.314 16.51 13.731 17 12 17c-1.731 0-3.314-.49-4.812-1.299l-1.395 2.417c-.11.19-.353.256-.543.146a.3946.3946 0 01-.146-.543l1.373-2.378C4.058 13.561 2.5 11.231 2.5 8.5h19c0 2.731-1.558 5.061-3.977 6.8414zM16 6a.8.8 0 100-1.6.8.8 0 000 1.6zm-8 0a.8.8 0 100-1.6.8.8 0 000 1.6z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M17.057 14.921c-.022 2.966 2.56 3.963 2.593 3.978-.022.072-.407 1.392-1.349 2.766-.813 1.189-1.657 2.373-3.003 2.398-1.32.024-1.748-.781-3.26-.781-1.512 0-1.988.756-3.235.805-1.298.05-2.222-1.272-3.04-2.447-1.674-2.4-2.946-6.79-1.222-9.78.855-1.485 2.383-2.424 4.05-2.449 1.27-.024 2.466.852 3.243.852.777 0 2.215-1.074 3.716-.921 1.096.046 2.394.618 3.094 1.487-1.12.656-1.884 1.836-1.887 3.092zm-2.03-9.524c.677-.822 1.133-1.966.99-3.109-1.033.041-2.28.687-3.02 1.554-.666.772-1.248 1.956-1.092 3.064 1.154.089 2.316-.549 3.122-1.509z" />
            </svg>
          )}
        </div>

        {/* Store Button */}
        <button className="flex items-center justify-center gap-3 px-6 py-3 bg-[#5F00DB] rounded-full text-white font-medium not-italic hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_12px_rgba(95,0,219,0.3)] cursor-pointer">
          <span className="text-[16px]">{isAndroid ? 'Play Store' : 'App Store'}</span>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppInfoCard;
