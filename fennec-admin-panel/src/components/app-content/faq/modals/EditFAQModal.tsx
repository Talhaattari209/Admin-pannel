import React, { useState } from 'react';
import FAQPopCard from '@/components/pop-cards/FAQPopCard';
import { Edit2 } from 'lucide-react';
import RichTextEditor from '../../shared/RichTextEditor';

interface EditFAQModalProps {
    initialQuestion: string;
    initialAnswer: string;
    onCancel: () => void;
    onUpdate: () => void;
}

const EditFAQModal: React.FC<EditFAQModalProps> = ({ initialQuestion, initialAnswer, onCancel, onUpdate }) => {
    const [question, setQuestion] = useState(initialQuestion);
    const [answer, setAnswer] = useState(initialAnswer);

    const handleSave = (newQuestion: string, newAnswer: string) => {
        setQuestion(newQuestion);
        setAnswer(newAnswer);
        onUpdate();
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
