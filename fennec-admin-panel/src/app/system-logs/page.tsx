'use client';

import React from 'react';
import SideNavigation from '@/components/SideNavigation';
import SystemLogsView from '@/components/system-logs/SystemLogsView';

export default function SystemLogsPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <SideNavigation activeId="system-logs" />

            {/* Main Content */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex flex-col items-start w-full max-w-[83.33vw] px-[2.08vw] py-[2.08vw]">
                    <SystemLogsView />
                </div>
            </main>
        </div>
    );
}
