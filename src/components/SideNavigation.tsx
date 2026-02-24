'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    Home,
    Users,
    FileText,
    MessageSquare,
    HelpCircle,
    Smartphone,
    UserCog,
    Clock,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { useAuthStore } from '@/store/auth-store';
import { canViewModule } from '@/utils/permissions';
import { useAdmin } from '@/services/auth';

type SideNavItem = {
    id: string;
    label: string;
    icon: string;
    hasChevron?: boolean;
};

type SideNavSection = {
    title?: string;
    items: SideNavItem[];
};

// Derive the activeId from the pathname automatically
function getActiveId(pathname: string): string {
    if (pathname.startsWith('/users')) return 'users';
    if (pathname.startsWith('/app-content')) return 'app-content';
    if (pathname.startsWith('/team-roles')) return 'team-roles';
    if (pathname.startsWith('/system-logs')) return 'system-logs';
    if (pathname.startsWith('/settings')) return 'app-settings';
    if (pathname.startsWith('/support')) return 'support-requests';
    if (pathname.startsWith('/reported-problems')) return 'reported-problems';
    if (pathname.startsWith('/account-settings')) return 'account-settings';
    if (pathname.startsWith('/dashboard')) return 'dashboard';
    return '';
}

// Mapping of sidebar item IDs to permission module names
// IMPORTANT: Module names must match backend validation exactly (all lowercase)
const MODULE_MAP: Record<string, string> = {
    'dashboard': 'dashboard',
    'users': 'users management',
    'app-content': 'app content',
    'support-requests': 'support requests',
    'reported-problems': 'reported problems',
    'app-settings': 'app settings',
    'team-roles': 'teams & roles',  // Note: plural 'teams'
    'system-logs': 'system logs',
    'account-settings': 'account settings',  // Note: plural 'settings'
};

const sections: SideNavSection[] = [
    {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: '/assets/Icons_figma/home.svg', hasChevron: true },
            { id: 'users', label: 'Users Management', icon: '/assets/Icons_figma/users.svg', hasChevron: true },
        ]
    },
    {
        title: 'CONTENT MANAGEMENT',
        items: [
            { id: 'app-content', label: 'App Content', icon: '/assets/Icons_figma/file-text.svg', hasChevron: true },
        ]
    },
    {
        title: 'SUPPORT & REPORTS',
        items: [
            { id: 'support-requests', label: 'Support Requests', icon: '/assets/Icons_figma/message-square.svg', hasChevron: true },
            { id: 'reported-problems', label: 'Reported Problems', icon: '/assets/Icons_figma/help-circle.svg', hasChevron: true },
        ]
    },
    {
        title: 'SETTINGS & ADMIN',
        items: [
            { id: 'app-settings', label: 'App Settings', icon: '/assets/Icons_figma/smartphone.svg', hasChevron: true },
            { id: 'team-roles', label: 'Team & Roles', icon: '/assets/Icons_figma/users.svg', hasChevron: true },
            { id: 'system-logs', label: 'System Logs', icon: '/assets/Icons_figma/clock.svg', hasChevron: true },
            { id: 'account-settings', label: 'Account Settings', icon: '/assets/Icons_figma/settings.svg', hasChevron: true },
        ]
    }
];

export default function SideNavigation() {
    // Sync current admin data in background
    useAdmin();

    const router = useRouter();
    const pathname = usePathname();
    const activeId = getActiveId(pathname);
    const user = useAuthStore((state) => state.user);
    const permissions = useAuthStore((state) => state.permissions);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    // Super Admin sees all. Fallback: no teamMember permissions = Super Admin; or authenticated with no user yet (rehydration).
    const isSuperAdmin = !!(
        user?.isSuperAdmin === true ||
        (user && (!permissions || permissions.length === 0)) ||
        (isAuthenticated && (!permissions || permissions.length === 0))
    );

    // Filter items based on permissions
    const filterItemsByPermissions = (items: SideNavItem[]): SideNavItem[] => {
        if (isSuperAdmin) return items;

        // Filter items based on view permission
        return items.filter(item => {
            const moduleName = MODULE_MAP[item.id];
            return moduleName && canViewModule(permissions, moduleName);
        });
    };

    // Filter sections and remove empty sections
    const filteredSections = sections
        .map(section => ({
            ...section,
            items: filterItemsByPermissions(section.items)
        }))
        .filter(section => section.items.length > 0);

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <aside className="fixed left-[0.83vw] top-[1.66vh] bottom-[1.66vh] w-[15vw] flex flex-col bg-transparent z-[40] ">
            {/* Side Menu Container */}
            <div className="flex flex-col w-full h-full bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[1.25vw] overflow-hidden">

                {/* Logo Container - Decreased height to increase bottom gap (10% adjustment) */}
                <div className="flex flex-col justify-center items-start px-[2vw] w-full h-[10.5vh] shrink-0 gap-[0.84vh]">
                    <div className="flex flex-row items-center gap-[0.65vw] ">
                        {/* Logo Image */}
                        <div className="w-[2.6vw] h-[5.2vh] flex-none order-0 grow-0 shrink-0 relative">
                            <Image
                                src="/assets/fennec_logo.png"
                                alt="Fennec Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Fennec Text */}
                        <span className="font-['Michroma'] font-normal not-italic text-[2.8vh] leading-[4.2vh] text-[#EEEEEE]">
                            Fennec
                        </span>
                    </div>
                </div>

                {/* Menu Area - Takes available space */}
                <div className="flex flex-col w-full flex-grow overflow-hidden">
                    {filteredSections.map((section, idx) => (
                        <div key={idx} className="flex flex-col w-full shrink-0">
                            {/* Section Heading - Decreased height and text size */}
                            {section.title && (
                                <div className="flex items-center px-[0.83vw] w-full h-[4.3vh] shrink-0">
                                    <span className=" font-medium not-italic text-[1.3vh] leading-[1.64vh] uppercase text-white opacity-50">
                                        {section.title}
                                    </span>
                                </div>
                            )}

                            {/* Menu Items */}
                            <div className="flex flex-col">
                                {section.items.map((item) => {
                                    const isActive = activeId === item.id;
                                    const getPath = (id: string) => {
                                        switch (id) {
                                            case 'dashboard': return '/dashboard';
                                            case 'users': return '/users';
                                            case 'app-content': return '/app-content';
                                            case 'support-requests': return '/support';
                                            case 'reported-problems': return '/reported-problems';
                                            case 'app-settings': return '/settings';
                                            case 'team-roles': return '/team-roles';
                                            case 'system-logs': return '/system-logs';
                                            case 'account-settings': return '/account-settings';
                                            default: return '#';
                                        }
                                    };

                                    return (
                                        <Link
                                            key={item.id}
                                            href={getPath(item.id)}
                                            className={cn(
                                                // Updated height to 4.9vh
                                                "flex flex-row items-center px-[0.83vw] gap-[0.65vw] w-full h-[4.9vh] transition-all shrink-0",
                                                isActive
                                                    ? "bg-gradient-to-r from-[#5F00DB] to-[rgba(22,0,63,0)] text-white"
                                                    : "bg-transparent text-[#FFFFFF] hover:bg-gradient-to-r hover:from-[#5F00DB]/40 hover:to-[rgba(22,0,63,0)]"
                                            )}
                                        >
                                            {/* Icon - Decreased size */}
                                            <div className="relative shrink-0 w-[1.05vw] h-[2.1vh]">
                                                <Image
                                                    src={item.icon}
                                                    alt={item.label}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>

                                            {/* Label - Decreased size */}
                                            <span className="flex-grow text-left  font-normal not-italic text-[1.5vh] leading-[2.2vh]">
                                                {item.label}
                                            </span>

                                            {/* Chevron - Decreased size */}
                                            {item.hasChevron && (
                                                <ChevronRight
                                                    className={cn("opacity-50 w-[0.75vw] h-[1.5vh]", isActive && "opacity-100")}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Div (Logout) - Adjusted height */}
                <div className="w-full h-[16vh] shrink-0 flex flex-col justify-end pb-[1.66vh]">
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "flex flex-row items-center px-[0.83vw] gap-[0.65vw] w-full h-[4.9vh] transition-all text-[#FFFFFF] hover:bg-gradient-to-r hover:from-[#5F00DB]/40 hover:to-[rgba(22,0,63,0)] cursor-pointer"
                        )}
                    >
                        <div className="relative w-[1.05vw] h-[2.1vh]">
                            <Image
                                src="/assets/Icons_figma/log-out.svg"
                                alt="Logout"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="flex-grow text-left  font-normal not-italic text-[1.5vh] leading-[2.2vh]">
                            Logout
                        </span>
                        <ChevronRight className="opacity-50 w-[0.75vw] h-[1.5vh]" />
                    </button>
                </div>

            </div>
        </aside>
    );
}
