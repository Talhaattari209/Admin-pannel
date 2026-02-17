import React, { useState, useRef, useEffect } from 'react';

export interface PromptRowData {
  id: string;
  title: string;
  subtitle?: string; 
  status: 'Draft' | 'Published' | 'Pending';
  updatedBy: {
    name: string;
    role: string;
    avatar: string;
    email: string;
  };
  lastUpdated: string;
  isLegal?: boolean; 
  isFAQ?: boolean;
  fullContent?: string; 
}

interface PromptsTableRowProps {
  data: PromptRowData;
  onEdit: (data: PromptRowData) => void;
  onDelete: (id: string) => void;
  onViewDetails?: (data: PromptRowData) => void;
}

const PromptsTableRow: React.FC<PromptsTableRowProps> = ({ data, onEdit, onDelete, onViewDetails }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="group flex flex-row items-center w-full min-h-[56px] py-2 bg-[#222222] border-b border-[#666666]/30 hover:bg-white/[0.02] transition-colors relative shrink-0">
      {/* Title Cell shrinkable */}
      <div className="flex-grow min-w-0 px-3 py-1 flex flex-col justify-center">
        <p className="text-white text-[14px] font-normal truncate font-inter">
          {data.title}
        </p>
        {data.subtitle && (
          <p className="text-white/50 text-[11px] font-light truncate mt-1 font-inter">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Status Cell - Increased to 180px */}
      <div className="w-[180px] px-3 py-2 flex items-center shrink-0">
        <div className={`px-3 h-[32px] rounded-full text-[13px] font-normal inline-flex items-center justify-center font-inter ${
          data.status === 'Published' ? 'bg-[#5F00DB] text-white shadow-[0_0_10px_rgba(95,0,219,0.3)]' : 'bg-[#444444] text-white/60'
        }`}>
          {data.status}
        </div>
      </div>

      <div className="w-[200px] px-3 py-2 flex items-center gap-3 shrink-0">
        <div 
          className="w-9 h-9 rounded-full bg-cover bg-center border border-white/10 shrink-0" 
          style={{ backgroundImage: `url(${data.updatedBy.avatar})` }}
        />
        <div className="flex flex-col min-w-0">
          <span className="text-white text-[13px] font-medium truncate font-inter leading-none mb-1">{data.updatedBy.name}</span>
          <span className="text-white/40 text-[10px] font-light truncate font-inter leading-none">{data.updatedBy.role}</span>
        </div>
      </div>

      <div className="w-[220px] px-3 py-2 flex items-center gap-2 shrink-0">
        <span className="text-white text-[13px] font-inter">{data.lastUpdated.split(' • ')[0]}</span>
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <span className="text-white text-[13px] font-inter opacity-60">{data.lastUpdated.split(' • ')[1]}</span>
      </div>

      <div className="w-[48px] px-2 flex justify-center relative shrink-0">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-full transition-colors ${isMenuOpen ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="absolute top-[80%] right-full mr-2 w-[220px] bg-[#1a1a1a] border border-[#666666]/50 rounded-[12px] shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-right-2 duration-200">
             <button onClick={() => { setIsMenuOpen(false); onEdit(data); }} className="flex items-center w-full px-4 py-3 gap-3 hover:bg-white/5 transition-colors text-left text-white text-[14px] font-inter"><svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit</button>
             <button onClick={() => { setIsMenuOpen(false); onDelete(data.id); }} className="flex items-center w-full px-4 py-3 gap-3 hover:bg-white/5 transition-colors text-left text-[#FF4E4E] text-[14px] font-inter"><svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptsTableRow;