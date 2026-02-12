
import React, { useState } from 'react';

const ContentModerationCard: React.FC = () => {
  const [toggles, setToggles] = useState({
    profile: true,
    media: true,
    messages: true,
    hideFlagged: true
  });

  const [thresholds, setThresholds] = useState({
    autoFlag: '5',
    maxReports: '10'
  });

  const toggleHandler = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const inputHandler = (key: keyof typeof thresholds, val: string) => {
    setThresholds(prev => ({ ...prev, [key]: val }));
  };

  const Switch = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-[2.5vw] h-[1.46vw] rounded-full border border-white transition-all duration-300 relative ${active ? 'bg-transparent' : 'bg-transparent opacity-30'}`}
    >
      <div className={`absolute top-[0.15vw] w-[1.09vw] h-[1.09vw] bg-white rounded-full shadow-md transition-all duration-300 ${active ? 'right-[0.15vw]' : 'left-[0.15vw]'}`}></div>
    </button>
  );

  return (
    <div className="flex flex-col p-[1.25vw] bg-[#222222] border border-[#666666]/30 rounded-[0.83vw] gap-[1.67vw] shrink-0 shadow-lg min-h-[23.02vw]">
      <div className="flex flex-col gap-[0.42vw]">
        <h3 className="text-white text-[1.46vw] font-bold not-italic font-inter not-italic leading-none tracking-tight">Content & Moderation</h3>
        <p className="text-[#CCCCCC] text-[0.83vw] opacity-60 font-inter not-italic leading-[150%]">Manage what content is allowed on the platform and set rules for moderation, reporting, and member behavior.</p>
      </div>

      <div className="flex flex-col gap-[1.25vw]">
        {[
          { id: 'profile', label: 'Enable Profile Scanning' },
          { id: 'media', label: 'Enable Media Scanning' },
          { id: 'messages', label: 'Enable Messages Scanning' },
          { id: 'hideFlagged', label: 'Automatically Hide Flagged Profiles' }
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <span className="text-white text-[0.83vw] font-inter not-italic">{item.label}</span>
            <Switch active={toggles[item.id as keyof typeof toggles]} onClick={() => toggleHandler(item.id as any)} />
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-[1.25vw] mt-[0.42vw]">
        <div className="flex-1 flex flex-col gap-[0.21vw] border-b border-white py-[0.21vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest font-inter not-italic opacity-80">Auto-Flag Threshold</label>
          <input
            type="text"
            value={thresholds.autoFlag}
            onChange={(e) => inputHandler('autoFlag', e.target.value)}
            className="bg-transparent border-none text-white text-[0.94vw] focus:outline-none font-inter not-italic py-[0.21vw]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-[0.21vw] border-b border-white py-[0.21vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest font-inter not-italic opacity-80">Max Reports Before Suspension</label>
          <input
            type="text"
            value={thresholds.maxReports}
            onChange={(e) => inputHandler('maxReports', e.target.value)}
            className="bg-transparent border-none text-white text-[0.94vw] focus:outline-none font-inter not-italic py-[0.21vw]"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentModerationCard;
