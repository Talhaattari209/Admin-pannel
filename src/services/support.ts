import apiClient from '@/lib/api-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// =============================================
// Types — based on actual API responses from
// Support_Req_Response.json
// =============================================

export interface SupportRequestUser {
    name: string;
    email: string;
    image: string;
}

// Returned by GET /admin/support-requests list
export interface SupportRequest {
    id: string;
    user: SupportRequestUser;
    subject: string;
    message: string;
    status: string; // 'new' | 'pending' | 'reviewing' | 'resolved' | 'closed'
    createdAt: string;
}

// Returned by GET /admin/support-requests/stats
export interface SupportStats {
    totalRequests: number;
    openRequests: number;
    closedRequests: number;
    avgResolutionTimeMs: number | null;
}

// Returned by GET /admin/support-requests/:id (detail)
export interface SupportRequestDetail {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        userImage: string;
        dob: string;
        bestShorts: string[];
        shortBio: string;
        jobTitle: string;
        education: string;
        age: string;
        name: string;
    };
    supportRequest: {
        subject: string;
        message: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    };
    activity: SupportActivity[];
}

export interface SupportActivity {
    type: string; // 'created' | 'status_updated'
    timestamp: string;
    fromStatus?: string;
    toStatus?: string;
    note?: string;
}

export interface SupportListResponse {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    supportRequests: SupportRequest[];
}

export interface SupportExportResponse {
    fileUrl: string;
    format: string;
}

// =============================================
// Service Functions
// =============================================

export const supportService = {

    // GET /admin/support-requests/stats
    // Response: { data: { totalRequests, openRequests, closedRequests, avgResolutionTimeMs } }
    getStats: async (): Promise<SupportStats> => {
        const { data } = await apiClient.get<any>('/admin/support-requests/stats');
        return data.data as SupportStats;
    },

    // GET /admin/support-requests?page=&limit=&status=&search=
    // Response: { data: { pagination: {...}, supportRequests: [...] } }
    getAll: async (params?: { page?: number; limit?: number; status?: string; search?: string }): Promise<SupportListResponse> => {
        const { data } = await apiClient.get<any>('/admin/support-requests', { params });
        const pagination = data.data?.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 };
        const supportRequests = data.data?.supportRequests || [];
        return { pagination, supportRequests };
    },

    // GET /admin/support-requests/:id
    // Response: top-level { data:{}, user:{...}, supportRequest:{...}, activity:[...] }
    getById: async (id: string): Promise<SupportRequestDetail> => {
        const { data } = await apiClient.get<any>(`/admin/support-requests/${id}`);
        return {
            user: data.user,
            supportRequest: data.supportRequest,
            activity: data.activity || [],
        };
    },

    // PUT /admin/support-requests/:id/status
    // Body: { status: string, notes?: string }
    // Response: { data:{}, supportRequest:{...} }
    updateStatus: async (id: string, payload: { status: string; notes?: string }): Promise<void> => {
        await apiClient.put(`/admin/support-requests/${id}/status`, payload);
    },

    // GET /admin/support-requests/export
    // Params: format (csv|json), timelaps (last7days|thisMonth|...|allTime), startDate, endDate
    // Response: { data: { fileUrl: string, format: string } }
    exportRequests: async (params?: { format?: string; timelaps?: string; startDate?: string; endDate?: string }): Promise<SupportExportResponse> => {
        const { data } = await apiClient.get<any>('/admin/support-requests/export', {
            params: { format: 'json', timelaps: 'allTime', ...params }
        });
        return data.data as SupportExportResponse;
    },
};

// =============================================
// React Query Hooks
// =============================================

export const useSupportStats = () => {
    return useQuery<SupportStats, AxiosError>({
        queryKey: ['support-stats'],
        queryFn: supportService.getStats,
    });
};

export const useSupportRequests = (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
    return useQuery<SupportListResponse, AxiosError>({
        queryKey: ['support-requests', params],
        queryFn: () => supportService.getAll(params),
    });
};

export const useSupportRequestDetail = (id: string | null) => {
    return useQuery<SupportRequestDetail, AxiosError>({
        queryKey: ['support-request-detail', id],
        queryFn: () => supportService.getById(id!),
        enabled: !!id,
    });
};

export const useUpdateSupportStatus = () => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, { id: string; status: string; notes?: string }>({
        mutationFn: ({ id, status, notes }) => supportService.updateStatus(id, { status, notes }),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ['support-requests'] });
            qc.invalidateQueries({ queryKey: ['support-stats'] });
            qc.invalidateQueries({ queryKey: ['support-request-detail', variables.id] });
        },
    });
};

export const useExportSupportRequests = () => {
    return useMutation<SupportExportResponse, AxiosError, { format?: string; timelaps?: string; startDate?: string; endDate?: string } | undefined>({
        mutationFn: (params) => supportService.exportRequests(params),
    });
};
