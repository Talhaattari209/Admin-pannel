import React, { useState } from 'react';
import { Edit3, Lock, ChevronRight } from 'lucide-react';
import { PageHeader } from '../Headers'; // Adjusted import
import EditProfileContent from './EditProfileContent';
import ChangePasswordContent from './ChangePasswordContent';
import SuccessModal from './SuccessModal';

// --- SidebarItem Component ---
interface SidebarItemProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, isActive, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`relative flex flex-row items-center p-[0.83vw] gap-[0.83vw] w-[19.17vw] h-[2.92vw] transition-all duration-300 group
        ${isActive
                    ? 'bg-gradient-to-r from-[#5F00DB] to-transparent'
                    : 'bg-transparent hover:bg-white/5'
                }
      `}
        >
            {/* Active Indicator Line */}
            {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[0.16vw] bg-[#5F00DB] shadow-[2px_0_8px_rgba(95,0,219,0.5)]" />
            )}

            {/* Icon */}
            <div className={`flex items-center justify-center w-[1.25vw] h-[1.25vw] text-white`}>
                {icon}
            </div>

            {/* Label */}
            <span className={` font-normal not-italic text-[0.83vw] leading-[1.25vw] text-left flex-grow text-white`}>
                {label}
            </span>

            {/* Chevron */}
            <ChevronRight className="w-[0.83vw] h-[0.83vw] text-white" />
        </button>
    );
};


// --- Main View ---

type SettingsTab = 'edit-profile' | 'change-password';

const AccountSettingsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('edit-profile');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successTitle, setSuccessTitle] = useState('');
    const [successDesc, setSuccessDesc] = useState('');

    const handleSuccess = (type: SettingsTab) => {
        if (type === 'edit-profile') {
            setSuccessTitle('Profile Updated');
            setSuccessDesc('Your admin profile details have been successfully updated.');
        } else {
            setSuccessTitle('Password Updated');
            setSuccessDesc('Your password has been successfully updated. You can now use the new password to login.');
        }
        setShowSuccess(true);
    };

    return (
        <div className="flex flex-col items-start gap-[2.5vw] w-full">

            {/* Page Header */}
            <PageHeader
                title="Account Settings"
                description="Update your admin profile, change password, and configure personal preferences."
            />

            {/* Content Area */}
            <div className="flex flex-row flex-wrap items-start p-0 gap-[0.83vw] w-full">

                {/* Left Column: Navigation Sidebar */}
                <div className="flex flex-col items-start py-[0.83vw] px-0 gap-[1.67vw] w-[19.17vw] h-[7.5vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw]">
                    <div className="flex flex-col p-0 w-full gap-[0.2vw]">
                        <SidebarItem
                            label="Edit Profile"
                            isActive={activeTab === 'edit-profile'}
                            onClick={() => setActiveTab('edit-profile')}
                            icon={<Edit3 className="w-[1.25vw] h-[1.25vw]" />}
                        />

                        <SidebarItem
                            label="Change Password"
                            isActive={activeTab === 'change-password'}
                            onClick={() => setActiveTab('change-password')}
                            icon={<Lock className="w-[1.25vw] h-[1.25vw]" />}
                        />
                    </div>
                </div>

                {/* Right Column: Content Workspace */}
                <div className="flex-grow">
                    {activeTab === 'edit-profile' && (
                        <EditProfileContent onSuccess={() => handleSuccess('edit-profile')} />
                    )}
                    {activeTab === 'change-password' && (
                        <ChangePasswordContent onSuccess={() => handleSuccess('change-password')} />
                    )}
                </div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title={successTitle}
                description={successDesc}
            />

        </div>
    );
};

export default AccountSettingsView;
