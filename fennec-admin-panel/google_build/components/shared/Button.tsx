import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const base = "flex flex-row items-center justify-center rounded-[52px] font-medium transition-all active:scale-95 font-inter";
  const variants = {
    primary: "bg-[#5F00DB] text-white shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110",
    outline: "border border-white text-white backdrop-blur-[6px] hover:bg-white/10",
    danger: "bg-[#FF4E4E] text-white shadow-[0px_4px_12px_rgba(255,78,78,0.25)] hover:brightness-110",
    ghost: "bg-white/5 text-white/40 hover:text-white backdrop-blur-sm"
  };
  const sizes = {
    sm: "px-4 py-2 text-[12px]",
    md: "px-6 py-3 text-[14px]",
    lg: "px-8 py-4 text-[16px]"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;