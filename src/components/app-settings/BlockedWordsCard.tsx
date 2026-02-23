import React, { useState } from 'react';

interface BlockedWordsCardProps {
  canEdit?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

const BlockedWordsCard: React.FC<BlockedWordsCardProps> = ({ canEdit = true, value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const removeWord = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const addWord = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col p-[1.25vw] bg-[#222222] border border-[#666666]/30 rounded-[0.83vw] gap-[1.67vw] shrink-0 shadow-lg min-h-[15.31vw]">
      <div className="flex flex-col gap-[0.42vw]">
        <h3 className="text-white text-[1.46vw] font-bold not-italic font-inter not-italic leading-none">Blocked Words</h3>
        <p className="text-[#CCCCCC] text-[0.83vw] opacity-60">List of keywords that should be banned across the app in messages, bios, prompts, etc.</p>
      </div>

      <div className="flex flex-col w-full border-b border-white pb-[0.42vw]">
        <div className="flex flex-wrap gap-[0.42vw] pt-[0.42vw] mb-[0.42vw]">
          {value.map((word, idx) => (
            <div
              key={idx}
              className="flex items-center gap-[0.42vw] px-[0.83vw] py-[0.31vw] bg-[#5F00DB] rounded-full text-white text-[0.83vw] animate-in zoom-in-75 duration-200"
            >
              <span className="font-inter not-italic">{word}</span>
              <button
                onClick={() => removeWord(idx)}
                disabled={!canEdit}
                className={`w-[0.83vw] h-[0.83vw] flex items-center justify-center rounded-full transition-colors shrink-0 ${canEdit ? 'hover:bg-white/20' : 'opacity-50 cursor-not-allowed'}`}
              >
                <svg viewBox="0 0 24 24" className="w-[0.63vw] h-[0.63vw]" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addWord();
          }}
          disabled={!canEdit}
          placeholder="Type word and press Enter.."
          className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none p-[0.42vw] font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed placeholder:text-white/30' : 'placeholder:text-white/30'}`}
        />
      </div>
    </div>
  );
};

export default BlockedWordsCard;
