import React from 'react';
import { BaseCard } from '@/components/PopCards';
import { HelpCircle } from 'lucide-react';

interface FAQDetailsModalProps {
    question: string;
    answer: string;
    onClose: () => void;
}

const FAQDetailsModal: React.FC<FAQDetailsModalProps> = ({ question, answer, onClose }) => {

    // Simulate long formatted content if 'answer' is short/empty for demo
    const displayAnswer = answer || `
        You can create a group by navigating to the "Groups" tab and tapping the "+" icon. Follow the steps to set up your group name, description, and rules.
        
        Once created, you can invite members, set up events, and manage group settings.
    `;

    const icon = (
        <div className="w-[3.75vw] h-[3.75vw] rounded-full bg-[#5F00DB]/20 flex items-center justify-center">
            <HelpCircle className="w-[1.67vw] h-[1.67vw] text-white" />
        </div>
    );

    const actions = (
        <button
            onClick={onClose}
            className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-[#5F00DB] text-white shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff]"
        >
            Close
        </button>
    );

    return (
        <BaseCard
            icon={icon}
            title={question}
            description="FAQ Details"
            actions={actions}
            glowColor="#5F00DB"
            width="49.79vw"
            height="15.83vw"
        >
            <div className="w-full bg-[#1a1a1a]/50 border border-[#666666]/30 rounded-[0.83vw] p-[1.25vw]">
                <p className="text-white text-[0.83vw] leading-[1.5] whitespace-pre-line font-['SF_Pro_Text']">
                    {displayAnswer}
                </p>
            </div>
        </BaseCard>
    );
};

export default FAQDetailsModal;
