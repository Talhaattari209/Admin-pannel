
import React from 'react';
import BaseCard from './BaseCard';

interface SuccessCardProps {
  onDone: () => void;
  title?: string;
  description?: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  onDone,
  title = "User Deactivated",
  description = "The account has been successfully deactivated. You can reactivate it anytime from the user’s detail page."
}) => {
  const icon = (
    <svg viewBox="0 0 72 72" className="w-[3.75vw] h-[3.75vw]" fill="none">
      <circle cx="36" cy="36" r="33" stroke="#3ADC60" strokeWidth="3" />
      <path d="M23 37L31 45L49 27" stroke="#3ADC60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const actions = (
    <button onClick={onDone} className="flex-1 h-[2.92vw] bg-[#5F00DB] rounded-[2.7vw] text-white text-[0.83vw] font-medium shadow-lg hover:brightness-110">Done</button>
  );

  return (
    <BaseCard
      icon={icon}
      title={title}
      description={description}
      actions={actions}
      minHeight="24.5vw"
    />
  );
};

export default SuccessCard;
