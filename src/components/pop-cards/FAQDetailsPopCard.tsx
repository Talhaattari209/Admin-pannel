
import React from 'react';
import PopCardWrapper from './PopCardWrapper';

interface FAQDetailsPopCardProps {
    question: string;
    answer: string;
    onClose: () => void;
}

const FAQDetailsPopCard: React.FC<FAQDetailsPopCardProps> = ({ question, answer, onClose }) => {
    // Simulate long formatted content if 'answer' is short/empty for demo
    const displayAnswer = answer || `
        You can create a group by navigating to the "Groups" tab and tapping the "+" icon. Follow the steps to set up your group name, description, and rules.
        
        Once created, you can invite members, set up events, and manage group settings.
    `;

    return (
        <PopCardWrapper>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[49.79vw] min-w-[600px] min-h-[300px]">
                {/* Header Row */}
                <div className="flex flex-row justify-between items-center w-full h-[2.5vw] shrink-0 relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter text-center whitespace-nowrap">
                            FAQ Details
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-auto w-[2.5vw] h-[2.5vw] flex items-center justify-center rounded-full bg-[#5F00DB] shadow-[0px_0px_0.21vw_rgba(95,0,219,0.25),0px_0.21vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 transition-all"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.25vw] h-[1.25vw]">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-[0.63vw] w-full flex-grow min-h-0">
                    {/* Question Field */}
                    <div className="flex flex-col gap-[0.63vw] w-full shrink-0">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Question</label>
                        <div className="w-full h-[2.5vw] flex items-center border-b border-white">
                            <span className="text-white text-[0.83vw] font-normal not-italic truncate">{question}</span>
                        </div>
                    </div>
                    {/* Answer Field */}
                    <div className="flex flex-col gap-[0.63vw] w-full shrink-0">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Answer</label>
                        <div className="w-full flex items-start border-none">
                            <p className="text-white text-[0.83vw] leading-[1.25vw] font-normal not-italic whitespace-pre-line">
                                {displayAnswer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default FAQDetailsPopCard;
