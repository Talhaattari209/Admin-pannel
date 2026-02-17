import React, { useState } from 'react';
import PromptPopCard from '@/components/pop-cards/PromptPopCard';
// import { Edit2 } from 'lucide-react';

interface EditPromptModalProps {
    initialValue: string;
    onCancel: () => void;
    onUpdate: () => void;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({ initialValue, onCancel, onUpdate }) => {
    const [promptText, setPromptText] = useState(initialValue);

    const handleSave = (value: string) => {
        setPromptText(value);
        onUpdate();
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
