import React from 'react';
import PopCardWrapper from './PopCardWrapper';

interface DeleteCardProps {
    title: string;
    description: string;
    onCancel: () => void;
    onConfirm: () => void;
    confirmText?: string;
    className?: string;
}

const DeleteCard: React.FC<DeleteCardProps> = ({
    title,
    description,
    onCancel,
    onConfirm,
    confirmText = "Delete",
    className
}) => {
    return (
        <PopCardWrapper>
            <div
                className={`relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[25vw] min-w-[320px] ${className || ''}`}
            >
                {/* Icon Section */}
                <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
                    <div
                        className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
                        style={{ background: `linear-gradient(180deg, #FF4E4E 30%, transparent 70%)` }}
                    ></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
                    <div className="relative z-10 flex items-center justify-center">
                        <img src="/assets/alert-triangle.svg" alt="Delete" className="w-[2.92vw] h-[2.92vw] object-contain" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter">
                        {title}
                    </h2>
                    <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] text-[#DDDDDD] font-inter">
                        {description}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[2.92vw] border border-white backdrop-blur-[6px] bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-[2.92vw] bg-[#FF4E4E] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(255,78,78,0.25),0px_0.42vw_0.63vw_rgba(255,78,78,0.25)] hover:brightness-110 active:scale-95 transition-all"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default DeleteCard;
