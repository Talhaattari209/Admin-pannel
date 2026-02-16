import apiClient from '@/lib/api-client';
import { Role, RoleCreate, RoleUpdate, PaginatedResponse } from '@/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// API Functions
export const rolesService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<Role>> => {
        const { data } = await apiClient.get<PaginatedResponse<Role>>('/admin/roles', { params });
        return data;
    },

    getById: async (id: string): Promise<Role> => {
        const { data } = await apiClient.get<Role>(`/admin/roles/${id}`);
        return data;
    },

    create: async (roleData: RoleCreate): Promise<Role> => {
        const { data } = await apiClient.post<Role>('/admin/roles', roleData);
        return data;
    },

    update: async (id: string, roleData: RoleUpdate): Promise<Role> => {
        const { data } = await apiClient.put<Role>(`/admin/roles/${id}`, roleData);
        return data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/roles/${id}`);
    },
};

// React Query Hooks
export const useRoles = (params?: { page?: number; limit?: number; search?: string }) => {
    return useQuery<PaginatedResponse<Role>, AxiosError>({
        queryKey: ['roles', params],
        queryFn: () => rolesService.getAll(params),
    });
};

export const useRole = (id: string) => {
    return useQuery<Role, AxiosError>({
        queryKey: ['role', id],
        queryFn: () => rolesService.getById(id),
        enabled: !!id,
    });
};

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation<Role, AxiosError, RoleCreate>({
        mutationFn: rolesService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation<Role, AxiosError, { id: string; data: RoleUpdate }>({
        mutationFn: ({ id, data }) => rolesService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, string>({
        mutationFn: rolesService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};
