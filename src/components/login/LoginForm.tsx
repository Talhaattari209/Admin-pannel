"use client"
import React, { useState } from 'react';
import Logo from './Logo';

interface LoginFormProps {
  onLogin: (data: any) => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('johndoe@email.com');
  const [password, setPassword] = useState('............');

  return (
    <div className="relative flex flex-col items-center p-[1.67vw] gap-[1.67vw] w-[25vw] min-w-[320px] max-w-[480px] bg-[#16003F]/50 border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.67vw] box-border shadow-2xl overflow-hidden">

      {/* Branding Section */}
      <div className="flex flex-col items-center gap-[0.83vw] w-full">
        <div className="w-[10.4vw] h-[10.4vw]">
          <Logo />
        </div>
        <h1 className="font-michroma text-[2.5vw] leading-[3.5vw] text-white text-center">Fennec</h1>
      </div>

      {/* Header Text */}
      <h2 className="font-['SF_Pro_Text'] font-medium text-[1.67vw] leading-[1.2] text-white text-center tracking-[-0.02em] w-full">
        Login to your account
      </h2>

      {/* Form Fields */}
      <div className="flex flex-col gap-[0.83vw] w-full">
        {/* Email Field */}
        <div className="flex flex-col items-start gap-[0.2vw] w-full border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.625vw] font-bold uppercase tracking-wider opacity-100 font-['SF_Pro_Text']">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-none text-white text-[0.83vw] font-['SF_Pro_Text'] focus:outline-none placeholder:text-white/40 font-normal leading-[1.25vw]"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col items-start gap-[0.2vw] w-full border-b border-white py-[0.42vw] relative">
          <label className="text-white text-[0.625vw] font-bold uppercase tracking-wider opacity-100 font-['SF_Pro_Text']">Password</label>
          <div className="flex items-center w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none text-white text-[0.83vw] font-['SF_Pro_Text'] focus:outline-none placeholder:text-white/40 font-normal leading-[1.25vw]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 text-white hover:opacity-100 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-[1.25vw] h-[1.25vw]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end w-full">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-white text-[0.625vw] font-bold font-['SF_Pro_Text'] hover:underline transition-all"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full mt-[0.5vw]">
        <button
          onClick={() => onLogin({ email, password })}
          className="w-full flex justify-center items-center bg-[#5F00DB] shadow-[0px_8px_12px_rgba(95,0,219,0.25),0px_-8px_12px_rgba(95,0,219,0.25)] rounded-[2.7vw] py-[0.83vw] px-[1.25vw] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <span className="font-['SF_Pro_Text'] font-medium text-[0.83vw] leading-[1.5] text-white text-center">
            Login
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
