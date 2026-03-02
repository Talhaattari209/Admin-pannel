import SideNavigation from '@/components/SideNavigation';
import { ReactNode } from 'react';

export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Persistent Sidebar — rendered ONCE, never remounts on navigation */}
            <SideNavigation />

            {/* Main content area — offset by sidebar width */}
            <main className="relative ml-[15.67vw] w-[84.33vw] h-screen overflow-y-auto scrollbar-hide">
                {children}
            </main>
        </div>
    );
}
