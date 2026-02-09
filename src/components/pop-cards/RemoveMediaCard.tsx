import React, { useState } from 'react';
import PopCardWrapper from './PopCardWrapper';

interface RemoveMediaCardProps {
    onCancel: () => void;
    onRemove: (reason: string, customReason: string) => void;
}

const REASONS = ['Inappropriate Content', 'Violence', 'Nudity', 'Copyright', 'Fake Media', 'Privacy', 'Other'];

const RemoveMediaCard: React.FC<RemoveMediaCardProps> = ({ onCancel, onRemove }) => {
    const [selectedReason, setSelectedReason] = useState<string>('Other');
    const [customReason, setCustomReason] = useState<string>('');

    return (
        <PopCardWrapper>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] w-[25vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Icon Section */}
                <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
                    {/* Rotating Border Animation & Glow */}
                    <div className="absolute inset-0 z-[1] rounded-full">
                        {/* Glow Layer */}
                        <div
                            className="absolute -inset-[0.5vw] rounded-full animate-[spin_3s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
                                filter: 'blur(0.25vw)',
                                WebkitMask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)',
                                mask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)'
                            }}
                        />
                        {/* Sharp Border Layer */}
                        <div
                            className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)',
                                WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))',
                                mask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))'
                            }}
                        />
                    </div>
                    {/* Icon BG */}
                    <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>
                    {/* Icon Content */}
                    <div className="relative z-10 flex items-center justify-center">
                        <img src="/assets/alert-triangle.svg" alt="Remove" className="w-[2.92vw] h-[2.92vw] object-contain" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white">
                        Remove Media?
                    </h2>
                    <p className="text-[0.93vw] font-normal not-italic leading-[1.66vw] opacity-90 text-white">
                        This action will permanently remove the media. The user will be notified.
                    </p>
                </div>

                {/* Reason Selection */}
                <div className="flex flex-col self-stretch gap-[1.66vw] w-full">
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
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                    <button onClick={onCancel} className="flex-1 h-[3.5vw] border border-white/20 bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px] transition-all">Cancel</button>
                    <button onClick={() => onRemove(selectedReason, customReason)} className="flex-1 h-[3.5vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff] transition-all">Remove</button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default RemoveMediaCard;
