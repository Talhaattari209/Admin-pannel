
import React, { useState, useEffect } from 'react';
import PopCardWrapper from './PopCardWrapper';
import IconBackgroundAnimation from '../shared/IconBackgroundAnimation';

interface PromptPopCardProps {
    onCancel: () => void;
    onSave: (value: string, status: string) => void;
    initialValue?: string;
    initialStatus?: string;
    mode?: 'add' | 'edit';
}

const PromptPopCard: React.FC<PromptPopCardProps> = ({ onCancel, onSave, initialValue = '', initialStatus = 'published', mode = 'add' }) => {
    const [promptText, setPromptText] = useState(initialValue);
    const [status, setStatus] = useState(initialStatus);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const isEdit = mode === 'edit';
    const statusRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPromptText(initialValue);
    }, [initialValue]);

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
                setIsStatusOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const statusOptions = [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
    ];

    return (
        <PopCardWrapper onClose={onCancel}>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.25vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[25vw] min-w-[320px]">
                {/* Icon Section */}
                <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
                    {/* Lottie Icon Animation */}
                    <IconBackgroundAnimation />
                    {/* Icon BG */}
                    <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>
                    {/* Icon Content */}
                    <div className="relative z-10 flex items-center justify-center">
                        <img src="/assets/message-square.svg" alt="Prompt" className="w-[2.92vw] h-[2.92vw]" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[0.42vw] text-center self-stretch">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter">
                        {isEdit ? "Edit Prompt" : "Add New Prompt"}
                    </h2>
                    <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] opacity-90 font-inter text-white">
                        {isEdit ? "Update the prompt text." : "Create a new conversation starter or question for users."}
                    </p>
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[0.83vw] w-full min-h-0">
                    {/* Prompt Text Input */}
                    <div className="flex flex-col gap-[0.21vw] w-full">
                        <label className="text-white text-[0.63vw] font-medium not-italic ml-[0.42vw]">Prompt Text</label>
                        <input
                            type="text"
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            placeholder="e.g. My favorite weekend activity is..."
                            className="w-full h-[2.5vw] px-[1.25vw] bg-[#111111]/50 border border-[#666666]/50 rounded-[0.83vw] text-white text-[0.83vw] focus:outline-none focus:border-white/40 placeholder:text-white/30"
                        />
                    </div>

                    {/* Status Selection */}
                    <div className="flex flex-col gap-[0.21vw] w-full" ref={statusRef}>
                        <label className="text-white text-[0.63vw] font-medium not-italic ml-[0.42vw]">Status</label>
                        <div
                            onClick={() => setIsStatusOpen(!isStatusOpen)}
                            className="relative w-full h-[2.5vw] px-[1.25vw] bg-[#111111]/50 border border-[#666666]/50 rounded-[0.83vw] text-white text-[0.83vw] flex items-center justify-between cursor-pointer hover:border-white/40 transition-colors"
                        >
                            <span className={status ? 'text-white' : 'text-white/30'}>
                                {statusOptions.find(o => o.value === status)?.label || 'Select status'}
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-[0.83vw] h-[0.83vw] transition-transform ${isStatusOpen ? 'rotate-180' : ''}`}>
                                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {isStatusOpen && (
                                <div className="absolute left-0 right-0 top-[calc(100%+0.21vw)] bg-[#1C1C1E] border border-[#333333] rounded-[0.63vw] overflow-hidden shadow-xl z-50">
                                    {statusOptions.map(opt => (
                                        <div
                                            key={opt.value}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setStatus(opt.value);
                                                setIsStatusOpen(false);
                                            }}
                                            className={`w-full px-[1.25vw] py-[0.52vw] text-white text-[0.83vw] cursor-pointer hover:bg-white/10 transition-colors ${status === opt.value ? 'bg-[#5F00DB]/30' : ''}`}
                                        >
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
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
                        onClick={() => onSave(promptText, status)}
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
