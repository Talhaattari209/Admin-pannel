import React from 'react';
import { BaseCard } from '@/components/PopCards';

interface ChangeRoleModalProps {
    onCancel: () => void;
    onUpdate: () => void;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({ onCancel, onUpdate }) => {
    const icon = (
        <div className="w-[2.08vw] h-[2.08vw] flex items-center justify-center">
            <svg viewBox="0 0 56 56" className="w-[100%] h-[100%] text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="28" cy="18" r="5" />
                <path d="M18 32c0-4.418 3.582-8 8-8h4c4.418 0 8 3.582 8 8v2H18v-2z" />
                <polyline points="38 18 42 22 48 16" />
            </svg>
        </div>
    );

    const actions = (
        <>
            <button
                onClick={onCancel}
                className="flex flex-row justify-center items-center px-[1.04vw] py-[0.63vw] gap-[0.42vw] h-[2.5vw] rounded-[2.5vw] font-medium not-italic text-[0.73vw] leading-[1.04vw] transition-all cursor-pointer flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.21vw 0.63vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
            >
                Cancel
            </button>
            <button
                onClick={onUpdate}
                className="flex flex-row justify-center items-center px-[1.04vw] py-[0.63vw] gap-[0.42vw] h-[2.5vw] rounded-[2.5vw] font-medium not-italic text-[0.73vw] leading-[1.04vw] transition-all cursor-pointer flex-1 bg-[#5F00DB] text-white shadow-[0px_-0.21vw_0.42vw_rgba(95,0,219,0.25),0px_0.21vw_0.42vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff]"
            >
                Update Role
            </button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Change Role"
            description="Select a new role for the user."
            actions={actions}
            glowColor="#5F00DB"
            height="22.81vw"
        >
            <div className="flex flex-col gap-[0.21vw] w-full relative group">
                <label className="text-white text-[0.63vw] font-bold not-italic font-['SF_Pro_Text'] uppercase tracking-wider ml-[0.21vw]">Role</label>
                <div className="relative">
                    <select className="w-full h-[2.29vw] bg-transparent border-b border-white text-white text-[0.73vw] appearance-none focus:outline-none cursor-pointer font-['SF_Pro_Text'] not-italic pl-[0.83vw]">
                        <option className="bg-[#222222]">Moderator</option>
                        <option className="bg-[#222222]">Admin</option>
                        <option className="bg-[#222222]">Viewer</option>
                    </select>
                    <div className="absolute right-0 bottom-[0.83vw] pointer-events-none text-white/40 group-hover:text-white transition-colors">
                        <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw]" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
};

export default ChangeRoleModal;
