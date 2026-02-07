import React, { useState } from 'react';

// --- Assets ---
const DANGER_ICON = "/assets/alert-triangle.svg";
const SUCCESS_ICON = "/assets/check-circle-success.svg";

// --- Types ---
interface BaseCardProps {
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    children?: React.ReactNode;
    actions: React.ReactNode;
    minHeight?: string;
    height?: string;
    width?: string;
    glowColor?: string;
}

// --- Base Component ---
// --- Base Component ---
// Reference: BaseCard.tsx
// Implements the layout, blurred bg, glowing icon, and action footer.
export const BaseCard: React.FC<BaseCardProps> = ({
    icon,
    title,
    description,
    children,
    actions,
    minHeight = 'auto',
    height = 'auto',
    width = '25vw',
    glowColor = '#5F00DB'
}) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center font-['SF_Pro_Text']">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#070707]/80 backdrop-blur-sm transition-opacity" />

            {/* Card Container */}
            <div
                className="relative z-10 flex flex-col items-center bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.67vw] overflow-hidden animate-in fade-in zoom-in-95 duration-200 box-border shadow-2xl"
                style={{
                    width,
                    padding: '1.25vw', // Reduced from 1.67vw
                    gap: '0.83vw',     // Reduced from 1.67vw
                    minHeight,
                    height
                }}
            >
                {/* Header Section (Icon + Title) */}
                <div className="flex flex-col items-center gap-[0.63vw] w-full shrink-0"> {/* Gap reduced */}
                    {/* Icon Section */}
                    <div className="relative flex flex-col justify-center items-center w-[4vw] h-[4vw] shrink-0 isolation-isolate mb-[0.21vw]"> {/* Icon size reduced from 5vw */}
                        {/* Glow */}
                        <div
                            className="absolute -left-[2.5vw] -right-[2.5vw] -top-[2.5vw] -bottom-[2.5vw] opacity-50 z-0 rounded-full blur-xl pointer-events-none"
                            style={{ background: `linear-gradient(180deg, ${glowColor} 30%, transparent 70%)` }}
                        />

                        {/* Rotating Border Animation & Glow */}
                        <div className="absolute inset-0 z-[1] rounded-full">
                            {/* Glow Layer - Extended bounds to allow external blur */}
                            <div
                                className="absolute -inset-[0.5vw] rounded-full animate-[spin_3s_linear_infinite]"
                                style={{
                                    background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
                                    filter: 'blur(0.25vw)',
                                    // Mask creates a ring centered roughly at the 2vw radius mark (which is 80% of the 2.5vw radius)
                                    WebkitMask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)',
                                    mask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)'
                                }}
                            />
                            {/* Sharp Border Layer */}
                            <div
                                className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]"
                                style={{
                                    background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)',
                                    WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))',
                                    mask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))'
                                }}
                            />
                        </div>

                        {/* Icon BG */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full z-0" />

                        {/* Icon Content */}
                        <div className="relative z-10 flex items-center justify-center scale-90"> {/* Scale down icon slightly */}
                            {icon}
                        </div>
                    </div>

                    <h2 className="w-full font-medium not-italic text-[1.46vw] leading-[1.67vw] tracking-[-0.02em] text-center text-white"> {/* Font reduced 1.67->1.46 */}
                        {title}
                    </h2>
                </div>

                {/* Content Section (Description + Children) - No Scroll */}
                <div className="flex flex-col w-full flex-grow items-center justify-start gap-[0.83vw] min-h-0"> {/* Gap reduced 1.25->0.83 */}
                    {/* Text Content */}
                    <div className="w-full text-center text-white/90 shrink-0">
                        {typeof description === 'string' ? (
                            <p className="font-normal not-italic text-[0.83vw] leading-[150%]">{description}</p>
                        ) : (
                            description
                        )}
                    </div>

                    {/* Custom Content (Radio lists, inputs) */}
                    {children && (
                        <div className="flex flex-col self-stretch gap-[0.83vw] w-full flex-grow min-h-0"> {/* Gap reduced */}
                            {children}
                        </div>
                    )}
                </div>

                {/* Action Buttons Footer */}
                <div className="flex flex-row items-center justify-center gap-[1.04vw] self-stretch mt-auto w-full shrink-0"> {/* Gap reduced */}
                    {actions}
                </div>
            </div>
        </div>
    );
};

// --- Shared Elements (Buttons, Inputs) ---

const Button = ({ label, onClick, variant = 'secondary' }: { label: string; onClick: () => void; variant?: 'primary-purple' | 'primary-red' | 'secondary' }) => {
    // Reverted to 2.92vw (56px) height
    const baseStyle = "flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 w-full";

    const variants = {
        'primary-purple': "bg-[#5F00DB] text-white shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:bg-[#7000ff]",
        'primary-red': "bg-[#FF4E4E] text-white shadow-[0px_-0.42vw_0.63vw_rgba(255,78,78,0.25),0px_0.42vw_0.63vw_rgba(255,78,78,0.25)] hover:bg-[#ff6666]",
        'secondary': "bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
            {label}
        </button>
    );
};

const RadioList = ({ options, selected, onSelect }: { options: string[], selected: string, onSelect: (val: string) => void }) => (
    <div className="flex flex-col items-start p-0 gap-[1px] w-full bg-[#111111]/25 border border-[#444444]/50 rounded-[0.83vw] overflow-hidden shrink-0 h-full">
        {options.map((opt) => (
            <div
                key={opt}
                onClick={() => onSelect(opt)}
                className={`flex flex-row items-center p-[0.83vw] gap-[0.83vw] w-full h-[2.29vw] border-b border-[#444444]/50 last:border-b-0 cursor-pointer transition-colors ${selected === opt ? 'bg-white/10' : 'bg-transparent'} hover:bg-white/5`}
            >
                <div className={`w-[1.10vw] h-[1.10vw] rounded-full border border-white flex items-center justify-center shrink-0 ${selected === opt ? 'bg-white' : 'bg-[#222222]'}`}>
                    {selected === opt && <div className="w-[0.55vw] h-[0.55vw] rounded-full bg-[#5F00DB]" />}
                </div>
                <span className="font-normal not-italic text-[0.83vw] leading-[150%] text-white flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
                    {opt}
                </span>
            </div>
        ))}
    </div>
);

// --- Specific Cards ---

// 1. Success Card
// Reference: SuccessCard.tsx
export const SuccessCard = ({
    isOpen,
    onClose,
    title,
    description,
    buttonLabel = "Done",
    height // Allow override
}: { isOpen: boolean; onClose: () => void; title: string; description: string; buttonLabel?: string; height?: string }) => {
    if (!isOpen) return null;

    // Adjusted icon size for the smaller container
    const icon = <img src={SUCCESS_ICON} alt="Success" className="w-[2.5vw] h-[2.5vw] object-contain" />;

    // Default Height: 342px -> 17.81vw
    const defaultHeight = "17.81vw";

    return (
        <BaseCard
            icon={icon}
            title={title}
            description={description}
            actions={<Button label={buttonLabel} onClick={onClose} variant="primary-purple" />}
            glowColor="#5F00DB"
            width="25vw" // 480w
            height={height || defaultHeight}
        />
    );
};

// 2. Remove Media Card
// Reference: RemoveMediaCard.tsx
export const RemoveMediaCard = ({
    isOpen,
    onClose,
    onConfirm
}: { isOpen: boolean; onClose: () => void; onConfirm: (reason: string) => void }) => {
    const [selectedReason, setSelectedReason] = useState("Inappropriate Content");

    if (!isOpen) return null;

    const reasons = ["Inappropriate Content", "Violence or Harmful Imagery", "Nudity or Sexual Content", "Copyright or Ownership Concerns", "Misleading or Fake Media", "Privacy Violation", "Other"];

    const icon = <img src={DANGER_ICON} alt="Danger" className="w-[2.08vw] h-[2.08vw] object-contain" />;

    return (
        <BaseCard
            icon={icon}
            title="Remove Media?"
            description="This action will permanently remove the selected media from the user’s profile. The user will be notified with the reason you select below."
            glowColor="#5F00DB"
            width="25vw"
            height="30.1vw"
            actions={
                <>
                    <Button label="Cancel" onClick={onClose} variant="secondary" />
                    <Button label="Remove Media" onClick={() => onConfirm(selectedReason)} variant="primary-purple" />
                </>
            }
        >
            <RadioList options={reasons} selected={selectedReason} onSelect={setSelectedReason} />
        </BaseCard>
    );
};

// 3. Remove Prompt Response Card
// Reference: RemovePromptResponseCard.tsx
export const RemovePromptResponseCard = ({
    isOpen,
    onClose,
    onConfirm
}: { isOpen: boolean; onClose: () => void; onConfirm: (reason: string) => void }) => {
    const [selectedReason, setSelectedReason] = useState("Inappropriate Content");

    if (!isOpen) return null;

    const reasons = ["Inappropriate Content", "Violence or Harmful Imagery", "Nudity or Sexual Content", "Copyright or Ownership Concerns", "Misleading or Fake Media", "Privacy Violation", "Other"];

    const icon = <img src={DANGER_ICON} alt="Danger" className="w-[2.08vw] h-[2.08vw] object-contain" />;

    return (
        <BaseCard
            icon={icon}
            title="Remove Prompt Response?"
            description="This action will permanently remove the prompt response from the user’s profile. The user will be notified with the reason you select below."
            glowColor="#5F00DB"
            width="25vw"
            height="30.1vw"
            actions={
                <>
                    <Button label="Cancel" onClick={onClose} variant="secondary" />
                    <Button label="Remove Response" onClick={() => onConfirm(selectedReason)} variant="primary-purple" />
                </>
            }
        >
            <RadioList options={reasons} selected={selectedReason} onSelect={setSelectedReason} />
        </BaseCard>
    );
};

// 4. Deactivation Card
// Reference: DeactivationCard.tsx
export const DeactivationCard = ({
    isOpen,
    onClose,
    onConfirm
}: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
    if (!isOpen) return null;

    const icon = <img src={DANGER_ICON} alt="Danger" className="w-[2.08vw] h-[2.08vw] object-contain" />;

    // Compact description
    const desc = (
        <div className="flex flex-col gap-[0.21vw] h-full justify-center flex-1">
            <p className="font-normal not-italic text-[0.83vw] leading-[1.25vw]">Are you sure you want to deactivate this user’s account?</p>
            <p className="font-normal not-italic text-[0.63vw] leading-[140%] opacity-80">Once deactivated, the user will not be able to log in or access the app until reactivated by an admin. This action will not permanently delete their data.</p>
        </div>
    );

    return (
        <BaseCard
            icon={icon}
            title="Deactivate User?"
            description={desc}
            glowColor="#5F00DB"
            width="25vw"
            height="27.76vw"
            actions={
                <>
                    <Button label="Cancel" onClick={onClose} variant="secondary" />
                    <Button label="Deactivate" onClick={onConfirm} variant="primary-red" />
                </>
            }
        />
    );
};
