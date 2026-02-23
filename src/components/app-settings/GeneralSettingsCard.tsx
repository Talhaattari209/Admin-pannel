import React from 'react';
import type { AppSettingsGeneral } from '@/types/api';

interface GeneralSettingsCardProps {
  canEdit?: boolean;
  value: AppSettingsGeneral;
  onChange: (value: AppSettingsGeneral) => void;
}

const GeneralSettingsCard: React.FC<GeneralSettingsCardProps> = ({ canEdit = true, value, onChange }) => {
  const handleChange = (key: keyof AppSettingsGeneral, val: string) => {
    const num = key === 'dailyLikesLimit' || key === 'minGroupSize' || key === 'maxGroupSize' || key === 'weeklyPokesFree' || key === 'weeklyPokesPremium'
      ? (parseInt(val, 10) || 0)
      : (parseFloat(val) || 0);
    onChange({ ...value, [key]: num });
  };

  const Field = ({ label, value: fieldVal, id }: { label: string; value: number; id: keyof AppSettingsGeneral }) => (
    <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.21vw]">
      <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">{label}</label>
      <input
        type="number"
        value={fieldVal}
        onChange={(e) => handleChange(id, e.target.value)}
        disabled={!canEdit}
        className={`bg-transparent border-none text-white text-[0.94vw] focus:outline-none font-inter not-italic py-[0.21vw] ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );

  return (
    <div className="flex flex-col p-[1.25vw] bg-[#222222] border border-[#666666]/30 rounded-[0.83vw] gap-[1.67vw] shrink-0 shadow-lg min-h-[21.77vw]">
      <div className="flex flex-col gap-[0.42vw]">
        <h3 className="text-white text-[1.46vw] font-bold not-italic font-inter not-italic leading-none tracking-tight">General Settings</h3>
        <p className="text-[#CCCCCC] text-[0.83vw] opacity-60 leading-relaxed font-inter not-italic">Adjust the main rules and limits that define Fennec's experience — from group sizes to interaction limits.</p>
      </div>

      <div className="grid grid-cols-2 gap-x-[1.25vw] gap-y-[2.08vw]">
        <Field label="Min Group Size" value={value.minGroupSize} id="minGroupSize" />
        <Field label="Max Group Size" value={value.maxGroupSize} id="maxGroupSize" />
        <Field label="Weekly Pokes (Free)" value={value.weeklyPokesFree} id="weeklyPokesFree" />
        <Field label="Weekly Pokes (Premium)" value={value.weeklyPokesPremium} id="weeklyPokesPremium" />
        <div className="col-span-2">
          <Field label="Daily Likes Limit" value={value.dailyLikesLimit} id="dailyLikesLimit" />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsCard;
