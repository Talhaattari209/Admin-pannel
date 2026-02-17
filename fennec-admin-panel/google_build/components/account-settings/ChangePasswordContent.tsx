
import React, { useState } from 'react';
import PasswordInput from '../shared/PasswordInput';

interface ChangePasswordContentProps {
  onUpdate: () => void;
}

const ChangePasswordContent: React.FC<ChangePasswordContentProps> = ({ onUpdate }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  return (
    <div className="flex flex-col items-start gap-4 w-full h-full">
      <h3 className="text-white text-[28px] font-bold leading-[120%] tracking-[-0.04em] font-['SF_Pro_Text'] shrink-0">
        Change Password
      </h3>

      <div className="flex flex-col gap-3 w-full flex-grow">
        <PasswordInput 
          label="Current Password" 
          value={passwords.current}
          onChange={(val) => setPasswords(p => ({ ...p, current: val }))}
          autoComplete="current-password"
        />
        <PasswordInput 
          label="New Password" 
          value={passwords.new}
          onChange={(val) => setPasswords(p => ({ ...p, new: val }))}
        />
        <PasswordInput 
          label="Confirm New Password" 
          value={passwords.confirm}
          onChange={(val) => setPasswords(p => ({ ...p, confirm: val }))}
        />
      </div>

      <div className="flex flex-row items-center gap-4 mt-2 shrink-0">
        <button 
          onClick={onUpdate}
          className="flex items-center justify-center px-8 py-3 min-w-[188px] h-[56px] bg-[#5F00DB] rounded-[52px] text-white text-[16px] font-medium leading-[24px] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all font-['SF_Pro_Text']"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordContent;
