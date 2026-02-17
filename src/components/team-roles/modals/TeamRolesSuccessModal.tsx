import React from 'react';
import SuccessCard from '@/components/pop-cards/SuccessCard';

interface TeamRolesSuccessModalProps {
    title: string;
    onDone: () => void;
}

const TeamRolesSuccessModal: React.FC<TeamRolesSuccessModalProps> = ({ title, onDone }) => {
    return (
        <SuccessCard
            onDone={onDone}
            title={title}
            description="The action has been completed successfully."
        />
    );
};

export default TeamRolesSuccessModal;
