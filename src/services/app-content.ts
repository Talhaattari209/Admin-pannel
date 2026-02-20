import apiClient from '@/lib/api-client';
import {
    Prompt, PromptCreate, PromptUpdate,
    LegalContent, LegalContentCreate, LegalContentUpdate,
    FAQ, FAQCreate, FAQUpdate,
    PaginatedResponse,
} from '@/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// =============================================
// Transform helpers — map API _id → id
// =============================================

const transformPrompt = (raw: any): Prompt => ({
    id: raw._id || raw.id,
    title: raw.title,
    type: raw.type,
    status: raw.status,
    addedBy: raw.addedBy,
    updatedBy: raw.updatedBy,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
});

const transformLegalContent = (raw: any): LegalContent => ({
    id: raw._id || raw.id,
    title: raw.title,
    content: raw.content,
    status: raw.status,
    addedBy: raw.addedBy,
    updatedBy: raw.updatedBy,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
});

const transformFAQ = (raw: any): FAQ => ({
    id: raw._id || raw.id,
    question: raw.question,
    answer: raw.answer,
    status: raw.status,
    addedBy: raw.addedBy,
    updatedBy: raw.updatedBy,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
});

// =============================================
// 1. Individual Prompts Service
//    Endpoint: /admin/app-content/individual-prompts
//    List response shape: { data: { prompts: [...], pagination: {...} } }
// =============================================

export const individualPromptsService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<PaginatedResponse<Prompt>> => {
        const { data } = await apiClient.get<any>('/admin/app-content/individual-prompts', { params });
        const prompts = data.data?.prompts || [];
        const pagination = data.data?.pagination || {};
        return {
            data: prompts.map(transformPrompt),
            total: pagination.total || 0,
            page: pagination.page || 1,
            limit: pagination.limit || 10,
            pages: pagination.totalPages || 1,
        };
    },

    getById: async (id: string): Promise<Prompt> => {
        const { data } = await apiClient.get<any>(`/admin/app-content/individual-prompts/${id}`);
        return transformPrompt(data.data || data);
    },

    create: async (payload: PromptCreate): Promise<Prompt> => {
        const { data } = await apiClient.post<any>('/admin/app-content/individual-prompts', payload);
        return transformPrompt(data.data || data);
    },

    update: async (id: string, payload: PromptUpdate): Promise<Prompt> => {
        const { data } = await apiClient.put<any>(`/admin/app-content/individual-prompts/${id}`, payload);
        return transformPrompt(data.data || data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/app-content/individual-prompts/${id}`);
    },
};

// =============================================
// 2. Group Prompts Service
//    Endpoint: /admin/app-content/group-prompts
//    List response shape: { data: { prompts: [...], pagination: {...} } }
// =============================================

export const groupPromptsService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<PaginatedResponse<Prompt>> => {
        const { data } = await apiClient.get<any>('/admin/app-content/group-prompts', { params });
        const prompts = data.data?.prompts || [];
        const pagination = data.data?.pagination || {};
        return {
            data: prompts.map(transformPrompt),
            total: pagination.total || 0,
            page: pagination.page || 1,
            limit: pagination.limit || 10,
            pages: pagination.totalPages || 1,
        };
    },

    getById: async (id: string): Promise<Prompt> => {
        const { data } = await apiClient.get<any>(`/admin/app-content/group-prompts/${id}`);
        return transformPrompt(data.data || data);
    },

    create: async (payload: PromptCreate): Promise<Prompt> => {
        const { data } = await apiClient.post<any>('/admin/app-content/group-prompts', payload);
        return transformPrompt(data.data || data);
    },

    update: async (id: string, payload: PromptUpdate): Promise<Prompt> => {
        const { data } = await apiClient.put<any>(`/admin/app-content/group-prompts/${id}`, payload);
        return transformPrompt(data.data || data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/app-content/group-prompts/${id}`);
    },
};

// =============================================
// 3. Legal Content Service
//    Endpoint: /admin/app-content/legal-content
//    List response shape: { data: { legalContent: [...], pagination: {...} } }
// =============================================

export const legalContentService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<PaginatedResponse<LegalContent>> => {
        const { data } = await apiClient.get<any>('/admin/app-content/legal-content', { params });
        const legalContent = data.data?.legalContent || [];
        const pagination = data.data?.pagination || {};
        return {
            data: legalContent.map(transformLegalContent),
            total: pagination.total || 0,
            page: pagination.page || 1,
            limit: pagination.limit || 10,
            pages: pagination.totalPages || 1,
        };
    },

    getById: async (id: string): Promise<LegalContent> => {
        const { data } = await apiClient.get<any>(`/admin/app-content/legal-content/${id}`);
        return transformLegalContent(data.data || data);
    },

    create: async (payload: LegalContentCreate): Promise<LegalContent> => {
        const { data } = await apiClient.post<any>('/admin/app-content/legal-content', payload);
        return transformLegalContent(data.data || data);
    },

    update: async (id: string, payload: LegalContentUpdate): Promise<LegalContent> => {
        const { data } = await apiClient.put<any>(`/admin/app-content/legal-content/${id}`, payload);
        return transformLegalContent(data.data || data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/app-content/legal-content/${id}`);
    },
};

// =============================================
// 4. FAQs Service
//    Endpoint: /admin/app-content/faqs
//    List response shape: { data: { faqs: [...], pagination: {...} } }
// =============================================

export const faqsService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<PaginatedResponse<FAQ>> => {
        const { data } = await apiClient.get<any>('/admin/app-content/faqs', { params });
        const faqs = data.data?.faqs || [];
        const pagination = data.data?.pagination || {};
        return {
            data: faqs.map(transformFAQ),
            total: pagination.total || 0,
            page: pagination.page || 1,
            limit: pagination.limit || 10,
            pages: pagination.totalPages || 1,
        };
    },

    getById: async (id: string): Promise<FAQ> => {
        const { data } = await apiClient.get<any>(`/admin/app-content/faqs/${id}`);
        return transformFAQ(data.data || data);
    },

    create: async (payload: FAQCreate): Promise<FAQ> => {
        const { data } = await apiClient.post<any>('/admin/app-content/faqs', payload);
        return transformFAQ(data.data || data);
    },

    update: async (id: string, payload: FAQUpdate): Promise<FAQ> => {
        const { data } = await apiClient.put<any>(`/admin/app-content/faqs/${id}`, payload);
        return transformFAQ(data.data || data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/app-content/faqs/${id}`);
    },
};

// =============================================
// React Query Hooks — Individual Prompts
// =============================================

export const useIndividualPrompts = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    return useQuery<PaginatedResponse<Prompt>, AxiosError>({
        queryKey: ['individual-prompts', params],
        queryFn: () => individualPromptsService.getAll(params),
    });
};

export const useCreateIndividualPrompt = () => {
    const qc = useQueryClient();
    return useMutation<Prompt, AxiosError, PromptCreate>({
        mutationFn: individualPromptsService.create,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['individual-prompts'] }); },
    });
};

export const useUpdateIndividualPrompt = () => {
    const qc = useQueryClient();
    return useMutation<Prompt, AxiosError, { id: string; data: PromptUpdate }>({
        mutationFn: ({ id, data }) => individualPromptsService.update(id, data),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['individual-prompts'] }); },
    });
};

export const useDeleteIndividualPrompt = () => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, string>({
        mutationFn: individualPromptsService.delete,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['individual-prompts'] }); },
    });
};

// =============================================
// React Query Hooks — Group Prompts
// =============================================

export const useGroupPrompts = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    return useQuery<PaginatedResponse<Prompt>, AxiosError>({
        queryKey: ['group-prompts', params],
        queryFn: () => groupPromptsService.getAll(params),
    });
};

export const useCreateGroupPrompt = () => {
    const qc = useQueryClient();
    return useMutation<Prompt, AxiosError, PromptCreate>({
        mutationFn: groupPromptsService.create,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['group-prompts'] }); },
    });
};

export const useUpdateGroupPrompt = () => {
    const qc = useQueryClient();
    return useMutation<Prompt, AxiosError, { id: string; data: PromptUpdate }>({
        mutationFn: ({ id, data }) => groupPromptsService.update(id, data),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['group-prompts'] }); },
    });
};

export const useDeleteGroupPrompt = () => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, string>({
        mutationFn: groupPromptsService.delete,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['group-prompts'] }); },
    });
};

// =============================================
// React Query Hooks — Legal Content
// =============================================

export const useLegalContents = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    return useQuery<PaginatedResponse<LegalContent>, AxiosError>({
        queryKey: ['legal-content', params],
        queryFn: () => legalContentService.getAll(params),
    });
};

export const useCreateLegalContent = () => {
    const qc = useQueryClient();
    return useMutation<LegalContent, AxiosError, LegalContentCreate>({
        mutationFn: legalContentService.create,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['legal-content'] }); },
    });
};

export const useUpdateLegalContent = () => {
    const qc = useQueryClient();
    return useMutation<LegalContent, AxiosError, { id: string; data: LegalContentUpdate }>({
        mutationFn: ({ id, data }) => legalContentService.update(id, data),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['legal-content'] }); },
    });
};

export const useDeleteLegalContent = () => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, string>({
        mutationFn: legalContentService.delete,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['legal-content'] }); },
    });
};

// =============================================
// React Query Hooks — FAQs
// =============================================

export const useFAQs = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    return useQuery<PaginatedResponse<FAQ>, AxiosError>({
        queryKey: ['faqs', params],
        queryFn: () => faqsService.getAll(params),
    });
};

export const useCreateFAQ = () => {
    const qc = useQueryClient();
    return useMutation<FAQ, AxiosError, FAQCreate>({
        mutationFn: faqsService.create,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['faqs'] }); },
    });
};

export const useUpdateFAQ = () => {
    const qc = useQueryClient();
    return useMutation<FAQ, AxiosError, { id: string; data: FAQUpdate }>({
        mutationFn: ({ id, data }) => faqsService.update(id, data),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['faqs'] }); },
    });
};

export const useDeleteFAQ = () => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, string>({
        mutationFn: faqsService.delete,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['faqs'] }); },
    });
};
