'use client';

import React from 'react';
import SystemLogsView from '@/components/system-logs/SystemLogsView';

export default function SystemLogsPage() {
    return (
        <div className="flex flex-col items-start w-full max-w-[83.33vw] px-[2.08vw] py-[2.08vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <SystemLogsView />
        </div>
    );
}
