
import React, { useState } from 'react';
import PopCardWrapper from '@/components/pop-cards/PopCardWrapper';
import { Role, TeamMember } from '@/types/api';

interface ChangeRoleModalProps {
    member: TeamMember;
    roles: Role[];
    onCancel: () => void;
    onUpdate: (roleId: string) => void;
    isLoading?: boolean;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({ member, roles, onCancel, onUpdate, isLoading = false }) => {
    const [selectedRole, setSelectedRole] = useState<string>(member.role_id || '');

    const handleUpdate = () => {
        if (!selectedRole) {
            alert('Please select a role');
            return;
        }
        onUpdate(selectedRole);
    };

    return (
        <PopCardWrapper onClose={onCancel}>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[25vw] min-w-[320px]">
                {/* Icon Section */}
                <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
                    <div
                        className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
                        style={{ background: `linear-gradient(180deg, #5F00DB 30%, transparent 70%)` }}
                    ></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
                    <div className="relative z-10 flex items-center justify-center">
                        <svg viewBox="0 0 56 56" className="w-[2.92vw] h-[2.92vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M40 14L16 38M16 14l24 24" />
                        </svg>
                    </div>
                </div>

                {/* Header Section */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch shrink-0">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter">
                        Change Role
                    </h2>
                    <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] text-[#DDDDDD] font-inter">
                        Update role for {member.name}
                    </p>
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[0.83vw] w-full">
                    <div className="flex flex-col gap-[0.21vw] w-full relative group">
                        <label className="text-white text-[0.63vw] font-bold not-italic font-inter uppercase tracking-wider ml-[0.21vw]">
                            New Role
                        </label>
                        <div className="relative">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full h-[2.5vw] bg-transparent border-b border-white text-white text-[0.83vw] appearance-none focus:outline-none cursor-pointer not-italic font-inter pl-[0.83vw]"
                            >
                                <option value="" className="bg-[#222222] text-white/40">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id} className="bg-[#222222]">
                                        {role.title}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-0 bottom-[0.83vw] pointer-events-none text-white/40 group-hover:text-white transition-colors">
                                <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw]" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 h-[2.92vw] border border-white backdrop-blur-[6px] bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={isLoading}
                        className="flex-1 h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Updating...' : 'Update Role'}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default ChangeRoleModal;
