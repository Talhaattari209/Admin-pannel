'use client';

import React from 'react';
import SideNavigation from '@/components/SideNavigation';
import AppSettingsView from '@/components/app-settings/AppSettingsView';

export default function AppSettingsPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-['SF_Pro_Text'] text-white">
            {/* Background Layer */}
            <div
                className="fixed inset-0 z-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/8.png')` }}
            />

            {/* Sidebar */}
            <SideNavigation activeId="app-settings" />

            {/* Main Content */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-hidden">
                <div className="w-full h-full px-[2.08vw] pt-[1.77vw] pb-[2.08vw] overflow-y-auto">
                    <AppSettingsView />
                </div>
            </main>
        </div>
    );
}
