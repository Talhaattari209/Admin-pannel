import { ResourcePermission } from '@/types/api';

/**
 * Convert API resources array format to UI toggle format
 * 
 * API format: [{ module: "Users Management", permissions: ["view", "edit"] }]
 * UI format: { "Users Management": { view: true, edit: true, delete: false, export: false } }
 */
export function resourcesToToggles(
    resources: ResourcePermission[]
): Record<string, Record<string, boolean>> {
    const toggles: Record<string, Record<string, boolean>> = {};

    // Initialize all modules with all permissions set to false
    const allModules = [
        'Users Management',
        'App Content',
        'Support Requests',
        'Reported Problems',
        'App Settings',
        'Team & Roles',
        'System Logs'
    ];

    const allPermissions = ['view', 'edit', 'delete', 'export'];

    allModules.forEach(module => {
        toggles[module] = {};
        allPermissions.forEach(permission => {
            toggles[module][permission] = false;
        });
    });

    // Set enabled permissions from API response
    resources.forEach(resource => {
        if (!toggles[resource.module]) {
            toggles[resource.module] = {};
            allPermissions.forEach(permission => {
                toggles[resource.module][permission] = false;
            });
        }

        resource.permissions.forEach(permission => {
            toggles[resource.module][permission] = true;
        });
    });

    return toggles;
}

/**
 * Convert UI toggle format to API resources array format
 * 
 * UI format: { "Users Management": { view: true, edit: true, delete: false, export: false } }
 * API format: [{ module: "Users Management", permissions: ["view", "edit"] }]
 */
export function togglesToResources(
    toggles: Record<string, Record<string, boolean>>
): ResourcePermission[] {
    const resources: ResourcePermission[] = [];

    Object.entries(toggles).forEach(([module, permissions]) => {
        const enabledPermissions = Object.entries(permissions)
            .filter(([_, enabled]) => enabled)
            .map(([permission, _]) => permission);

        // Only include modules that have at least one permission enabled
        if (enabledPermissions.length > 0) {
            resources.push({
                module,
                permissions: enabledPermissions
            });
        }
    });

    return resources;
}
