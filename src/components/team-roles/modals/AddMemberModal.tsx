
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

    const handleInvite = (formData: { name: string; email: string; role: string; password: string; image?: string }) => {
        // Validate that role is a string ID, not an object
        if (!formData.role || typeof formData.role !== 'string') {
            console.error('[AddMemberModal] Invalid role:', formData.role);
            alert('Please select a valid role');
            return;
        }

        // Prepare the data to send
        const memberData: typeof formData = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            password: formData.password
        };

        // Only include image if we have a valid URL
        if (formData.image) {
            const imageUrl = formData.image.trim();
            if (imageUrl) {
                // Basic URL validation - should be a valid URL string
                if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/')) {
                    memberData.image = imageUrl;
                    console.log('[AddMemberModal] Including image URL in request');
                } else {
                    console.warn('[AddMemberModal] Invalid image URL format, skipping:', imageUrl);
                }
            }
        }

        console.log('[AddMemberModal] Creating team member with data:', {
            name: memberData.name,
            email: memberData.email,
            role: memberData.role,
            hasImage: !!memberData.image,
            imageUrl: memberData.image || 'none'
        });

        createMemberMutation.mutate(
            memberData,
            {
                onSuccess: () => {
                    console.log('[AddMemberModal] Team member created successfully');
                    onSuccess();
                },
                onError: (error: any) => {
                    console.error('[AddMemberModal] Failed to create team member:', error);
                    const errorMessage = error?.response?.data?.detail
                        || error?.response?.data?.message
                        || error?.message
                        || 'Failed to invite team member';
                    alert(errorMessage);
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
