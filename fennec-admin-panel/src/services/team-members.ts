import apiClient from '@/lib/api-client';
import { TeamMember, TeamMemberCreate, TeamMemberUpdate, PaginatedResponse } from '@/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// API Functions
export const teamMembersService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<TeamMember>> => {
        const { data } = await apiClient.get<PaginatedResponse<TeamMember>>('/admin/team-members', { params });
        return data;
    },

    getById: async (id: string): Promise<TeamMember> => {
        const { data } = await apiClient.get<TeamMember>(`/admin/team-members/${id}`);
        return data;
    },

    create: async (memberData: TeamMemberCreate): Promise<TeamMember> => {
        const { data } = await apiClient.post<TeamMember>('/admin/team-members', memberData);
        return data;
    },

    update: async (id: string, memberData: TeamMemberUpdate): Promise<TeamMember> => {
        const { data } = await apiClient.put<TeamMember>(`/admin/team-members/${id}`, memberData);
        return data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/team-members/${id}`);
    },
};

// React Query Hooks
export const useTeamMembers = (params?: { page?: number; limit?: number; search?: string }) => {
    return useQuery<PaginatedResponse<TeamMember>, AxiosError>({
        queryKey: ['team-members', params],
        queryFn: () => teamMembersService.getAll(params),
    });
};

export const useTeamMember = (id: string) => {
    return useQuery<TeamMember, AxiosError>({
        queryKey: ['team-member', id],
        queryFn: () => teamMembersService.getById(id),
        enabled: !!id,
    });
};

export const useCreateTeamMember = () => {
    const queryClient = useQueryClient();

    return useMutation<TeamMember, AxiosError, TeamMemberCreate>({
        mutationFn: teamMembersService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
    });
};

export const useUpdateTeamMember = () => {
    const queryClient = useQueryClient();

    return useMutation<TeamMember, AxiosError, { id: string; data: TeamMemberUpdate }>({
        mutationFn: ({ id, data }) => teamMembersService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
    });
};

export const useDeleteTeamMember = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, string>({
        mutationFn: teamMembersService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
    });
};
