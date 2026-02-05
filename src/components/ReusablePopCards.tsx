"use client";
import React, { useState } from 'react';
import DeactivationCard from './pop-cards/DeactivationCard';
import SuccessCard from './pop-cards/SuccessCard';
import RemovePromptResponseCard from './pop-cards/RemovePromptResponseCard';
import PromptResponseRemovedCard from './pop-cards/PromptResponseRemovedCard';
import RemoveMediaCard from './pop-cards/RemoveMediaCard';
import MediaRemovedCard from './pop-cards/MediaRemovedCard';

export default function ReusablePopCards() {
    const [activeModal, setActiveModal] = useState<number | null>(null);

    const closeModal = () => setActiveModal(null);

    const renderModalContent = () => {
        switch (activeModal) {
            case 1: // Deactivate User
                return (
                    <DeactivationCard
                        onCancel={closeModal}
                        onDeactivate={() => {
                            // Logic for deactivation would go here
                            console.log('User Deactivated');
                            closeModal();
                        }}
                    />
                );
            case 2: // User Deactivated (Success)
                return (
                    <SuccessCard
                        onDone={closeModal}
                        title="User Deactivated"
                        description="The account has been successfully deactivated. You can reactivate it anytime from the user’s detail page."
                    />
                );
            case 3: // Remove Prompt Response (Selection + Input)
                return (
                    <RemovePromptResponseCard
                        onCancel={closeModal}
                        onRemove={(reason, customReason) => {
                            console.log('Removing Prompt Response:', reason, customReason);
                            closeModal();
                        }}
                    />
                );
            case 4: // Prompt Response Removed
                return (
                    <PromptResponseRemovedCard
                        onDone={closeModal}
                    />
                );
            case 5: // Remove Media (Selection + Input)
                return (
                    <RemoveMediaCard
                        onCancel={closeModal}
                        onRemove={(reason, customReason) => {
                            console.log('Removing Media:', reason, customReason);
                            closeModal();
                        }}
                    />
                );
            case 6: // Media Removed
                return (
                    <MediaRemovedCard
                        onDone={closeModal}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div className="p-8 bg-slate-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold not-italic mb-8">Reusable Pop Cards Demo</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Buttons to open modals */}
                <button onClick={() => setActiveModal(1)} className="p-4 bg-red-600 rounded-xl hover:bg-red-700 transition">
                    1. Deactivate User (Confirmation)
                </button>
                <button onClick={() => setActiveModal(2)} className="p-4 bg-green-600 rounded-xl hover:bg-green-700 transition">
                    2. User Deactivated (Success)
                </button>
                <button onClick={() => setActiveModal(3)} className="p-4 bg-orange-600 rounded-xl hover:bg-orange-700 transition">
                    3. Remove Prompt Response (Selection)
                </button>
                <button onClick={() => setActiveModal(4)} className="p-4 bg-green-600 rounded-xl hover:bg-green-700 transition">
                    4. Prompt Response Removed (Success)
                </button>
                <button onClick={() => setActiveModal(5)} className="p-4 bg-orange-600 rounded-xl hover:bg-orange-700 transition">
                    5. Remove Media (Selection)
                </button>
                <button onClick={() => setActiveModal(6)} className="p-4 bg-green-600 rounded-xl hover:bg-green-700 transition">
                    6. Media Removed (Success)
                </button>
            </div>

            {/* Modal Overlay */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 shadow-xl backdrop-blur-sm overflow-y-auto">
                    <div className="relative">
                        {renderModalContent()}
                    </div>
                </div>
            )}
        </div>
    );
}
