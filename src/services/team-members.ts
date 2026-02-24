import apiClient from '@/lib/api-client';
import { TeamMember, TeamMemberCreate, TeamMemberUpdate, TeamMemberMeUpdate, ChangePasswordRequest, PaginatedResponse } from '@/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Helper function to transform API response to frontend format
const transformTeamMember = (apiMember: any): TeamMember => {
    try {
        const transformed = {
            id: apiMember.id || apiMember._id,
            name: apiMember.name,
            email: apiMember.email,
            role_id: apiMember.role?._id || apiMember.role?.id || apiMember.role_id || '',
            role: apiMember.role ? {
                id: apiMember.role._id || apiMember.role.id,
                title: apiMember.role.title,
                description: apiMember.role.description,
                resources: apiMember.role.resources || [],
                member_count: 0, // Not needed in team member context
                created_at: apiMember.role.createdAt || apiMember.role.created_at || '',
                updated_at: apiMember.role.updatedAt || apiMember.role.updated_at || '',
            } : undefined,
            status: apiMember.status,
            is_active: apiMember.status === 'active',
            created_at: apiMember.addedOn || apiMember.createdAt || apiMember.created_at || '',
            updated_at: apiMember.updatedAt || apiMember.updated_at || '',
            last_login: apiMember.lastActive || apiMember.last_active || null,
        };
        console.log('[transformTeamMember] Transformed:', apiMember.name, '→', transformed);
        return transformed;
    } catch (error) {
        console.error('[transformTeamMember] Error transforming team member:', apiMember, error);
        throw error;
    }
};

// API Functions
export const teamMembersService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<TeamMember>> => {
        const { data } = await apiClient.get<any>('/admin/team-members', { params });

        console.log('[Team Members Service] Raw API response:', data);

        // Handle the actual API structure: data.data.members
        const responseData = data.data?.members || data.members || data.data || data || [];
        const dataArray = Array.isArray(responseData) ? responseData : [];

        console.log('[Team Members Service] Extracted array:', dataArray);

        // Transform the response to match frontend types
        return {
            data: dataArray.map(transformTeamMember),
            total: data.pagination?.total || data.total || 0,
            page: data.pagination?.page || data.page || 1,
            limit: data.pagination?.limit || data.limit || 10,
            pages: data.pagination?.totalPages || data.pages || 1,
        };
    },

    getById: async (id: string): Promise<TeamMember> => {
        const { data } = await apiClient.get<any>(`/admin/team-members/${id}`);
        return transformTeamMember(data);
    },

    create: async (memberData: TeamMemberCreate): Promise<TeamMember> => {
        console.log('[teamMembersService] Creating team member with data:', memberData);
        console.log('[teamMembersService] Request URL: /admin/team-members');
        const { data } = await apiClient.post<any>('/admin/team-members', memberData);
        console.log('[teamMembersService] Response:', data);
        return transformTeamMember(data);
    },

    update: async (id: string, memberData: TeamMemberUpdate): Promise<TeamMember> => {
        const { data } = await apiClient.put<any>(`/admin/team-members/${id}`, memberData);
        return transformTeamMember(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/team-members/${id}`);
    },

    getMe: async (): Promise<TeamMember> => {
        const { data } = await apiClient.get<{ data: { members: any[] } }>('/admin/team-members/me');
        const members = data.data?.members || [];
        if (members.length === 0) throw new Error('No current user');
        return transformTeamMember(members[0]);
    },

    updateMe: async (payload: TeamMemberMeUpdate): Promise<TeamMember> => {
        const { data } = await apiClient.put<{ data: { members: any[] } }>('/admin/team-members/me', payload);
        const members = data.data?.members || [];
        if (members.length === 0) throw new Error('No current user');
        return transformTeamMember(members[0]);
    },

    changePassword: async (payload: ChangePasswordRequest): Promise<TeamMember> => {
        const { data } = await apiClient.put<{ data: { members: any[] } }>('/admin/team-members/change-password', payload);
        const members = data.data?.members || [];
        if (members.length === 0) throw new Error('No current user');
        return transformTeamMember(members[0]);
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
            queryClient.invalidateQueries({ queryKey: ['roles'] }); // Refresh roles to update member counts
        },
    });
};

export const useUpdateTeamMember = () => {
    const queryClient = useQueryClient();

    return useMutation<TeamMember, AxiosError, { id: string; data: TeamMemberUpdate }>({
        mutationFn: ({ id, data }) => teamMembersService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
            queryClient.invalidateQueries({ queryKey: ['roles'] }); // Refresh roles to update member counts
        },
    });
};

export const useDeleteTeamMember = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, string>({
        mutationFn: teamMembersService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
            queryClient.invalidateQueries({ queryKey: ['roles'] }); // Refresh roles to update member counts
        },
    });
};

// Account Settings: current user (me) and change password
const ME_QUERY_KEY = ['team-member', 'me'];

export const useTeamMemberMe = () => {
    return useQuery<TeamMember, AxiosError>({
        queryKey: ME_QUERY_KEY,
        queryFn: teamMembersService.getMe,
    });
};

export const useUpdateTeamMemberMe = () => {
    const queryClient = useQueryClient();
    return useMutation<TeamMember, AxiosError<any>, TeamMemberMeUpdate>({
        mutationFn: teamMembersService.updateMe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
    });
};

export const useChangePassword = () => {
    const queryClient = useQueryClient();
    return useMutation<TeamMember, AxiosError<any>, ChangePasswordRequest>({
        mutationFn: teamMembersService.changePassword,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
    });
};
