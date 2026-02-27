
import React from 'react';
import FAQPopCard from '@/components/pop-cards/FAQPopCard';

interface AddFAQModalProps {
    onCancel: () => void;
    onSave: (question: string, answer: string, status: string) => void;
}

const AddFAQModal: React.FC<AddFAQModalProps> = ({ onCancel, onSave }) => {
    const handleSave = (question: string, answer: string, status: string) => {
        onSave(question, answer, status);
    };

    return (
        <FAQPopCard
            onCancel={onCancel}
            onSave={handleSave}
            mode="add"
        />
    );
};

export default AddFAQModal;
