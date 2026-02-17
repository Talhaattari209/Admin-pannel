
import React from 'react';
import BaseCard from '../../BaseCard';

interface PromptSuccessModalProps {
  title: string;
  onDone: () => void;
}

const PromptSuccessModal: React.FC<PromptSuccessModalProps> = ({ title, onDone }) => {
  const icon = (
    <svg viewBox="0 0 72 72" className="w-[72px] h-[72px]" fill="none">
      <circle cx="36" cy="36" r="33" stroke="#3ADC60" strokeWidth="3" />
      <path d="M23 37L31 45L49 27" stroke="#3ADC60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const actions = (
    <button 
      onClick={onDone}
      className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all"
    >
      Done
    </button>
  );

  return (
    <BaseCard
      icon={icon}
      title={title}
      description=""
      actions={actions}
      minHeight="342px"
    />
  );
};

export default PromptSuccessModal;
