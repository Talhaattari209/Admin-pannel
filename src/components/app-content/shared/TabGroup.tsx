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
    className?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({ tabs, activeId, onChange, className = '' }) => {
    return (
        <div className={`flex flex-row gap-[0.42vw] w-full overflow-x-auto no-scrollbar shrink-0 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`flex flex-row items-center justify-center transition-all whitespace-nowrap font-medium not-italic px-[1.5vw] py-[0.8vw] h-[2.5vw] rounded-t-[0.63vw] text-[0.83vw] ${activeId === tab.id
                            ? 'bg-[#5F00DB] text-white'
                            : 'bg-[#222222] text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                        <div className={`flex items-center justify-center min-w-[0.94vw] h-[0.94vw] px-[0.42vw] rounded-full ml-[0.42vw] bg-[#FF4E4E] text-white text-[0.57vw] font-bold not-italic`}>
                            {tab.count}
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default TabGroup;
