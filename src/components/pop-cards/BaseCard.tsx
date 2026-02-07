import React from 'react';

interface BaseCardProps {
    icon: React.ReactNode;
    title: string;
    description: string | React.ReactNode;
    children?: React.ReactNode;
    actions: React.ReactNode;
    minHeight?: string;
    iconGlowColor?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({
    icon,
    title,
    description,
    children,
    actions,
    minHeight = 'auto',
    iconGlowColor = '#5F00DB'
}) => {
    return (
        <div
            className="relative flex flex-col items-center p-8 gap-8 w-[95vw] max-w-[480px] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[32px] box-border shadow-2xl overflow-hidden"
            style={{ minHeight }}
        >
            {/* Icon Section */}
            <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
                {/* Glow behind icon */}
                <div
                    className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
                    style={{ background: `linear-gradient(180deg, ${iconGlowColor} 30%, transparent 70%)` }}
                ></div>

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

                {/* Icon BG Layer */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
                {/* Actual Icon Content */}
                <div className="relative z-10 flex items-center justify-center">
                    {icon}
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-4 text-center self-stretch">
                <h2 className="text-[32px] font-medium not-italic leading-[38px] tracking-[-0.02em] text-white">
                    {title}
                </h2>
                <div className="text-white">
                    {typeof description === 'string' ? (
                        <p className="text-[18px] font-normal not-italic leading-[32px] opacity-90">{description}</p>
                    ) : (
                        description
                    )}
                </div>
            </div>

            {/* Custom Middle Content (Lists, Inputs, etc.) */}
            {children && (
                <div className="flex flex-col self-stretch gap-8">
                    {children}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-row items-center justify-center gap-[24px] self-stretch mt-auto">
                {actions}
            </div>
        </div>
    );
};

export default BaseCard;
