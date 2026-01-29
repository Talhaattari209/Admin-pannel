import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

export interface LegalRowData {
    id: string;
    title: string;
    description: string;
    status: 'Published' | 'Draft';
    updatedBy: {
        name: string;
        email: string;
        avatar: string;
    };
    lastUpdated: string; // "Dec 31, 2025 • 11:59 PM"
}

interface LegalTableRowProps {
    data: LegalRowData;
    onEdit: (data: LegalRowData) => void;
    onDelete: (id: string) => void;
}

const LegalTableRow: React.FC<LegalTableRowProps> = ({ data, onEdit, onDelete }) => {
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
        <div className="group flex flex-row items-center w-full h-[2.92vw] bg-[#222222] border-b border-[rgba(102,102,102,0.5)] hover:bg-white/[0.02] transition-colors relative shrink-0">

            {/* 1. Content Cell - Flexible */}
            <div className="flex-1 flex flex-col justify-center items-start px-[0.63vw] gap-[0.42vw] min-w-0 h-full">
                <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.83vw] truncate w-full">
                    {data.title}
                </span>
                <span className="text-white/50 font-['SF_Pro_Text'] font-light text-[0.57vw] leading-[0.83vw] tracking-[0.02em] truncate w-full">
                    {data.description}
                </span>
            </div>

            {/* 2. Status Cell - 200px -> 10.42vw */}
            <div className="flex flex-row items-center px-[0.63vw] gap-[0.21vw] w-[10.42vw] h-full shrink-0">
                <div className={`flex flex-row justify-center items-center px-[0.63vw] py-[0.42vw] gap-[0.52vw] w-[4.64vw] h-[1.67vw] rounded-[0.83vw] ${data.status === 'Published' ? 'bg-[#5F00DB]' : 'bg-[#444444]'
                    }`}>
                    <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.83vw]">
                        {data.status}
                    </span>
                </div>
            </div>

            {/* 3. Updated By Cell - 200px -> 10.42vw */}
            <div className="flex flex-row items-center px-[0.63vw] gap-[0.42vw] w-[10.42vw] h-full shrink-0">
                <div
                    className="w-[1.88vw] h-[1.88vw] rounded-full bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${data.updatedBy.avatar})` }}
                />
                <div className="flex flex-col justify-center items-start gap-[0.21vw]">
                    <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.83vw]">
                        {data.updatedBy.name}
                    </span>
                    <span className="text-white/50 font-['SF_Pro_Text'] font-light text-[0.57vw] leading-[0.83vw] tracking-[0.02em]">
                        {data.updatedBy.email}
                    </span>
                </div>
            </div>

            {/* 4. Last Updated Cell - 200px -> 10.42vw */}
            <div className="flex flex-row items-center px-[0.63vw] gap-[0.42vw] w-[10.42vw] h-full shrink-0">
                <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.83vw]">
                    {data.lastUpdated.split(' • ')[0]}
                </span>
                <div className="w-[0.16vw] h-[0.16vw] bg-white rounded-full" />
                <span className="text-white font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.83vw]">
                    {data.lastUpdated.split(' • ')[1]}
                </span>
            </div>

            {/* 5. Action Cell - 48px -> 2.5vw */}
            <div className="flex justify-center items-center w-[2.5vw] h-full shrink-0 relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex justify-center items-center w-[1.67vw] h-[1.67vw] rounded-full text-white/40 hover:text-white transition-colors"
                >
                    <MoreVertical className="w-[0.83vw] h-[0.83vw]" />
                </button>

                {isMenuOpen && (
                    <div ref={menuRef} className="absolute top-[80%] right-full mr-[0.42vw] w-[11.46vw] bg-[#1a1a1a] border border-[#666666]/50 rounded-[0.63vw] shadow-2xl z-50 overflow-hidden py-[0.42vw] animate-in fade-in slide-in-from-right-2 duration-200">
                        <button onClick={() => { setIsMenuOpen(false); onEdit(data); }} className="flex items-center w-full px-[0.83vw] py-[0.63vw] gap-[0.63vw] hover:bg-white/5 transition-colors text-left text-white text-[0.73vw] font-inter">
                            <Edit2 className="w-[0.83vw] h-[0.83vw] opacity-60" />
                            Edit
                        </button>
                        <button onClick={() => { setIsMenuOpen(false); onDelete(data.id); }} className="flex items-center w-full px-[0.83vw] py-[0.63vw] gap-[0.63vw] hover:bg-white/5 transition-colors text-left text-[#FF4E4E] text-[0.73vw] font-inter">
                            <Trash2 className="w-[0.83vw] h-[0.83vw] opacity-60" />
                            Delete
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default LegalTableRow;
