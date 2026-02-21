
import React from 'react';

interface PopCardWrapperProps {
    children: React.ReactNode;
    className?: string; // Additional classes for the implementation
    onClose?: () => void;
}

const PopCardWrapper: React.FC<PopCardWrapperProps> = ({ children, className, onClose }) => {
    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${className || ''}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[4px] transition-opacity cursor-pointer"
                onClick={onClose}
            />

            {/* Content Display Area (z-10 ensures it sits above the backdrop) */}
            <div
                className="relative z-10 flex items-center justify-center animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default PopCardWrapper;
