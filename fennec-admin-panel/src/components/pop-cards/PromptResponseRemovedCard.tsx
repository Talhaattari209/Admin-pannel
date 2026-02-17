import React from 'react';
import SuccessCard from './SuccessCard';

interface PromptResponseRemovedCardProps {
    onDone: () => void;
}

const PromptResponseRemovedCard: React.FC<PromptResponseRemovedCardProps> = ({ onDone }) => {
    return (
        <SuccessCard
            onDone={onDone}
            title="Prompt Response Removed"
            description="The selected prompt response has been successfully removed. The user has been notified about this."
        />
    );
};

export default PromptResponseRemovedCard;
