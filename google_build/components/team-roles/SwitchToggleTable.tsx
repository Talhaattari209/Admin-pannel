
import React, { useState } from 'react';

const MODULES = [
  'Users Management', 'App Content', 'Support Requests', 'Reported Problems', 'App Settings', 'Team & Roles', 'System Logs'
];

const SwitchToggleTable: React.FC = () => {
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>(
    MODULES.reduce((acc, mod) => ({
      ...acc,
      [mod]: { view: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems', edit: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems', delete: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems', export: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems' }
    }), {})
  );

  const toggle = (mod: string, key: string) => {
    setPermissions(prev => ({
      ...prev,
      [mod]: { ...prev[mod], [key]: !prev[mod][key] }
    }));
  };

  const Switch = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-[48px] h-[28px] rounded-full border transition-all duration-300 relative ${active ? 'bg-[#222222] border-white' : 'bg-[#222222] border-[#888888]'}`}
    >
      <div className={`absolute top-[2px] w-[22px] h-[22px] rounded-full shadow-md transition-all duration-300 ${active ? 'right-[2px] bg-white' : 'left-[2px] bg-[#888888]'}`}></div>
    </button>
  );

  return (
    <div className="flex flex-col p-4 bg-[#111111] border border-white/10 rounded-[16px] gap-4 w-full">
      {/* Header */}
      <div className="flex flex-row items-center gap-4 px-2 h-8">
        <div className="flex-grow text-[#CCCCCC] text-[16px] font-['SF_Pro_Text']">Module</div>
        {['View', 'Edit', 'Delete', 'Export'].map(label => (
          <div key={label} className="w-[72px] text-center text-[#CCCCCC] text-[16px] font-['SF_Pro_Text']">{label}</div>
        ))}
      </div>

      {/* Rows */}
      {MODULES.map(mod => (
        <div key={mod} className="flex flex-row items-center gap-4 px-2 h-8 min-h-[32px]">
          <div className="flex-grow text-[#CCCCCC] text-[16px] font-['SF_Pro_Text']">{mod}</div>
          <div className="w-[72px] flex justify-center"><Switch active={permissions[mod].view} onToggle={() => toggle(mod, 'view')} /></div>
          <div className="w-[72px] flex justify-center"><Switch active={permissions[mod].edit} onToggle={() => toggle(mod, 'edit')} /></div>
          <div className="w-[72px] flex justify-center"><Switch active={permissions[mod].delete} onToggle={() => toggle(mod, 'delete')} /></div>
          <div className="w-[72px] flex justify-center"><Switch active={permissions[mod].export} onToggle={() => toggle(mod, 'export')} /></div>
        </div>
      ))}
    </div>
  );
};

export default SwitchToggleTable;
