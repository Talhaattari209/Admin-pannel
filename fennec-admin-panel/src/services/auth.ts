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

// React Query Hooks
export const useSuperAdminLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation<LoginResponse, AxiosError, LoginRequest>({
        mutationFn: authService.superAdminLogin,
        onSuccess: (data) => {
            setAuth(data.user, data.permissions, data.accessToken, data.refreshToken);
        },
    });
};

export const useTeamMemberLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation<LoginResponse, AxiosError, LoginRequest>({
        mutationFn: authService.teamMemberLogin,
        onSuccess: (data) => {
            setAuth(data.user, data.permissions, data.accessToken, data.refreshToken);
        },
    });
};

export const useLogout = () => {
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            clearAuth();
        },
    });
};
