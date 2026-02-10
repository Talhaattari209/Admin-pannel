
import React from 'react';
import PopCardWrapper from './PopCardWrapper';

interface ContentDetailsPopCardProps {
    title: string;
    content: string;
    onClose: () => void;
}

const ContentDetailsPopCard: React.FC<ContentDetailsPopCardProps> = ({ title, content, onClose }) => {
    // Simulate long formatted content if 'content' is short/empty for demo (copied from original)
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

    return (
        <PopCardWrapper>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[49.79vw] h-[48.64vw] min-w-[600px] max-h-[90vh]">
                {/* Header Row */}
                <div className="flex flex-row justify-between items-center w-full h-[2.5vw] shrink-0 relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter text-center whitespace-nowrap">
                            Content Details
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
                <div className="flex flex-col gap-[0.83vw] w-full flex-grow min-h-0">
                    {/* Title Field */}
                    <div className="flex flex-col gap-[0.21vw] w-full shrink-0">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Title</label>
                        <div className="w-full h-[2.5vw] flex items-center border-b border-white">
                            <span className="text-white text-[0.83vw] font-normal not-italic truncate">{title}</span>
                        </div>
                    </div>
                    {/* Content Field (Scrollable) */}
                    <div className="flex flex-col gap-[0.21vw] w-full flex-grow min-h-0">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Content</label>
                        <div className="flex-grow w-full min-h-0 bg-[#111111] border border-[#666666]/50 rounded-[0.83vw] p-[1.25vw] overflow-y-auto custom-scrollbar">
                            <div className="text-white text-[0.83vw] leading-[1.25vw] font-normal not-italic" dangerouslySetInnerHTML={{ __html: displayContent }} />
                        </div>
                    </div>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default ContentDetailsPopCard;
