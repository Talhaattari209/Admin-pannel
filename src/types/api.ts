// API Types based on backend schemas

export interface ResourcePermission {
    module: string;
    permissions: string[];
}

export interface AdminUserInfo {
    id: string;
    email: string;
    name: string;
    isSuperAdmin: boolean;
    role: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: AdminUserInfo;
    permissions: ResourcePermission[];
}

export interface Role {
    id: string;
    title: string;
    description: string;
    resources: ResourcePermission[];
    member_count?: number;
    created_at: string;
    updated_at: string;
}

export interface RoleCreate {
    title: string;
    description: string;
    resources: ResourcePermission[];
}

export interface RoleUpdate {
    title?: string;
    description?: string;
    resources?: ResourcePermission[];
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role_id: string;
    role?: Role;
    status: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_login?: string | null;
}

export interface TeamMemberCreate {
    name: string;
    email: string;
    role: string; // UUID of the role
    password: string;
    image?: string;  // Optional profile image URL
}

export interface TeamMemberUpdate {
    name?: string;
    email?: string;
    role?: string;
    status?: string;
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    status: string;
    verified: boolean;
    created_at: string;
    last_active?: string | null;
}

export interface UserStatistics {
    totalUsers: number;
    activeThisWeek: number;
    pendingKYC: number;
    suspendedAccounts: number;
    verifiedAccounts: number;
    premiumSubscriptions: number;
}

export interface PaginatedResponse<T = any> {
    total: number;
    page: number;
    limit: number;
    pages: number;
    data: T[];
}

export interface ApiError {
    detail: string;
}


