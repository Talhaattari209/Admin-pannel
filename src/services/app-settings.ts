import apiClient from '@/lib/api-client';
import { AppSettings, AppSettingsUpdate } from '@/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const QUERY_KEY = 'app-settings';

export const DEFAULT_APP_SETTINGS: AppSettings = {
    key: 'global',
    mobileApps: {
        ios: { version: '1.0.0', storeUrl: '' },
        android: { version: '1.0.0', storeUrl: '' },
    },
    general: {
        minGroupSize: 2,
        maxGroupSize: 5,
        weeklyPokesFree: 3,
        weeklyPokesPremium: 10,
        dailyLikesLimit: 100,
    },
    pokeProducts: [
        { name: 'Starter Pack', pokeCount: 3, priceUsd: 5.99 },
        { name: 'Spark Pack', pokeCount: 12, priceUsd: 7.99 },
        { name: 'Premium Pack', pokeCount: 50, priceUsd: 49.99 },
    ],
    contentModeration: {
        enableProfileScanning: false,
        enableMediaScanning: false,
        enableMessagesScanning: false,
        automaticallyHideFlaggedProfiles: false,
        autoFlagThreshold: 5,
        maxReportsBeforeSuspension: 10,
    },
    blockedWords: [],
    maintenanceMode: {
        enabled: false,
        notifyUsers: false,
        message: "We'll be back shortly.",
        startTime: '02:00',
        endTime: '03:00',
        startDate: '2025-12-20',
        endDate: '2025-12-20',
    },
};

export const appSettingsService = {
    get: async (): Promise<AppSettings> => {
        const { data } = await apiClient.get<{ success: boolean; data: AppSettings }>('/admin/app-settings');
        return data.data;
    },

    update: async (payload: AppSettingsUpdate): Promise<AppSettings> => {
        const { data } = await apiClient.put<{ success: boolean; data: AppSettings }>('/admin/app-settings', payload);
        return data.data;
    },
};

export const useAppSettings = () => {
    return useQuery<AppSettings, AxiosError<any>>({
        queryKey: [QUERY_KEY],
        queryFn: appSettingsService.get,
    });
};

export const useUpdateAppSettings = () => {
    const queryClient = useQueryClient();
    return useMutation<AppSettings, AxiosError<any>, AppSettingsUpdate>({
        mutationFn: appSettingsService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });
};
