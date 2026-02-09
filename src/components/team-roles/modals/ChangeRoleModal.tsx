
import React from 'react';

interface ChangeRoleModalProps {
    onCancel: () => void;
    onUpdate: () => void;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({ onCancel, onUpdate }) => {
    return (
        <div className="relative flex flex-col items-center p-[2.5vw] gap-[2.5vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[2.5vw] box-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 w-[25vw] min-w-[320px]">
            {/* Icon Section */}
            <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
                <div
                    className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
                    style={{ background: `linear-gradient(180deg, #5F00DB 30%, transparent 70%)` }}
                ></div>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
                <div className="relative z-10 flex items-center justify-center">
                    <svg viewBox="0 0 56 56" className="w-[2.08vw] h-[2.08vw] text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="28" cy="18" r="5" />
                        <path d="M18 32c0-4.418 3.582-8 8-8h4c4.418 0 8 3.582 8 8v2H18v-2z" />
                        <polyline points="38 18 42 22 48 16" />
                    </svg>
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                <h2 className="text-[1.67vw] font-medium not-italic leading-[2.08vw] tracking-[-0.02em] text-white font-inter">
                    Change Role
                </h2>
                <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] opacity-90 font-inter text-white">
                    Select a new role for the user.
                </p>
            </div>

            {/* Form Content */}
            <div className="flex flex-col gap-[0.21vw] w-full relative group">
                <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Role</label>
                <div className="relative">
                    <select className="w-full h-[2.29vw] bg-transparent border-b border-white text-white text-[0.73vw] appearance-none focus:outline-none cursor-pointer not-italic pl-[0.83vw]">
                        <option className="bg-[#222222]">Moderator</option>
                        <option className="bg-[#222222]">Admin</option>
                        <option className="bg-[#222222]">Viewer</option>
                    </select>
                    <div className="absolute right-0 bottom-[0.83vw] pointer-events-none text-white/40 group-hover:text-white transition-colors">
                        <svg viewBox="0 0 24 24" className="w-[0.83vw] h-[0.83vw]" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                <button
                    onClick={onCancel}
                    className="flex-1 h-[3.5vw] border border-white/20 bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] hover:bg-white/10 transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={onUpdate}
                    className="flex-1 h-[3.5vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all"
                >
                    Update Role
                </button>
            </div>
        </div>
    );
};

export default ChangeRoleModal;
