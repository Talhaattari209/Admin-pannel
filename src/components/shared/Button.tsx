import React from 'react';

/**
 * Button Variants based on provided CSS:
 * 1. 'filled': Matches color_button_css.txt (Text + Color)
 *    - Background: #5F00DB
 *    - Shadow: 0px 4px 12px rgba(95, 0, 219, 0.25)
 *    - Border Radius: 52px (approx 2.71vw)
 *    - Text: White
 * 
 * 2. 'glass': Matches buttn_with_icon_css.txt (Text + Icon / Only Text)
 *    - Border: 1px solid #FFFFFF
 *    - Filter: drop-shadow(0px 12px 40px rgba(0, 0, 0, 0.05))
 *    - Backdrop filter: blur(6px)
 *    - Border Radius: 52px (approx 2.71vw)
 *    - Text: White
 */

export type ButtonVariant = 'filled' | 'glass';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    className?: string; // Critical for maintaining existing dimensions
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'glass',
    iconLeft,
    iconRight,
    className = '',
    children,
    ...props
}) => {
    // Base styles common to all buttons
    // Padding: 16px 24px -> 0.83vw 1.25vw (approx)
    // Gap: 12px -> 0.63vw
    const baseStyles = "flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] transition-all duration-200  font-medium not-italic text-[0.83vw] leading-[1.25vw] disabled:opacity-50 disabled:cursor-not-allowed";

    // Variant specific styles
    const variants = {
        filled: "bg-[#5F00DB] text-white shadow-[0px_0.21vw_0.63vw_rgba(95,0,219,0.25)] rounded-[2.71vw] hover:bg-[#4a00aa]",
        glass: "border border-white/100 text-white backdrop-blur-[6px] shadow-[0px_0.63vw_2.08vw_rgba(0,0,0,0.05)] rounded-[2.71vw] hover:bg-white/10"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {iconLeft && <span className="flex-none">{iconLeft}</span>}
            {children}
            {iconRight && <span className="flex-none">{iconRight}</span>}
        </button>
    );
};
