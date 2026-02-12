
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
      className={`w-12 h-7 rounded-full border border-white transition-all duration-300 relative ${active ? 'bg-transparent' : 'bg-transparent opacity-30'}`}
    >
      <div className={`absolute top-0.5 w-[21px] h-[21px] bg-white rounded-full shadow-md transition-all duration-300 ${active ? 'right-0.5' : 'left-0.5'}`}></div>
    </button>
  );

  return (
    <div className="flex flex-col p-6 bg-[#222222] border border-[#666666]/30 rounded-[16px] gap-8 shrink-0 shadow-lg min-h-[442px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-[28px] font-bold font-inter leading-none tracking-tight">Content & Moderation</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60 font-inter leading-[150%]">Manage what content is allowed on the platform and set rules for moderation, reporting, and member behavior.</p>
      </div>

      <div className="flex flex-col gap-6">
        {[
          { id: 'profile', label: 'Enable Profile Scanning' },
          { id: 'media', label: 'Enable Media Scanning' },
          { id: 'messages', label: 'Enable Messages Scanning' },
          { id: 'hideFlagged', label: 'Automatically Hide Flagged Profiles' }
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <span className="text-white text-[16px] font-inter">{item.label}</span>
            <Switch active={toggles[item.id as keyof typeof toggles]} onClick={() => toggleHandler(item.id as any)} />
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-6 mt-2">
        <div className="flex-1 flex flex-col gap-1 border-b border-white py-1">
          <label className="text-white text-[12px] font-bold uppercase tracking-widest font-inter opacity-80">Auto-Flag Threshold</label>
          <input 
            type="text" 
            value={thresholds.autoFlag} 
            onChange={(e) => inputHandler('autoFlag', e.target.value)}
            className="bg-transparent border-none text-white text-[18px] focus:outline-none font-inter py-1" 
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 border-b border-white py-1">
          <label className="text-white text-[12px] font-bold uppercase tracking-widest font-inter opacity-80">Max Reports Before Suspension</label>
          <input 
            type="text" 
            value={thresholds.maxReports} 
            onChange={(e) => inputHandler('maxReports', e.target.value)}
            className="bg-transparent border-none text-white text-[18px] focus:outline-none font-inter py-1" 
          />
        </div>
      </div>
    </div>
  );
};

export default ContentModerationCard;
