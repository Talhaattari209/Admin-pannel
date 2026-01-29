import React from 'react';
import { ArrowLeft, MapPin, Navigation, GraduationCap, Briefcase, Check } from 'lucide-react';

// --- Page Header Component ---

interface PageHeaderProps {
    title?: string;
    description?: string;
    action?: React.ReactNode;
    className?: string; // Allow minimal overrides
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title = "Users Management",
    description = "View, verify, and manage all registered users — including KYC status, bans, and account details.",
    action,
    className
}) => {
    return (
        <div
            className={`flex flex-row justify-between items-end gap-[0.83vw] w-[79.17vw] h-[6.20vw] font-['SF_Pro_Text'] ${className || ''}`}
            style={{ fontFamily: "'SF Pro Text', sans-serif" }}
        >
            <div className="flex flex-col justify-center items-start gap-[0.83vw]">
                {/* Title */}
                <h1 className="flex items-center text-white font-bold text-[3.75vw] leading-[110%] tracking-[-0.04em]">
                    {title}
                </h1>

                {/* Description */}
                <p className="flex items-center text-[#CCCCCC] font-normal text-[0.83vw] leading-[150%]">
                    {description}
                </p>
            </div>

            {/* Action Button */}
            {action}
        </div>
    );
};


// --- User Profile Header Component ---

interface UserProfileHeaderProps {
    name?: string;
    age?: number;
    avatarUrl?: string; // Fallback to placeholder if not provided
    onBack?: () => void;
    onDeactivate?: () => void;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
    name = "John Doe",
    age = 23,
    avatarUrl,
    onBack,
    onDeactivate
}) => {
    return (
        <div
            className="flex flex-row items-center p-0 gap-[0.83vw] w-[79.17vw] h-[4.17vw]"
            style={{ fontFamily: "'SF Pro Text', sans-serif" }}
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex justify-center items-center w-[2.5vw] h-[2.5vw] bg-[#5F00DB] rounded-full shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors flex-none"
            >
                <ArrowLeft className="text-white w-[1.25vw] h-[1.25vw]" />
            </button>

            {/* Profile Picture */}
            <div
                className="w-[4.17vw] h-[4.17vw] rounded-full bg-cover bg-center bg-no-repeat border border-white/10 flex-none"
                style={{ backgroundImage: `url(${avatarUrl || '/assets/avatar-placeholder.png'})` }}
            />

            {/* Info Column */}
            <div className="flex flex-col justify-center items-start gap-[0.83vw] w-[61.04vw] h-[4.17vw] flex-grow">

                {/* Top Row: Name + Age + Verified */}
                <div className="flex flex-row items-center gap-[0.21vw] h-[2.08vw]">
                    <h1 className="text-white font-bold text-[1.875vw] leading-[110%] tracking-[-0.04em]">
                        {name}, {age}
                    </h1>
                    {/* Verified Badge */}
                    <div className="flex items-center justify-center w-[2.92vw] h-[2.08vw] px-[0.63vw]">
                        <div className="relative w-[1.67vw] h-[1.67vw]">
                            {/* Custom Verified Star/Check Construction to match CSS layers if possible, 
                   or use lucide Check inside a customized container. 
                   CSS describes a specialized vector. We'll simulate it. */}
                            <div className="absolute inset-0 bg-white rounded-sm rotate-45 scale-75"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-[1vw] h-[1vw] text-[#5F00DB] stroke-[3]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Chips */}
                <div className="flex flex-row items-center gap-[0.21vw] h-[1.25vw]">
                    <Chip label="Straight" />
                    <Chip label="Muslim" />
                    <Chip label="Austin, TX" icon={<MapPin className="w-[0.63vw] h-[0.63vw]" />} />
                    <Chip label="2 miles" icon={<Navigation className="w-[0.63vw] h-[0.63vw]" />} />
                    <Chip label="Stanford University" icon={<GraduationCap className="w-[0.63vw] h-[0.63vw]" />} />
                    <Chip label="Software Engineer" icon={<Briefcase className="w-[0.63vw] h-[0.63vw]" />} />
                </div>
            </div>

            {/* Actions: Deactivate Button */}
            <div className="flex flex-row items-center justify-end gap-[0.83vw] w-[8.96vw] h-[2.92vw] flex-none">
                <button
                    onClick={onDeactivate}
                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-full h-full border border-white rounded-[2.71vw] backdrop-blur-[6px] hover:bg-white/10 transition-colors"
                >
                    <span className="font-medium text-[0.83vw] leading-[1.25vw] text-white">
                        Deactivate User
                    </span>
                </button>
            </div>
        </div>
    );
};

// Helper Chip Component
const Chip = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
    <div className="flex flex-row justify-center items-center px-[0.42vw] py-[0.26vw] gap-[0.26vw] h-[1.25vw] bg-[#5F00DB] backdrop-blur-[6px] rounded-[2.5vw]">
        {icon && <span className="text-white">{icon}</span>}
        <span className="font-normal text-[0.63vw] leading-[0.73vw] text-white text-center">
            {label}
        </span>
    </div>
);
