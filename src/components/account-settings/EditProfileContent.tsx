import React, { useState, useEffect } from 'react';
import { useTeamMemberMe, useUpdateTeamMemberMe } from '@/services/team-members';
import { useAuthStore } from '@/store/auth-store';

interface EditProfileContentProps {
    onSuccess: () => void;
}

const EditProfileContent: React.FC<EditProfileContentProps> = ({ onSuccess }) => {
    const updateUser = useAuthStore((state) => state.updateUser);

    const { data: profile, isLoading, isError, error, refetch } = useTeamMemberMe();
    const updateMutation = useUpdateTeamMemberMe();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (profile) {
            setName(profile.name ?? '');
            setEmail(profile.email ?? '');
        }
    }, [profile]);

    const handleSave = () => {
        updateMutation.mutate(
            { name: name.trim(), email: email.trim() },
            {
                onSuccess: (updated) => {
                    updateUser({ name: updated.name, email: updated.email });
                    onSuccess();
                },
            }
        );
    };

    const handleDiscard = () => {
        if (profile) {
            setName(profile.name ?? '');
            setEmail(profile.email ?? '');
        } else {
            refetch();
        }
    };

    if (isLoading && !profile) {
        return (
            <div className="flex flex-col items-start p-[1.67vw] gap-[1.67vw] w-[39.17vw] min-h-[19.69vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw]">
                <h3 className="text-white text-[1.46vw] font-bold">Edit Profile</h3>
                <div className="h-[2.5vw] bg-white/10 rounded animate-pulse w-full" />
                <div className="h-[2.5vw] bg-white/10 rounded animate-pulse w-full" />
            </div>
        );
    }

    if (isError && !profile) {
        return (
            <div className="flex flex-col items-start p-[1.67vw] gap-[1.67vw] w-[39.17vw] min-h-[19.69vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw]">
                <h3 className="text-white text-[1.46vw] font-bold">Edit Profile</h3>
                <p className="text-red-400 text-[0.83vw]">{error?.response?.data?.message || error?.message || 'Failed to load profile.'}</p>
                <button onClick={() => refetch()} className="text-[#5F00DB] text-[0.83vw] underline">Retry</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start p-[1.67vw] gap-[1.67vw] w-[39.17vw] min-h-[19.69vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] box-border ">

            <h3 className="w-[35.83vw] h-[1.77vw] font-bold not-italic text-[1.46vw] leading-[1.77vw] flex items-center tracking-[-0.04em] text-white">
                Edit Profile
            </h3>

            <div className="flex flex-col gap-[1.67vw] w-full">
                <div className="flex flex-col items-start p-0 w-[35.83vw]">
                    <div className="flex flex-row items-start gap-[0.21vw] w-full h-[0.83vw]">
                        <span className="font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">Name</span>
                    </div>
                    <div className="flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-full h-[2.5vw] border-b border-white">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-[1.25vw] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white bg-transparent border-none outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start p-0 w-[35.83vw]">
                    <div className="flex flex-row items-start gap-[0.21vw] w-full h-[0.83vw]">
                        <span className="font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">Email</span>
                    </div>
                    <div className="flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-full h-[2.5vw] border-b border-white">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-[1.25vw] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white bg-transparent border-none outline-none"
                        />
                    </div>
                </div>
            </div>

            {updateMutation.isError && (
                <p className="text-red-400 text-[0.73vw] w-full">
                    {updateMutation.error?.response?.data?.message || updateMutation.error?.message || 'Failed to update profile.'}
                </p>
            )}

            <div className="flex flex-row items-center p-0 gap-[0.83vw] w-full h-[2.92vw] mt-[0.83vw]">
                <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-[8.23vw] h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors disabled:opacity-50"
                >
                    <span className="font-medium not-italic text-[0.83vw] leading-[1.25vw] text-center text-white">Save Changes</span>
                </button>
                <button
                    onClick={handleDiscard}
                    disabled={updateMutation.isPending}
                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-[9.375vw] h-[2.92vw] border border-white backdrop-blur-[6px] drop-shadow-[0px_12px_40px_rgba(0,0,0,0.05)] rounded-[2.71vw] hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                    <span className="font-medium not-italic text-[0.83vw] leading-[1.25vw] text-center text-white">Discard Changes</span>
                </button>
            </div>
        </div>
    );
};

export default EditProfileContent;
