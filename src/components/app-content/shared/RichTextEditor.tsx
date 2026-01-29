import React from 'react';
import { Bold, Italic, Underline, List, Link, Image, MoreHorizontal, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, height = '12.29vw' }) => {
    // Height 236px -> 12.29vw

    return (
        <div className="flex flex-col w-full bg-[#111111] border border-[#666666]/50 rounded-[0.83vw] overflow-hidden" style={{ height }}>

            {/* Toolbar - 56px -> 2.92vw */}
            <div className="flex flex-row items-center px-[0.83vw] gap-[1.25vw] h-[2.92vw] bg-[#222222] border-b border-[#666666]/50 shrink-0 select-none">

                {/* Standard Formatting */}
                <div className="flex flex-row items-center gap-[1.25vw]">
                    <Bold className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                    <Italic className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                    <Underline className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                </div>

                <div className="w-[1px] h-[1.25vw] bg-[#666666]/50" />

                {/* Alignment */}
                <div className="flex flex-row items-center gap-[1.25vw]">
                    <AlignLeft className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                    <AlignCenter className="w-[1.25vw] h-[1.25vw] text-white/50 cursor-pointer hover:text-[#5F00DB] transition-colors" />
                    <AlignRight className="w-[1.25vw] h-[1.25vw] text-white/50 cursor-pointer hover:text-[#5F00DB] transition-colors" />
                </div>

                <div className="w-[1px] h-[1.25vw] bg-[#666666]/50" />

                {/* Lists & Media */}
                <div className="flex flex-row items-center gap-[1.25vw]">
                    <List className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                    <Link className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                    <Image className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                </div>

                <div className="flex-grow" />

                {/* More */}
                <MoreHorizontal className="w-[1.25vw] h-[1.25vw] text-white/30 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* Editor Area */}
            <textarea
                className="flex-grow w-full bg-transparent text-white font-['SF_Pro_Text'] text-[0.83vw] p-[0.83vw] resize-none focus:outline-none placeholder:text-white/30 leading-[1.25vw]"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default RichTextEditor;
