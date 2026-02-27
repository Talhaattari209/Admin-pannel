import React from 'react';
import FAQPopCard from '@/components/pop-cards/FAQPopCard';

interface EditFAQModalProps {
    faqId: string;
    initialQuestion: string;
    initialAnswer: string;
    initialStatus?: string;
    onCancel: () => void;
    onSave: (question: string, answer: string, status: string) => void;
}

const EditFAQModal: React.FC<EditFAQModalProps> = ({ faqId, initialQuestion, initialAnswer, initialStatus = 'published', onCancel, onSave }) => {
    const handleSave = (newQuestion: string, newAnswer: string, status: string) => {
        onSave(newQuestion, newAnswer, status);
    };

    return (
        <FAQPopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialQuestion={initialQuestion}
            initialAnswer={initialAnswer}
            initialStatus={initialStatus}
            mode="edit"
        />
    );
};

export default EditFAQModal;
