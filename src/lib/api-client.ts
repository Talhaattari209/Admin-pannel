import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Use proxy on client side to avoid CORS, direct URL on server side
const API_URL = typeof window === 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
    : '/api/proxy';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');

        // Log request details for debugging (redacting most of the token)
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            hasToken: !!token,
            tokenPreview: token ? `${token.substring(0, 10)}...${token.substring(token.length - 10)}` : 'none',
            headers: config.headers ? Object.keys(config.headers) : 'none'
        });

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        // Log successful responses
        console.log('[API Response]', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error: AxiosError) => {
        // Log error responses
        console.error('[API Error Response]', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
        });

        if (error.response?.status === 401) {
            // Unauthorized - clear tokens and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
