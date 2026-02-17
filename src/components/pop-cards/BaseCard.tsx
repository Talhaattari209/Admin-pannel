import React from 'react';

interface BaseCardProps {
    icon: React.ReactNode;
    title: string;
    description: string | React.ReactNode;
    children?: React.ReactNode;
    actions: React.ReactNode;
    minHeight?: string;
    iconGlowColor?: string;
    alignActionsToBottom?: boolean;
}

const BaseCard: React.FC<BaseCardProps> = ({
    icon,
    title,
    description,
    children,
    actions,
    minHeight = 'auto',
    iconGlowColor = '#5F00DB',
    alignActionsToBottom = true
}) => {
    return (
        <div
            className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] w-[25vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden"
            style={{ minHeight }}
        >
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
                    {icon}
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white">
                    {title}
                </h2>
                <div className="text-white">
                    {typeof description === 'string' ? (
                        <p className="text-[0.93vw] font-normal not-italic leading-[1.66vw] opacity-90">{description}</p>
                    ) : (
                        description
                    )}
                </div>
            </div>

            {/* Custom Middle Content (Lists, Inputs, etc.) */}
            {children && (
                <div className="flex flex-col self-stretch gap-[1.66vw]">
                    {children}
                </div>
            )}

            {/* Action Buttons */}
            <div className={`flex flex-row items-center justify-center gap-[1.25vw] self-stretch ${alignActionsToBottom ? 'mt-auto' : ''}`}>
                {actions}
            </div>
        </div>
    );
};

export default BaseCard;
