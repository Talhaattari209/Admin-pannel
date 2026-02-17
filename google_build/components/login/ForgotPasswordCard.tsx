
import React, { useState } from 'react';
import BaseCard from '../BaseCard';

interface ForgotPasswordCardProps {
  onCancel: () => void;
  onSendLink: (email: string) => void;
}

const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({ onCancel, onSendLink }) => {
  const [email, setEmail] = useState('johndoe@email.com');

  const icon = (
    <div className="w-[40px] h-[56px] flex items-center justify-center">
      <svg viewBox="0 0 40 56" className="w-full h-full text-white" fill="none">
        <path d="M10 21V12.5C10 7.2533 14.4772 3 20 3C25.5228 3 30 7.2533 30 12.5V21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <rect x="2" y="21" width="36" height="32" rx="4" fill="white" />
        <path d="M20 45C23.3137 45 26 42.3137 26 39C26 35.6863 23.3137 33 20 33C16.6863 33 14 35.6863 14 39C14 40.5 14.5 41.8 15.5 43" stroke="#16003F" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 43L15.5 44.5L17 43" stroke="#16003F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const actions = (
    <button
      onClick={() => onSendLink(email)}
      className="flex-1 h-[56px] bg-[#5F00DB] shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)] rounded-[52px] transition-all hover:brightness-110 active:scale-95 text-white text-[16px] font-medium leading-[24px]"
    >
      Send Link
    </button>
  );

  return (
    <BaseCard
      icon={icon}
      title="Forgot Password?"
      description="Enter your email address and we’ll send you a link to reset your password."
      actions={actions}
      minHeight="534px"
    >
      <div className="flex flex-col items-start gap-1 w-full border-b border-white py-2">
        <label className="text-white text-[12px] font-bold uppercase tracking-wider">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-none text-white text-[16px] focus:outline-none placeholder:text-white/40"
          placeholder="yourname@email.com"
        />
      </div>
    </BaseCard>
  );
};

export default ForgotPasswordCard;
