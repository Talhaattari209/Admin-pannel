import React from 'react';
import { ArrowLeft, MapPin, Navigation, GraduationCap, Briefcase, Check, Download } from 'lucide-react';

// --- Shared Utility Components ---

// Button styles derived from CSS
const PrimaryButton = ({ label, onClick, icon }: { label: string; onClick?: () => void; icon?: React.ReactNode }) => (
    <button
        onClick={onClick}
        className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.625vw] h-[2.91vw] bg-[#5F00DB] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] rounded-[2.7vw] hover:bg-[#4a00aa] transition-all flex-none"
    >
        <span className=" font-medium not-italic text-[0.83vw] leading-[1.25vw] text-white text-center flex items-end">
            {label}
        </span>
        {icon && <span className="text-white w-[1.25vw] h-[1.25vw] flex items-center justify-center">{icon}</span>}
    </button>
);

const SecondaryButton = ({ label, onClick, icon }: { label: string; onClick?: () => void; icon?: React.ReactNode }) => (
    <button
        onClick={onClick}
        className="box-border flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.625vw] h-[2.91vw] border-[0.05vw] border-white backdrop-blur-[6px] rounded-[2.7vw] hover:bg-white/10 transition-all flex-none filter drop-shadow-[0px_12px_40px_rgba(0,0,0,0.05)]"
    >
        {icon && <span className="text-white w-[1.25vw] h-[1.25vw] flex items-center justify-center">{icon}</span>}
        <span className=" font-medium not-italic text-[0.83vw] leading-[1.25vw] text-white text-center flex items-end">
            {label}
        </span>
    </button>
);


// --- Page Header Component ---

interface ActionButton {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

interface PageHeaderProps {
    title: string;
    description: string;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton; // If provided, creates the "Double Button" layout
    className?: string;
    variant?: 'default' | 'dashboard';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    primaryAction,
    secondaryAction,
    className,
    variant = 'default'
}) => {
    // Determine the type based on props for internal logic if needed, 
    // but flexbox handles the "Text Only", "Single", and "Double" cases naturally if structured correctly.

    const heightClass = variant === 'dashboard' ? 'h-[2.78vw]' : 'h-[3.0vw]';
    const titleSizeClass = variant === 'dashboard' ? 'text-[2.25vw]' : 'text-[2.0vw]';

    return (
        <div
            className={`flex flex-row items-end p-0 gap-[0.83vw] w-full ${heightClass}  ${className || ''}`}
        >
            {/* Text Column - Grows to fill space */}
            <div className="flex flex-col justify-center items-start gap-[0.83vw] flex-grow h-full">
                {/* Title */}
                <h1 className={`flex items-center text-white font-bold not-italic ${variant === 'dashboard' ? 'text-[2.25vw]' : 'text-[1.875vw]'} leading-[110%] tracking-[-0.04em]`}>
                    {title}
                </h1>

                {/* Description */}
                <p className="flex items-center text-[#CCCCCC] font-normal not-italic text-[0.83vw] leading-[150%]">
                    {description}
                </p>
            </div>

            {/* Actions Column - Only renders if actions exist */}
            {(primaryAction || secondaryAction) && (
                <div className="flex flex-row items-center justify-end p-0 gap-[0.83vw] h-[2.91vw] flex-none">
                    {/* Secondary Button (Usually 'Export' or similar) appears first in row visually if it's on left of primary */}
                    {secondaryAction && (
                        <SecondaryButton
                            label={secondaryAction.label}
                            onClick={secondaryAction.onClick}
                            icon={secondaryAction.icon}
                        />
                    )}

                    {/* Primary Button (Usually 'Add New' or specific action) */}
                    {primaryAction && (
                        <PrimaryButton
                            label={primaryAction.label}
                            onClick={primaryAction.onClick}
                            icon={primaryAction.icon}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

// --- User Profile Header Component ---

interface UserProfileHeaderProps {
    name?: string;
    age?: number;
    avatarUrl?: string;
    verified?: boolean;
    location?: string;
    distance?: string;
    university?: string;
    occupation?: string;
    sex?: string;
    religion?: string;
    onBack?: () => void;
    action?: React.ReactNode; // Flexible slot for action button (Deactivate, etc.)
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
    name = "John Doe",
    age = 23,
    avatarUrl,
    verified = true,
    location,
    distance,
    university,
    occupation,
    sex,
    religion,
    onBack,
    action
}) => {
    return (
        <div
            className="flex flex-row items-center p-0 gap-[0.71vw] w-full h-[3.54vw] -mt-[0.3vw]"
        >
            {/* Back Button - reduced by 15% */}
            <button
                onClick={onBack}
                className="flex justify-center items-center w-[2.13vw] h-[2.13vw] p-[0.53vw] gap-[0.71vw] bg-[#5F00DB] rounded-[2.7vw] shadow-[0px_0px_4px_rgba(95,0,219,0.25),0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors flex-none"
            >
                <ArrowLeft className="text-white w-[1.06vw] h-[1.06vw]" />
            </button>

            {/* Profile Picture - reduced by 15% */}
            <div
                className="w-[3.54vw] h-[3.54vw] rounded-[2.13vw] bg-cover bg-center bg-no-repeat flex-none bg-gray-700"
                style={{ backgroundImage: `url(${avatarUrl || '/assets/avatar-placeholder.png'})` }}
            />

            {/* Info Column */}
            <div className="flex flex-col justify-center items-start gap-[0.71vw] h-[3.54vw] flex-grow">

                {/* Top Row: Name + Age + Verified - reduced by 15% */}
                <div className="flex flex-row items-center p-0 w-full h-[1.77vw]">
                    {/* Name */}
                    <h1 className="flex items-center text-white font-bold not-italic text-[1.59vw] leading-[110%] tracking-[-0.04em] whitespace-nowrap">
                        {name}
                    </h1>

                    {/* Comma + Age */}
                    <h1 className="flex items-center text-white font-bold not-italic text-[1.59vw] leading-[110%] tracking-[-0.04em] whitespace-nowrap ml-1">
                        , {age}
                    </h1>

                    {/* Verified Badge - reduced by 15% */}
                    {verified && (
                        <div className="flex flex-row items-center px-[0.53vw] gap-[0.44vw] w-[2.48vw] h-[1.77vw]">
                            {/* Custom Verified Icon from Assets */}
                            <img
                                src="/assets/Verified_profile_header.png"
                                alt="Verified"
                                className="w-[1.42vw] h-[1.42vw] object-contain mt-[0.35vw]"
                            />
                        </div>
                    )}
                </div>

                {/* Bottom Row: Chips - reduced by 15% */}
                <div className="flex flex-row items-center p-0 gap-[0.18vw] h-[1.06vw] w-full">
                    {sex && <Chip label={sex} />}
                    {religion && <Chip label={religion} />}
                    {location && <Chip label={location} icon={<MapPin className="w-[0.53vw] h-[0.53vw]" />} />}
                    {distance && <Chip label={distance} icon={<Navigation className="w-[0.53vw] h-[0.53vw]" />} />}
                    {university && <Chip label={university} icon={<GraduationCap className="w-[0.53vw] h-[0.53vw]" />} />}
                    {occupation && <Chip label={occupation} icon={<Briefcase className="w-[0.53vw] h-[0.53vw]" />} />}
                </div>
            </div>

            {/* Action Slot - reduced by 15% */}
            {action && (
                <div className="flex flex-row items-center justify-center gap-[0.71vw] flex-none">
                    {action}
                </div>
            )}
        </div>
    );
};

// Helper Chip Component - reduced by 15%
// Height: 24px * 0.85 -> 1.06vw
// Padding: 5px * 0.85 = 4.25px, 8px * 0.85 = 6.8px -> 0.22vw 0.35vw
// Gap: 5px * 0.85 -> 0.22vw
// Radius: 48px -> 2.5vw (keep same for rounded look)
// Font Size: 12px * 0.85 -> 0.53vw
const Chip = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
    <div className="flex flex-row justify-center items-center px-[0.35vw] py-[0.22vw] gap-[0.22vw] h-[1.06vw] bg-[#5F00DB] backdrop-blur-[6px] rounded-[2.5vw] flex-none">
        {icon && <span className="text-white flex items-center justify-center">{icon}</span>}
        <span className=" font-normal not-italic text-[0.53vw] leading-[0.62vw] text-white text-center whitespace-nowrap">
            {label}
        </span>
    </div>
);
