
import React from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (val: string) => void;
  height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, height = "606px" }) => {
  return (
    <div className="flex flex-col w-full bg-[#111111] border border-[#666666]/50 rounded-[16px] overflow-hidden" style={{ height }}>
      {/* WYSIWYG Toolbar matching the image */}
      <div className="flex flex-row items-center justify-between px-6 h-[56px] bg-[#222222] border-b border-[#666666]/50 shrink-0">
        <div className="flex flex-row items-center gap-8">
          {/* Formatting Group */}
          <div className="flex items-center gap-6">
            <button className="text-white text-[16px] font-bold hover:opacity-100 opacity-60 transition-opacity">B</button>
            <button className="text-white text-[16px] italic font-serif hover:opacity-100 opacity-60 transition-opacity">i</button>
            <button className="text-white text-[16px] underline hover:opacity-100 opacity-60 transition-opacity decoration-2 underline-offset-4">U</button>
            <button className="flex flex-row items-center text-white hover:opacity-100 opacity-60 transition-opacity">
              <span className="text-[16px]">A</span>
              <div className="flex flex-col gap-[2px] ml-1">
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Alignment Group */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:opacity-100 opacity-60 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
              </svg>
            </button>
            <button className="text-white hover:opacity-100 opacity-60 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/>
              </svg>
            </button>
          </div>

          {/* List & Paragraph Group */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:opacity-100 opacity-60 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><path d="M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" strokeWidth="3"/>
              </svg>
            </button>
            <button className="flex flex-row items-center text-white hover:opacity-100 opacity-60 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 4v12a3 3 0 0 1-3 3M17 4v12M19 4h-9a4 4 0 0 0 0 8h9"/>
              </svg>
              <div className="flex flex-col gap-[2px] ml-1">
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Media & Links Group */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:opacity-100 opacity-60 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </button>
            <button className="text-white hover:opacity-100 opacity-60 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>
            <button className="text-white hover:opacity-100 opacity-60 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </button>
            <button className="text-white hover:opacity-100 opacity-60 transition-opacity flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <div className="flex flex-col gap-[2px] ml-1">
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Undo/Redo & More */}
        <div className="flex flex-row items-center gap-6">
          <button className="text-white hover:opacity-100 opacity-25 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 14l-4-4 4-4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
            </svg>
          </button>
          <button className="text-white hover:opacity-100 opacity-25 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 14l4-4-4-4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>
            </svg>
          </button>
          <button className="text-white hover:opacity-100 opacity-60 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area with invisible scrollbar */}
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow w-full p-6 bg-transparent text-white text-[16px] leading-[150%] font-normal focus:outline-none resize-none overflow-y-auto no-scrollbar"
        placeholder="Start typing your document content here..."
      />
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
