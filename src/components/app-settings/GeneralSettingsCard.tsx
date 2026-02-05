
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
    <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.21vw]">
      <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(id, e.target.value)}
        className="bg-transparent border-none text-white text-[0.94vw] focus:outline-none font-inter not-italic py-[0.21vw]"
      />
    </div>
  );

  return (
    <div className="flex flex-col p-[1.25vw] bg-[#222222] border border-[#666666]/30 rounded-[0.83vw] gap-[1.67vw] shrink-0 shadow-lg min-h-[21.77vw]">
      <div className="flex flex-col gap-[0.42vw]">
        <h3 className="text-white text-[1.46vw] font-bold not-italic font-inter not-italic leading-none tracking-tight">General Settings</h3>
        <p className="text-[#CCCCCC] text-[0.83vw] opacity-60 leading-relaxed font-inter not-italic">Adjust the main rules and limits that define Fennec’s experience — from group sizes to interaction limits.</p>
      </div>

      <div className="grid grid-cols-2 gap-x-[1.25vw] gap-y-[2.08vw]">
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
