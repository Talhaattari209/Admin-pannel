
import React from 'react';
import RolePopCard from '@/components/pop-cards/RolePopCard';
import { useCreateRole, useUpdateRole } from '@/services/roles';
import { togglesToResources } from '@/utils/permissions';
import { Role } from '@/types/api';

interface AddRoleModalProps {
    onCancel: () => void;
    onSuccess: () => void;
    initialData?: Role;  // Full role for edit mode
    mode?: 'add' | 'edit';
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ onCancel, onSuccess, initialData, mode = 'add' }) => {
    const createRoleMutation = useCreateRole();
    const updateRoleMutation = useUpdateRole();

    const isEdit = mode === 'edit';
    const isLoading = createRoleMutation.isPending || updateRoleMutation.isPending;

    const handleSave = (data: { title: string; description: string; permissions: Record<string, Record<string, boolean>> }) => {
        const roleData = {
            title: data.title,
            description: data.description,
            resources: togglesToResources(data.permissions)
        };

        if (isEdit && initialData) {
            updateRoleMutation.mutate({ id: initialData.id, data: roleData }, {
                onSuccess: () => {
                    onSuccess();
                },
                onError: (error: any) => {
                    alert(error?.response?.data?.detail || 'Failed to update role');
                }
            });
        } else {
            createRoleMutation.mutate(roleData, {
                onSuccess: () => {
                    onSuccess();
                },
                onError: (error: any) => {
                    alert(error?.response?.data?.detail || 'Failed to create role');
                }
            });
        }
    };

    return (
        <RolePopCard
            onCancel={onCancel}
            onSave={handleSave}
            initialData={initialData ? {
                title: initialData.title,
                description: initialData.description,
                resources: initialData.resources
            } : undefined}
            mode={mode}
            isLoading={isLoading}
        />
    );
};

export default AddRoleModal;
