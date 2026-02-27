import React from 'react';
import LegalContentPopCard from '@/components/pop-cards/LegalContentPopCard';

interface EditContentModalProps {
    contentId: string;
    initialTitle: string;
    initialContent: string;
    initialStatus?: string;
    onCancel: () => void;
    onSave: (title: string, content: string, status: string) => void;
}

const EditContentModal: React.FC<EditContentModalProps> = ({ contentId, initialTitle, initialContent, initialStatus = 'draft', onCancel, onSave }) => {
    const handleSave = (newTitle: string, newContent: string, status: string) => {
        onSave(newTitle, newContent, status);
    };

    return (
        <LegalContentPopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialTitle={initialTitle}
            initialContent={initialContent}
            initialStatus={initialStatus}
            mode="edit"
        />
    );
};

export default EditContentModal;
