import React from 'react';
import { SuccessCard } from '@/components/PopCards';

interface TeamRolesSuccessModalProps {
    title: string;
    onDone: () => void;
}

const TeamRolesSuccessModal: React.FC<TeamRolesSuccessModalProps> = ({ title, onDone }) => {
    return (
        <SuccessCard
            isOpen={true}
            onClose={onDone}
            title={title}
            description="The action has been completed successfully."
            buttonLabel="Done"
        // Default dimensions in SuccessCard are 25vw / 17.81vw (480w, 342h) which matches usage.
        />
    );
};

export default TeamRolesSuccessModal;
