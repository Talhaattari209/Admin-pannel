
import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';

interface AddContentModalProps {
  onCancel: () => void;
  onAdd: (title: string, content: string) => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ onCancel, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col items-center p-8 gap-8 w-[956px] h-[934px] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[32px] box-border shadow-2xl relative overflow-hidden">
      {/* Header Row */}
      <div className="flex flex-row items-center justify-between w-full h-[48px] shrink-0">
        <h2 className="flex-grow text-center text-white text-[32px] font-medium leading-[38px] tracking-[-0.02em]">
          Add Content
        </h2>
        <button 
          onClick={onCancel}
          className="absolute right-8 w-12 h-12 flex items-center justify-center bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 transition-all z-10"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Form Area */}
      <div className="flex flex-col gap-8 w-full overflow-hidden">
        {/* Title Input */}
        <div className="flex flex-col gap-2 border-b border-white py-2">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-60">Content Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none text-white text-[16px] focus:outline-none placeholder:text-white/30"
            placeholder="Terms of Service"
          />
        </div>

        {/* Rich Text Editor */}
        <RichTextEditor content={content} onChange={setContent} />

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onAdd(title, content)}
            className="w-[145px] h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all"
          >
            Add Content
          </button>
          <button 
            onClick={onCancel}
            className="w-[101px] h-[56px] border border-white rounded-[52px] text-white font-medium hover:bg-white/10 backdrop-blur-[6px] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;
