import React, { useState } from 'react';

// --- Assets ---
const DANGER_ICON = "/assets/danger.png";
const SUCCESS_ICON = "/assets/check-circle-success.svg";

// --- Types ---
interface BaseCardProps {
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    children?: React.ReactNode;
    actions: React.ReactNode;
    minHeight?: string;
    width?: string;
    glowColor?: string;
}

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
                    padding: '1.67vw',
                    gap: '1.67vw',
                    minHeight
                }}
            >
                {/* Icon Section */}
                <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-isolate">
                    {/* Glow */}
                    <div
                        className="absolute -left-[3.125vw] -right-[3.125vw] -top-[3.125vw] -bottom-[3.125vw] opacity-50 z-0 rounded-full blur-xl pointer-events-none"
                        style={{ background: `linear-gradient(180deg, ${glowColor} 30%, transparent 70%)` }}
                    />

                    {/* Icon BG */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full z-0" />

                    {/* Icon Content */}
                    <div className="relative z-10 flex items-center justify-center">
                        {icon}
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[0.42vw] items-center w-full text-center self-stretch">
                    <h2 className="w-full font-medium not-italic text-[1.67vw] leading-[1.98vw] tracking-[-0.02em] text-white">
                        {title}
                    </h2>
                    <div className="w-full text-white/90">
                        {typeof description === 'string' ? (
                            <p className="font-normal not-italic text-[0.73vw] leading-[150%]">{description}</p>
                        ) : (
                            description
                        )}
                    </div>
                </div>

                {/* Custom Content (Radio lists, inputs) */}
                {children && (
                    <div className="flex flex-col self-stretch gap-[1.67vw] w-full">
                        {children}
                    </div>
                )}

                {/* Action Buttons Footer */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto w-full">
                    {actions}
                </div>
            </div>
        </div>
    );
};

// --- Shared Elements (Buttons, Inputs) ---

const Button = ({ label, onClick, variant = 'secondary' }: { label: string; onClick: () => void; variant?: 'primary-purple' | 'primary-red' | 'secondary' }) => {
    // 56px height -> ~2.92vw
    // 24px gap -> ~1.25vw
    // Radius 52px -> ~2.71vw
    // Font 16px -> ~0.83vw

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
    <div className="flex flex-col items-start p-0 gap-[1px] w-full bg-[#111111]/25 border border-[#444444]/50 rounded-[0.83vw] overflow-hidden">
        {options.map((opt) => (
            <div
                key={opt}
                onClick={() => onSelect(opt)}
                className={`flex flex-row items-center p-[0.83vw] gap-[0.83vw] w-full h-[2.92vw] border-b border-[#444444]/50 last:border-b-0 cursor-pointer transition-colors ${selected === opt ? 'bg-white/10' : 'bg-transparent'} hover:bg-white/5`}
            >
                <div className={`w-[1.25vw] h-[1.25vw] rounded-full border border-white flex items-center justify-center shrink-0 ${selected === opt ? 'bg-white' : 'bg-[#222222]'}`}>
                    {selected === opt && <div className="w-[0.63vw] h-[0.63vw] rounded-full bg-[#5F00DB]" />}
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
    buttonLabel = "Done"
}: { isOpen: boolean; onClose: () => void; title: string; description: string; buttonLabel?: string }) => {
    if (!isOpen) return null;

    const icon = <img src={SUCCESS_ICON} alt="Success" className="w-[3.75vw] h-[3.75vw] object-contain" />;

    // Note: Success card height in CSS was 470px -> ~24.48vw (assuming 1920) or just auto with padding.
    // CSS says 470px height. 25vw width.

    return (
        <BaseCard
            icon={icon}
            title={title}
            description={description}
            actions={<Button label={buttonLabel} onClick={onClose} variant="primary-purple" />}
            glowColor="#5F00DB" // Success usually Green #3ADC60 but files said Purple. Keeping user's choice.
        // Actually, if I look at 'Success_ User Deactivated_css.txt', Glow is #5F00DB.
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

    const icon = <img src={DANGER_ICON} alt="Danger" className="w-[2.92vw] h-[2.92vw] object-contain" />;

    return (
        <BaseCard
            icon={icon}
            title="Remove Media?"
            description="This action will permanently remove the selected media from the user’s profile. The user will be notified with the reason you select below."
            glowColor="#5F00DB" // Danger usually Red but CSS says Purple glow.
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

    const icon = <img src={DANGER_ICON} alt="Danger" className="w-[2.92vw] h-[2.92vw] object-contain" />;

    return (
        <BaseCard
            icon={icon}
            title="Remove Prompt Response?"
            description="This action will permanently remove the prompt response from the user’s profile. The user will be notified with the reason you select below."
            glowColor="#5F00DB"
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

    const icon = <img src={DANGER_ICON} alt="Danger" className="w-[2.92vw] h-[2.92vw] object-contain" />;

    // Description Reference: "Are you sure you want to... Once deactivated... reactivated by an admin."
    // In BaseCard title/description separation:
    const desc = (
        <div className="flex flex-col gap-[0.42vw]">
            <p className="font-normal not-italic text-[0.94vw] leading-[1.67vw]">Are you sure you want to deactivate this user’s account?</p>
            <p className="font-normal not-italic text-[0.73vw] leading-[150%] opacity-80">Once deactivated, the user will not be able to log in or access the app until reactivated by an admin. This action will not permanently delete their data.</p>
        </div>
    );

    return (
        <BaseCard
            icon={icon}
            title="Deactivate User?"
            description={desc}
            glowColor="#5F00DB"
            actions={
                <>
                    <Button label="Cancel" onClick={onClose} variant="secondary" />
                    <Button label="Deactivate" onClick={onConfirm} variant="primary-red" />
                </>
            }
        />
    );
};
