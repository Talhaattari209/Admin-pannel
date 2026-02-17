'use client';

import React from 'react';
import SideNavigation from '@/components/SideNavigation';
import AppSettingsView from '@/components/app-settings/AppSettingsView';

export default function AppSettingsPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <SideNavigation activeId="app-settings" />

            {/* Main Content */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-hidden">
                <div className="w-full h-full px-[2.08vw] pt-[1.77vw] pb-[2.08vw] overflow-y-auto scrollbar-hide">
                    <AppSettingsView />
                </div>
            </main>
        </div>
    );
}
