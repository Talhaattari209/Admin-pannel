import React from 'react';
import BaseCard from './BaseCard';

interface SuccessCardProps {
    onDone: () => void;
    title?: string;
    description?: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
    onDone,
    title = "User Deactivated",
    description = "The account has been successfully deactivated. You can reactivate it anytime from the user’s detail page."
}) => {
    const icon = (
        <img src="/assets/check-circle-success.svg" alt="Success" className="w-[72px] h-[72px] object-contain" />
    );

    const actions = (
        <button onClick={onDone} className="flex-1 h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium not-italic shadow-lg hover:brightness-110">Done</button>
    );

    return (
        <BaseCard
            icon={icon}
            title={title}
            description={description}
            actions={actions}
            minHeight="470px"
        />
    );
};

export default SuccessCard;
