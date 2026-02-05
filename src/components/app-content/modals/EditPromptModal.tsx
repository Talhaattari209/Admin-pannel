import React, { useState } from 'react';
import { BaseCard } from '@/components/PopCards';
import { Edit2 } from 'lucide-react';

interface EditPromptModalProps {
    initialValue: string;
    onCancel: () => void;
    onUpdate: () => void;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({ initialValue, onCancel, onUpdate }) => {
    const [promptText, setPromptText] = useState(initialValue);

    const icon = (
        <div className="w-[3.75vw] h-[3.75vw] rounded-full bg-[#5F00DB]/20 flex items-center justify-center">
            <Edit2 className="w-[1.67vw] h-[1.67vw] text-white" />
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
                onClick={onUpdate}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-[#5F00DB] text-white shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff]"
            >
                Save Changes
            </button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Edit Prompt"
            description="Update the prompt text."
            actions={actions}
            glowColor="#5F00DB"
        >
            <div className="flex flex-col gap-[0.42vw] w-full">
                <label className="text-white text-[0.73vw] font-medium not-italic ml-[0.42vw]">Prompt Text</label>
                <input
                    type="text"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="w-full h-[2.92vw] px-[1.25vw] bg-[#111111]/50 border border-[#666666]/50 rounded-[0.83vw] text-white text-[0.83vw] focus:outline-none focus:border-white/40 placeholder:text-white/30"
                />
            </div>
        </BaseCard>
    );
};

export default EditPromptModal;
