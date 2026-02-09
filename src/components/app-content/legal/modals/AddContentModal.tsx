import React, { useState } from 'react';
import { BaseCard } from '@/components/PopCards';
import { Plus } from 'lucide-react';
import RichTextEditor from '../../shared/RichTextEditor';

interface AddContentModalProps {
    onCancel: () => void;
    onAdd: () => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ onCancel, onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const icon = (
        <div className="w-[3.75vw] h-[3.75vw] rounded-full bg-[#5F00DB]/20 flex items-center justify-center">
            <Plus className="w-[1.67vw] h-[1.67vw] text-white" />
        </div>
    );

    const actions = (
        <>
            <button
                onClick={onCancel}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
            >
                Cancel
            </button>
            <button
                onClick={onAdd}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-[#5F00DB] text-white shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff]"
            >
                Add Content
            </button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Add New Content"
            description="Create new legal documents or policy content."
            actions={actions}
            glowColor="#5F00DB"
            width="49.79vw"
            height="29.2vw"
        >
            <div className="flex flex-col gap-[0.63vw] w-full h-full min-h-0">
                {/* Title Input */}
                <div className="flex flex-col gap-[0.21vw] w-full shrink-0">
                    <label className="text-white text-[0.63vw] font-bold not-italic  uppercase tracking-wider ml-[0.21vw]">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Terms of Service"
                        className="w-full h-[2.5vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] font-normal not-italic focus:outline-none placeholder:text-white/30"
                    />
                </div>

                {/* Content Input (Rich Text) */}
                <div className="flex flex-col gap-[0.21vw] w-full flex-grow min-h-0">
                    <label className="text-white text-[0.63vw] font-bold not-italic  uppercase tracking-wider ml-[0.21vw]">Content</label>
                    <div className="flex-grow w-full min-h-0">
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Start typing your content here..."
                            height="100%"
                        />
                    </div>
                </div>
            </div>
        </BaseCard>
    );
};

export default AddContentModal;
