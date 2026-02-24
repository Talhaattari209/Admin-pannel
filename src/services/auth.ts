import { useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { LoginRequest, LoginResponse } from '@/types/api';
import { useMutation, useQuery } from '@tanstack/react-query';
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

    getCurrentAdmin: async (): Promise<any> => {
        const { data } = await apiClient.get('/admin/auth/me');
        return data;
    },
};

// Unified login hook for both Super Admin and Team Members
export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation<LoginResponse, AxiosError<any>, LoginRequest>({
        mutationFn: authService.superAdminLogin, // Both point to the same endpoint
        onSuccess: (responseBody: any) => {
            // Support responses wrapped in a "data" property
            const data = responseBody?.data || responseBody;
            console.log('[Login Success] Response Body keys:', Object.keys(responseBody));
            console.log('[Login Success] Data keys:', Object.keys(data));

            // 1. Extract Tokens (support camelCase and snake_case)
            let accessToken = data.accessToken || data.access_token || responseBody.accessToken || responseBody.access_token;
            let refreshToken = data.refreshToken || data.refresh_token || responseBody.refreshToken || responseBody.refresh_token;

            // Trim tokens to avoid potential whitespace issues
            if (typeof accessToken === 'string') accessToken = accessToken.trim();
            if (typeof refreshToken === 'string') refreshToken = refreshToken.trim();

            console.log(`[Login Success] Tokens found - Access: ${!!accessToken}, Refresh: ${!!refreshToken}`);
            if (accessToken) {
                console.log(`[Login Success] Access Token Preview: ${accessToken.substring(0, 10)}...`);
            }

            // 2. Identify User and isSuperAdmin status
            let userObj = data.user || data.User || data.superAdmin || data.super_admin || data.teamMember || data.team_member || data.admin;

            // If no user object is found but we have tokens, the root object might be the user (minimal response)
            if (!userObj && (accessToken || refreshToken) && (data.email || data.id)) {
                userObj = data;
                console.log('[Login Success] Using root data as user object');
            }

            if (!userObj) {
                console.error('[Login Success] FATAL: Could not find user object in response body');
                console.log('[Login Success] Data inspected:', JSON.stringify(data).substring(0, 500));
                return;
            }

            // Determine if this is the unique Super Admin
            const hasTeamMemberKey = !!(data.teamMember || data.team_member);
            const isSuperAdminFlag = !!(userObj.isSuperAdmin || userObj.is_super_admin || data.isSuperAdmin || data.is_super_admin);
            const isSuperAdmin = (!!(data.superAdmin || data.super_admin)) || (!hasTeamMemberKey && isSuperAdminFlag) || (!hasTeamMemberKey && !!accessToken);

            console.log(`[Login Success] Super Admin Detection: isSuperAdmin=${isSuperAdmin}, hasTeamMemberKey=${hasTeamMemberKey}, isSuperAdminFlag=${isSuperAdminFlag}`);

            let user;
            if (isSuperAdmin) {
                user = {
                    id: userObj.id || userObj._id || 'super-admin',
                    email: userObj.email || '',
                    name: userObj.name || userObj.email || 'Super Admin',
                    isSuperAdmin: true,
                    role: null
                };
            } else {
                user = {
                    id: userObj.id || userObj._id,
                    email: userObj.email,
                    name: userObj.name || userObj.email,
                    isSuperAdmin: false,
                    role: userObj.role_id || userObj.role || null
                };
            }

            // 3. Extract Permissions
            const permissions = data.permissions
                || (data.teamMember?.role?.resources)
                || (data.teamMember?.resources)
                || (userObj.role?.resources)
                || (userObj.resources)
                || [];

            console.log(`[Login Success] Extracted ${permissions.length} permission modules`);

            if (!accessToken) {
                console.warn('[Login Success] WARNING: No access token found in response. API calls will likely fail.');
            }

            setAuth(
                user,
                permissions,
                accessToken,
                refreshToken
            );

            console.log('[Login Success] setAuth complete, redirecting should follow...');
        },
    });
};

export const useAdmin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const user = useAuthStore((state) => state.user);
    const permissions = useAuthStore((state) => state.permissions);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const query = useQuery<any, AxiosError>({
        queryKey: ['admin-me'],
        queryFn: authService.getCurrentAdmin,
        enabled: isAuthenticated,
        select: (response: any) => {
            const data = response?.data || response;
            // Map the API response to our AdminUserInfo interface
            return {
                id: data.id || data._id,
                email: data.email,
                name: data.name || data.email?.split('@')[0] || 'Admin',
                isSuperAdmin: data.role === 'super_admin' || !!data.isSuperAdmin,
                role: data.role || null
            };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Keep auth store in sync with fetched profile
    useEffect(() => {
        if (query.data && isAuthenticated) {
            // If we already have a user in the store, only update if generic fields changed
            if (user) {
                const hasChanged = user.name !== query.data.name || user.email !== query.data.email;
                if (hasChanged) {
                    console.log('[useAdmin] Syncing profile changes to store');
                    useAuthStore.getState().updateUser({
                        name: query.data.name,
                        email: query.data.email,
                    });
                }
            } else {
                // Initial load, if we have token but no user object yet
                console.log('[useAdmin] Initializing store with fetched profile');
                const accessToken = localStorage.getItem('accessToken') || '';
                const refreshToken = localStorage.getItem('refreshToken') || '';
                setAuth(query.data, permissions, accessToken, refreshToken);
            }
        }
    }, [query.data, isAuthenticated, user?.name, user?.email, setAuth, permissions]);

    return query;
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
