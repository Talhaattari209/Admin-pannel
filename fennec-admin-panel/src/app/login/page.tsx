"use client"

import React, { useState } from 'react';
import LoginForm from '@/components/login/LoginForm';
import ForgotPasswordCard from '@/components/login/ForgotPasswordCard';
import LinkSentCard from '@/components/login/LinkSentCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSuperAdminLogin } from '@/services/auth';

const LoginPage = () => {
    const [currentView, setCurrentView] = useState<'login' | 'forgot' | 'sent'>('login');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const loginMutation = useSuperAdminLogin();

    const handleLogin = async (data: any) => {
        console.log("Attempting login with:", { email: data.email, passwordLength: data.password?.length });
        try {
            setErrorMessage('');
            await loginMutation.mutateAsync({
                email: data.email.trim(),
                password: data.password.trim()
            });
            // Auth store is updated automatically by the mutation
            console.log("Login successful, redirecting to dashboard");
            router.push('/dashboard');
        } catch (error: any) {
            console.error("Login failed:", error);
            console.error("Error response:", error?.response);
            console.error("Error response data:", error?.response?.data);
            console.error("Error message:", error.message);
            const message = error?.response?.data?.detail || error.message || 'Invalid credentials. Please try again.';
            setErrorMessage(message);
        }
    };

    const handleSendLink = (email: string) => {
        console.log("Sending link to:", email);
        // TODO: Add API call here for password reset
        setCurrentView('sent');
    };

    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050511]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/assets/login_bg.png"
                    alt="Login Background"
                    fill
                    priority
                    className="object-cover opacity-100"
                />
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="absolute top-[5vw] z-20 max-w-[30vw] bg-red-500/90 text-white px-[1.5vw] py-[1vw] rounded-[0.83vw] backdrop-blur-[12px] shadow-lg">
                    <p className="text-[0.83vw] font-medium">{errorMessage}</p>
                </div>
            )}

            {/* Cards */}
            <div className="relative z-10 w-full flex justify-center px-[2vw]">
                {currentView === 'login' && (
                    <LoginForm
                        onLogin={handleLogin}
                        onForgotPassword={() => setCurrentView('forgot')}
                    />
                )}

                {currentView === 'forgot' && (
                    <ForgotPasswordCard
                        onSendLink={handleSendLink}
                        onBack={() => setCurrentView('login')}
                    />
                )}

                {currentView === 'sent' && (
                    <LinkSentCard
                        onBack={() => setCurrentView('login')}
                    />
                )}
            </div>

            {/* Loading Overlay */}
            {loginMutation.isPending && (
                <div className="absolute inset-0 z-30 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-[#16003F]/90 border border-[#666666]/50 rounded-[1.67vw] p-[2vw] flex flex-col items-center gap-[1vw]">
                        <div className="w-[3vw] h-[3vw] border-4 border-[#5F00DB] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white text-[1vw] font-medium">Logging in...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
