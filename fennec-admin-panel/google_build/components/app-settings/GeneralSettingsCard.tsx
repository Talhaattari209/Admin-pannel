
import React, { useState } from 'react';

const GeneralSettingsCard: React.FC = () => {
  const [settings, setSettings] = useState({
    minGroup: '2',
    maxGroup: '5',
    pokesFree: '3',
    pokesPremium: '10',
    likesLimit: '100'
  });

  const handleChange = (key: keyof typeof settings, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const Field = ({ label, value, id }: { label: string, value: string, id: keyof typeof settings }) => (
    <div className="flex flex-col gap-2 border-b border-white py-1">
      <label className="text-white text-[12px] font-bold uppercase tracking-widest opacity-80 font-inter">{label}</label>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => handleChange(id, e.target.value)}
        className="bg-transparent border-none text-white text-[18px] focus:outline-none font-inter py-1" 
      />
    </div>
  );

  return (
    <div className="flex flex-col p-6 bg-[#222222] border border-[#666666]/30 rounded-[16px] gap-8 shrink-0 shadow-lg min-h-[418px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-[28px] font-bold font-inter leading-none tracking-tight">General Settings</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60 leading-relaxed font-inter">Adjust the main rules and limits that define Fennec’s experience — from group sizes to interaction limits.</p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10">
        <Field label="Min Group Size" value={settings.minGroup} id="minGroup" />
        <Field label="Max Group Size" value={settings.maxGroup} id="maxGroup" />
        <Field label="Weekly Pokes (Free)" value={settings.pokesFree} id="pokesFree" />
        <Field label="Weekly Pokes (Premium)" value={settings.pokesPremium} id="pokesPremium" />
        <div className="col-span-2">
          <Field label="Daily Likes Limit" value={settings.likesLimit} id="likesLimit" />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsCard;
