
import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import IconBackgroundAnimation from '../shared/IconBackgroundAnimation';

interface ActionModalProps {
    variant: 'success' | 'danger' | 'selection';
    title: string;
    description?: string;
    subDescription?: string;
    actionLabel: string;
    showCancel?: boolean;
    onAction: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string; // For height and width overrides
}

export const ActionModal = ({
    variant,
    title,
    description,
    subDescription,
    actionLabel,
    showCancel = false,
    onAction,
    onCancel,
    children,
    icon,
    className
}: ActionModalProps) => {
    return (
        <div className={twMerge(
            "flex flex-col items-center padding-box relative bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[32px] p-8 gap-8 w-[480px]",
            className
        )}>
            {/* Glow & Icon Section */}
            <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative shrink-0">
                {/* Lottie Icon Animation */}
                <IconBackgroundAnimation />

                {/* Icon BG */}
                <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>

                {/* Icon Content */}
                <div className="relative z-10 w-[6.25vw] h-[6.25vw] flex items-center justify-center">
                    {icon ? (
                        <div className="flex items-center justify-center w-full h-full">
                            {icon}
                        </div>
                    ) : (
                        variant === 'success' ? (
                            <div className="relative flex items-center justify-center w-[3.75vw] h-[3.75vw]">
                                <Check className="w-[2.08vw] h-[2.08vw] text-[#3ADC60]" strokeWidth={4} />
                                <div className="absolute inset-0 border-[3px] border-[#3ADC60] rounded-full opacity-0"></div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-[2.92vw] h-[2.92vw]">
                                <AlertTriangle className="w-[2.92vw] h-[2.92vw] text-white" strokeWidth={1.5} />
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Header and Descriptions */}
            <div className="flex flex-col items-center gap-4 text-center w-full">
                <h2 className="text-white text-[32px] font-medium not-italic leading-[38px] tracking-[-0.02em] ">{title}</h2>
                {description && (
                    <p className="text-[#DDDDDD] text-lg leading-[32px] font-normal not-italic ">
                        {description}
                    </p>
                )}
                {subDescription && (
                    <p className="text-[#DDDDDD] text-sm leading-[150%] opacity-60 font-normal not-italic ">
                        {subDescription}
                    </p>
                )}
            </div>

            {/* Slot for Lists/Inputs */}
            {children && <div className="w-full">{children}</div>}

            {/* Button Row */}
            <div className={`flex flex-row justify-center items-center gap-6 w-full mt-auto`}>
                {showCancel && (
                    <button
                        onClick={onCancel}
                        className="flex-1 h-14 border border-white rounded-[52px] text-white font-medium not-italic text-base hover:bg-white/10 transition-all backdrop-blur-[6px] flex items-center justify-center cursor-pointer"
                    >
                        Cancel
                    </button>
                )}
                <button
                    onClick={onAction}
                    className={`flex-1 h-14 rounded-[52px] text-white font-medium not-italic text-base transition-all active:scale-95 flex items-center justify-center cursor-pointer ${variant === 'success'
                        ? 'bg-[#5F00DB] shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)]'
                        : 'bg-[#FF4E4E] shadow-[0px_-8px_12px_rgba(255,78,78,0.25),0px_8px_12px_rgba(255,78,78,0.25)]'
                        }`}
                >
                    {actionLabel}
                </button>
            </div>
        </div>
    );
};
