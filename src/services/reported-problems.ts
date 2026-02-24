import apiClient from '@/lib/api-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// =============================================
// API types (from Reported_problem.json)
// =============================================

export interface UserReportsStats {
    pendingReviews: number;
    resolvedReports: number;
    totalUserReports: number;
    repeatOffenders: number;
}

export interface BugsStats {
    totalBugsReports: number;
    pendingReviews: number;
    resolvedReports: number;
    repeatReports: number;
}

export interface ApiUserRef {
    name: string;
    email: string;
    image: string;
}

export interface ApiUserReportItem {
    id: string;
    reportedBy: ApiUserRef;
    reportedUser: ApiUserRef & { image: string };
    category: string;
    description: string;
    reports: number;
    status: string;
    submittedOn: string;
}

export interface ApiBugReportItem {
    id: string;
    user: ApiUserRef;
    subject: string;
    message: string;
    attachments: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserReportDetailResponse {
    reportedUser: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        userImage: string;
        name: string;
        age: number;
        isVerified: boolean;
        sexualOrientation?: string[];
        pronouns?: string;
        address?: string;
        shortBio?: string;
        jobTitle?: string;
        education?: string;
        lifestyleLikes?: string[];
    };
    activity: ReportedProblemActivity[];
}

export interface BugReportDetailResponse {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        userImage: string;
        name: string;
    };
    report: {
        id: string;
        subject: string;
        message: string;
        attachments: string[];
        status: string;
        createdAt: string;
        updatedAt: string;
    };
    activity: ReportedProblemActivity[];
}

export interface ReportedProblemActivity {
    type: string;
    timestamp: string;
    user?: { id: string; name: string; email: string };
    fromStatus?: string;
    toStatus?: string;
    note?: string;
}

export interface ExportResponse {
    fileUrl: string;
    format: string;
}

// =============================================
// UI types (match existing table row components)
// =============================================

export type UserReportData = {
    id: string;
    reportedBy: { name: string; email: string; avatar: string };
    reportedUser: { name: string; email: string; avatar: string; age: number };
    category: string;
    reports: number;
    description: string;
    status: 'New' | 'Pending' | 'Reviewing' | 'Resolved' | 'Closed';
    submittedOn: string;
};

export type BugReportData = {
    id: string;
    reportedBy: { name: string; email: string; avatar: string };
    subject: string;
    message: string;
    status: 'New' | 'Pending' | 'Reviewing' | 'Resolved' | 'Closed';
    submittedOn: string;
    attachments?: string[];
};

// =============================================
// Mappers: API -> UI
// =============================================

const capitalizeStatus = (s: string): UserReportData['status'] => {
    const lower = (s || '').toLowerCase();
    const map: Record<string, UserReportData['status']> = {
        new: 'New',
        pending: 'Pending',
        reviewing: 'Reviewing',
        resolved: 'Resolved',
        closed: 'Closed',
    };
    return map[lower] || 'New';
};

function formatSubmittedOn(iso: string): string {
    try {
        const d = new Date(iso);
        const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return `${date} • ${time}`;
    } catch {
        return iso;
    }
}

export function mapApiUserReportToUi(r: ApiUserReportItem): UserReportData {
    return {
        id: r.id,
        reportedBy: {
            name: r.reportedBy.name,
            email: r.reportedBy.email,
            avatar: r.reportedBy.image || '',
        },
        reportedUser: {
            name: r.reportedUser.name,
            email: r.reportedUser.email,
            avatar: r.reportedUser.image || '',
            age: 0,
        },
        category: r.category,
        reports: r.reports ?? 0,
        description: r.description ?? '',
        status: capitalizeStatus(r.status),
        submittedOn: formatSubmittedOn(r.submittedOn),
    };
}

export function mapApiBugReportToUi(r: ApiBugReportItem): BugReportData {
    return {
        id: r.id,
        reportedBy: {
            name: r.user.name,
            email: r.user.email,
            avatar: r.user.image || '',
        },
        subject: r.subject,
        message: r.message,
        status: capitalizeStatus(r.status),
        submittedOn: formatSubmittedOn(r.createdAt),
        attachments: r.attachments,
    };
}

// =============================================
// User Reports API
// =============================================

export const reportedProblemsService = {
    getUserReportsStats: async (): Promise<UserReportsStats> => {
        const { data } = await apiClient.get<{ data: UserReportsStats }>('/admin/reported-problems/users/stats');
        return data.data;
    },

    getUserReports: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        category?: string;
    }): Promise<{ pagination: { page: number; limit: number; total: number; totalPages: number }; reports: UserReportData[] }> => {
        const { data } = await apiClient.get<{
            data: { pagination: { page: number; limit: number; total: number; totalPages: number }; reports: ApiUserReportItem[] };
        }>('/admin/reported-problems/users', { params });
        const pagination = data.data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 1 };
        const reports = (data.data?.reports ?? []).map(mapApiUserReportToUi);
        return { pagination, reports };
    },

    getUserReportById: async (id: string): Promise<UserReportDetailResponse> => {
        const { data } = await apiClient.get<{ data: UserReportDetailResponse }>(`/admin/reported-problems/users/${id}`);
        return data.data;
    },

    updateUserReportStatus: async (id: string, payload: { status: string; notes?: string }): Promise<void> => {
        await apiClient.put(`/admin/reported-problems/users/${id}/status`, {
            status: payload.status.toLowerCase(),
            notes: payload.notes,
        });
    },

    exportUserReports: async (params?: {
        format?: string;
        timelaps?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<ExportResponse> => {
        const { data } = await apiClient.get<{ data: ExportResponse }>('/admin/reported-problems/users/export', {
            params: { format: 'csv', timelaps: 'allTime', ...params },
        });
        return data.data;
    },

    // Bugs
    getBugsStats: async (): Promise<BugsStats> => {
        const { data } = await apiClient.get<{ data: BugsStats }>('/admin/reported-problems/stats');
        return data.data;
    },

    getBugsReports: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        issueType?: string;
    }): Promise<{ pagination: { page: number; limit: number; total: number; totalPages: number }; reports: BugReportData[] }> => {
        const { data } = await apiClient.get<{
            data: { pagination: { page: number; limit: number; total: number; totalPages: number }; reports: ApiBugReportItem[] };
        }>('/admin/reported-problems', { params });
        const pagination = data.data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 1 };
        const reports = (data.data?.reports ?? []).map(mapApiBugReportToUi);
        return { pagination, reports };
    },

    getBugReportById: async (id: string): Promise<BugReportDetailResponse> => {
        const { data } = await apiClient.get<{ data: BugReportDetailResponse }>(`/admin/reported-problems/${id}`);
        return data.data;
    },

    updateBugReportStatus: async (id: string, payload: { status: string; notes?: string }): Promise<void> => {
        await apiClient.put(`/admin/reported-problems/${id}/status`, {
            status: payload.status.toLowerCase(),
            notes: payload.notes,
        });
    },

    exportBugReports: async (params?: {
        format?: string;
        timelaps?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<ExportResponse> => {
        const { data } = await apiClient.get<{ data: ExportResponse }>('/admin/reported-problems/export', {
            params: { format: 'json', timelaps: 'allTime', ...params },
        });
        return data.data;
    },
};

// Map ExportDataCard activeFilter -> API timelaps
export const activeFilterToTimelaps: Record<string, string> = {
    'Last 7 days': 'last7days',
    'This Month': 'thisMonth',
    'Last Month': 'lastMonth',
    'Last 3 Months': 'last3Months',
    'Last 6 Months': 'last6Months',
    'This Year': 'thisYear',
    'Last Year': 'lastYear',
    'All Time': 'allTime',
};

// =============================================
// React Query hooks – User Reports
// =============================================

export const useUserReportsStats = () => {
    return useQuery<UserReportsStats, AxiosError>({
        queryKey: ['reported-problems', 'users', 'stats'],
        queryFn: reportedProblemsService.getUserReportsStats,
    });
};

export const useUserReports = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    category?: string;
}) => {
    return useQuery(
        {
            queryKey: ['reported-problems', 'users', params],
            queryFn: () => reportedProblemsService.getUserReports(params),
        }
    );
};

export const useUserReportDetail = (id: string | null) => {
    return useQuery({
        queryKey: ['reported-problems', 'users', 'detail', id],
        queryFn: () => reportedProblemsService.getUserReportById(id!),
        enabled: !!id,
    });
};

export const useUpdateUserReportStatus = () => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, { id: string; status: string; notes?: string }>({
        mutationFn: ({ id, status, notes }) => reportedProblemsService.updateUserReportStatus(id, { status, notes }),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ['reported-problems', 'users'] });
            qc.invalidateQueries({ queryKey: ['reported-problems', 'users', 'detail', variables.id] });
        },
    });
};

export const useExportUserReports = () => {
    return useMutation<
        ExportResponse,
        AxiosError,
        { format?: string; timelaps?: string; startDate?: string; endDate?: string } | undefined
    >({
        mutationFn: (params) => reportedProblemsService.exportUserReports(params),
    });
};

// =============================================
// React Query hooks – Bug Reports
// =============================================

export const useBugsStats = () => {
    return useQuery<BugsStats, AxiosError>({
        queryKey: ['reported-problems', 'bugs', 'stats'],
        queryFn: reportedProblemsService.getBugsStats,
    });
};

export const useBugsReports = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    issueType?: string;
}) => {
    return useQuery({
        queryKey: ['reported-problems', 'bugs', params],
        queryFn: () => reportedProblemsService.getBugsReports(params),
    });
};

export const useBugReportDetail = (id: string | null) => {
    return useQuery({
        queryKey: ['reported-problems', 'bugs', 'detail', id],
        queryFn: () => reportedProblemsService.getBugReportById(id!),
        enabled: !!id,
    });
};

export const useUpdateBugReportStatus = () => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, { id: string; status: string; notes?: string }>({
        mutationFn: ({ id, status, notes }) => reportedProblemsService.updateBugReportStatus(id, { status, notes }),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ['reported-problems', 'bugs'] });
            qc.invalidateQueries({ queryKey: ['reported-problems', 'bugs', 'detail', variables.id] });
        },
    });
};

export const useExportBugReports = () => {
    return useMutation<
        ExportResponse,
        AxiosError,
        { format?: string; timelaps?: string; startDate?: string; endDate?: string } | undefined
    >({
        mutationFn: (params) => reportedProblemsService.exportBugReports(params),
    });
};
