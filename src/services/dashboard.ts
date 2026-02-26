import apiClient from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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

export const dashboardService = {
    export: async (params?: DashboardExportParams): Promise<DashboardExportResponse> => {
        const { data } = await apiClient.get<any>('/admin/dashboard/export', {
            params: { format: 'csv', timelaps: 'allTime', ...params }
        });
        return data.data as DashboardExportResponse;
    },
};

export const useExportDashboard = () => {
    return useMutation<DashboardExportResponse, AxiosError, DashboardExportParams | undefined>({
        mutationFn: dashboardService.export,
    });
};
