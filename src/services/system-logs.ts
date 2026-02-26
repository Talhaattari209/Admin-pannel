import apiClient from '@/lib/api-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Interfaces based on System_log.json
export interface SystemLogFilters {
    userOrSystem: string[];
    role: string[];
    action: string[];
}

export interface SystemLogEntry {
    _id: string;
    timestamp: string;
    userOrSystem: string;
    userId: string;
    role: string;
    action: string;
    details: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SystemLogPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface SystemLogsResponse {
    pagination: SystemLogPagination;
    logs: SystemLogEntry[];
}

export interface SystemLogExportResponse {
    fileUrl: string;
    format: string;
}

export interface GetLogsParams {
    page?: number;
    limit?: number;
    search?: string;
    userOrSystem?: string;
    role?: string;
    action?: string;
}

export interface ExportLogsParams {
    format: string;
    timelaps: string; // allTime, last7Days, etc. mapping to QUICK_FILTERS
    startDate?: string;
    endDate?: string;
}

// API Functions
export const systemLogsService = {
    getFilters: async (): Promise<SystemLogFilters> => {
        const { data } = await apiClient.get<{ data: SystemLogFilters }>('/admin/system-logs/filters');
        return data.data;
    },

    getLogs: async (params?: GetLogsParams): Promise<SystemLogsResponse> => {
        const { data } = await apiClient.get<{ data: SystemLogsResponse }>('/admin/system-logs', { params });
        return data.data;
    },

    exportLogs: async (params: ExportLogsParams): Promise<SystemLogExportResponse> => {
        const { data } = await apiClient.get<{ data: SystemLogExportResponse }>('/admin/system-logs/export', { params });
        return data.data;
    },
};

// React Query Hooks
export const useSystemLogFilters = () => {
    return useQuery<SystemLogFilters, AxiosError>({
        queryKey: ['system-log-filters'],
        queryFn: systemLogsService.getFilters,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useSystemLogs = (params: GetLogsParams) => {
    return useQuery<SystemLogsResponse, AxiosError>({
        queryKey: ['system-logs', params],
        queryFn: () => systemLogsService.getLogs(params),
    });
};

export const useExportSystemLogs = () => {
    return useMutation<SystemLogExportResponse, AxiosError, ExportLogsParams>({
        mutationFn: systemLogsService.exportLogs,
    });
};
