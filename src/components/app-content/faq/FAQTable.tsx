import React from 'react';
import FAQTableRow, { FAQRowData } from './FAQTableRow';
import { FAQ } from '@/types/api';

interface FAQTableProps {
    data: FAQ[];
    onEdit: (data: any) => void;
    onDelete: (id: string) => void;
    onViewDetails: (data: any) => void;
}

const FAQTable: React.FC<FAQTableProps> = ({ data, onEdit, onDelete, onViewDetails }) => {
    return (
        <div className="flex flex-col w-full">
            {data.map((item) => {
                const row: FAQRowData = {
                    id: item.id,
                    question: item.question,
                    answerSnippet: item.answer?.substring(0, 100) + (item.answer?.length > 100 ? '...' : '') || '',
                    status: item.status === 'published' ? 'Published' : 'Draft',
                    updatedBy: { name: item.updatedBy || item.addedBy || '—', email: '', avatar: '/8.png' },
                    lastUpdated: new Date(item.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' • ' + new Date(item.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                };
                return (
                    <FAQTableRow
                        key={item.id}
                        data={row}
                        onEdit={() => onEdit({ ...item, ...row })}
                        onDelete={onDelete}
                        onViewDetails={() => onViewDetails({ ...item, ...row })}
                    />
                );
            })}
        </div>
    );
};

export default FAQTable;
