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
    // IMPORTANT: Module names must match backend validation exactly (all lowercase)
    const allModules = [
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

/**
 * Check if user has a specific permission for a module
 * Permissions are module-based: 'view', 'edit', 'delete', 'export'
 * Note: 'edit' permission implies ability to both edit AND add items
 */
export function hasModulePermission(
    permissions: ResourcePermission[],
    moduleName: string,
    permission: 'view' | 'edit' | 'delete' | 'export'
): boolean {
    if (!permissions || !Array.isArray(permissions)) {
        return false;
    }

    const modulePermissions = permissions.find(
        p => p.module.toLowerCase() === moduleName.toLowerCase()
    );
    return modulePermissions?.permissions.includes(permission) || false;
}

/**
 * Check if user can view a module (for sidebar visibility)
 */
export function canViewModule(
    permissions: ResourcePermission[],
    moduleName: string
): boolean {
    return hasModulePermission(permissions, moduleName, 'view');
}

/**
 * Check if user can edit/add items in a module
 * This covers both editing existing items AND adding new items
 */
export function canEditModule(
    permissions: ResourcePermission[],
    moduleName: string
): boolean {
    return hasModulePermission(permissions, moduleName, 'edit');
}

/**
 * Check if user can delete items in a module
 */
export function canDeleteModule(
    permissions: ResourcePermission[],
    moduleName: string
): boolean {
    return hasModulePermission(permissions, moduleName, 'delete');
}

/**
 * Check if user can export data from a module
 */
export function canExportModule(
    permissions: ResourcePermission[],
    moduleName: string
): boolean {
    return hasModulePermission(permissions, moduleName, 'export');
}
