import React, { useState } from 'react';
import BaseCard from './BaseCard';

interface RemovePromptResponseCardProps {
    onCancel: () => void;
    onRemove: (reason: string, customReason: string) => void;
}

const REASONS = ['Inappropriate Content', 'Violence', 'Nudity', 'Copyright', 'Fake Media', 'Privacy', 'Other'];

const RemovePromptResponseCard: React.FC<RemovePromptResponseCardProps> = ({ onCancel, onRemove }) => {
    const [selectedReason, setSelectedReason] = useState<string>('Other');
    const [customReason, setCustomReason] = useState<string>('');

    const icon = (
        <svg viewBox="0 0 24 24" className="w-[2.92vw] h-[2.92vw] text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );

    const actions = (
        <>
            <button onClick={onCancel} className="flex-1 h-[2.91vw] border border-white rounded-[2.70vw] text-white text-[0.83vw] font-medium not-italic">Cancel</button>
            <button onClick={() => onRemove(selectedReason, customReason)} className="flex-1 h-[2.91vw] bg-[#FF4E4E] rounded-[2.70vw] text-white text-[0.83vw] font-medium not-italic shadow-lg">Remove</button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title="Remove Prompt Response?"
            description={<p className="text-[0.73vw] opacity-80">The selected prompt response will be removed. Choose a reason to notify the user.</p>}
            actions={actions}
        >
            <div className="flex flex-col self-stretch bg-[#111111]/25 border border-[#444444]/50 rounded-[0.83vw] overflow-hidden">
                {REASONS.map((reason) => (
                    <button key={reason} onClick={() => setSelectedReason(reason)} className="flex items-center p-[0.83vw] gap-[0.83vw] border-b border-[#444444]/50 last:border-b-0 hover:bg-white/5 transition-colors">
                        <div className={`w-[1.25vw] h-[1.25vw] rounded-full border flex items-center justify-center ${selectedReason === reason ? 'border-white' : 'border-white/40'}`}>
                            {selectedReason === reason && <div className="w-[0.73vw] h-[0.73vw] bg-white rounded-full"></div>}
                        </div>
                        <span className="text-white text-[0.83vw]">{reason}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-[0.41vw] w-full">
                <label className="text-white text-[0.625vw] font-bold not-italic uppercase tracking-wider">Enter a reason</label>
                <input type="text" placeholder="Type here.." value={customReason} onChange={(e) => setCustomReason(e.target.value)} className="w-full bg-transparent border-b border-white py-[0.41vw] text-white focus:outline-none placeholder:text-white/40 text-[0.83vw]" />
            </div>
        </BaseCard>
    );
};

export default RemovePromptResponseCard;
