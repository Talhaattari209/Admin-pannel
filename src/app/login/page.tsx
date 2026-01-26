"use client"

import React, { useState } from 'react';
import LoginForm from '@/components/login/LoginForm';
import ForgotPasswordCard from '@/components/login/ForgotPasswordCard';
import LinkSentCard from '@/components/login/LinkSentCard';
import Image from 'next/image';

const LoginPage = () => {
    const [currentView, setCurrentView] = useState<'login' | 'forgot' | 'sent'>('login');

    const handleLogin = (data: any) => {
        console.log("Login data:", data);
        // Add authentication logic here
    };

    const handleSendLink = (email: string) => {
        console.log("Sending link to:", email);
        // Add API call here
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
        </div>
    );
};

export default LoginPage;
