
import React, { useState } from 'react';

const BlockedWordsCard: React.FC = () => {
  const [words, setWords] = useState([
    'Word 1', 'Word 2', 'Word 3', 'Word 4', 'Word 5', 'Word 6', 'Word 7', 'Word 8',
    'Word 9', 'Word 10', 'Word 11', 'Word 12', 'Word 13', 'Word 14', 'Word 15', 'Word 16'
  ]);
  const [inputValue, setInputValue] = useState('');

  const removeWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const addWord = () => {
    if (inputValue.trim()) {
      setWords([...words, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col p-6 bg-[#222222] border border-[#666666]/30 rounded-[16px] gap-8 shrink-0 shadow-lg min-h-[294px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-[28px] font-bold font-inter leading-none">Blocked Words</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60">List of keywords that should be banned across the app in messages, bios, prompts, etc.</p>
      </div>

      <div className="flex flex-col w-full border-b border-white pb-2">
        <div className="flex flex-wrap gap-2 pt-2 mb-2">
          {words.map((word, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 px-4 py-1.5 bg-[#5F00DB] rounded-full text-white text-[16px] animate-in zoom-in-75 duration-200"
            >
              <span className="font-inter">{word}</span>
              <button 
                onClick={() => removeWord(idx)}
                className="w-4 h-4 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3">
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
            if(e.key === 'Enter') addWord();
          }}
          placeholder="Type word and press Enter.." 
          className="bg-transparent border-none text-white text-[16px] focus:outline-none placeholder:text-white/30 p-2 font-inter" 
        />
      </div>
    </div>
  );
};

export default BlockedWordsCard;
