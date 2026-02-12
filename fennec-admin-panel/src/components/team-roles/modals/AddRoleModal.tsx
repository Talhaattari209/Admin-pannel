
import React from 'react';
import RolePopCard from '@/components/pop-cards/RolePopCard';

interface AddRoleModalProps {
    onCancel: () => void;
    onAdd: () => void;
    initialData?: {
        title: string;
        description: string;
        permissions: any; // Define proper type if available
    };
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ onCancel, onAdd, initialData }) => {

    const handleSave = () => {
        // Validation could be added here
        onAdd();
    };

    return (
        <RolePopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialRole={initialData?.title}
            initialDescription={initialData?.description}
            mode={initialData ? 'edit' : 'add'}
        />
    );
};

export default AddRoleModal;
