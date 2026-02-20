import React from 'react';
import PromptPopCard from '@/components/pop-cards/PromptPopCard';

interface EditPromptModalProps {
    promptId: string;
    initialValue: string;
    onCancel: () => void;
    onSave: (value: string) => void;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({ promptId, initialValue, onCancel, onSave }) => {
    const handleSave = (value: string) => {
        onSave(value);
    };

    return (
        <PromptPopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialValue={initialValue}
            mode="edit"
        />
    );
};

export default EditPromptModal;
