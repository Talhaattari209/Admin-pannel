import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    width?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search", width = "21.46vw" }) => {
    return (
        <div
            className="relative flex flex-row items-center h-[2.92vw] px-[0.83vw] gap-[0.83vw] bg-[#111111]/50 border border-[#666666]/50 rounded-[0.83vw] backdrop-blur-sm isolation-isolate group focus-within:border-white/40 transition-all shrink-0"
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
                className="flex-grow bg-transparent border-none text-white text-[0.83vw] focus:outline-none placeholder:text-white/40 font-normal h-full"
            />
        </div>
    );
};

export default SearchInput;
