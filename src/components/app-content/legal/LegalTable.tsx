import React from 'react';
import LegalTableRow, { LegalRowData } from './LegalTableRow';
import { LegalContent } from '@/types/api';

interface LegalTableProps {
    data: LegalContent[];
    onEdit: (data: any) => void;
    onDelete: (id: string) => void;
    onViewDetails: (data: any) => void;
}

const LegalTable: React.FC<LegalTableProps> = ({ data, onEdit, onDelete, onViewDetails }) => {
    return (
        <div className="flex flex-col w-full">
            {data.map((item) => {
                const row: LegalRowData = {
                    id: item.id,
                    title: item.title,
                    description: item.content?.substring(0, 100) + (item.content?.length > 100 ? '...' : '') || '',
                    status: item.status === 'published' ? 'Published' : 'Draft',
                    updatedBy: { name: item.updatedBy || item.addedBy || '—', email: '', avatar: '/8.png' },
                    lastUpdated: new Date(item.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' • ' + new Date(item.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                };
                return (
                    <LegalTableRow
                        key={item.id}
                        data={row}
                        onEdit={() => onEdit({ ...item, ...row })}
                        onDelete={onDelete}
                    />
                );
            })}
        </div>
    );
};

export default LegalTable;
