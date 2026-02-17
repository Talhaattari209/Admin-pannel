
import React from 'react';

interface SelectionListProps {
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
}

export const SelectionList = ({ options, selected, onSelect }: SelectionListProps) => (
    <div className="w-full bg-[rgba(17,17,17,0.25)] border border-[rgba(68,68,68,0.5)] rounded-2xl overflow-hidden flex flex-col gap-[1px]">
        {options.map((option: string) => (
            <label
                key={option}
                className={`flex items-center gap-4 p-4 cursor-pointer transition-colors h-[56px] ${selected === option ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
            >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all shrink-0 ${selected === option ? 'border-white bg-white' : 'border-white bg-[#222222]'
                    }`}>
                    {selected === option && <div className="w-2 h-2 rounded-full bg-[#16003F]" />}
                </div>
                <span className="text-white text-base leading-[150%] font-normal not-italic">{option}</span>
                <input
                    type="radio"
                    className="hidden"
                    checked={selected === option}
                    onChange={() => onSelect(option)}
                />
            </label>
        ))}
    </div>
);
