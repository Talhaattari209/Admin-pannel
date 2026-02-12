'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, List, Link, Image, MoreHorizontal, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, height = '12.29vw' }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'flex-grow w-full bg-transparent text-white text-[0.83vw] p-[0.83vw] resize-none focus:outline-none leading-[1.25vw] prose prose-invert max-w-none',
            },
        },
    });

    // Update editor content when value prop changes externally
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-col w-full bg-[#111111] border border-[#666666]/50 rounded-[0.83vw] overflow-hidden" style={{ height }}>

            {/* Toolbar - 56px -> 2.92vw */}
            <div className="flex flex-row items-center px-[0.83vw] gap-[1.25vw] h-[2.92vw] bg-[#222222] border-b border-[#666666]/50 shrink-0 select-none">

                {/* Standard Formatting */}
                <div className="flex flex-row items-center gap-[1.25vw]">
                    <Bold
                        className={`w-[1.25vw] h-[1.25vw] cursor-pointer transition-colors ${editor.isActive('bold') ? 'text-[#5F00DB]' : 'text-white hover:text-[#5F00DB]'}`}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    />
                    <Italic
                        className={`w-[1.25vw] h-[1.25vw] cursor-pointer transition-colors ${editor.isActive('italic') ? 'text-[#5F00DB]' : 'text-white hover:text-[#5F00DB]'}`}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    />
                    <UnderlineIcon
                        className={`w-[1.25vw] h-[1.25vw] cursor-pointer transition-colors ${editor.isActive('underline') ? 'text-[#5F00DB]' : 'text-white hover:text-[#5F00DB]'}`}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    />
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
                    <List
                        className={`w-[1.25vw] h-[1.25vw] cursor-pointer transition-colors ${editor.isActive('bulletList') ? 'text-[#5F00DB]' : 'text-white hover:text-[#5F00DB]'}`}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    />
                    <Link className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                    <Image className="w-[1.25vw] h-[1.25vw] text-white cursor-pointer hover:text-[#5F00DB] transition-colors" />
                </div>

                <div className="flex-grow" />

                {/* More */}
                <MoreHorizontal className="w-[1.25vw] h-[1.25vw] text-white/30 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* Editor Area */}
            <div className="flex-grow overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
