
import React, { useState, useEffect } from 'react';
import PopCardWrapper from './PopCardWrapper';
import RichTextEditor from '../app-content/shared/RichTextEditor';

interface LegalContentPopCardProps {
    onCancel: () => void;
    onSave: (title: string, content: string) => void;
    initialTitle?: string;
    initialContent?: string;
    mode?: 'add' | 'edit';
}

const LegalContentPopCard: React.FC<LegalContentPopCardProps> = ({ onCancel, onSave, initialTitle = '', initialContent = '', mode = 'add' }) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const isEdit = mode === 'edit';

    useEffect(() => {
        setTitle(initialTitle);
        setContent(initialContent);
    }, [initialTitle, initialContent]);

    return (
        <PopCardWrapper onClose={onCancel}>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[49.79vw] h-[48.64vw] min-w-[600px] max-h-[90vh]">
                {/* Header Row */}
                <div className="flex flex-row justify-between items-center w-full h-[2.5vw] shrink-0 relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter text-center whitespace-nowrap">
                            {isEdit ? "Edit Content" : "Add Content"}
                        </h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="ml-auto w-[2.5vw] h-[2.5vw] flex items-center justify-center rounded-full bg-[#5F00DB] shadow-[0px_0px_0.21vw_rgba(95,0,219,0.25),0px_0.21vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 transition-all cursor-pointer"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.25vw] h-[1.25vw]">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[0.83vw] w-full flex-grow min-h-0">
                    {/* Title Input */}
                    <div className="flex flex-col gap-[0.21vw] w-full shrink-0">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Terms of Service"
                            className="w-full h-[2.5vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] font-normal not-italic focus:outline-none placeholder:text-white/30"
                        />
                    </div>
                    {/* Content Input (Scrollable) */}
                    <div className="flex flex-col gap-[0.21vw] w-full flex-grow min-h-0">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Content</label>
                        <div className="flex-grow w-full min-h-0 bg-[#111111] border border-[#666666]/50 rounded-[0.83vw] overflow-hidden">
                            <RichTextEditor
                                value={content}
                                onChange={setContent}
                                placeholder="Start typing your content here..."
                                height="100%"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-start gap-[1.25vw] w-full shrink-0">
                    <button
                        onClick={() => onSave(title, content)}
                        className="w-[7.55vw] h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                        {isEdit ? "Save Changes" : "Save Content"}
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-[5.26vw] h-[2.92vw] border border-white backdrop-blur-[6px] bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default LegalContentPopCard;
