'use client';

import React from 'react';
import SideNavigation from '@/components/SideNavigation';
import AccountSettingsView from '@/components/account-settings/AccountSettingsView';

export default function AccountSettingsPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <SideNavigation activeId="account-settings" />

            {/* Main Content */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto">
                <div className="flex flex-col items-start w-full max-w-[83.33vw] px-[2.08vw] py-[2.08vw]">
                    <AccountSettingsView />
                </div>
            </main>
        </div>
    );
}
