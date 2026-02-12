'use client';

import React from 'react';
import SideNavigation from '@/components/SideNavigation';
import PromptsTable from '@/components/app-content/PromptsTable';

export default function AppContentPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Side Navigation */}
            <SideNavigation activeId="app-content" />

            {/* Main Content Area */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto">
                <div
                    className="flex flex-col items-start w-full max-w-[83.33vw]"
                    style={{
                        paddingLeft: '2.08vw',   // 40px
                        paddingTop: '1.77vw',    // Adjusted Top
                        paddingBottom: '2.08vw', // 40px
                        paddingRight: '2.08vw'   // 40px
                    }}
                >
                    <PromptsTable />
                </div>
            </main>
        </div>
    );
}
