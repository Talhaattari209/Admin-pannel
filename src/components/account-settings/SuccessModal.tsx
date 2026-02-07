import React from 'react';
import { SuccessCard } from '../PopCards';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, description }) => {
    return (
        <SuccessCard
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            buttonLabel="Continue"
        // Default dimensions in SuccessCard (480w, 342h) match the spec for "Account setting success"
        />
    );
};

export default SuccessModal;
