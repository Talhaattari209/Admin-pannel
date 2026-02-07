import React from 'react';
import { BaseCard } from '@/components/PopCards';
import { FileText } from 'lucide-react';

interface ContentDetailsModalProps {
    title: string;
    content: string;
    onClose: () => void;
}

const ContentDetailsModal: React.FC<ContentDetailsModalProps> = ({ title, content, onClose }) => {

    // Simulate long formatted content if 'content' is short/empty for demo
    const displayContent = content || `
        1. Acceptance of Terms
        By accessing or using Fennec, you confirm that you are at least 18 years old and agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the app.
        
        2. Account Registration
        You must provide accurate and up-to-date information when creating your account. You are responsible for maintaining the confidentiality of your login details. Fennec reserves the right to suspend or terminate any account that violates these Terms.
        
        3. Group Use & Conduct
        Users may create or join groups to connect with others. Group Heads can manage members, approve or remove participants, and report misconduct. You agree to communicate respectfully and refrain from harassment, hate speech, or inappropriate content.
        
        4. Premium Features
        Some features (such as joining multiple groups or private chats) are available through Fennec Premium. Payments are processed securely through our partners, and all subscriptions automatically renew unless canceled before the renewal date.
    `;

    const icon = (
        <div className="w-[3.75vw] h-[3.75vw] rounded-full bg-[#5F00DB]/20 flex items-center justify-center">
            <FileText className="w-[1.67vw] h-[1.67vw] text-white" />
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
            title={title}
            description="View the full content details below."
            actions={actions}
            glowColor="#5F00DB"
            width="49.79vw"
            height="41.98vw"
        >
            <div className="w-full bg-[#1a1a1a]/50 border border-[#666666]/30 rounded-[0.83vw] p-[1.25vw]">
                <p className="text-white text-[0.83vw] leading-[1.5] whitespace-pre-line font-['SF_Pro_Text']">
                    {displayContent}
                </p>
            </div>
        </BaseCard>
    );
};

export default ContentDetailsModal;
