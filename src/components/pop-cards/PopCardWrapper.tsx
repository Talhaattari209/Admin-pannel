
import React from 'react';

interface PopCardWrapperProps {
    children: React.ReactNode;
    className?: string; // Additional classes for the implementation
}

const PopCardWrapper: React.FC<PopCardWrapperProps> = ({ children, className }) => {
    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${className || ''}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px] transition-opacity" />

            {/* Content Display Area (z-10 ensures it sits above the backdrop) */}
            <div className="relative z-10 flex items-center justify-center animate-slide-up">
                {children}
            </div>
        </div>
    );
};

export default PopCardWrapper;
