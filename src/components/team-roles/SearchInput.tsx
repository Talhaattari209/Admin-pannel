import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search" }) => {
    return (
        <div className="relative flex items-center w-full max-w-[412px] h-[56px] px-4 gap-4 bg-[#111111]/50 border border-[#666666]/50 rounded-[16px] backdrop-blur-sm isolation-isolate group focus-within:border-white/40 transition-all">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-grow bg-transparent border-none text-white text-[16px] focus:outline-none placeholder:text-white/40 font-normal font-['SF_Pro_Text']"
            />
        </div>
    );
};

export default SearchInput;
