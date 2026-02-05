import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange, placeholder = "•••••••••••••••••" }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-start p-0 w-full">
            {/* Label Container */}
            <div className="flex flex-row items-start p-0 gap-[0.21vw] w-full h-[0.83vw]">
                <label className="font-['SF_Pro_Text'] font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">
                    {label}
                </label>
            </div>

            {/* Input Container */}
            <div className="box-border flex flex-row items-center py-[0.42vw] px-0 gap-[0.83vw] w-full h-[2.5vw] min-h-[2.5vw] border-b border-white">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-[1.25vw] font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white bg-transparent border-none outline-none placeholder-white/50"
                />
                <button
                    onClick={toggleVisibility}
                    className="flex-none p-0 bg-transparent border-none cursor-pointer text-white hover:text-white/80 transition-colors"
                    type="button"
                >
                    {showPassword ? (
                        <EyeOff className="w-[1.25vw] h-[1.25vw]" />
                    ) : (
                        <Eye className="w-[1.25vw] h-[1.25vw]" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
