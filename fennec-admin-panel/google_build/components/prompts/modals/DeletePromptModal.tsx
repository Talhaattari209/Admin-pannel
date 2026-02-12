
import React from 'react';
import BaseCard from '../../BaseCard';

interface DeletePromptModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const DeletePromptModal: React.FC<DeletePromptModalProps> = ({ onCancel, onDelete }) => {
  const icon = (
    <svg viewBox="0 0 24 24" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  const actions = (
    <>
      <button 
        onClick={onCancel}
        className="flex-1 px-6 h-[56px] border border-white rounded-[52px] text-white font-medium hover:bg-white/10 transition-all backdrop-blur-[6px]"
      >
        Cancel
      </button>
      <button 
        onClick={onDelete}
        className="flex-1 px-6 h-[56px] bg-[#FF4E4E] rounded-[52px] text-white font-medium hover:brightness-110 transition-all shadow-[0px_8px_12px_rgba(255,78,78,0.25)]"
      >
        Delete
      </button>
    </>
  );

  return (
    <BaseCard
      icon={icon}
      title="Delete Prompt?"
      description=""
      actions={actions}
      minHeight="342px"
    />
  );
};

export default DeletePromptModal;
