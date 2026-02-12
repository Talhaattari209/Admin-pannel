import React from 'react';
import SuccessCard from '@/components/pop-cards/SuccessCard';

interface PromptSuccessModalProps {
    title: string;
    onDone: () => void;
}

const PromptSuccessModal: React.FC<PromptSuccessModalProps> = ({ title, onDone }) => {
    return (
        <SuccessCard
            onDone={onDone}
            title={title}
            description="The action has been completed successfully."
        />
    );
};

export default PromptSuccessModal;
