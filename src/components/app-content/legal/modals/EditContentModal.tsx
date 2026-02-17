import React, { useState } from 'react';
import LegalContentPopCard from '@/components/pop-cards/LegalContentPopCard';
import { Edit2 } from 'lucide-react';
import RichTextEditor from '../../shared/RichTextEditor';

interface EditContentModalProps {
    initialTitle: string;
    initialContent: string;
    onCancel: () => void;
    onUpdate: () => void;
}

const EditContentModal: React.FC<EditContentModalProps> = ({ initialTitle, initialContent, onCancel, onUpdate }) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const handleSave = (newTitle: string, newContent: string) => {
        setTitle(newTitle);
        setContent(newContent);
        onUpdate();
    };

    return (
        <LegalContentPopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialTitle={initialTitle}
            initialContent={initialContent}
            mode="edit"
        />
    );
};

export default EditContentModal;
