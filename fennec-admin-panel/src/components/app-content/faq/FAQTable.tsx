import React from 'react';
import FAQTableRow, { FAQRowData } from './FAQTableRow';

interface FAQTableProps {
    onEdit: (data: any) => void;
    onDelete: (id: string) => void;
    onViewDetails: (data: any) => void;
}

const MOCK_DATA: FAQRowData[] = [
    {
        id: '1',
        question: 'Can I use Fennec without joining a group?',
        answerSnippet: 'Youll need to be in a group to start matching. You can either create your own or join one...',
        status: 'Published',
        updatedBy: { name: 'John Doe', email: 'Moderator', avatar: '/8.png' },
        lastUpdated: 'Dec 31, 2025 • 11:59 PM'
    },
    {
        id: '2',
        question: 'How do I report a user?',
        answerSnippet: 'Go to the user profile and tap the three dots in the corner, then select Report User...',
        status: 'Published',
        updatedBy: { name: 'John Doe', email: 'Moderator', avatar: '/8.png' },
        lastUpdated: 'Dec 31, 2025 • 11:59 PM'
    },
];

const FAQTable: React.FC<FAQTableProps> = ({ onEdit, onDelete }) => {
    return (
        <div className="flex flex-col w-full">
            {MOCK_DATA.map((row) => (
                <FAQTableRow
                    key={row.id}
                    data={row}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default FAQTable;
