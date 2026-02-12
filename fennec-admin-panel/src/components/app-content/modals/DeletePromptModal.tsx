
import React from 'react';
import DeleteCard from '@/components/pop-cards/DeleteCard';
import { AlertTriangle } from 'lucide-react';

interface DeletePromptModalProps {
    onCancel: () => void;
    onDelete: () => void;
}

const DeletePromptModal: React.FC<DeletePromptModalProps> = ({ onCancel, onDelete }) => {

    return (
        <DeleteCard
            title="Delete Prompt?"
            description="Are you sure you want to delete this prompt? This action cannot be undone."
            onCancel={onCancel}
            onConfirm={onDelete}
            confirmText="Delete"
        />
    );
};

export default DeletePromptModal;
