
import React, { useState } from 'react';
import FAQPopCard from '@/components/pop-cards/FAQPopCard';

interface AddFAQModalProps {
    onCancel: () => void;
    onAdd: () => void;
}

const AddFAQModal: React.FC<AddFAQModalProps> = ({ onCancel, onAdd }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSave = (question: string, answer: string) => {
        setQuestion(question);
        setAnswer(answer);
        onAdd();
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
