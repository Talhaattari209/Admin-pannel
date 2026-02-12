import React from 'react';
import LegalTableRow, { LegalRowData } from './LegalTableRow';

interface LegalTableProps {
    onEdit: (data: any) => void;
    onDelete: (id: string) => void;
    onViewDetails: (data: any) => void;
}

const MOCK_DATA: LegalRowData[] = [
    {
        id: '1',
        title: 'Terms of Service',
        description: 'Welcome to Fennec, a group-based social and dating platform that helps people connect...',
        status: 'Published',
        updatedBy: { name: 'John Doe', email: 'Moderator', avatar: '/8.png' },
        lastUpdated: 'Dec 31, 2025 • 11:59 PM'
    },
    {
        id: '2',
        title: 'Privacy Policy',
        description: 'Your privacy is important to us. This policy explains how we collect and use your data...',
        status: 'Published',
        updatedBy: { name: 'John Doe', email: 'Moderator', avatar: '/8.png' },
        lastUpdated: 'Dec 31, 2025 • 11:59 PM'
    },
];

const LegalTable: React.FC<LegalTableProps> = ({ onEdit, onDelete }) => {
    return (
        <div className="flex flex-col w-full">
            {MOCK_DATA.map((row) => (
                <LegalTableRow
                    key={row.id}
                    data={row}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default LegalTable;
