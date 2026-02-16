import apiClient from '@/lib/api-client';
import { User, UserStatistics, PaginatedResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// API Functions
export const usersService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<User>> => {
        const { data } = await apiClient.get<PaginatedResponse<User>>('/admin/users', { params });
        return data;
    },

    getById: async (id: string): Promise<User> => {
        const { data } = await apiClient.get<User>(`/admin/users/${id}`);
        return data;
    },

    getStatistics: async (): Promise<UserStatistics> => {
        const { data } = await apiClient.get<UserStatistics>('/admin/users/stats');
        return data;
    },

    deactivateUser: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/users/${id}`);
    },
};

// React Query Hooks
export const useUsers = (params?: { page?: number; limit?: number; search?: string }) => {
    return useQuery<PaginatedResponse<User>, AxiosError>({
        queryKey: ['users', params],
        queryFn: () => usersService.getAll(params),
    });
};

export const useUser = (id: string) => {
    return useQuery<User, AxiosError>({
        queryKey: ['user', id],
        queryFn: () => usersService.getById(id),
        enabled: !!id,
    });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeactivateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, string>({
        mutationFn: (id) => usersService.deactivateUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user-statistics'] });
        },
    });
};

export const useUserStatistics = () => {
    return useQuery<UserStatistics, AxiosError>({
        queryKey: ['user-statistics'],
        queryFn: usersService.getStatistics,
    });
};
