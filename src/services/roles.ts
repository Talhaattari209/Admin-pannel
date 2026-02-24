import apiClient from '@/lib/api-client';
import { Role, RoleCreate, RoleUpdate, PaginatedResponse } from '@/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// API Functions
// Helper function to transform API response to frontend format
const transformRole = (apiRole: any): Role => {
    try {
        // Handle teamMembers as either integer count or array
        let teamMembersCount = 0;
        if (typeof apiRole.teamMembers === 'number') {
            teamMembersCount = apiRole.teamMembers; // Already a count
        } else if (Array.isArray(apiRole.teamMembers)) {
            teamMembersCount = apiRole.teamMembers.length; // Array, get length
        }

        const transformed = {
            id: apiRole.id || apiRole._id,
            title: apiRole.title,
            description: apiRole.description,
            resources: apiRole.resources || [],
            member_count: teamMembersCount,
            created_at: apiRole.createdAt || apiRole.created_at || '',
            updated_at: apiRole.updatedAt || apiRole.updated_at || '',
        };
        console.log(`[transformRole] ${apiRole.title}: teamMembers = ${apiRole.teamMembers} (${typeof apiRole.teamMembers}) → member_count = ${teamMembersCount}`);
        return transformed;
    } catch (error) {
        console.error('[transformRole] Error transforming role:', apiRole, error);
        throw error;
    }
};

export const rolesService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<Role>> => {
        const { data } = await apiClient.get<any>('/admin/roles', { params });

        console.log('[Roles Service] Raw API response:', data);

        // Handle different response structures: could be data.data.roles, data.roles, or data.data array
        let responseData;
        if (data.data?.roles) {
            responseData = data.data.roles; // Nested in data.data.roles
        } else if (data.roles) {
            responseData = data.roles; // In data.roles
        } else if (Array.isArray(data.data)) {
            responseData = data.data; // Direct array in data.data
        } else if (Array.isArray(data)) {
            responseData = data; // Direct array
        } else {
            responseData = [];
        }

        const dataArray = Array.isArray(responseData) ? responseData : [];
        console.log('[Roles Service] Extracted array:', dataArray);

        // Transform the response to include member_count calculated from teamMembers
        return {
            data: dataArray.map(transformRole),
            total: data.pagination?.total || data.total || 0,
            page: data.pagination?.page || data.page || 1,
            limit: data.pagination?.limit || data.limit || 10,
            pages: data.pagination?.totalPages || data.pages || 1,
        };
    },

    getById: async (id: string): Promise<Role> => {
        const { data } = await apiClient.get<any>(`/admin/roles/${id}`);
        return transformRole(data);
    },

    create: async (roleData: RoleCreate): Promise<Role> => {
        const { data } = await apiClient.post<any>('/admin/roles', roleData);
        return transformRole(data);
    },

    update: async (id: string, roleData: RoleUpdate): Promise<Role> => {
        const { data } = await apiClient.put<any>(`/admin/roles/${id}`, roleData);
        return transformRole(data);
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

    return useMutation<Role, AxiosError<any>, RoleCreate>({
        mutationFn: rolesService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation<Role, AxiosError<any>, { id: string; data: RoleUpdate }>({
        mutationFn: ({ id, data }) => rolesService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<any>, string>({
        mutationFn: rolesService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};
