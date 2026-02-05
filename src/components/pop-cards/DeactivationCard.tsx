import React from 'react';
import BaseCard from './BaseCard';

interface DeactivationCardProps {
    onCancel: () => void;
    onDeactivate: () => void;
}

const DeactivationCard: React.FC<DeactivationCardProps> = ({ onCancel, onDeactivate }) => {
    const icon = (
        <svg viewBox="0 0 24 24" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );

    const description = (
        <div className="flex flex-col gap-4">
            <p className="text-[18px] font-normal not-italic leading-[32px]">Are you sure you want to deactivate this user’s account?</p>
            <p className="text-[14px] font-normal not-italic leading-[150%] opacity-80">Once deactivated, the user will not be able to log in or access the app until reactivated by an admin.</p>
        </div>
    );

    const actions = (
        <>
            <button onClick={onCancel} className="flex-1 px-6 h-[56px] border border-white rounded-[52px] text-white font-medium not-italic hover:bg-white/10 transition-all">Cancel</button>
            <button onClick={onDeactivate} className="flex-1 px-6 h-[56px] bg-[#FF4E4E] rounded-[52px] text-white font-medium not-italic hover:brightness-110 transition-all shadow-lg">Deactivate</button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Deactivate User?"
            description={description}
            actions={actions}
            minHeight="533px"
        />
    );
};

export default DeactivationCard;
