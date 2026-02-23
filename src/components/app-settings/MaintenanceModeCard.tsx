import React from 'react';
import type { AppSettingsMaintenanceMode } from '@/types/api';

interface MaintenanceModeCardProps {
  canEdit?: boolean;
  value: AppSettingsMaintenanceMode;
  onChange: (value: AppSettingsMaintenanceMode) => void;
}

const MaintenanceModeCard: React.FC<MaintenanceModeCardProps> = ({ canEdit = true, value, onChange }) => {
  const Switch = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      disabled={!canEdit}
      className={`w-[2.5vw] h-[1.46vw] rounded-full border border-[#888888] relative transition-all duration-300 ${active ? 'bg-[#5F00DB] border-[#5F00DB]' : 'bg-transparent'} ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`absolute top-[0.15vw] w-[1.09vw] h-[1.09vw] bg-[#888888] rounded-full transition-all duration-300 ${active ? 'right-[0.15vw] bg-white' : 'left-[0.15vw]'}`}></div>
    </button>
  );

  const formatDateForInput = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toISOString().slice(0, 10);
  };

  return (
    <div className="flex flex-col p-[1.25vw] bg-[#222222] border border-[#666666]/30 rounded-[0.83vw] gap-[1.67vw] shrink-0 shadow-lg min-h-[32.6vw]">
      <div className="flex flex-col gap-[0.42vw]">
        <h3 className="text-white text-[1.46vw] font-bold not-italic font-inter not-italic leading-none tracking-tight">Maintenance Mode</h3>
        <p className="text-[#CCCCCC] text-[0.83vw] opacity-60 leading-relaxed font-inter not-italic">Use this mode to temporarily disable public access while performing updates or backend maintenance.</p>
      </div>

      <div className="flex flex-col gap-[1.25vw]">
        <div className="flex items-center justify-between">
          <span className="text-white text-[0.83vw] font-inter not-italic">Enable Maintenance Mode</span>
          <Switch active={value.enabled} onClick={() => onChange({ ...value, enabled: !value.enabled })} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white text-[0.83vw] font-inter not-italic">Notify Users</span>
          <Switch active={value.notifyUsers} onClick={() => onChange({ ...value, notifyUsers: !value.notifyUsers })} />
        </div>
      </div>

      <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">Maintenance Message</label>
        <textarea
          value={value.message}
          onChange={(e) => onChange({ ...value, message: e.target.value })}
          disabled={!canEdit}
          placeholder="Custom message shown to users"
          className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none resize-none h-[6.25vw] font-inter not-italic py-[0.42vw] ${!canEdit ? 'opacity-50 cursor-not-allowed placeholder:text-white/40' : 'placeholder:text-white/40'}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-[1.25vw]">
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">Start Date</label>
          <input
            type="date"
            value={formatDateForInput(value.startDate)}
            onChange={(e) => onChange({ ...value, startDate: e.target.value || value.startDate })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">Start Time</label>
          <input
            type="time"
            value={value.startTime}
            onChange={(e) => onChange({ ...value, startTime: e.target.value })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1.25vw]">
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">End Date</label>
          <input
            type="date"
            value={formatDateForInput(value.endDate)}
            onChange={(e) => onChange({ ...value, endDate: e.target.value || value.endDate })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">End Time</label>
          <input
            type="time"
            value={value.endTime}
            onChange={(e) => onChange({ ...value, endTime: e.target.value })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModeCard;
