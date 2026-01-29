
import React from 'react';

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="flex flex-col items-start w-[200px] h-[56px]">
      <label className="text-white text-[12px] font-bold tracking-tight mb-1">{label}</label>
      <div className="relative w-full border-b border-white flex items-center h-[40px] pb-1 cursor-pointer group">
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-white text-[16px] appearance-none focus:outline-none opacity-60 group-hover:opacity-100 transition-opacity pr-8"
        >
          <option value="" disabled className="bg-[#222222]">Select</option>
          {options.map(opt => (
            <option key={opt} value={opt} className="bg-[#222222]">{opt}</option>
          ))}
        </select>
        <div className="absolute right-0 pointer-events-none text-white">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;
