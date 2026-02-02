'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

interface SideNavigationProps {
    activeId?: string;
}

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

export default function SideNavigation({ activeId = 'user-management' }: SideNavigationProps) {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <aside className="fixed left-[0.83vw] top-[0.83vw] bottom-[0.83vw] w-[15vw] flex flex-col bg-transparent z-50 font-['SF_Pro_Text']">
            {/* Side Menu Container */}
            <div className="flex flex-col w-full h-full bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[1.25vw] overflow-hidden">

                {/* Logo Container - Reduced height */}
                <div className="flex flex-col justify-center items-start px-[1.25vw] w-full h-[5.5vw] shrink-0">
                    <div className="flex items-center gap-[0.83vw]">
                        {/* Vector Placeholder for Logo Icon */}
                        <div className="w-[3.13vw] h-[3.13vw] bg-[#EEEEEE] rounded-sm flex items-center justify-center shrink-0">
                            {/* You would place the actual logo SVG here */}
                            <div className="grid grid-cols-3 gap-[0.21vw] p-[0.63vw]">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className={`w-[0.31vw] h-[0.31vw] rounded-full ${i === 4 ? 'bg-transparent' : 'bg-[#222222]'}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* Fennec Text */}
                        <span className="font-['Michroma'] font-normal text-[1.67vw] leading-[2.40vw] text-[#EEEEEE]">
                            Fennec
                        </span>
                    </div>
                </div>

                {/* Menu Area - Takes available space */}
                <div className="flex flex-col w-full flex-grow overflow-hidden">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col w-full shrink-0">
                            {/* Section Heading - Reduced height */}
                            {section.title && (
                                <div className="flex items-center px-[0.83vw] w-full h-[2.2vw] shrink-0">
                                    <span className="font-['SF_Pro_Text'] font-medium text-[0.73vw] leading-[0.89vw] uppercase text-white opacity-50">
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
                                                "flex flex-row items-center px-[0.83vw] gap-[0.83vw] w-full h-[2.5vw] transition-all shrink-0",
                                                isActive
                                                    ? "bg-gradient-to-r from-[#5F00DB] to-[rgba(22,0,63,0)] text-white"
                                                    : "bg-transparent text-[#FFFFFF] hover:bg-white/5"
                                            )}
                                        >
                                            {/* Icon */}
                                            <div className="relative shrink-0 w-[1.25vw] h-[1.25vw]">
                                                <Image
                                                    src={item.icon}
                                                    alt={item.label}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>

                                            {/* Label */}
                                            <span className="flex-grow text-left font-['SF_Pro_Text'] font-normal text-[0.83vw] leading-[1.25vw]">
                                                {item.label}
                                            </span>

                                            {/* Chevron */}
                                            {item.hasChevron && (
                                                <ChevronRight
                                                    className={cn("opacity-50 w-[0.83vw] h-[0.83vw]", isActive && "opacity-100")}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Div (Logout) - Reduced height further to show last item */}
                <div className="w-full h-[8vw] shrink-0 flex flex-col justify-end pb-[0.83vw]">
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "flex flex-row items-center px-[0.83vw] gap-[0.83vw] w-full h-[2.5vw] transition-all text-[#FFFFFF] hover:bg-white/5"
                        )}
                    >
                        <div className="relative w-[1.25vw] h-[1.25vw]">
                            <Image
                                src="/assets/Icons_figma/log-out.svg"
                                alt="Logout"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="flex-grow text-left font-['SF_Pro_Text'] font-normal text-[0.83vw] leading-[1.25vw]">
                            Logout
                        </span>
                        <ChevronRight className="opacity-50 w-[0.83vw] h-[0.83vw]" />
                    </button>
                </div>

            </div>
        </aside>
    );
}
