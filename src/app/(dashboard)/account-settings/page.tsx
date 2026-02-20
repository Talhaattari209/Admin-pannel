'use client';

import React from 'react';
import AccountSettingsView from '@/components/account-settings/AccountSettingsView';

export default function AccountSettingsPage() {
    return (
        <div className="flex flex-col items-start w-full max-w-[83.33vw] px-[2.08vw] py-[2.08vw]">
            <AccountSettingsView />
        </div>
    );
}
