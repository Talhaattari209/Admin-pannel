import React from 'react';
import PromptPopCard from '@/components/pop-cards/PromptPopCard';

interface EditPromptModalProps {
    promptId: string;
    initialValue: string;
    initialStatus?: string;
    onCancel: () => void;
    onSave: (value: string, status: string) => void;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({ promptId, initialValue, initialStatus = 'published', onCancel, onSave }) => {
    const handleSave = (value: string, status: string) => {
        onSave(value, status);
    };

    return (
        <PromptPopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialValue={initialValue}
            initialStatus={initialStatus}
            mode="edit"
        />
    );
};

export default EditPromptModal;
