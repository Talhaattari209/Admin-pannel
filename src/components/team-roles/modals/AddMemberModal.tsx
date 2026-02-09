import React from 'react';
import { BaseCard } from '@/components/PopCards';

interface AddMemberModalProps {
    onCancel: () => void;
    onInvite: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onCancel, onInvite }) => {
    // Reverted Icon Size to 2.92vw
    const icon = (
        <div className="w-[2.92vw] h-[2.92vw] flex items-center justify-center">
            <svg viewBox="0 0 56 56" className="w-[100%] h-[100%] text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v2M16 23c-4.418 0-8 3.582-8 8v2h16v-2c0-4.418-3.582-8-8-8zM36 23c4.418 0 8 3.582 8 8v2H28v-2c0-4.418 3.582-8 8-8zM28 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM41 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" /></svg>
        </div>
    );

    const actions = (
        <>
            <button
                onClick={onCancel}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
            >
                Cancel
            </button>
            <button
                onClick={onInvite}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-[#5F00DB] text-white shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff]"
            >
                Invite Team Member
            </button>
        </>
    );

    // Height 822px -> 42.81vw
    return (
        <BaseCard
            icon={icon}
            title="Add Team Member"
            description="Invite a new member to the admin panel."
            actions={actions}
            glowColor="#5F00DB"
            height="42.81vw"
        >
            <div className="flex flex-col gap-[0.63vw] w-full h-full min-h-0">
                {[
                    { label: 'Name', placeholder: 'John Doe', type: 'text' },
                    { label: 'Email', placeholder: 'john@fennec.com', type: 'email' }
                ].map(field => (
                    <div key={field.label} className="flex flex-col gap-[0.21vw] w-full">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">{field.label}</label>
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full h-[2.5vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] font-normal not-italic focus:outline-none placeholder:text-white/30"
                        />
                    </div>
                ))}

                <div className="flex flex-col gap-[0.21vw] w-full relative group">
                    <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Role</label>
                    <div className="relative">
                        <select className="w-full h-[2.5vw] bg-transparent border-b border-white text-white text-[0.83vw] appearance-none focus:outline-none cursor-pointer not-italic pl-[0.83vw]">
                            <option className="bg-[#222222]">Moderator</option>
                            <option className="bg-[#222222]">Admin</option>
                            <option className="bg-[#222222]">Viewer</option>
                        </select>
                        <div className="absolute right-0 bottom-[0.83vw] pointer-events-none text-white/40 group-hover:text-white transition-colors">
                            <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw]" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                    </div>
                </div>

                {[
                    { label: 'Password', placeholder: '················' },
                    { label: 'Confirm Password', placeholder: '················' }
                ].map(field => (
                    <div key={field.label} className="flex flex-col gap-[0.21vw] w-full relative">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">{field.label}</label>
                        <div className="relative flex items-center justify-between border-b border-white h-[2.5vw]">
                            <input type="password" placeholder={field.placeholder} className="w-full h-full px-[0.83vw] bg-transparent border-none text-white text-[0.83vw] focus:outline-none placeholder:text-white/30 not-italic flex-grow" />
                            <button className="text-white/40 hover:text-white transition-colors pr-[0.83vw]"><svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg></button>
                        </div>
                    </div>
                ))}
            </div>
        </BaseCard>
    );
};

export default AddMemberModal;
