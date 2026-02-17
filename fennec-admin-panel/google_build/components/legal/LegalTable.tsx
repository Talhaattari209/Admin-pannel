
import React from 'react';
import PromptsTableRow, { PromptRowData } from '../prompts/PromptsTableRow';

interface LegalTableProps {
  onEdit: (data: PromptRowData) => void;
  onDelete: (id: string) => void;
  onViewDetails: (data: PromptRowData) => void;
}

const FULL_LEGAL_TEXT = `Welcome to Fennec, a group-based social and dating platform that helps people connect and interact in a fun, safe, and authentic way. By using our app, you agree to these Terms of Service (“Terms”). Please read them carefully.

1. Acceptance of Terms By accessing or using Fennec, you confirm that you are at least 18 years old and agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the app.

2. Account Registration
You must provide accurate and up-to-date information when creating your account. You are responsible for maintaining the confidentiality of your login details. Fennec reserves the right to suspend or terminate any account that violates these Terms.

3. Group Use & Conduct
Users may create or join groups to connect with others. Group Heads can manage members, approve or remove participants, and report misconduct. You agree to communicate respectfully and refrain from harassment, hate speech, or inappropriate content.

4. Premium Features Some features (such as joining multiple groups or private chats) are available through Fennec Premium. Payments are processed securely through our partners, and all subscriptions automatically renew unless canceled before the renewal date.

5. Content Ownership
You retain ownership of any content you share (photos, messages, etc.). By posting on Fennec, you grant us a non-exclusive, worldwide, royalty-free license to display and distribute that content within the app. We may remove content that violates our guidelines or community standards.

6. Safety and Reporting Fennec is committed to keeping users safe. You can report users or groups that violate our policies through in-app reporting tools. We may take action including warnings, suspensions, or permanent bans.

7. Disclaimers Fennec is provided “as is” without warranties of any kind. We do not guarantee that the app will always function without interruptions or errors, or that all users are who they claim to be.

8. Limitation of Liability Fennec and its affiliates are not responsible for any direct, indirect, or incidental damages arising from your use of the platform.

9. Changes to the Terms We may update these Terms occasionally. Updates will take effect once posted in the app. Continued use of Fennec means you accept the new Terms.

10. Contact Us If you have questions or concerns, contact us at: support@fennec.app`;

const LEGAL_DATA: PromptRowData[] = [
  { 
    id: 'legal-1', 
    title: 'Terms of Service', 
    subtitle: 'Welcome to Fennec, a group-based social and dating platform that helps people connect and interact in a fun, safe, and authentic way. By using our app, you...',
    fullContent: FULL_LEGAL_TEXT,
    status: 'Published', 
    isLegal: true,
    updatedBy: { 
      name: 'John Doe', 
      role: 'Moderator', 
      avatar: 'https://i.pravatar.cc/150?u=john', 
      email: 'john@fennec.com' 
    }, 
    lastUpdated: 'Dec 31, 2025 • 11:59 PM' 
  },
  { 
    id: 'legal-2', 
    title: 'Privacy Policy', 
    subtitle: 'Your privacy matters to us. This Privacy Policy explains what data we collect, how we use it, and how we protect your information.',
    fullContent: `Your privacy matters to us. This Privacy Policy explains what data we collect, how we use it, and how we protect your information.

Fennec is committed to keeping users safe. You can report users or groups that violate our policies through in-app reporting tools. We may take action including warnings, suspensions, or permanent bans.`,
    status: 'Published', 
    isLegal: true,
    updatedBy: { 
      name: 'John Doe', 
      role: 'Moderator', 
      avatar: 'https://i.pravatar.cc/150?u=jane', 
      email: 'john@fennec.com' 
    }, 
    lastUpdated: 'Dec 31, 2025 • 11:59 PM' 
  },
];

const LegalTable: React.FC<LegalTableProps> = ({ onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="flex flex-col min-h-[114px]">
      {LEGAL_DATA.map((row) => (
        <PromptsTableRow 
          key={row.id} 
          data={row} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default LegalTable;
