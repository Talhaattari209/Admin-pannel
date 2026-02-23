import React from 'react';
import PopCardWrapper from './PopCardWrapper';
import IconBackgroundAnimation from '../shared/IconBackgroundAnimation';

interface DeleteCardTitleOnlyProps {
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
    confirmText?: string;
    className?: string;
}

const DeleteCardTitleOnly: React.FC<DeleteCardTitleOnlyProps> = ({
    title,
    onCancel,
    onConfirm,
    confirmText = "Delete",
    className
}) => {
    return (
        <PopCardWrapper onClose={onCancel}>
            <div
                className={`relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] w-[25vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden ${className || ''}`}
            >
                {/* Icon Section */}
                <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
                    {/* Lottie Icon Animation */}
                    <IconBackgroundAnimation />
                    {/* Icon BG */}
                    <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>
                    {/* Icon Content */}
                    <div className="relative z-10 flex items-center justify-center">
                        <img src="/assets/alert-triangle.svg" alt="Delete" className="w-[2.92vw] h-[2.92vw] object-contain" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white">
                        {title}
                    </h2>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[3.5vw] border border-white/20 bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px] transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-[3.5vw] bg-[#FF4E4E] rounded-[2.71vw] text-white font-medium not-italic text-[0.94vw] shadow-[0px_-0.42vw_0.63vw_rgba(255,78,78,0.25),0px_0.42vw_0.63vw_rgba(255,78,78,0.25)] hover:bg-[#ff6666] transition-all cursor-pointer"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default DeleteCardTitleOnly;
