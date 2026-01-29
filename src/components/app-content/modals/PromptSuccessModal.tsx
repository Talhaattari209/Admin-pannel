import React from 'react';
import { SuccessCard } from '@/components/PopCards';

interface PromptSuccessModalProps {
    title: string;
    onDone: () => void;
}

const PromptSuccessModal: React.FC<PromptSuccessModalProps> = ({ title, onDone }) => {
    return (
        <SuccessCard
            isOpen={true}
            onClose={onDone}
            title={title}
            description="The action has been completed successfully."
            buttonLabel="Done"
        />
    );
};

export default PromptSuccessModal;
