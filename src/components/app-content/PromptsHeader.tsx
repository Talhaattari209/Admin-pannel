import React from 'react';
import { Plus, Download } from 'lucide-react';
import { Button } from '../shared/Button';
import { useAuthStore } from '@/store/auth-store';
import { canEditModule, canExportModule } from '@/utils/permissions';

interface PromptsHeaderProps {
    onAddPrompt: () => void;
    onExport: () => void;
    addLabel?: string;
}

const PromptsHeader: React.FC<PromptsHeaderProps> = ({ onAddPrompt, onExport, addLabel = "Add Prompt" }) => {
    // Permission checks
    const permissions = useAuthStore((state) => state.permissions);
    const isSuperAdmin = useAuthStore((state) => state.user?.isSuperAdmin);

    const canAdd = isSuperAdmin || canEditModule(permissions, 'app content');
    const canExport = isSuperAdmin || canExportModule(permissions, 'app content');

    return (
        <div className="flex flex-row items-end justify-between w-full h-[3.47vw] mb-[1.49vw] animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Text Section */}
            <div className="flex flex-col justify-center items-start gap-[0.42vw] max-w-[63.18vw]">
                <h1 className="text-white text-[1.875vw] font-bold not-italic leading-[110%] tracking-[-0.01em] font-['SF Pro Text']">
                    App Content
                </h1>
                <p className="text-[#CCCCCC] text-[0.83vw] leading-[150%]">
                    Manage app-wide text, images, and media — including prompts, and static pages.
                </p>
            </div>

            {/* Actions Section */}
            <div className="flex flex-row items-center gap-[0.83vw] h-[2.92vw]">
                {/* Export Button - Only show if user has export permission */}
                {canExport && (
                    <Button
                        onClick={onExport}
                        variant="glass"
                        className="h-full group"
                        iconRight={<Download className="w-[1.25vw] h-[1.25vw] text-white" />}
                    >
                        Export
                    </Button>
                )}

                {/* Add Button - Only show if user has edit permission */}
                {canAdd && (
                    <Button
                        onClick={onAddPrompt}
                        variant="filled"
                        className="h-full"
                    >
                        {addLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PromptsHeader;
