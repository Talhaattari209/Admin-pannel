import React, { useState } from 'react';
import PopCardWrapper from '@/components/pop-cards/PopCardWrapper';
import IconBackgroundAnimation from '@/components/shared/IconBackgroundAnimation';

interface ResetPasswordCardProps {
    onSubmit: (newPassword: string) => void;
    isLoading?: boolean;
    errorMessage?: string;
}

const ResetPasswordCard: React.FC<ResetPasswordCardProps> = ({
    onSubmit,
    isLoading = false,
    errorMessage,
}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleSubmit = () => {
        setValidationError('');
        if (!newPassword.trim()) {
            setValidationError('Please enter a new password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setValidationError('Passwords do not match.');
            return;
        }
        onSubmit(newPassword);
    };

    const displayError = validationError || errorMessage;

    return (
        <PopCardWrapper>
            <div className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[25vw] min-w-[320px] max-w-[480px] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.67vw]">

                {/* Icon Section */}
                <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
                    <IconBackgroundAnimation />
                    <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0" />
                    {/* Key Icon */}
                    <svg viewBox="0 0 24 24" fill="none" className="w-[2.92vw] h-[2.92vw] relative z-10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
                    </svg>
                </div>

                {/* Header Text */}
                <div className="flex flex-col items-center gap-[0.83vw] w-full">
                    <h2 className="font-medium not-italic text-[1.67vw] leading-[1.2] text-white text-center tracking-[0.01em]">
                        Reset Password
                    </h2>
                    <p className="font-normal not-italic text-[0.94vw] leading-[1.78] text-[#DDDDDD] text-center">
                        Enter and confirm your new password below.
                    </p>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-[1vw] w-full px-[0.2vw]">

                    {/* New Password */}
                    <div className="flex flex-col items-start gap-[0.2vw] w-full">
                        <label className="text-white text-[0.625vw] font-bold not-italic uppercase tracking-wider">New Password</label>
                        <div className="flex items-center w-full border-b border-white py-[0.4vw] relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-transparent border-none text-white text-[0.83vw] focus:outline-none placeholder:text-white/40 disabled:opacity-50 pr-[1.5vw]"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-0 text-white/60 hover:text-white transition-colors cursor-pointer"
                            >
                                <svg viewBox="0 0 24 24" className="w-[1.15vw] h-[1.15vw]" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    {showNewPassword ? (
                                        <>
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </>
                                    ) : (
                                        <>
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col items-start gap-[0.2vw] w-full">
                        <label className="text-white text-[0.625vw] font-bold not-italic uppercase tracking-wider">Confirm Password</label>
                        <div className="flex items-center w-full border-b border-white py-[0.4vw] relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-transparent border-none text-white text-[0.83vw] focus:outline-none placeholder:text-white/40 disabled:opacity-50 pr-[1.5vw]"
                                placeholder="Re-enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-0 text-white/60 hover:text-white transition-colors cursor-pointer"
                            >
                                <svg viewBox="0 0 24 24" className="w-[1.15vw] h-[1.15vw]" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    {showConfirmPassword ? (
                                        <>
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </>
                                    ) : (
                                        <>
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {displayError && (
                        <p className="text-red-400 text-[0.72vw] mt-[0.1vw]">{displayError}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center w-full mt-[0.5vw]">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full flex justify-center items-center bg-[#5F00DB] shadow-[0px_8px_12px_rgba(95,0,219,0.25)] rounded-[2.7vw] py-[0.83vw] px-[1.25vw] gap-[0.625vw] hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-[0.5vw]">
                                <span className="w-[0.9vw] h-[0.9vw] border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                                <span className="font-medium not-italic text-[0.83vw] leading-[1.5] text-white text-center">Resetting...</span>
                            </span>
                        ) : (
                            <span className="font-medium not-italic text-[0.83vw] leading-[1.5] text-white text-center">
                                Reset Password
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default ResetPasswordCard;
