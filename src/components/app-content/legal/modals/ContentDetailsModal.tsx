import React from 'react';
import ContentDetailsPopCard from '@/components/pop-cards/ContentDetailsPopCard';
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

    return (
        <ContentDetailsPopCard
            title={title}
            content={content}
            onClose={onClose}
        />
    );
};

export default ContentDetailsModal;
