import React, { useState } from 'react';
import BaseCard from './BaseCard';

interface RemoveMediaCardProps {
    onCancel: () => void;
    onRemove: (reason: string, customReason: string) => void;
}

const REASONS = ['Inappropriate Content', 'Violence', 'Nudity', 'Copyright', 'Fake Media', 'Privacy', 'Other'];

const RemoveMediaCard: React.FC<RemoveMediaCardProps> = ({ onCancel, onRemove }) => {
    const [selectedReason, setSelectedReason] = useState<string>('Other');
    const [customReason, setCustomReason] = useState<string>('');

    const icon = (
        <svg viewBox="0 0 24 24" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );

    const actions = (
        <>
            <button onClick={onCancel} className="flex-1 h-[56px] border border-white rounded-[52px] text-white font-medium">Cancel</button>
            <button onClick={() => onRemove(selectedReason, customReason)} className="flex-1 h-[56px] bg-[#FF4E4E] rounded-[52px] text-white font-medium shadow-lg">Remove</button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Remove Media?"
            description={<p className="text-[14px] opacity-80">This action will permanently remove the media. The user will be notified.</p>}
            actions={actions}
            minHeight="942px" // Used same height as RemovePromptResponseCard, though reference had it unstated in one usage, keeping consistent with complex inputs
        >
            <div className="flex flex-col self-stretch bg-[#111111]/25 border border-[#444444]/50 rounded-[16px] overflow-hidden">
                {REASONS.map((reason) => (
                    <button key={reason} onClick={() => setSelectedReason(reason)} className="flex items-center p-4 gap-4 border-b border-[#444444]/50 last:border-b-0 hover:bg-white/5 transition-colors">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedReason === reason ? 'border-white' : 'border-white/40'}`}>
                            {selectedReason === reason && <div className="w-[14px] h-[14px] bg-white rounded-full"></div>}
                        </div>
                        <span className="text-white text-[16px]">{reason}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label className="text-white text-[12px] font-bold uppercase tracking-wider">Enter a reason</label>
                <input type="text" placeholder="Type here.." value={customReason} onChange={(e) => setCustomReason(e.target.value)} className="w-full bg-transparent border-b border-white py-2 text-white focus:outline-none placeholder:text-white/40" />
            </div>
        </BaseCard>
    );
};

export default RemoveMediaCard;
