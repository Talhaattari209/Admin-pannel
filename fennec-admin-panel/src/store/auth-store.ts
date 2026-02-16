import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminUserInfo, ResourcePermission } from '@/types/api';

interface AuthState {
    user: AdminUserInfo | null;
    permissions: ResourcePermission[];
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;

    setAuth: (user: AdminUserInfo, permissions: ResourcePermission[], accessToken: string, refreshToken: string) => void;
    clearAuth: () => void;
    hasPermission: (module: string, permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            permissions: [],
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,

            setAuth: (user, permissions, accessToken, refreshToken) => {
                // Store tokens in localStorage for API client interceptor
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                set({
                    user,
                    permissions,
                    isAuthenticated: true,
                    accessToken,
                    refreshToken,
                });
            },

            clearAuth: () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                set({
                    user: null,
                    permissions: [],
                    isAuthenticated: false,
                    accessToken: null,
                    refreshToken: null,
                });
            },

            hasPermission: (module: string, permission: string) => {
                const { permissions, user } = get();

                // Super admin has all permissions
                if (user?.isSuperAdmin) {
                    return true;
                }

                // Check if user has specific permission for module
                const modulePermissions = permissions.find(p => p.module === module);
                return modulePermissions?.permissions.includes(permission) || false;
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                permissions: state.permissions,
                isAuthenticated: state.isAuthenticated,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }),
        }
    )
);
