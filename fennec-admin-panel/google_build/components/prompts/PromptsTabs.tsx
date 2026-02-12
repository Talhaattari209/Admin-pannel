import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface PromptsTabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

const PromptsTabs: React.FC<PromptsTabsProps> = ({ tabs, activeTabId, onTabChange }) => {
  return (
    <div className="flex flex-row gap-2 pl-4 w-full overflow-x-auto no-scrollbar mb-[-1px] z-10 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-row items-center justify-center px-[1.5vw] py-[0.8vw] gap-2 h-[48px] rounded-t-[12px] transition-all duration-300 font-medium whitespace-nowrap text-[0.9vw] ${
            activeTabId === tab.id 
            ? 'bg-[#5F00DB] text-white' 
            : 'bg-[#222222] text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <div className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#FF4E4E] rounded-full">
              <span className="text-white text-[11px] font-bold">{tab.count}</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default PromptsTabs;