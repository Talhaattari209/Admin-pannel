'use client';

import React, { useState, Suspense } from 'react';
import { UserProfileHeader } from '@/components/Headers';
import { ProfileOverview, ProfileInfoCard, ProfileTabs } from '@/components/ProfileComponents';
import { DeactivationCard, SuccessCard } from '@/components/PopCards';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { canDeleteModule } from '@/utils/permissions';
import { useUser, useDeactivateUser } from '@/services/users';

function UserProfilePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('id') || '';

    const [activeTab, setActiveTab] = useState("Overview");
    const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);
    const canDeactivate = isSuperAdmin || canDeleteModule(permissions, 'users management');

    const { data: user, isLoading } = useUser(userId);
    const deactivateUserMutation = useDeactivateUser();

    const handleDeactivate = () => {
        if (!userId) return;
        deactivateUserMutation.mutate(userId, {
            onSuccess: () => {
                setIsDeactivateOpen(false);
                setTimeout(() => setIsSuccessOpen(true), 300);
            },
        });
    };

    const userName = user ? `${user.first_name} ${user.last_name}` : 'Loading...';
    const userAge = user?.dob ? Math.floor((Date.now() - new Date(user.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : undefined;

    return (
        <div className="flex flex-col items-start w-full max-w-[83.33vw]"
            style={{ paddingLeft: '2.08vw', paddingTop: '2.08vw', paddingBottom: '2.08vw', paddingRight: '2.08vw' }}
        >
            <div className="mb-[1.67vw] w-[79.17vw]">
                <UserProfileHeader
                    name={userName}
                    age={userAge}
                    avatarUrl={user?.bestShorts?.[0] || '/8.png'}
                    sex={user?.sexualOrientation?.join(', ') || ''}
                    religion=""
                    location=""
                    distance=""
                    university={user?.education || ''}
                    occupation={user?.jobTitle || ''}
                    onBack={() => router.back()}
                    action={
                        canDeactivate ? (
                            <button
                                onClick={() => setIsDeactivateOpen(true)}
                                className="box-border flex flex-row justify-center items-center px-[1.06vw] py-[0.71vw] gap-[0.53vw] h-[2.47vw] border-[0.05vw] border-white backdrop-blur-[6px] rounded-[2.7vw] hover:bg-white/10 transition-all flex-none filter drop-shadow-[0px_12px_40px_rgba(0,0,0,0.05)] cursor-pointer"
                            >
                                <span className="font-medium not-italic text-[0.71vw] leading-[1.06vw] text-white text-center flex items-end">
                                    Deactivate User
                                </span>
                            </button>
                        ) : undefined
                    }
                />
            </div>

            <div className="mb-0">
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="flex flex-row gap-[1.67vw] w-[79.17vw] items-start">
                <ProfileOverview activeTab={activeTab} height="calc((100vh - 11.25vw - 58px) * 1.13)" user={user} />
                <ProfileInfoCard user={user} />
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
                description="The account has been successfully deactivated. You can reactivate it anytime from the user's detail page."
            />
        </div>
    );
}

export default function UserProfilePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full text-white/50">Loading...</div>}>
            <UserProfilePageContent />
        </Suspense>
    );
}
