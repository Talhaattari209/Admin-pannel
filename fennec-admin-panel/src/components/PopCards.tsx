import React from 'react';
import NewSuccessCard from './pop-cards/SuccessCard';
import NewRemoveMediaCard from './pop-cards/RemoveMediaCard';
import NewRemovePromptResponseCard from './pop-cards/RemovePromptResponseCard';
import NewDeactivationCard from './pop-cards/DeactivationCard';

// 1. Success Card Wrapper
export const SuccessCard = ({
    isOpen,
    onClose,
    title,
    description,
    buttonLabel = "Done",
    height // Ignored in favor of dynamic sizing
}: { isOpen: boolean; onClose: () => void; title: string; description: string; buttonLabel?: string; height?: string }) => {
    if (!isOpen) return null;

    return (
        <NewSuccessCard
            onDone={onClose}
            title={title}
            description={description}
            buttonText={buttonLabel}
        />
    );
};

// 2. Remove Media Card Wrapper
export const RemoveMediaCard = ({
    isOpen,
    onClose,
    onConfirm
}: { isOpen: boolean; onClose: () => void; onConfirm: (reason: string) => void }) => {
    if (!isOpen) return null;

    return (
        <NewRemoveMediaCard
            onCancel={onClose}
            onRemove={(reason, customReason) => {
                // Pass the primary reason or a combined string if needed.
                // The old API expected a single string.
                // If customReason represents the "reason" when "Other" is selected, handle it.
                // However, the old component passed 'selectedReason' directly.
                // Let's pass the selected reason. If current consumers don't use it, it's fine.
                onConfirm(reason);
            }}
        />
    );
};

// 3. Remove Prompt Response Card Wrapper
export const RemovePromptResponseCard = ({
    isOpen,
    onClose,
    onConfirm
}: { isOpen: boolean; onClose: () => void; onConfirm: (reason: string) => void }) => {
    if (!isOpen) return null;

    return (
        <NewRemovePromptResponseCard
            onCancel={onClose}
            onRemove={(reason, customReason) => {
                onConfirm(reason);
            }}
        />
    );
};

// 4. Deactivation Card Wrapper
export const DeactivationCard = ({
    isOpen,
    onClose,
    onConfirm
}: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
    if (!isOpen) return null;

    return (
        <NewDeactivationCard
            onCancel={onClose}
            onDeactivate={onConfirm}
        />
    );
};
