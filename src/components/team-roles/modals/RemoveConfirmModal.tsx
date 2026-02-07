import React from 'react';
import { BaseCard } from '@/components/PopCards';

interface RemoveConfirmModalProps {
    type: 'member' | 'role';
    onCancel: () => void;
    onConfirm: () => void;
}

const RemoveConfirmModal: React.FC<RemoveConfirmModalProps> = ({ type, onCancel, onConfirm }) => {
    const isMember = type === 'member';

    const icon = (
        <div className="w-[2.08vw] h-[2.08vw] flex items-center justify-center">
            <svg viewBox="0 0 56 56" className="w-[100%] h-[100%] text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M28 12L10 44h36L28 12z" />
                <line x1="28" y1="24" x2="28" y2="34" />
                <circle cx="28" cy="40" r="1" fill="currentColor" />
            </svg>
        </div>
    );

    const title = isMember ? 'Remove Team Member?' : 'Delete Role?';

    // Description text
    const description = isMember
        ? 'Are you sure you want to deactivate this team member from accessing the admin panel?'
        : 'Are you sure you want to delete this role? Team members with this role will not be able to access the admin panel until they are assigned to a new role.';

    // Height based on type
    // Member: 438h -> 22.81vw
    // Role: 502h -> 26.15vw
    const height = isMember ? '22.81vw' : '26.15vw';

    const actions = (
        <>
            <button
                onClick={onCancel}
                className="flex flex-row justify-center items-center px-[1.04vw] py-[0.63vw] gap-[0.42vw] h-[2.5vw] rounded-[2.5vw] font-medium not-italic text-[0.73vw] leading-[1.04vw] transition-all cursor-pointer flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.21vw 0.63vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
            >
                Cancel
            </button>
            <button
                onClick={onConfirm}
                className="flex flex-row justify-center items-center px-[1.04vw] py-[0.63vw] gap-[0.42vw] h-[2.5vw] rounded-[2.5vw] font-medium not-italic text-[0.73vw] leading-[1.04vw] transition-all cursor-pointer flex-1 bg-[#FF4E4E] text-white shadow-[0px_-0.21vw_0.42vw_rgba(255,78,78,0.25),0px_0.21vw_0.42vw_rgba(255,78,78,0.25)] hover:bg-[#ff6666]"
            >
                {isMember ? 'Remove' : 'Delete'}
            </button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title={title}
            description={description}
            actions={actions}
            glowColor="#FF4E4E"
            height={height}
        />
    );
};

export default RemoveConfirmModal;
