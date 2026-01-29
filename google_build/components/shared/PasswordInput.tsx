import React, { useState } from 'react';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "················",
  autoComplete = "new-password"
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-start gap-1 w-full border-b border-white py-1 group">
      <label className="text-white text-[12px] font-bold uppercase tracking-widest leading-[16px] font-inter opacity-60">
        {label}
      </label>
      <div className="flex items-center w-full h-[36px]">
        <input 
          type={show ? "text" : "password"} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-grow bg-transparent border-none text-white text-[16px] leading-[24px] font-inter focus:outline-none placeholder:text-white/20"
        />
        <button 
          type="button" 
          onClick={() => setShow(!show)}
          className="p-2 text-white/40 hover:text-white transition-colors shrink-0"
          title={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;