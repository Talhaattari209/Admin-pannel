import React from 'react';
import { Plus, Download } from 'lucide-react';

interface PromptsHeaderProps {
    onAddPrompt: () => void;
    onExport: () => void;
    addLabel?: string;
}

const PromptsHeader: React.FC<PromptsHeaderProps> = ({ onAddPrompt, onExport, addLabel = "Add Prompt" }) => {
    return (
        <div className="flex flex-row items-end justify-between w-full h-[4.17vw] mb-[2.08vw] animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Text Section */}
            <div className="flex flex-col justify-center items-start gap-[0.42vw] max-w-[63.18vw]">
                <h1 className="text-white text-[1.88vw] font-bold leading-[110%] tracking-[-0.04em] font-['Michroma']">
                    App Content
                </h1>
                <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%]">
                    Manage app-wide text, images, and media — including prompts, and static pages.
                </p>
            </div>

            {/* Actions Section */}
            <div className="flex flex-row items-center gap-[0.83vw] h-[2.92vw]">
                {/* Export Button */}
                <button
                    onClick={onExport}
                    className="flex flex-row items-center justify-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-full border border-white rounded-[2.71vw] backdrop-blur-[6px] transition-all hover:bg-white/10 group"
                >
                    <span className="text-white text-[0.83vw] font-medium leading-[1.25vw]">Export</span>
                    <Download className="w-[1.25vw] h-[1.25vw] text-white" />
                </button>

                {/* Add Button */}
                <button
                    onClick={onAddPrompt}
                    className="flex flex-row items-center justify-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-full bg-[#5F00DB] shadow-[0px_0.21vw_0.63vw_rgba(95,0,219,0.25)] rounded-[2.71vw] transition-all hover:brightness-110 active:scale-95"
                >
                    <span className="text-white text-[0.83vw] font-medium leading-[1.25vw]">{addLabel}</span>
                    {/* Add icon if needed, though simple label is fine */}
                </button>
            </div>
        </div>
    );
};

export default PromptsHeader;
