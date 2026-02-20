import React from 'react';
import LegalContentPopCard from '@/components/pop-cards/LegalContentPopCard';

interface EditContentModalProps {
    contentId: string;
    initialTitle: string;
    initialContent: string;
    onCancel: () => void;
    onSave: (title: string, content: string) => void;
}

const EditContentModal: React.FC<EditContentModalProps> = ({ contentId, initialTitle, initialContent, onCancel, onSave }) => {
    const handleSave = (newTitle: string, newContent: string) => {
        onSave(newTitle, newContent);
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
