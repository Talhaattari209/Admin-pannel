import React, { useState } from 'react';
import PasswordInput from '../shared/PasswordInput';
import { useChangePassword } from '@/services/team-members';

interface ChangePasswordContentProps {
    onSuccess: () => void;
}

const ChangePasswordContent: React.FC<ChangePasswordContentProps> = ({ onSuccess }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changePasswordMutation = useChangePassword();

    const handleUpdate = () => {
        if (newPassword !== confirmPassword) {
            return;
        }
        changePasswordMutation.mutate(
            { currentPassword, newPassword },
            { onSuccess: () => onSuccess() }
        );
    };

    const passwordsMatch = newPassword === confirmPassword;
    const canSubmit = currentPassword.trim() && newPassword.trim() && confirmPassword.trim() && passwordsMatch;

    return (
        <div className="flex flex-col items-start p-[1.67vw] gap-[1.67vw] w-[39.17vw] min-h-[19.69vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] box-border ">

            <h3 className="w-[35.83vw] h-[1.77vw] font-bold not-italic text-[1.46vw] leading-[1.77vw] flex items-center tracking-[-0.04em] text-white">
                Change Password
            </h3>

            <div className="flex flex-col gap-[1.67vw] w-full">
                <PasswordInput
                    label="Current Password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                />
                <PasswordInput
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                />
                <PasswordInput
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
                {confirmPassword && !passwordsMatch && (
                    <p className="text-red-400 text-[0.73vw]">Passwords do not match.</p>
                )}
            </div>

            {changePasswordMutation.isError && (
                <p className="text-red-400 text-[0.73vw] w-full">
                    {(changePasswordMutation.error?.response?.data as any)?.message || (changePasswordMutation.error?.response?.data as any)?.detail || changePasswordMutation.error?.message || 'Failed to change password.'}
                </p>
            )}

            <div className="flex flex-row items-center p-0 gap-[0.83vw] w-full h-[2.92vw] mt-[0.83vw]">
                <button
                    onClick={handleUpdate}
                    disabled={!canSubmit || changePasswordMutation.isPending}
                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-auto h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="font-medium not-italic text-[0.83vw] leading-[1.25vw] text-center text-white">Update Password</span>
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordContent;
