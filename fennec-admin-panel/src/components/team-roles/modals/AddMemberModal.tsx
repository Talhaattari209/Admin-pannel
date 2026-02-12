import React from 'react';
import MemberPopCard from '@/components/pop-cards/MemberPopCard';

interface AddMemberModalProps {
    onCancel: () => void;
    onInvite: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onCancel, onInvite }) => {
    // Reverted Icon Size to 2.92vw
    return (
        <MemberPopCard
            onCancel={onCancel}
            onInvite={onInvite}
        />
    );
};

export default AddMemberModal;
