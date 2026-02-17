import React from 'react';
import DeleteCard from '@/components/pop-cards/DeleteCard';

interface RemoveConfirmModalProps {
    type: 'member' | 'role';
    onCancel: () => void;
    onConfirm: () => void;
}

const RemoveConfirmModal: React.FC<RemoveConfirmModalProps> = ({ type, onCancel, onConfirm }) => {
    const isMember = type === 'member';

    const title = isMember ? 'Remove Team Member?' : 'Delete Role?';

    const description = isMember
        ? 'Are you sure you want to deactivate this team member from accessing the admin panel?'
        : 'Are you sure you want to delete this role? Team members with this role will not be able to access the admin panel until they are assigned to a new role.';

    return (
        <DeleteCard
            title={title}
            description={description}
            onCancel={onCancel}
            onConfirm={onConfirm}
            confirmText={isMember ? 'Remove' : 'Delete'}
        />
    );
};

export default RemoveConfirmModal;
