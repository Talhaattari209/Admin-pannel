import React, { useState } from 'react';
import { BaseCard } from '@/components/PopCards';
import { Plus } from 'lucide-react';
import RichTextEditor from '../../shared/RichTextEditor';

interface AddFAQModalProps {
    onCancel: () => void;
    onAdd: () => void;
}

const AddFAQModal: React.FC<AddFAQModalProps> = ({ onCancel, onAdd }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const icon = (
        <div className="w-[3.75vw] h-[3.75vw] rounded-full bg-[#5F00DB]/20 flex items-center justify-center">
            <Plus className="w-[1.67vw] h-[1.67vw] text-white" />
        </div>
    );

    const actions = (
        <>
            <button
                onClick={onCancel}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
            >
                Cancel
            </button>
            <button
                onClick={onAdd}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-[#5F00DB] text-white shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff]"
            >
                Add FAQ
            </button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Add FAQ"
            description="Create a new frequently asked question."
            actions={actions}
            glowColor="#5F00DB"
            width="49.79vw"
        >
            <div className="flex flex-col gap-[1.25vw] w-full">
                {/* Question Input */}
                <div className="flex flex-col gap-[0.42vw] w-full">
                    <label className="text-white text-[0.63vw] font-bold font-['SF_Pro_Text'] uppercase tracking-wider ml-[0.21vw]">Question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="e.g. How do I reset my password?"
                        className="w-full h-[2.92vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] font-normal focus:outline-none placeholder:text-white/30"
                    />
                </div>

                {/* Answer Input (Rich Text) */}
                <div className="flex flex-col gap-[0.42vw] w-full">
                    <label className="text-white text-[0.63vw] font-bold font-['SF_Pro_Text'] uppercase tracking-wider ml-[0.21vw]">Answer</label>
                    <RichTextEditor
                        value={answer}
                        onChange={setAnswer}
                        placeholder="Provide the answer here..."
                        height="12.29vw"
                    />
                </div>
            </div>
        </BaseCard>
    );
};

export default AddFAQModal;
