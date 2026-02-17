
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions, className = "" }) => {
  return (
    <div className={`flex flex-row items-end justify-between w-full h-[80px] mb-10 shrink-0 animate-in fade-in slide-in-from-top-4 duration-700 ${className}`}>
      <div className="flex flex-col justify-center items-start gap-2">
        <h1 className="text-white text-[36px] font-bold tracking-tight font-michroma leading-[110%]">
          {title}
        </h1>
        <p className="text-[#CCCCCC] text-[16px] leading-[150%] font-['SF_Pro_Text'] opacity-60">
          {description}
        </p>
      </div>
      {actions && (
        <div className="flex flex-row items-center gap-4 h-[56px]">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
