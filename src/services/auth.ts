import apiClient from '@/lib/api-client';
import { LoginRequest, LoginResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth-store';
import { AxiosError } from 'axios';

// API Functions
export const authService = {
    superAdminLogin: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const { data } = await apiClient.post<LoginResponse>('/admin/auth/login', credentials);
        return data;
    },

    teamMemberLogin: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const { data } = await apiClient.post<LoginResponse>('/admin/auth/login', credentials);
        return data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/admin/auth/logout');
    },

    updatePassword: async (newPassword: string): Promise<void> => {
        await apiClient.post('/admin/auth/super-admin/update-password', { newPassword });
    },
};

// Unified login hook for both Super Admin and Team Members
export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation<LoginResponse, AxiosError, LoginRequest>({
        mutationFn: authService.superAdminLogin, // Both point to the same endpoint
        onSuccess: (data) => {
            const transformedData: any = data as any;

            // 1. Identify User and isSuperAdmin status
            let user = transformedData.user;
            let isSuperAdmin = !!user?.isSuperAdmin;

            if (transformedData.superAdmin) {
                user = {
                    id: transformedData.superAdmin.id,
                    email: transformedData.superAdmin.email,
                    name: transformedData.superAdmin.name || 'Super Admin',
                    isSuperAdmin: true,
                    role: null
                };
                isSuperAdmin = true;
            } else if (transformedData.teamMember) {
                user = {
                    id: transformedData.teamMember.id,
                    email: transformedData.teamMember.email,
                    name: transformedData.teamMember.name || transformedData.teamMember.email,
                    isSuperAdmin: false,
                    role: transformedData.teamMember.role_id || transformedData.teamMember.role || null
                };
                isSuperAdmin = false;
            }

            // 2. Extract Permissions
            // Permissions can be in: 
            // - top-level 'permissions'
            // - teamMember.role.resources
            // - teamMember.resources
            // - user.role.resources
            const permissions = transformedData.permissions
                || (transformedData.teamMember?.role?.resources)
                || (transformedData.teamMember?.resources)
                || (user?.role?.resources)
                || [];

            setAuth(
                user,
                permissions,
                transformedData.accessToken,
                transformedData.refreshToken
            );
        },
    });
};

// Deprecated: use useLogin instead
export const useSuperAdminLogin = useLogin;
export const useTeamMemberLogin = useLogin;

export const useLogout = () => {
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            clearAuth();
        },
    });
};
