
import React from 'react';
import FAQPopCard from '@/components/pop-cards/FAQPopCard';

interface AddFAQModalProps {
    onCancel: () => void;
    onSave: (question: string, answer: string) => void;
}

const AddFAQModal: React.FC<AddFAQModalProps> = ({ onCancel, onSave }) => {
    const handleSave = (question: string, answer: string) => {
        onSave(question, answer);
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
