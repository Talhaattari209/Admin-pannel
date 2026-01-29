import React from 'react';

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  width?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange, width = "200px" }) => {
  return (
    <div className="flex flex-col items-start h-[56px] shrink-0" style={{ width }}>
      <label className="h-[16px] text-white text-[12px] font-bold uppercase tracking-tight mb-1 font-inter opacity-100 flex items-center">
        {label}
      </label>
      <div className="relative w-full border-b border-white flex items-center h-[40px] pb-1 cursor-pointer group shrink-0">
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-white text-[16px] appearance-none focus:outline-none opacity-40 group-hover:opacity-100 transition-opacity pr-8 font-inter h-full cursor-pointer"
        >
          <option value="" disabled className="bg-[#222222]">Select</option>
          {options.map(opt => (
            <option key={opt} value={opt} className="bg-[#222222]">{opt}</option>
          ))}
        </select>
        <div className="absolute right-0 pointer-events-none text-white w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;