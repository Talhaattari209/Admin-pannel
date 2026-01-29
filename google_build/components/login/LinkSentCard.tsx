
import React from 'react';
import BaseCard from '../BaseCard';

interface LinkSentCardProps {
  onDone: () => void;
}

const LinkSentCard: React.FC<LinkSentCardProps> = ({ onDone }) => {
  const icon = (
    <svg viewBox="0 0 72 72" className="w-[72px] h-[72px]" fill="none">
      <circle cx="36" cy="36" r="33" stroke="#3ADC60" strokeWidth="3" />
      <path d="M23 37L31 45L49 27" stroke="#3ADC60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const actions = (
    <button
      onClick={onDone}
      className="flex-1 h-[56px] bg-[#5F00DB] shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)] rounded-[52px] transition-all hover:brightness-110 active:scale-95 text-white text-[16px] font-medium leading-[24px]"
    >
      Done
    </button>
  );

  return (
    <BaseCard
      icon={icon}
      title="Link Sent!"
      description="Check your email inbox and follow the instructions to reset your password."
      actions={actions}
      minHeight="438px"
    />
  );
};

export default LinkSentCard;
