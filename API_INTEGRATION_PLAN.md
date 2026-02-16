# Fennec Admin Panel - Project Status & Frontend Integration Plan

**Last Updated:** February 12, 2026  
**Project Status:** Backend Complete ✅ | Frontend Integration Ready 🚀

---

## 📋 Table of Contents

1. [Backend Implementation (COMPLETED)](#backend-implementation-completed)
2. [Frontend Integration Plan (NEXT PHASE)](#frontend-integration-plan-next-phase)
3. [Quick Reference](#quick-reference)

---

# Backend Implementation (COMPLETED)

## ✅ What Has Been Built

### Complete FastAPI Backend
- **Location:** `fennec-backend/`
- **Status:** Fully implemented and ready for testing
- **API Docs:** http://localhost:8000/docs (when running)

### All API Endpoints Implemented

#### Authentication (`/admin/auth/*`)
```
POST   /admin/auth/super-admin/login    - Super admin login
POST   /admin/auth/login                 - Team member login
GET    /admin/auth/me                    - Get current authenticated admin
POST   /admin/auth/super-admin/update-password - Update super admin password
POST   /admin/auth/logout                - Logout
```

**Response Format:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Admin Name",
    "isSuperAdmin": false,
    "role": "Content Manager"
  },
  "permissions": [
    {"module": "dashboard", "permissions": ["view", "export"]},
    {"module": "users management", "permissions": ["view", "edit"]}
  ]
}
```

#### Roles Management (`/admin/roles/*`)
```
POST   /admin/roles          - Create role
GET    /admin/roles          - List roles (pagination + search)
GET    /admin/roles/:id      - Get single role
PUT    /admin/roles/:id      - Update role
DELETE /admin/roles/:id      - Delete role
```

#### Team Members (`/admin/team-members/*`)
```
POST   /admin/team-members       - Create team member
GET    /admin/team-members       - List members (pagination + search)
GET    /admin/team-members/:id   - Get single member
PUT    /admin/team-members/:id   - Update member
DELETE /admin/team-members/:id   - Delete member
```

#### Users (`/admin/users/*`)
```
GET    /admin/users          - List end users (pagination + search)
GET    /admin/users/stats    - User statistics
GET    /admin/users/:id      - Get user details
```

#### File Upload (`/upload/*`)
```
POST   /upload/single        - Upload single file
POST   /upload/multiple      - Upload multiple files
```

### Database Models
- ✅ **SuperAdmin** - Full system access
- ✅ **TeamMember** - Role-based access
- ✅ **Role** - Permissions via resources array
- ✅ **User** - End mobile app users

### Infrastructure
- ✅ PostgreSQL with Alembic migrations
- ✅ JWT authentication (access + refresh tokens)
- ✅ bcrypt password hashing
- ✅ CORS configuration
- ✅ File upload with validation
- ✅ Pydantic schemas matching Postman collection

### Setup & Documentation
- ✅ UV environment configuration
- ✅ Seed script for super admin
- ✅ Comprehensive README and SETUP guides
- ✅ Git repository consolidated (frontend + backend)

### Testing Resources
- ✅ Postman collection: `fennec.postman_collection.json`
- ✅ Super Admin credentials:
  - Email: `superadmin@mailinator.com`
  - Password: `go6Qnri&cQ1Rj1$N`

---

# Frontend Integration Plan (NEXT PHASE)

## 🎯 Objective

Integrate the Next.js frontend with the FastAPI backend, replacing all mock data with real API calls.

## 📁 Project Structure

The frontend is located at: `fennec-admin-panel/`

### Current State
- ✅ UI components built with Tailwind CSS
- ✅ Mock data in components (e.g., `MOCK_ROLES`)
- ❌ No API integration
- ❌ No state management
- ❌ No authentication flow

### Target Architecture

```
Components
    ↓
React Query Hooks (useRoles, useTeamMembers, etc.)
    ↓
Service Layer (rolesAPI, teamMembersAPI, etc.)
    ↓
API Client (axios with interceptors)
    ↓
FastAPI Backend
```

---

## Phase 1: Foundation & Infrastructure

### 1.1 Install Dependencies

```bash
cd fennec-admin-panel
npm install axios @tanstack/react-query @tanstack/react-query-devtools zod
```

### 1.2 Environment Configuration

Create `fennec-admin-panel/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 1.3 Type System

Create `src/types/api.ts`:
```typescript
// Permission types
export interface ResourcePermission {
  module: string;
  permissions: string[];
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AdminUserInfo {
  id: string;
  email: string;
  name: string;
  isSuperAdmin: boolean;
  role: string | null;
}

export interface LoginResponse extends TokenPair {
  user: AdminUserInfo;
  permissions: ResourcePermission[];
}

// Role types
export interface Role {
  id: string;
  title: string;
  description: string | null;
  resources: ResourcePermission[];
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRoleRequest {
  title: string;
  description?: string;
  resources: ResourcePermission[];
}

// Team Member types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: string;
  profile_picture: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface CreateTeamMemberRequest {
  name: string;
  email: string;
  role: string; // Role ID
  password: string;
}

// User types
export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  age: number | null;
  gender: string | null;
  verified: boolean;
  status: string;
  last_active: string | null;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserStatistics {
  totalUsers: number;
  activeThisWeek: number;
  pendingKYC: number;
  suspendedAccounts: number;
  verifiedAccounts: number;
  premiumSubscriptions: number;
}

// Pagination
export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: T[];
}
```

### 1.4 API Client

Create `src/lib/api-client.ts`:
```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // If 401 and we have a refresh token, try to refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        // TODO: Implement refresh token endpoint when available
        // For now, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 1.5 React Query Setup

Create `src/lib/query-client.ts`:
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

Update `src/app/layout.tsx` to add QueryClientProvider:
```typescript
'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

---

## Phase 2: Service Layer

### 2.1 Authentication Service

Create `src/services/auth.ts`:
```typescript
import apiClient from '@/lib/api-client';
import { LoginRequest, LoginResponse } from '@/types/api';

export const authAPI = {
  // Team member login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/admin/auth/login', credentials);
    return data;
  },

  // Super admin login
  superAdminLogin: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/admin/auth/super-admin/login', credentials);
    return data;
  },

  // Get current admin
  getCurrentAdmin: async (): Promise<LoginResponse> => {
    const { data } = await apiClient.get('/admin/auth/me');
    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post('/admin/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
```

### 2.2 Roles Service

Create `src/services/roles.ts`:
```typescript
import apiClient from '@/lib/api-client';
import { Role, CreateRoleRequest, PaginatedResponse } from '@/types/api';

export const rolesAPI = {
  // Get all roles
  getRoles: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Role>> => {
    const { data } = await apiClient.get('/admin/roles', { params });
    return data;
  },

  // Get single role
  getRole: async (id: string): Promise<Role> => {
    const { data } = await apiClient.get(`/admin/roles/${id}`);
    return data;
  },

  // Create role
  createRole: async (roleData: CreateRoleRequest): Promise<Role> => {
    const { data } = await apiClient.post('/admin/roles', roleData);
    return data;
  },

  // Update role
  updateRole: async (id: string, roleData: Partial<CreateRoleRequest>): Promise<Role> => {
    const { data } = await apiClient.put(`/admin/roles/${id}`, roleData);
    return data;
  },

  // Delete role
  deleteRole: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/roles/${id}`);
  },
};
```

### 2.3 Team Members Service

Create `src/services/team-members.ts`:
```typescript
import apiClient from '@/lib/api-client';
import { TeamMember, CreateTeamMemberRequest, PaginatedResponse } from '@/types/api';

export const teamMembersAPI = {
  getTeamMembers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<TeamMember>> => {
    const { data } = await apiClient.get('/admin/team-members', { params });
    return data;
  },

  getTeamMember: async (id: string): Promise<TeamMember> => {
    const { data } = await apiClient.get(`/admin/team-members/${id}`);
    return data;
  },

  createTeamMember: async (memberData: CreateTeamMemberRequest): Promise<TeamMember> => {
    const { data } = await apiClient.post('/admin/team-members', memberData);
    return data;
  },

  updateTeamMember: async (id: string, memberData: Partial<CreateTeamMemberRequest>): Promise<TeamMember> => {
    const { data } = await apiClient.put(`/admin/team-members/${id}`, memberData);
    return data;
  },

  deleteTeamMember: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/team-members/${id}`);
  },
};
```

### 2.4 Users Service

Create `src/services/users.ts`:
```typescript
import apiClient from '@/lib/api-client';
import { User, UserStatistics, PaginatedResponse } from '@/types/api';

export const usersAPI = {
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<User>> => {
    const { data } = await apiClient.get('/admin/users', { params });
    return data;
  },

  getUser: async (id: string): Promise<User> => {
    const { data } = await apiClient.get(`/admin/users/${id}`);
    return data;
  },

  getUserStats: async (): Promise<UserStatistics> => {
    const { data } = await apiClient.get('/admin/users/stats');
    return data;
  },
};
```

---

## Phase 3: React Query Hooks

See the document for complete hook implementations:
- `src/hooks/useAuth.ts`
- `src/hooks/useRoles.ts`
- `src/hooks/useTeamMembers.ts`
- `src/hooks/useUsers.ts`

---

## Phase 4: Component Integration

### Example: Updating RolesTable Component

**Before (with mock data):**
```typescript
const MOCK_ROLES = [
  { id: '1', role: 'Admin', description: '...', memberCount: 2 },
];
```

**After (with API integration):**
```typescript
'use client';
import { useRoles, useDeleteRole } from '@/hooks/useRoles';

export default function RolesTable() {
  const { data, isLoading, error } = useRoles({ page: 1, limit: 10 });
  const deleteRole = useDeleteRole();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading roles</div>;

  return (
    <div>
      {data?.data.map((role) => (
        <div key={role.id}>
          <span>{role.title}</span>
          <span>{role.member_count} members</span>
        </div>
      ))}
    </div>
  );
}
```

---

## Implementation Roadmap

### Week 1: Foundation
- [ ] Install dependencies
- [ ] Create type definitions
- [ ] Setup API client with interceptors
- [ ] Configure React Query
- [ ] Create service layer (all APIs)

### Week 2: Authentication & Roles
- [ ] Create authentication hooks
- [ ] Update Login component
- [ ] Implement protected routes
- [ ] Create roles hooks
- [ ] Update RolesTable component

### Week 3: Team Members & Users
- [ ] Create team members hooks
- [ ] Update Team & Roles view
- [ ] Create users hooks
- [ ] Update UsersTable component

### Week 4: Polish & Testing
- [ ] Implement permission system
- [ ] Add loading states
- [ ] Add error handling
- [ ] Test all CRUD operations

---

# Quick Reference

## Starting the Backend

```powershell
cd fennec-backend
.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**API Docs:** http://localhost:8000/docs

## Starting the Frontend

```powershell
cd fennec-admin-panel
npm run dev
```

**Frontend:** http://localhost:3000

## Testing with Postman

1. Import: `fennec.postman_collection.json`
2. Set `local_url` = `http://localhost:8000`
3. Test Super Admin Login
4. Tokens auto-save to environment

## Git Repository

**Push changes:**
```powershell
git push origin main
```

---

**Ready to integrate! 🚀**
