import React, { useState, useEffect } from 'react';

// IMPORTANT: Module names must match backend validation exactly (all lowercase)
const MODULES = [
    'dashboard',
    'users management',
    'app content',
    'support requests',
    'reported problems',
    'app settings',
    'teams & roles',  // Note: plural 'teams'
    'system logs',
    'account settings'  // Note: plural 'settings'
];

// Display names for UI (title case)
const DISPLAY_NAMES: Record<string, string> = {
    'dashboard': 'Dashboard',
    'users management': 'Users Management',
    'app content': 'App Content',
    'support requests': 'Support Requests',
    'reported problems': 'Reported Problems',
    'app settings': 'App Settings',
    'teams & roles': 'Teams & Roles',
    'system logs': 'System Logs',
    'account settings': 'Account Settings'
};

interface SwitchToggleTableProps {
    initialPermissions?: Record<string, Record<string, boolean>>;
    onChange?: (permissions: Record<string, Record<string, boolean>>) => void;
}

const SwitchToggleTable: React.FC<SwitchToggleTableProps> = ({ initialPermissions, onChange }) => {
    // Initialize with provided permissions or defaults
    const getDefaultPermissions = () => {
        if (initialPermissions && Object.keys(initialPermissions).length > 0) {
            return initialPermissions;
        }

        return MODULES.reduce((acc, mod) => ({
            ...acc,
            [mod]: {
                view: false,
                edit: false,
                delete: false,
                export: false
            }
        }), {});
    };

    const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>(getDefaultPermissions());

    // Update local state when initialPermissions change (for edit mode)
    useEffect(() => {
        if (initialPermissions && Object.keys(initialPermissions).length > 0) {
            setPermissions(initialPermissions);
        }
    }, [initialPermissions]);

    const toggle = (mod: string, key: string) => {
        const newPermissions = {
            ...permissions,
            [mod]: { ...permissions[mod], [key]: !permissions[mod][key] }
        };
        setPermissions(newPermissions);

        if (onChange) {
            onChange(newPermissions);
        }
    };

    const Switch = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
        <button
            onClick={onToggle}
            type="button"
            className={`relative w-[2.5vw] h-[1.46vw] rounded-[1.67vw] border transition-all duration-300 cursor-pointer ${active ? 'bg-[#222222] border-white' : 'bg-[#222222] border-[#888888]'
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
                <div className="flex-grow text-[#CCCCCC] text-[0.83vw]  not-italic">Module</div>
                {['View', 'Edit', 'Delete', 'Export'].map(label => (
                    <div key={label} className="w-[3.75vw] text-center text-[#CCCCCC] text-[0.83vw]  not-italic">{label}</div>
                ))}
            </div>

            {/* Rows */}
            {MODULES.map(mod => (
                <div key={mod} className="flex flex-row items-center gap-[0.83vw] px-[0.42vw] h-[1.67vw] min-h-[1.67vw]">
                    <div className="flex-grow text-[#CCCCCC] text-[0.83vw]  not-italic whitespace-nowrap">{DISPLAY_NAMES[mod] || mod}</div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod]?.view || false} onToggle={() => toggle(mod, 'view')} /></div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod]?.edit || false} onToggle={() => toggle(mod, 'edit')} /></div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod]?.delete || false} onToggle={() => toggle(mod, 'delete')} /></div>
                    <div className="w-[3.75vw] flex justify-center"><Switch active={permissions[mod]?.export || false} onToggle={() => toggle(mod, 'export')} /></div>
                </div>
            ))}
        </div>
    );
};

export default SwitchToggleTable;
