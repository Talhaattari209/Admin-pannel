import React from 'react';
import { ArrowLeft, MapPin, Navigation, GraduationCap, Briefcase, Check, Download } from 'lucide-react';

// --- Shared Utility Components ---

// Button styles derived from CSS
const PrimaryButton = ({ label, onClick, icon }: { label: string; onClick?: () => void; icon?: React.ReactNode }) => (
    <button
        onClick={onClick}
        className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.625vw] h-[2.91vw] bg-[#5F00DB] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] rounded-[2.7vw] hover:bg-[#4a00aa] transition-all flex-none"
    >
        <span className="font-['SF_Pro_Text'] font-medium text-[0.83vw] leading-[1.25vw] text-white text-center flex items-end">
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
        <span className="font-['SF_Pro_Text'] font-medium text-[0.83vw] leading-[1.25vw] text-white text-center flex items-end">
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
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    primaryAction,
    secondaryAction,
    className
}) => {
    // Determine the type based on props for internal logic if needed, 
    // but flexbox handles the "Text Only", "Single", and "Double" cases naturally if structured correctly.

    return (
        <div
            className={`flex flex-row items-end p-0 gap-[0.83vw] w-full h-[4.17vw] font-['SF_Pro_Text'] ${className || ''}`}
        >
            {/* Text Column - Grows to fill space */}
            <div className="flex flex-col justify-center items-start gap-[0.83vw] flex-grow h-full">
                {/* Title */}
                <h1 className="flex items-center text-white font-bold text-[1.875vw] leading-[110%] tracking-[-0.04em]">
                    {title}
                </h1>

                {/* Description */}
                <p className="flex items-center text-[#CCCCCC] font-normal text-[0.83vw] leading-[150%]">
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
            className="flex flex-row items-center p-0 gap-[0.83vw] w-full h-[4.17vw] font-['SF_Pro_Text']"
        >
            {/* Back Button */}
            {/* 48px -> 2.5vw */}
            <button
                onClick={onBack}
                className="flex justify-center items-center w-[2.5vw] h-[2.5vw] p-[0.625vw] gap-[0.83vw] bg-[#5F00DB] rounded-[2.7vw] shadow-[0px_0px_4px_rgba(95,0,219,0.25),0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors flex-none"
            >
                <ArrowLeft className="text-white w-[1.25vw] h-[1.25vw]" />
            </button>

            {/* Profile Picture */}
            {/* 80px -> 4.17vw */}
            <div
                className="w-[4.17vw] h-[4.17vw] rounded-[2.5vw] bg-cover bg-center bg-no-repeat flex-none bg-gray-700"
                style={{ backgroundImage: `url(${avatarUrl || '/assets/avatar-placeholder.png'})` }}
            />

            {/* Info Column */}
            <div className="flex flex-col justify-center items-start gap-[0.83vw] h-[4.17vw] flex-grow">

                {/* Top Row: Name + Age + Verified */}
                {/* Height: 40px -> 2.083vw */}
                <div className="flex flex-row items-center p-0 w-full h-[2.08vw]">
                    {/* Name */}
                    <h1 className="flex items-center text-white font-bold text-[1.875vw] leading-[110%] tracking-[-0.04em] whitespace-nowrap">
                        {name}
                    </h1>

                    {/* Comma + Age */}
                    <h1 className="flex items-center text-white font-bold text-[1.875vw] leading-[110%] tracking-[-0.04em] whitespace-nowrap ml-1">
                        , {age}
                    </h1>

                    {/* Verified Badge */}
                    {/* 56px width -> 2.91vw */}
                    {verified && (
                        <div className="flex flex-row items-center px-[0.625vw] gap-[0.52vw] w-[2.92vw] h-[2.08vw]">
                            {/* Custom Verified Icon */}
                            <div className="relative w-[1.67vw] h-[1.67vw]">
                                {/* White Star Background (Vector) - approximated with rotated box for now or SVG */}
                                <div className="absolute left-[4.17%] right-[4.17%] top-[4.17%] bottom-[4.17%] bg-white rounded-[0.06vw] rotate-45 transform origin-center"></div>
                                {/* Purple Check */}
                                <div className="absolute left-[20.83%] right-[20.83%] top-[20.83%] bottom-[20.83%] flex items-center justify-center z-10">
                                    <Check className="w-[1vw] h-[1vw] text-[#5F00DB] stroke-[3]" />
                                </div>
                                {/* Border Ring if needed (CSS mentions vector border 2px solid #5F00DB at specific pos) */}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Row: Chips */}
                {/* Height: 24px -> 1.25vw */}
                <div className="flex flex-row items-center p-0 gap-[0.21vw] h-[1.25vw] w-full">
                    {sex && <Chip label={sex} />}
                    {religion && <Chip label={religion} />}
                    {location && <Chip label={location} icon={<MapPin className="w-[0.625vw] h-[0.625vw]" />} />}
                    {distance && <Chip label={distance} icon={<Navigation className="w-[0.625vw] h-[0.625vw]" />} />}
                    {university && <Chip label={university} icon={<GraduationCap className="w-[0.625vw] h-[0.625vw]" />} />}
                    {occupation && <Chip label={occupation} icon={<Briefcase className="w-[0.625vw] h-[0.625vw]" />} />}
                </div>
            </div>

            {/* Action Slot */}
            {action && (
                <div className="flex flex-row items-center gap-[0.83vw] h-[2.91vw] flex-none">
                    {action}
                </div>
            )}
        </div>
    );
};

// Helper Chip Component
// Height: 24px -> 1.25vw
// Padding: 5px 8px -> 0.26vw 0.42vw
// Gap: 5px -> 0.26vw
// Radius: 48px -> 2.5vw
// Font Size: 12px -> 0.625vw
const Chip = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
    <div className="flex flex-row justify-center items-center px-[0.42vw] py-[0.26vw] gap-[0.26vw] h-[1.25vw] bg-[#5F00DB] backdrop-blur-[6px] rounded-[2.5vw] flex-none">
        {icon && <span className="text-white flex items-center justify-center">{icon}</span>}
        <span className="font-['SF_Pro_Text'] font-normal text-[0.625vw] leading-[0.73vw] text-white text-center whitespace-nowrap">
            {label}
        </span>
    </div>
);
