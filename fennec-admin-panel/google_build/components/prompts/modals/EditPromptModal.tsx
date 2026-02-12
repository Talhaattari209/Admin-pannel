
import React, { useState } from 'react';
import BaseCard from '../../BaseCard';

interface EditPromptModalProps {
  initialValue: string;
  onCancel: () => void;
  onUpdate: (newValue: string) => void;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({ initialValue, onCancel, onUpdate }) => {
  const [question, setQuestion] = useState(initialValue);

  const icon = (
    <svg viewBox="0 0 24 24" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
        onClick={() => onUpdate(question)}
        className="flex-1 px-6 h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium hover:brightness-110 transition-all shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)]"
      >
        Update
      </button>
    </>
  );

  return (
    <BaseCard
      icon={icon}
      title="Edit Prompt"
      description=""
      actions={actions}
      minHeight="438px"
    >
      <div className="flex flex-col items-start gap-1 w-full border-b border-white py-2">
        <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80">Prompt Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-transparent border-none text-white text-[16px] focus:outline-none placeholder:text-white/30"
          placeholder="Type here.."
          autoFocus
        />
      </div>
    </BaseCard>
  );
};

export default EditPromptModal;
