import React, { useState } from 'react';

const MODULES = [
    'Users Management', 'App Content', 'Support Requests', 'Reported Problems', 'App Settings', 'Team & Roles', 'System Logs'
];

interface SwitchToggleTableProps {
    initialPermissions?: Record<string, Record<string, boolean>>;
    onChange?: (permissions: Record<string, Record<string, boolean>>) => void;
}

const SwitchToggleTable: React.FC<SwitchToggleTableProps> = ({ initialPermissions, onChange }) => {
    const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>(
        initialPermissions || MODULES.reduce((acc, mod) => ({
            ...acc,
            [mod]: {
                view: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems',
                edit: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems',
                delete: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems',
                export: mod === 'App Content' || mod === 'Support Requests' || mod === 'Reported Problems'
            }
        }), {})
    );

    const toggle = (mod: string, key: string) => {
        const newPermissions = {
            ...permissions,
            [mod]: { ...permissions[mod], [key]: !permissions[mod][key] }
        };
        setPermissions(newPermissions);
        if (onChange) onChange(newPermissions);
    };

    const Switch = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
        <button
            onClick={onToggle}
            type="button"
            className={`relative w-[2.5vw] h-[1.46vw] rounded-[1.67vw] border transition-all duration-300 ${active ? 'bg-[#222222] border-white' : 'bg-[#222222] border-[#888888]'
                }`}
        >
            <div
                className={`absolute top-[0.10vw] w-[1.15vw] h-[1.15vw] rounded-full shadow-md transition-all duration-300 ${active ? 'right-[0.16vw] bg-white' : 'left-[0.16vw] bg-[#888888]'
                    }`}
            />
        </button>
    );

    return (
        <div className="flex flex-col p-[0.83vw] bg-[#111111] border border-white/10 rounded-[0.83vw] gap-[0.83vw] w-full">
            {/* Header */}
            <div className="flex flex-row items-center gap-[0.83vw] px-[0.42vw] h-[1.67vw]">
                <div className="flex-grow text-[#CCCCCC] text-[0.83vw] font-['SF_Pro_Text'] not-italic">Module</div>
                {['View', 'Edit', 'Delete', 'Export'].map(label => (
                    <div key={label} className="w-[3.75vw] text-center text-[#CCCCCC] text-[0.83vw] font-['SF_Pro_Text'] not-italic">{label}</div>
                ))}
            </div>

            {/* Rows */}
            {MODULES.map(mod => (
                <div key={mod} className="flex flex-row items-center gap-[0.83vw] px-[0.42vw] h-[1.67vw] min-h-[1.67vw]">
                    <div className="flex-grow text-[#CCCCCC] text-[0.83vw] font-['SF_Pro_Text'] not-italic whitespace-nowrap">{mod}</div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod].view} onToggle={() => toggle(mod, 'view')} /></div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod].edit} onToggle={() => toggle(mod, 'edit')} /></div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod].delete} onToggle={() => toggle(mod, 'delete')} /></div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod].export} onToggle={() => toggle(mod, 'export')} /></div>
                </div>
            ))}
        </div>
    );
};

export default SwitchToggleTable;
