import apiClient from '@/lib/api-client';
import { User, UserStatistics, PaginatedResponse } from '@/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface ExportResponse {
    fileUrl: string;
    format: string;
}

export interface ExportParams {
    format?: string;
    timelaps?: string;
    startDate?: string;
    endDate?: string;
}

// Helper function to transform API response to frontend format
const transformUser = (apiUser: any): User => {
    return {
        id: apiUser._id || apiUser.id,
        first_name: apiUser.firstName || '',
        last_name: apiUser.lastName || '',
        email: apiUser.email || '',
        phone: apiUser.phone || undefined,
        status: apiUser.subscriptionActive ? 'premium' : 'free',
        verified: apiUser.isVerified || false,
        created_at: apiUser.createdAt || apiUser.created_at || '',
        last_active: apiUser.updatedAt || apiUser.last_active || null,
        dob: apiUser.dob || undefined,
        gender: apiUser.gender || undefined,
        sexualOrientation: apiUser.sexualOrientation || [],
        pronouns: apiUser.pronouns || undefined,
        shortBio: apiUser.shortBio || undefined,
        jobTitle: apiUser.jobTitle || undefined,
        education: apiUser.education || undefined,
        lifestyleLikes: apiUser.lifestyleLikes || [],
        vibes: apiUser.vibes || undefined,
        bestShorts: apiUser.bestShorts || [],
        accountStatus: apiUser.accountStatus || 'active',
        authType: apiUser.authType || undefined,
        subscriptionActive: apiUser.subscriptionActive || false,
        pokeBalance: apiUser.pokeBalance || 0,
        countryCode: apiUser.countryCode || undefined,
        isPhoneVerified: apiUser.isPhoneVerified || false,
        verifiedAt: apiUser.verifiedAt || undefined,
        prompts: (apiUser.prompts || []).map((p: any) => ({
            id: p.id || p._id,
            promptTitle: p.promptTitle || '',
            promptAnswer: p.promptAnswer || '',
            type: p.type || 'text',
            groupId: p.groupId || null,
            createdAt: p.createdAt || '',
            updatedAt: p.updatedAt || '',
        })),
    };
};

// API Functions
export const usersService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<User>> => {
        try {
            console.log('[Users Service] Fetching users with params:', params);

            const { data } = await apiClient.get<any>('/admin/users', { params });

            console.log('[Users Service] Raw API response:', data);

            // API returns: { data: { users: [...], pagination: {...} } }
            const usersArray = data.data?.users || [];
            const paginationData = data.data?.pagination || {};

            console.log('[Users Service] Users array:', usersArray);
            console.log('[Users Service] Pagination:', paginationData);

            // Transform the response to match frontend types
            const transformedData = {
                data: usersArray.map(transformUser),
                total: paginationData.total || 0,
                page: paginationData.page || 1,
                limit: paginationData.limit || 10,
                pages: paginationData.totalPages || 1,
            };

            console.log('[Users Service] Transformed data:', transformedData);

            return transformedData;
        } catch (error) {
            console.error('[Users Service] Error fetching users:', error);
            throw error;
        }
    },

    getById: async (id: string): Promise<User> => {
        const { data } = await apiClient.get<any>(`/admin/users/${id}`);
        // API returns: { data: { users: [...] } } with a single-element array
        const users = data.data?.users || [];
        if (users.length > 0) return transformUser(users[0]);
        throw new Error('User not found');
    },

    getStatistics: async (): Promise<UserStatistics> => {
        const { data } = await apiClient.get<any>('/admin/users/stats');
        // API returns: { data: { totalUsers, activeThisWeek, ... } }
        return (data.data || data) as UserStatistics;
    },

    deactivateUser: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/users/${id}`);
    },

    export: async (params?: ExportParams): Promise<ExportResponse> => {
        const { data } = await apiClient.get<any>('/admin/users/export', {
            params: { format: 'csv', timelaps: 'allTime', ...params }
        });
        return data.data as ExportResponse;
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

export const useExportUsers = () => {
    return useMutation<ExportResponse, AxiosError, ExportParams | undefined>({
        mutationFn: usersService.export,
    });
};
