'use client';

import React from 'react';
import SideNavigation from '@/components/SideNavigation';
import SystemLogsView from '@/components/system-logs/SystemLogsView';

export default function SystemLogsPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-['SF_Pro_Text'] text-white">
            {/* Background Layer */}
            <div
                className="fixed inset-0 z-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/8.png')` }}
            />

            {/* Sidebar */}
            <SideNavigation activeId="system-logs" />

            {/* Main Content */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto">
                <div className="flex flex-col items-start w-full max-w-[83.33vw] px-[2.08vw] py-[2.08vw]">
                    <SystemLogsView />
                </div>
            </main>
        </div>
    );
}
