
import React from 'react';
import { BaseCard } from '@/components/PopCards';
import { AlertTriangle } from 'lucide-react';

interface DeletePromptModalProps {
    onCancel: () => void;
    onDelete: () => void;
}

const DeletePromptModal: React.FC<DeletePromptModalProps> = ({ onCancel, onDelete }) => {

    const icon = <img src="/assets/danger.png" alt="Danger" className="w-[2.92vw] h-[2.92vw] object-contain" />;

    const actions = (
        <>
            <button
                onClick={onCancel}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
            >
                Cancel
            </button>
            <button
                onClick={onDelete}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-[#FF4E4E] text-white shadow-[0px_-0.42vw_0.63vw_rgba(255,78,78,0.25),0px_0.42vw_0.63vw_rgba(255,78,78,0.25)] hover:bg-[#ff6666]"
            >
                Delete
            </button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Delete Prompt?"
            description="Are you sure you want to delete this prompt? This action cannot be undone."
            actions={actions}
            glowColor="#5F00DB"
        />
    );
};

export default DeletePromptModal;
