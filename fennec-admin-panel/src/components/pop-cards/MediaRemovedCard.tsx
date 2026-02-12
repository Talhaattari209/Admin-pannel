import React from 'react';
import SuccessCard from './SuccessCard';

interface MediaRemovedCardProps {
    onDone: () => void;
}

const MediaRemovedCard: React.FC<MediaRemovedCardProps> = ({ onDone }) => {
    return (
        <SuccessCard
            onDone={onDone}
            title="Media Removed"
            description="The selected media has been successfully removed. The user has been notified about this."
        />
    );
};

export default MediaRemovedCard;
