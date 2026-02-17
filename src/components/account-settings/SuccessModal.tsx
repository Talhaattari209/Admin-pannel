import React from 'react';
import SuccessCard from '@/components/pop-cards/SuccessCard';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, description }) => {
    if (!isOpen) return null;

    return (
        <SuccessCard
            onDone={onClose}
            title={title}
            description={description}
        />
    );
};

export default SuccessModal;
