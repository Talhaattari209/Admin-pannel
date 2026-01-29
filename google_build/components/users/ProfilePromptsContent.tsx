
import React from 'react';

interface PromptResponse {
  id: string;
  question: string;
  answer: string;
  addedOn: string;
}

interface ProfilePromptsContentProps {
  onRemoveRequest: (promptId: string) => void;
}

const MOCK_PROMPTS: PromptResponse[] = [
  { 
    id: 'p1', 
    question: 'A perfect weekend for me looks like...', 
    answer: 'Hiking in the mountains followed by a cozy dinner with friends and a good board game.', 
    addedOn: 'Nov 10, 2025 • 08:00 PM' 
  },
  { 
    id: 'p2', 
    question: 'My friends describe me as...', 
    answer: 'The spontaneous one who always knows the best hidden coffee spots in the city.', 
    addedOn: 'Nov 11, 2025 • 09:15 AM' 
  },
  { 
    id: 'p3', 
    question: 'The most spontaneous thing I\'ve done...', 
    answer: 'Bought a one-way ticket to Tokyo on a Tuesday night and spent the whole month exploring Japan.', 
    addedOn: 'Nov 12, 2025 • 11:30 PM' 
  },
  { 
    id: 'p4', 
    question: 'Two truths and a lie...', 
    answer: 'I\'ve run a marathon, I speak 4 languages, I have never seen a Star Wars movie.', 
    addedOn: 'Nov 13, 2025 • 07:45 PM' 
  },
];

const ProfilePromptsContent: React.FC<ProfilePromptsContentProps> = ({ onRemoveRequest }) => {
  return (
    <div className="flex flex-col items-start gap-8 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2 w-full border-b border-white/10 pb-6">
        <h3 className="text-white text-[28px] font-bold font-inter leading-tight">Prompts</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60 font-inter">
          View and manage the written prompt responses shared by the user on their profile.
        </p>
      </div>

      {/* Prompts List */}
      <div className="flex flex-col gap-6 w-full">
        {MOCK_PROMPTS.map((prompt) => (
          <div 
            key={prompt.id} 
            className="flex flex-col p-6 bg-[#16003F]/40 border border-white/5 rounded-[24px] gap-6 group hover:border-[#5F00DB]/40 transition-all duration-300"
          >
            <div className="flex flex-row justify-between items-start gap-4">
              <div className="flex flex-col gap-2 flex-grow">
                <label className="text-[#5F00DB] text-[12px] font-bold uppercase tracking-widest font-inter">
                  {prompt.question}
                </label>
                <p className="text-white text-[18px] font-medium font-inter leading-relaxed">
                  "{prompt.answer}"
                </p>
              </div>
              <button 
                onClick={() => onRemoveRequest(prompt.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF4E4E]/10 border border-[#FF4E4E]/30 rounded-full text-[#FF4E4E] text-[14px] font-medium hover:bg-[#FF4E4E] hover:text-white transition-all shrink-0 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Remove
              </button>
            </div>
            
            <div className="flex items-center gap-2 opacity-40">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-white text-[12px] font-inter">Added: {prompt.addedOn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePromptsContent;
