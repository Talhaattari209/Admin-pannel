import React from 'react';
import FAQDetailsPopCard from '@/components/pop-cards/FAQDetailsPopCard';
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

    return (
        <FAQDetailsPopCard
            question={question}
            answer={answer}
            onClose={onClose}
        />
    );
};

export default FAQDetailsModal;
