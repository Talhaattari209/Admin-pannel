'use client';

import React, { useState } from 'react';
import SideNavigation from '@/components/SideNavigation';
import { UserProfileHeader } from '@/components/Headers';
import { ProfileOverview, ProfileInfoCard, ProfileTabs } from '@/components/ProfileComponents';
import { DeactivationCard, SuccessCard } from '@/components/PopCards';
import { useRouter } from 'next/navigation';

export default function UserProfilePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Overview");
    const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleDeactivate = () => {
        setIsDeactivateOpen(false);
        setTimeout(() => setIsSuccessOpen(true), 300);
    };

    return (
        <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-['SF_Pro_Text'] text-white">

            {/* 1. Background Layer */}
            <div
                className="fixed inset-0 z-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/8.png')` }}
            />

            {/* 2. Reusable Sidebar (fixed position) */}
            <SideNavigation activeId="users" />

            {/* 3. Main Content Container (positioned at left 320px/16.67vw) */}
            <main className="relative z-10 ml-[16.67vw] w-[83.33vw] h-screen overflow-y-auto">

                {/* Content Wrapper */}
                <div
                    className="flex flex-col items-start w-full max-w-[83.33vw]"
                    style={{
                        paddingLeft: '2.08vw',   // 40px from Nav (left) - Adjusted to fit content
                        paddingTop: '2.08vw',    // 40px Top
                        paddingBottom: '2.08vw', // 40px Bottom
                        paddingRight: '2.08vw'   // 40px Right
                    }}
                >

                    {/* Header Section */}
                    {/* Using UserProfileHeader from Headers.tsx. 
                        Note: UserProfileHeader includes a back button which we can wire up. 
                        It lays out strictly according to the design (Name, Age, Chips).
                    */}
                    <div className="mb-[1.67vw]">
                        <UserProfileHeader
                            name="M. Abubakar"
                            age={24}
                            avatarUrl="/8.png"
                            onBack={() => router.back()}
                            onDeactivate={() => setIsDeactivateOpen(true)}
                        />
                    </div>

                    {/* Tab Navigation */}
                    <div className="mb-0">
                        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* The Parallel Layout */}
                    <div className="flex flex-row gap-[1.67vw] w-[79.17vw] items-start">
                        {/* Dynamic Left Component: Changes Heading/Text/Content based on Tab */}
                        <ProfileOverview activeTab={activeTab} height="calc((100vh - 11.25vw - 58px) * 1.06)" />

                        {/* Static Right Component: Remains same for all tabs */}
                        <ProfileInfoCard />
                    </div>

                </div>

                <DeactivationCard
                    isOpen={isDeactivateOpen}
                    onClose={() => setIsDeactivateOpen(false)}
                    onConfirm={handleDeactivate}
                />

                <SuccessCard
                    isOpen={isSuccessOpen}
                    onClose={() => setIsSuccessOpen(false)}
                    title="User Deactivated"
                    description="The account has been successfully deactivated. You can reactivate it anytime from the user’s detail page."
                />
            </main>
        </div>
    );
}
