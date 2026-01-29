import React, { useState } from 'react';
import PasswordInput from '../shared/PasswordInput';

interface ChangePasswordContentProps {
    onSuccess: () => void;
}

const ChangePasswordContent: React.FC<ChangePasswordContentProps> = ({ onSuccess }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdate = () => {
        // Basic validation
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Simulate API call
        setTimeout(() => {
            onSuccess();
        }, 500);
    };

    return (
        <div className="flex flex-col items-start p-[1.67vw] gap-[1.67vw] w-[39.17vw] min-h-[19.69vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] box-border font-['SF_Pro_Text']">

            {/* Heading */}
            <h3 className="w-[35.83vw] h-[1.77vw] font-bold text-[1.46vw] leading-[1.77vw] flex items-center tracking-[-0.04em] text-white">
                Change Password
            </h3>

            {/* Inputs Grid */}
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
            </div>

            {/* Button */}
            <div className="flex flex-row items-center p-0 gap-[0.83vw] w-full h-[2.92vw] mt-[0.83vw]">
                <button
                    onClick={handleUpdate}
                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-auto h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors"
                >
                    <span className="font-medium text-[0.83vw] leading-[1.25vw] text-center text-white">Update Password</span>
                </button>
            </div>

        </div>
    );
};

export default ChangePasswordContent;
