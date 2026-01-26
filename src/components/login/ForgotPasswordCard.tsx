import React, { useState } from 'react';

interface ForgotPasswordCardProps {
  onSendLink: (email: string) => void;
  onBack: () => void;
}

const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({ onSendLink, onBack }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[25vw] min-w-[320px] max-w-[480px] bg-[#16003F]/50 border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.67vw]">

      {/* Icon Section */}
      <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] w-[6.25vw] h-[6.25vw] relative isolate rounded-[1.25vw]">
        {/* Glow */}
        <div className="absolute inset-[-3.125vw] bg-gradient-to-b from-[#5F00DB] via-[30%] to-transparent opacity-50 rounded-full blur-xl z-0" />

        {/* Icon BG */}
        <div className="absolute w-[6.25vw] h-[6.25vw] bg-white/5 backdrop-blur-[6px] rounded-full z-0" />

        {/* Lock Icon */}
        <svg viewBox="0 0 24 24" fill="none" className="w-[2.08vw] h-[2.92vw] relative z-10 text-white" stroke="currentColor" strokeWidth="2">
          <path d="M16 10V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V10M6 10H18C19.1046 10 20 10.8954 20 12V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V12C4 10.8954 4.89543 10 6 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="16" r="2" fill="white" />
        </svg>
      </div>

      {/* Header Text */}
      <div className="flex flex-col items-center gap-[0.83vw] w-full">
        <h2 className="font-['SF_Pro_Text'] font-medium text-[1.67vw] leading-[1.2] text-white text-center tracking-[-0.02em]">
          Forgot Password?
        </h2>
        <p className="font-['SF_Pro_Text'] font-normal text-[0.94vw] leading-[1.78] text-[#DDDDDD] text-center">
          Enter your email address and we’ll send you a link to reset your password.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-[0.83vw] w-full px-[0.2vw]">
        {/* Email Field */}
        <div className="flex flex-col items-start gap-[0.2vw] w-full">
          <label className="text-white text-[0.625vw] font-bold font-['SF_Pro_Text'] uppercase tracking-wider">Email</label>
          <div className="flex flex-col w-full border-b border-white py-[0.4vw]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-none text-white text-[0.83vw] font-['SF_Pro_Text'] focus:outline-none placeholder:text-white/40"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-[1.25vw] w-full mt-[0.5vw]">
        {/* Back Button - Assuming simple text or small arrow if needed, but CSS has 'Button-Desktop' */}
        {/* Wait, the CSS just has one main button group at the bottom `Actions`. But standard UX usually allows 'Back'. 
            The CSS shows 'Actions' with 'Button - Desktop'. It seems to be just one button.
            But user requirements are "when user click forget password Modal... when email is entered and send link is click...".
            I'll add a separate small 'Back to Login' text link below or a secondary button.
            Actually, let's keep it simple: One "Send Link" button.
        */}
        <button
          onClick={() => onSendLink(email)}
          className="w-full flex justify-center items-center bg-[#5F00DB] shadow-[0px_8px_12px_rgba(95,0,219,0.25)] rounded-[2.7vw] py-[0.83vw] px-[1.25vw] gap-[0.625vw] hover:brightness-110 transition-all active:scale-[0.98]"
        >
          <span className="font-['SF_Pro_Text'] font-medium text-[0.83vw] leading-[1.5] text-white text-center">
            Send Link
          </span>
        </button>
      </div>

      <button
        onClick={onBack}
        className="text-white/60 hover:text-white text-[0.7vw] font-medium font-['SF_Pro_Text'] transition-colors"
      >
        Back to Login
      </button>

    </div>
  );
};

export default ForgotPasswordCard;
