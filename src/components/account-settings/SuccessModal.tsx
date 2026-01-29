import React, { useEffect } from 'react';
import BaseCard from '../shared/BaseCard';
import { Check } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, description }) => {

    // Auto-close after a few seconds or just purely rely on user interaction? 
    // Usually success modals might auto-close. I'll add a timeout if the user wants.
    // But for now, relying on external control or a simple click outside/button. 
    // To keep it simple, I won't add auto-close logic here unless requested.

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <BaseCard
                width="22.92vw" // 440px
                icon={
                    <div className="flex items-center justify-center w-[3.13vw] h-[3.13vw] bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.5)]">
                        <Check className="w-[1.67vw] h-[1.67vw] text-white stroke-[3]" />
                    </div>
                }
                title={title}
                description={
                    <span className="text-center text-[0.94vw] leading-[1.67vw] text-white/90">
                        {description}
                    </span>
                }
                actions={
                    <button
                        onClick={onClose}
                        className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-full h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors"
                    >
                        <span className="font-medium text-[0.83vw] leading-[1.25vw] text-white">Continue</span>
                    </button>
                }
                iconGlowColor="#5F00DB"
            />
        </div>
    );
};

export default SuccessModal;
