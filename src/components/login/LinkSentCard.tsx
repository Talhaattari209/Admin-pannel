import React from 'react';
import SuccessCard from '@/components/pop-cards/SuccessCard';

interface LinkSentCardProps {
  onBack: () => void;
}

const LinkSentCard: React.FC<LinkSentCardProps> = ({ onBack }) => {
  return (
    <SuccessCard
      title="Link Sent!"
      description="Check your email inbox and follow the instructions to reset your password."
      onDone={onBack}
    />
  );
};

export default LinkSentCard;
