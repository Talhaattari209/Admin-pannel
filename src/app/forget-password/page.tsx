"use client";

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import ResetPasswordCard from '@/components/login/ResetPasswordCard';
import SuccessCard from '@/components/pop-cards/SuccessCard';
import { useResetPassword } from '@/services/auth';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = (searchParams.get('email') || '').trim();
    const token = (searchParams.get('token') || '').trim();

    console.log('[ResetPassword] URL Params:', { email, token: token ? `${token.substring(0, 5)}...` : 'none' });

    const [view, setView] = useState<'reset' | 'success'>('reset');
    const [apiError, setApiError] = useState('');
    const resetPasswordMutation = useResetPassword();

    const handleSubmit = async (newPassword: string) => {
        setApiError('');

        if (!email || !token) {
            setApiError('Invalid reset link. Please request a new one.');
            return;
        }

        try {
            console.log('[ResetPassword] Attempting reset with payload:', { email, token: token ? `${token.substring(0, 5)}...` : 'none', passwordLength: newPassword.length });
            await resetPasswordMutation.mutateAsync({ email, token, password: newPassword });
            console.log('[ResetPassword] Success');
            setView('success');
        } catch (error: any) {
            console.error('[ResetPassword] Caught Error:', error);
            if (error.response) {
                console.error('[ResetPassword] Error Response Data:', error.response.data);
                console.error('[ResetPassword] Error Response Status:', error.response.status);
            }
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.detail ||
                error.message ||
                'Failed to reset password. Please try again.';
            setApiError(message);
        }
    };

    const handleDone = () => {
        router.push('/login');
    };

    return (
        <div className="relative z-10 w-full flex justify-center px-[2vw]">
            {view === 'reset' && (
                <ResetPasswordCard
                    onSubmit={handleSubmit}
                    isLoading={resetPasswordMutation.isPending}
                    errorMessage={apiError}
                />
            )}
            {view === 'success' && (
                <SuccessCard
                    title="Password Reset!"
                    description="Your password has been updated successfully. You can now log in with your new password."
                    onDone={handleDone}
                    buttonText="Back to Login"
                />
            )}
        </div>
    );
}

export default function ForgetPasswordPage() {
    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050511]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/assets/login_bg.png"
                    alt="Background"
                    fill
                    priority
                    className="object-cover opacity-100"
                />
            </div>

            {/* Content */}
            <Suspense fallback={
                <div className="relative z-10 flex items-center justify-center">
                    <div className="w-[3vw] h-[3vw] border-4 border-[#5F00DB] border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
