'use client';

import React from 'react';
import PromptsTable from '@/components/app-content/PromptsTable';

export default function AppContentPage() {
    return (
        <div
            className="flex flex-col items-start w-full max-w-[83.33vw]"
            style={{ paddingLeft: '2.08vw', paddingTop: '1.77vw', paddingBottom: '2.08vw', paddingRight: '2.08vw' }}
        >
            <PromptsTable />
        </div>
    );
}
