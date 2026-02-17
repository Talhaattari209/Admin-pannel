import React, { useState } from 'react';
import LegalContentPopCard from '@/components/pop-cards/LegalContentPopCard';
import { Plus } from 'lucide-react';
import RichTextEditor from '../../shared/RichTextEditor';

interface AddContentModalProps {
    onCancel: () => void;
    onAdd: () => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ onCancel, onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = (title: string, content: string) => {
        setTitle(title);
        setContent(content);
        onAdd();
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
