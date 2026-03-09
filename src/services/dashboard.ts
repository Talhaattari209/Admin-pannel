import apiClient from '@/lib/api-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// ---- Types ----

export interface DashboardExportResponse {
    fileUrl: string;
    format: string;
}

export interface DashboardExportParams {
    format?: string;
    timelaps?: string;
    startDate?: string;
    endDate?: string;
}

export interface DashboardStats {
    activeUsers30d: number;
    newSignups7d: number;
    dailyMatchesCreated: number;
    totalGroupsCreated: number;
    subscriptionRevenue: number;
}

export interface DailyActiveUserEntry {
    date: string;
    count: number;
}

export interface PlatformDistributions {
    android: number;
    ios: number;
    other: number;
}

export interface UserReportedEntry {
    reason: string;
    count: number;
}

export interface BugReportedEntry {
    status: string;
    count: number;
}

export interface SubscriptionBreakdownEntry {
    type: string;
    count: number;
}

export interface MonthlyRevenueEntry {
    month: string;
    revenue: number;
}

export interface MatchesOverTimeEntry {
    month?: string;
    date?: string;
    count?: number;
    matches?: number;
}

export interface TopEngagementChannelEntry {
    channel: string;
    count: number;
}

export interface DashboardCharts {
    dailyActiveUsersData: DailyActiveUserEntry[];
    platformDistributions: PlatformDistributions;
    matchesOverTime: MatchesOverTimeEntry[];
    topEngagementChannel: TopEngagementChannelEntry[];
    userReported: UserReportedEntry[];
    bugsReported: BugReportedEntry[];
    subscriptionBreakdown: SubscriptionBreakdownEntry[];
    monthlyRevenue: MonthlyRevenueEntry[];
}

// ---- Service ----

export const dashboardService = {
    getStats: async (): Promise<DashboardStats> => {
        const { data } = await apiClient.get<any>('/admin/dashboard/stats');
        return data.data as DashboardStats;
    },

    getCharts: async (timelaps: string = 'allTime'): Promise<DashboardCharts> => {
        const { data } = await apiClient.get<any>('/admin/dashboard/charts', {
            params: { timelaps },
        });
        return data.data as DashboardCharts;
    },

    export: async (params?: DashboardExportParams): Promise<DashboardExportResponse> => {
        const { data } = await apiClient.get<any>('/admin/dashboard/export', {
            params: { format: 'csv', timelaps: 'allTime', ...params }
        });
        return data.data as DashboardExportResponse;
    },
};

// ---- React Query Hooks ----

export const useDashboardStats = () => {
    return useQuery<DashboardStats, AxiosError>({
        queryKey: ['dashboard-stats'],
        queryFn: dashboardService.getStats,
    });
};

export const useDashboardCharts = (timelaps: string = 'allTime') => {
    return useQuery<DashboardCharts, AxiosError>({
        queryKey: ['dashboard-charts', timelaps],
        queryFn: () => dashboardService.getCharts(timelaps),
    });
};

export const useExportDashboard = () => {
    return useMutation<DashboardExportResponse, AxiosError, DashboardExportParams | undefined>({
        mutationFn: dashboardService.export,
    });
};
