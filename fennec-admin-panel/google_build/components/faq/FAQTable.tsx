
import React from 'react';
import PromptsTableRow, { PromptRowData } from '../prompts/PromptsTableRow';

interface FAQTableProps {
  onEdit: (data: PromptRowData) => void;
  onDelete: (id: string) => void;
  onViewDetails: (data: PromptRowData) => void;
}

const FAQ_DATA: PromptRowData[] = [
  { 
    id: 'faq-1', 
    title: 'Can I use Fennec without joining a group?', 
    subtitle: 'You’ll need to be in a group to start matching. You can either create your own or join one via an invite, code, or QR scan.',
    fullContent: 'You’ll need to be in a group to start matching. You can either create your own or join one via an invite, code, or QR scan.',
    status: 'Published', 
    isFAQ: true,
    updatedBy: { 
      name: 'John Doe', 
      role: 'Moderator', 
      avatar: 'https://i.pravatar.cc/150?u=john', 
      email: 'john@fennec.com' 
    }, 
    lastUpdated: 'Dec 31, 2025 • 11:59 PM' 
  },
  { 
    id: 'faq-2', 
    title: 'How do I delete my account?', 
    subtitle: 'You can delete your account from settings. This action is permanent and cannot be undone.',
    fullContent: 'Go to Settings > Account > Delete Account. Please note that all your data, including matches and pokes, will be permanently deleted.',
    status: 'Published', 
    isFAQ: true,
    updatedBy: { 
      name: 'John Doe', 
      role: 'Moderator', 
      avatar: 'https://i.pravatar.cc/150?u=jane', 
      email: 'john@fennec.com' 
    }, 
    lastUpdated: 'Dec 31, 2025 • 11:59 PM' 
  },
];

const FAQTable: React.FC<FAQTableProps> = ({ onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="flex flex-col min-h-[114px]">
      {FAQ_DATA.map((row) => (
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

export default FAQTable;
