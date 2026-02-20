
import React, { useState } from 'react';
import PromptPopCard from '@/components/pop-cards/PromptPopCard';

interface AddPromptModalProps {
    onCancel: () => void;
    onSave: (value: string) => void;
}

const AddPromptModal: React.FC<AddPromptModalProps> = ({ onCancel, onSave }) => {
    const handleSave = (value: string) => {
        onSave(value);
    };

    return (
        <PromptPopCard
            onCancel={onCancel}
            onSave={handleSave}
            mode="add"
        />
    );
};

export default AddPromptModal;
