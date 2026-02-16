
import React from 'react';
import MemberPopCard from '@/components/pop-cards/MemberPopCard';
import { useRoles } from '@/services/roles';
import { useCreateTeamMember } from '@/services/team-members';

interface AddMemberModalProps {
    onCancel: () => void;
    onSuccess: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onCancel, onSuccess }) => {
    const { data: rolesData, isLoading: rolesLoading } = useRoles({ limit: 100 });  // Get all roles
    const createMemberMutation = useCreateTeamMember();

    const handleInvite = (formData: { name: string; email: string; role: string; password: string }) => {
        createMemberMutation.mutate(
            {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                password: formData.password
            },
            {
                onSuccess: () => {
                    onSuccess();
                },
                onError: (error: any) => {
                    alert(error?.response?.data?.detail || 'Failed to invite team member');
                }
            }
        );
    };

    return (
        <MemberPopCard
            onCancel={onCancel}
            onInvite={handleInvite}
            roles={rolesData?.data || []}
            isLoading={rolesLoading || createMemberMutation.isPending}
        />
    );
};

export default AddMemberModal;
