'use client';

import React from 'react';
import AppSettingsView from '@/components/app-settings/AppSettingsView';

export default function AppSettingsPage() {
    return (
        <div className="w-full h-full px-[2.08vw] pt-[1.77vw] pb-[2.08vw] overflow-y-auto scrollbar-hide">
            <AppSettingsView />
        </div>
    );
}
