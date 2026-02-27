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
    dob?: string;
    gender?: string;
    sexualOrientation?: string[];
    pronouns?: string;
    shortBio?: string;
    jobTitle?: string;
    education?: string;
    lifestyleLikes?: string[];
    vibes?: Record<string, string[] | null>;
    bestShorts?: string[];
    accountStatus?: string;
    authType?: string;
    subscriptionActive?: boolean;
    pokeBalance?: number;
    countryCode?: string;
    prompts?: any[];
}

export interface UserStatistics {
    totalUsers: number;
    activeThisWeek: number;
    pendingKyc: number;
    suspendedAccounts: number;
    verifiedAccounts: number;
    premiumSubscription: number;
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

// === App Content Types ===

// Prompt (Individual & Group) - matches API response shape
export interface Prompt {
    id: string;
    title: string;
    type: 'individual' | 'group';
    status: 'published' | 'draft';
    addedBy?: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PromptCreate {
    title: string;
    status: string;
}

export interface PromptUpdate {
    title?: string;
    status?: string;
}

// Legal Content - matches API response shape
export interface LegalContent {
    id: string;
    title: string;
    content: string;
    status: 'published' | 'draft';
    addedBy?: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LegalContentCreate {
    title: string;
    content: string;
    status: string;
}

export interface LegalContentUpdate {
    title?: string;
    content?: string;
    status?: string;
}

// FAQ - matches API response shape
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    status: 'published' | 'draft';
    addedBy?: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface FAQCreate {
    question: string;
    answer: string;
    status: string;
}

export interface FAQUpdate {
    question?: string;
    answer?: string;
    status?: string;
}

// === App Settings Types (GET/PUT /admin/app-settings) ===

export interface MobileAppPlatform {
    version: string;
    storeUrl: string;
}

export interface AppSettingsMobileApps {
    ios: MobileAppPlatform;
    android: MobileAppPlatform;
}

export interface AppSettingsGeneral {
    minGroupSize: number;
    maxGroupSize: number;
    weeklyPokesFree: number;
    weeklyPokesPremium: number;
    dailyLikesLimit: number;
}

export interface PokeProduct {
    name: string;
    pokeCount: number;
    priceUsd: number;
}

export interface AppSettingsContentModeration {
    enableProfileScanning: boolean;
    enableMediaScanning: boolean;
    enableMessagesScanning: boolean;
    automaticallyHideFlaggedProfiles: boolean;
    autoFlagThreshold: number;
    maxReportsBeforeSuspension: number;
}

export interface AppSettingsMaintenanceMode {
    enabled: boolean;
    notifyUsers: boolean;
    message: string;
    startTime: string;
    endTime: string;
    startDate: string; // ISO or YYYY-MM-DD
    endDate: string;
}

export interface AppSettings {
    key?: string;
    mobileApps: AppSettingsMobileApps;
    general: AppSettingsGeneral;
    pokeProducts: PokeProduct[];
    contentModeration: AppSettingsContentModeration;
    blockedWords: string[];
    maintenanceMode: AppSettingsMaintenanceMode;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type AppSettingsUpdate = Omit<AppSettings, 'key' | '_id' | 'createdAt' | 'updatedAt'>;

// === Account Settings: current user profile & change password ===

export interface TeamMemberMeUpdate {
    name: string;
    email: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}
