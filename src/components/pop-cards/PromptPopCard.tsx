
import React, { useState, useEffect } from 'react';
import PopCardWrapper from './PopCardWrapper';

interface PromptPopCardProps {
    onCancel: () => void;
    onSave: (value: string) => void;
    initialValue?: string;
    mode?: 'add' | 'edit';
}

const PromptPopCard: React.FC<PromptPopCardProps> = ({ onCancel, onSave, initialValue = '', mode = 'add' }) => {
    const [promptText, setPromptText] = useState(initialValue);
    const isEdit = mode === 'edit';

    useEffect(() => {
        setPromptText(initialValue);
    }, [initialValue]);

    return (
        <PopCardWrapper onClose={onCancel}>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[25vw] min-w-[320px]">
                {/* Icon Section */}
                <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
                    {/* Rotating Border Animation & Glow */}
                    <div className="absolute inset-0 z-[1] rounded-full">
                        {/* Glow Layer */}
                        <div
                            className="absolute -inset-[0.5vw] rounded-full animate-[spin_3s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
                                filter: 'blur(0.25vw)',
                                WebkitMask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)',
                                mask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)'
                            }}
                        />
                        {/* Sharp Border Layer */}
                        <div
                            className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)',
                                WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))',
                                mask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))'
                            }}
                        />
                    </div>
                    {/* Icon BG */}
                    <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>
                    {/* Icon Content */}
                    <div className="relative z-10 flex items-center justify-center">
                        <img src="/assets/message-square.svg" alt="Prompt" className="w-[2.92vw] h-[2.92vw]" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter">
                        {isEdit ? "Edit Prompt" : "Add New Prompt"}
                    </h2>
                    <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] opacity-90 font-inter text-white">
                        {isEdit ? "Update the prompt text." : "Create a new conversation starter or question for users."}
                    </p>
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[0.21vw] w-full min-h-0">
                    <label className="text-white text-[0.63vw] font-medium not-italic ml-[0.42vw]">Prompt Text</label>
                    <input
                        type="text"
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        placeholder="e.g. My favorite weekend activity is..."
                        className="w-full h-[2.5vw] px-[1.25vw] bg-[#111111]/50 border border-[#666666]/50 rounded-[0.83vw] text-white text-[0.83vw] focus:outline-none focus:border-white/40 placeholder:text-white/30"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[2.92vw] border border-white backdrop-blur-[6px] bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(promptText)}
                        className="flex-1 h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                        {isEdit ? "Save Changes" : "Add Prompt"}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default PromptPopCard;
