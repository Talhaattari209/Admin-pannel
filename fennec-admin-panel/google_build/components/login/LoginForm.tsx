import React, { useState } from 'react';
import Logo from './Logo';
import Button from '../shared/Button';

interface LoginFormProps {
  onLogin: (data: any) => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('johndoe@email.com');
  const [password, setPassword] = useState('............');

  return (
    <div className="relative flex flex-col items-center p-[2.5vw] gap-[2vw] w-[95vw] max-w-[480px] bg-[#16003F]/50 border border-[#666666]/50 backdrop-blur-[12px] rounded-[32px] box-border shadow-2xl overflow-hidden">
      <div className="flex flex-col items-center gap-[1.2vw] w-full">
        <Logo />
        <h1 className="font-michroma text-[48px] md:text-[3vw] text-white leading-tight">Fennec</h1>
      </div>

      <h2 className="text-[32px] md:text-[2vw] font-medium leading-tight tracking-[-0.02em] text-white text-center w-full">
        Login to your account
      </h2>

      <div className="flex flex-col gap-[1.5vw] w-full px-[0.5vw]">
        <div className="flex flex-col items-start gap-2 w-full border-b border-white py-[1.2vw]">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80 font-inter">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-none text-white text-[18px] focus:outline-none placeholder:text-white/40 font-inter"
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full border-b border-white py-[1.2vw] relative">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-80 font-inter">Password</label>
          <div className="flex items-center w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none text-white text-[18px] focus:outline-none placeholder:text-white/40 font-inter"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 text-white opacity-60 hover:opacity-100 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button 
            type="button"
            onClick={onForgotPassword}
            className="text-white text-[14px] font-bold hover:underline opacity-90 transition-all hover:opacity-100 font-inter"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      <div className="w-full px-[0.5vw] mt-[1vw] mb-[0.5vw]">
        <Button onClick={() => onLogin({ email, password })} className="w-full h-[52px] shadow-[0px_-8px_12px_rgba(95,0,219,0.25),0px_8px_12px_rgba(95,0,219,0.25)] text-[16px]">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;