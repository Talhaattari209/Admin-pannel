
import React from 'react';
import PopCardWrapper from './PopCardWrapper';

interface DeactivationCardProps {
    onCancel: () => void;
    onDeactivate: () => void;
}

const DeactivationCard: React.FC<DeactivationCardProps> = ({ onCancel, onDeactivate }) => {
    return (
        <PopCardWrapper onClose={onCancel}>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] w-[25vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden">
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
                        <img src="/assets/alert-triangle.svg" alt="Deactivate" className="w-[2.92vw] h-[2.92vw] object-contain" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white">
                        Deactivate User?
                    </h2>
                    <div className="flex flex-col gap-[0.83vw]">
                        <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] text-white">
                            Are you sure you want to deactivate this user’s account?
                        </p>
                        <p className="text-[0.73vw] font-normal not-italic leading-[1.09vw] text-white">
                            Once deactivated, the user will not be able to log in or access the app until reactivated by an admin. This action will not permanently delete their data.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[2.92vw] border border-white/20 bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px] transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDeactivate}
                        className="flex-1 h-[2.92vw] bg-[#FF4E4E] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(255,78,78,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#ff6666] transition-all cursor-pointer"
                    >
                        Deactivate
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default DeactivationCard;
