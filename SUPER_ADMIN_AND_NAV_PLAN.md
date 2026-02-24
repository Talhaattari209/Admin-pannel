# Plan: Super Admin vs Team Members & Side Nav Fix

## Problem
- When logging in with **Super Admin** email/password, the **side nav options are not showing**.
- Super Admin should see **all** options and have **all** permissions.
- Super Admin is **separate** from Team Members: no create/update from frontend, only login/logout via client endpoints; Team Members have role-based permissions.

## Root Cause (why nav is empty for Super Admin)
1. **Same login endpoint** (`/admin/auth/login`) is used for both Super Admin and Team Members; the backend distinguishes by credentials and returns different response shapes.
2. **Super Admin response** may not include:
   - A `user` object with `isSuperAdmin` or `is_super_admin`, or
   - A top-level `superAdmin` object, or
   - A `permissions` array (backend may omit it because super admin has “all” by identity).
3. **Current logic**: Side nav shows items only if either:
   - `user.isSuperAdmin` (or `user.is_super_admin`) is true → show all, or
   - `canViewModule(permissions, module)` is true for each item.
4. If the API doesn’t set super-admin flags and returns no/empty `permissions`, we get:
   - `isSuperAdmin === false`
   - `permissions === []` → no module has “view” → **all nav items filtered out**.

## Conceptual Split (required behaviour)

| Aspect | Super Admin | Team Members |
|--------|-------------|--------------|
| **Creation/Update** | Not from frontend (client-managed, e.g. IP-based create / update-password endpoints) | Created/updated from “Team & Roles” in the panel |
| **Login** | Same `/admin/auth/login` endpoint with super admin credentials | Same endpoint with team member credentials |
| **Permissions** | All permissions (implicit); no need for a permissions array from API | Role-based; permissions from `teamMember.role.resources` or equivalent |
| **Side nav** | Must show **all** menu options | Show only options allowed by “view” permission per module |
| **Feature access** | Full access everywhere (edit/delete/export where applicable) | Per-role (view/edit/delete/export per module) |

## Implementation Plan

### 1. Auth service (`src/services/auth.ts`)
- **Robust Super Admin detection** from login response (any shape the client’s API might use):
  - Existing: `superAdmin` object, `user.isSuperAdmin`, `user.is_super_admin`, top-level `is_super_admin` / `isSuperAdmin`.
  - Add: `userType` / `user_type` (e.g. `'super_admin'`), and any other field the client documents.
- **Fallback rule**: If the response has a valid user (from `user` or `superAdmin`) but **no** `teamMember` and **no** (or empty) `permissions`, treat as **Super Admin** and set `user.isSuperAdmin = true`. (Team members always get a role/permissions.)
- **Normalise stored user**: Always set `isSuperAdmin: true` when we determine super admin, and for super admin set `permissions` to `[]` (store’s `hasPermission` already returns true when `user.isSuperAdmin`).

### 2. Side navigation (`src/components/SideNavigation.tsx`)
- **Primary**: Show all nav items when `user.isSuperAdmin` (or `user.is_super_admin`) is true.
- **Defensive fallback**: If `user` exists and `permissions.length === 0`, treat as Super Admin and show all items. (Rationale: only Super Admin should log in with no permissions array; team members have roles and thus at least one permission entry.)

### 3. Auth store (`src/store/auth-store.ts`)
- No change required: `hasPermission` already returns `true` for `user?.isSuperAdmin`. Super Admin never needs a populated `permissions` array.

### 4. Rest of app
- All feature views already use `isSuperAdmin || canXxxModule(permissions, module)`. Once login correctly sets `user.isSuperAdmin`, they will behave correctly. Optional: add a small comment in auth that “Super Admin is login-only and has all permissions; Team Members are role-based.”

## Files to Change
1. **`src/services/auth.ts`** – Super Admin detection + fallback when no teamMember and no permissions.
2. **`src/components/SideNavigation.tsx`** – Show all items when super admin or when user exists and permissions are empty.

## Testing
- Log in with **Super Admin** credentials → side nav shows all options; all features allow full access.
- Log in with **Team Member** credentials → side nav shows only modules with “view” permission; edit/delete/export follow role.
- Confirm Super Admin cannot be created/edited from “Team & Roles” (only team members are listed/managed there).
