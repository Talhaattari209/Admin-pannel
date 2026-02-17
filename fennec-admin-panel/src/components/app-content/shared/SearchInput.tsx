import React from 'react';
import { X } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    width?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search", width = "17.16vw" }) => {
    return (
        <div
            className="relative flex flex-row items-center h-[2.92vw] px-[0.66vw] gap-[0.66vw] bg-[#111111]/50 border border-[#666666]/50 rounded-[0.66vw] backdrop-blur-sm group focus-within:border-white/40 transition-all shrink-0"
            style={{ width }}
        >
            <div className="w-[1.25vw] h-[1.25vw] shrink-0 flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-grow bg-transparent border-none text-white text-[0.83vw] focus:outline-none placeholder:text-white/40 font-normal not-italic h-full relative z-10"
                style={{ paddingRight: '1.25vw' }} // Space for X
            />
            {value.length > 0 && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-[0.83vw] flex items-center justify-center hover:bg-white/10 rounded-full p-0.5 transition-colors z-20"
                    style={{ width: '1.25vw', height: '1.25vw' }}
                >
                    <X className="text-white w-full h-full" />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
