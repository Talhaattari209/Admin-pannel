import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabGroupProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'nav' | 'table' | 'profile' | 'sub';
  className?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({ tabs, activeId, onChange, variant = 'table', className = '' }) => {
  return (
    <div className={`flex flex-row gap-2 pl-4 w-full overflow-x-auto no-scrollbar shrink-0 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex flex-row items-center justify-center transition-all whitespace-nowrap font-medium ${
            variant === 'nav' 
              ? `px-6 py-2 rounded-full text-[0.9vw] min-h-[40px] ${activeId === tab.id ? 'bg-[#5F00DB] text-white shadow-[0_0_15px_rgba(95,0,219,0.3)]' : 'text-white/60 hover:text-white'}`
              : variant === 'sub'
              ? `px-8 py-3 h-[48px] rounded-[12px] ${activeId === tab.id ? 'bg-[#5F00DB] text-white shadow-lg' : 'bg-transparent text-white/40 hover:text-white/60'}`
              : `px-[1.5vw] py-[0.8vw] h-[48px] rounded-t-[12px] text-[0.9vw] ${activeId === tab.id ? 'bg-[#5F00DB] text-white' : 'bg-[#222222] text-white/60 hover:text-white hover:bg-white/5'}`
          }`}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <div className={`flex items-center justify-center min-w-[18px] h-[18px] px-2 rounded-full ml-2 ${variant === 'sub' && activeId !== tab.id ? 'bg-white/10 text-white/40' : 'bg-[#FF4E4E] text-white'} text-[11px] font-bold`}>
              {tab.count}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabGroup;