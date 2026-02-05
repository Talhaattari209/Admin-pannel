
import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

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
            <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
                {/* Glow Effect */}
                <div className="absolute inset-[-60px] bg-[linear-gradient(180deg,#5F00DB_30%,rgba(17,17,17,0)_70%)] opacity-50 rounded-full pointer-events-none" />

                {/* Icon Circle */}
                <div className="relative z-10 w-[120px] h-[120px] border border-white/20 rounded-full flex items-center justify-center backdrop-blur-[6px]">
                    {icon ? (
                        <div className="flex items-center justify-center w-full h-full">
                            {icon}
                        </div>
                    ) : (
                        variant === 'success' ? (
                            <div className="relative flex items-center justify-center w-[72px] h-[72px]">
                                <Check className="w-10 h-10 text-[#3ADC60]" strokeWidth={4} />
                                <div className="absolute inset-0 border-[3px] border-[#3ADC60] rounded-full opacity-0"></div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-[56px] h-[56px]">
                                <AlertTriangle className="w-14 h-14 text-white" strokeWidth={1.5} />
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Header and Descriptions */}
            <div className="flex flex-col items-center gap-4 text-center w-full">
                <h2 className="text-white text-[32px] font-medium not-italic leading-[38px] tracking-[-0.02em] font-['SF_Pro_Text']">{title}</h2>
                {description && (
                    <p className="text-[#DDDDDD] text-lg leading-[32px] font-normal not-italic font-['SF_Pro_Text']">
                        {description}
                    </p>
                )}
                {subDescription && (
                    <p className="text-[#DDDDDD] text-sm leading-[150%] opacity-60 font-normal not-italic font-['SF_Pro_Text']">
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
                        className="flex-1 h-14 border border-white rounded-[52px] text-white font-medium not-italic text-base hover:bg-white/10 transition-all backdrop-blur-[6px] flex items-center justify-center font-['SF_Pro_Text']"
                    >
                        Cancel
                    </button>
                )}
                <button
                    onClick={onAction}
                    className={`flex-1 h-14 rounded-[52px] text-white font-medium not-italic text-base transition-all active:scale-95 flex items-center justify-center font-['SF_Pro_Text'] ${variant === 'success'
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
