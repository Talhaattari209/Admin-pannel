import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

export interface PromptRowData {
    id: string;
    title: string;
    subtitle?: string;
    status: 'Draft' | 'Published' | 'Pending';
    updatedBy: {
        name: string;
        role: string;
        avatar: string; // URL
        email: string;
    };
    lastUpdated: string; // "Dec 31, 2025 • 11:59 PM"
    isLegal?: boolean;
    isFAQ?: boolean;
    fullContent?: string;
}

interface PromptsTableRowProps {
    data: PromptRowData;
    onEdit: (data: PromptRowData) => void;
    onDelete: (id: string) => void;
    onViewDetails?: (data: PromptRowData) => void;
}

const PromptsTableRow: React.FC<PromptsTableRowProps> = ({ data, onEdit, onDelete, onViewDetails }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <div className="group flex flex-row items-center w-full h-[2.92vw] bg-[#222222] border-b border-[rgba(102,102,102,0.5)] hover:bg-white/[0.05] transition-colors relative shrink-0">
            {/* Title Cell */}
            <div className="flex-grow min-w-0 px-[0.63vw] py-[0.21vw] flex flex-col justify-center">
                <p className="text-white text-[0.73vw] font-normal not-italic truncate font-inter not-italic">
                    {data.title}
                </p>
                {data.subtitle && (
                    <p className="text-white/50 text-[0.57vw] font-light not-italic truncate mt-[0.21vw] font-inter not-italic">
                        {data.subtitle}
                    </p>
                )}
            </div>

            {/* Status Cell - ~180px -> 9.38vw */}
            <div className="w-[9.38vw] px-[0.63vw] py-[0.42vw] flex items-center shrink-0">
                <div className={`px-[0.63vw] h-[1.67vw] rounded-full text-[0.68vw] font-normal not-italic inline-flex items-center justify-center font-inter not-italic ${data.status === 'Published' ? 'bg-[#5F00DB] text-white shadow-[0_0_0.52vw_rgba(95,0,219,0.3)]' : 'bg-[#444444] text-white/60'
                    }`}>
                    {data.status}
                </div>
            </div>

            {/* Updated By - ~200px -> 10.42vw */}
            <div className="w-[10.42vw] px-[0.63vw] py-[0.42vw] flex items-center gap-[0.63vw] shrink-0">
                <div
                    className="w-[1.88vw] h-[1.88vw] rounded-full bg-cover bg-center border border-white/10 shrink-0"
                    style={{ backgroundImage: `url(${data.updatedBy.avatar})` }}
                />
                <div className="flex flex-col min-w-0">
                    <span className="text-white text-[0.68vw] font-medium not-italic truncate font-inter not-italic leading-none mb-[0.21vw]">{data.updatedBy.name}</span>
                    <span className="text-white/40 text-[0.52vw] font-light not-italic truncate font-inter not-italic leading-none">{data.updatedBy.role}</span>
                </div>
            </div>

            {/* Last Updated - ~220px -> 11.46vw */}
            <div className="w-[11.46vw] px-[0.63vw] py-[0.42vw] flex items-center gap-[0.42vw] shrink-0">
                <span className="text-white text-[0.68vw] font-inter not-italic">{data.lastUpdated.split(' • ')[0]}</span>
                <div className="w-[0.21vw] h-[0.21vw] bg-white/20 rounded-full" />
                <span className="text-white text-[0.68vw] font-inter not-italic opacity-60">{data.lastUpdated.split(' • ')[1]}</span>
            </div>

            {/* Action - ~48px -> 2.5vw */}
            <div className="w-[2.5vw] px-[0.42vw] flex justify-center relative shrink-0">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-[0.42vw] rounded-full transition-colors cursor-pointer ${isMenuOpen ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                >
                    <MoreVertical className="w-[0.83vw] h-[0.83vw]" />
                </button>

                {isMenuOpen && (
                    <div ref={menuRef} className="absolute top-[80%] right-full mr-[0.42vw] w-[11.46vw] bg-[#1a1a1a] border border-[#666666]/50 rounded-[0.63vw] shadow-2xl z-50 overflow-hidden py-[0.42vw] animate-in fade-in slide-in-from-right-2 duration-200">
                        <button onClick={() => { setIsMenuOpen(false); onEdit(data); }} className="flex items-center w-full px-[0.83vw] py-[0.63vw] gap-[0.63vw] hover:bg-white/5 transition-colors text-left text-white text-[0.73vw] font-inter not-italic">
                            <Edit2 className="w-[0.83vw] h-[0.83vw] opacity-60" />
                            Edit
                        </button>
                        <button onClick={() => { setIsMenuOpen(false); onDelete(data.id); }} className="flex items-center w-full px-[0.83vw] py-[0.63vw] gap-[0.63vw] hover:bg-white/5 transition-colors text-left text-[#FF4E4E] text-[0.73vw] font-inter not-italic">
                            <Trash2 className="w-[0.83vw] h-[0.83vw] opacity-60" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptsTableRow;
