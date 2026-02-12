import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterSelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
    width?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange, width = "8.33vw" }) => {
    return (
        <div className="flex flex-col items-start h-[2.92vw] shrink-0" style={{ width }}>
            <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-tight mb-[0.21vw] font-inter not-italic opacity-100 flex items-center">
                {label}
            </label>
            <div className="relative w-full border-b border-white flex items-center h-[2.08vw] pb-[0.21vw] cursor-pointer group shrink-0 hover:border-white/80 transition-colors">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent text-white text-[0.83vw] appearance-none focus:outline-none opacity-40 group-hover:opacity-100 transition-opacity pr-[1.67vw] font-inter not-italic h-full cursor-pointer"
                >
                    <option value="" disabled className="bg-[#222222]">Select</option>
                    {options.map(opt => (
                        <option key={opt} value={opt} className="bg-[#222222]">{opt}</option>
                    ))}
                    <option value="dummy1" className="bg-[#222222]">Dummy Opt 1</option>
                    <option value="dummy2" className="bg-[#222222]">Dummy Opt 2</option>
                </select>
                <div className="absolute right-0 pointer-events-none text-white w-[1.25vw] h-[1.25vw] flex items-center justify-center">
                    <ChevronDown className="w-[1.25vw] h-[1.25vw]" />
                </div>
            </div>
        </div>
    );
};

export default FilterSelect;
