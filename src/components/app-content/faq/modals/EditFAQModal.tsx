import React from 'react';
import FAQPopCard from '@/components/pop-cards/FAQPopCard';

interface EditFAQModalProps {
    faqId: string;
    initialQuestion: string;
    initialAnswer: string;
    onCancel: () => void;
    onSave: (question: string, answer: string) => void;
}

const EditFAQModal: React.FC<EditFAQModalProps> = ({ faqId, initialQuestion, initialAnswer, onCancel, onSave }) => {
    const handleSave = (newQuestion: string, newAnswer: string) => {
        onSave(newQuestion, newAnswer);
    };

    return (
        <FAQPopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialQuestion={initialQuestion}
            initialAnswer={initialAnswer}
            mode="edit"
        />
    );
};

export default EditFAQModal;
