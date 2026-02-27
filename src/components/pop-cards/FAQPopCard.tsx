
import React, { useState, useEffect } from 'react';
import PopCardWrapper from './PopCardWrapper';
import RichTextEditor from '../app-content/shared/RichTextEditor';

interface FAQPopCardProps {
    onCancel: () => void;
    onSave: (question: string, answer: string, status: string) => void;
    initialQuestion?: string;
    initialAnswer?: string;
    initialStatus?: string;
    mode?: 'add' | 'edit';
}

const FAQPopCard: React.FC<FAQPopCardProps> = ({ onCancel, onSave, initialQuestion = '', initialAnswer = '', initialStatus = 'published', mode = 'add' }) => {
    const [question, setQuestion] = useState(initialQuestion);
    const [answer, setAnswer] = useState(initialAnswer);
    const [status, setStatus] = useState(initialStatus);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const isEdit = mode === 'edit';
    const statusRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setQuestion(initialQuestion);
        setAnswer(initialAnswer);
    }, [initialQuestion, initialAnswer]);

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
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.25vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[49.79vw] h-[29.38vw] min-w-[600px] min-h-[400px]">
                {/* Header Row */}
                <div className="flex flex-row justify-between items-center w-full h-[2.08vw] shrink-0 relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h2 className="text-[1.46vw] font-medium not-italic leading-[1.77vw] tracking-[-0.02em] text-white font-inter text-center whitespace-nowrap">
                            {isEdit ? "Edit FAQ" : "Add FAQ"}
                        </h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="ml-auto w-[2.08vw] h-[2.08vw] flex items-center justify-center rounded-full bg-[#5F00DB] shadow-[0px_0px_0.21vw_rgba(95,0,219,0.25),0px_0.21vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 transition-all cursor-pointer"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.04vw] h-[1.04vw]">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[0.63vw] w-full flex-grow min-h-0">
                    {/* Question + Status Row */}
                    <div className="flex flex-row gap-[0.83vw] w-full shrink-0 items-end">
                        {/* Question Input */}
                        <div className="flex flex-col gap-[0.21vw] flex-grow min-w-0">
                            <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Question</label>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="e.g. How do I reset my password?"
                                className="w-full h-[2.5vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] font-normal not-italic focus:outline-none placeholder:text-white/30"
                            />
                        </div>
                        {/* Status Selection */}
                        <div className="flex flex-col gap-[0.21vw] shrink-0" style={{ width: '10vw' }} ref={statusRef}>
                            <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Status</label>
                            <div
                                onClick={() => setIsStatusOpen(!isStatusOpen)}
                                className="relative w-full h-[2.5vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] flex items-center justify-between cursor-pointer hover:border-white/60 transition-colors"
                            >
                                <span className={status ? 'text-white' : 'text-white/30'}>
                                    {statusOptions.find(o => o.value === status)?.label || 'Select'}
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
                                                className={`w-full px-[0.83vw] py-[0.52vw] text-white text-[0.83vw] cursor-pointer hover:bg-white/10 transition-colors ${status === opt.value ? 'bg-[#5F00DB]/30' : ''}`}
                                            >
                                                {opt.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Answer Input */}
                    <div className="flex flex-col gap-[0.21vw] w-full flex-grow min-h-0">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Answer</label>
                        <div className="flex-grow w-full min-h-0 bg-[#111111] border border-[#666666]/50 rounded-[0.83vw] overflow-hidden">
                            <RichTextEditor
                                value={answer}
                                onChange={setAnswer}
                                placeholder="Provide the answer here..."
                                height="100%"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-start gap-[1.25vw] w-full shrink-0">
                    <button
                        onClick={() => onSave(question, answer, status)}
                        className="w-[6vw] h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                        {isEdit ? "Save" : "Add"}
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

export default FAQPopCard;
