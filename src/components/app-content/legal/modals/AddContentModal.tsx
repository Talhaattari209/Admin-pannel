import React, { useState } from 'react';
import LegalContentPopCard from '@/components/pop-cards/LegalContentPopCard';

interface AddContentModalProps {
    onCancel: () => void;
    onSave: (title: string, content: string, status: string) => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ onCancel, onSave }) => {
    const handleSave = (title: string, content: string, status: string) => {
        onSave(title, content, status);
    };

    return (
        <LegalContentPopCard
            onCancel={onCancel}
            onSave={handleSave}
            mode="add"
        />
    );
};

export default AddContentModal;
