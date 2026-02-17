
import React, { useState } from 'react';
import PromptPopCard from '@/components/pop-cards/PromptPopCard';
// import { Plus } from 'lucide-react';

interface AddPromptModalProps {
    onCancel: () => void;
    onAdd: () => void;
}

const AddPromptModal: React.FC<AddPromptModalProps> = ({ onCancel, onAdd }) => {
    const [promptText, setPromptText] = useState('');

    const handleSave = (value: string) => {
        setPromptText(value);
        onAdd();
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
