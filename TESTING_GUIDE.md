# Fennec Admin Panel - Quick Testing Guide

**Last Updated:** 2026-02-13  
**Purpose:** Step-by-step testing checklist for Roles & Team Members integration

---

## 🚀 Quick Start

### 1. Start Servers

**Backend:**
```powershell
cd C:\Users\DELL\Downloads\Fennec-Admin\FennecAdminPanel\fennec-backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```powershell
cd C:\Users\DELL\Downloads\Fennec-Admin\FennecAdminPanel\fennec-admin-panel
npm run dev
```

**Seed Dummy Users (one-time):**
```powershell
cd fennec-backend
.\.venv\Scripts\python.exe scripts\seed_users.py
```

---

## 🧪 Testing Checklist

### ✅ Test 1: Login
- [ ] Navigate to `http://localhost:3000/login`
- [ ] Enter email: `superadmin@mailinator.com`
- [ ] Enter password: `go6Qnri&cQ1Rj1$N`
- [ ] Click "Login"
- [ ] **Verify:** Redirects to dashboard
- [ ] **Verify:** No console errors

### ✅ Test 2: Roles CRUD

**Navigate to Roles:**
- [ ] Go to `http://localhost:3000/team-roles`
- [ ] **Verify:** Roles tab is active
- [ ] **Verify:** Table loads with data (or shows empty state)

**Create Role:**
- [ ] Click "Add Role"
- [ ] Enter title: "Test Manager"
- [ ] Enter description: "Testing role"
- [ ] Toggle some permissions (e.g., Users Management: View, Edit)
- [ ] Click "Add Role"
- [ ] **Verify:** Success modal appears
- [ ] **Verify:** New role appears in table

**Edit Role:**
- [ ] Click "..." menu on the role you just created
- [ ] Click "Edit Role"
- [ ] **Verify:** Modal shows with pre-filled data
- [ ] Change title to: "Test Manager Updated"
- [ ] Toggle different permissions
- [ ] Click "Update"
- [ ] **Verify:** Success modal appears
- [ ] **Verify:** Changes reflected in table

**Search & Pagination:**
- [ ] Type "Test" in search bar
- [ ] **Verify:** Table filters to show matching roles
- [ ] Clear search
- [ ] **Verify:** All roles show again
- [ ] If >10 roles exist, test pagination

**Delete Role:**
- [ ] Click "..." menu on "Test Manager Updated"
- [ ] Click "Delete Role"
- [ ] **Verify:** Confirmation modal appears
- [ ] Confirm deletion
- [ ] **Verify:** Success modal appears
- [ ] **Verify:** Role removed from table

### ✅ Test 3: Team Members CRUD

**Navigate to Team Members:**
- [ ] Click "Team Members" tab
- [ ] **Verify:** Table loads (may be empty)

**Create Team Member:**
- [ ] Click "Add Team Member"
- [ ] Enter name: "John Doe"
- [ ] Enter email: `john.doe@test.com`
- [ ] Select a role from dropdown
- [ ] **Verify:** Dropdown shows real roles from API
- [ ] Enter password: "Password123!"
- [ ] Enter confirm password: "Password123!"
- [ ] Click "Invite Team Member"
- [ ] **Verify:** Success modal appears
- [ ] **Verify:** Member appears in table with correct role

**Validation Testing:**
- [ ] Click "Add Team Member" again
- [ ] Try submitting empty form
- [ ] **Verify:** Error message shows
- [ ] Enter email: "invalid-email"
- [ ] **Verify:** Error message shows
- [ ] Enter password: "Pass123!" and confirm: "Different123!"
- [ ] **Verify:** "Passwords do not match" error shows
- [ ] Enter password: "short"
- [ ] **Verify:** "Password must be at least 8 characters" error shows

**Change Role:**
- [ ] Click "..." menu on "John Doe"
- [ ] Click "Change Role"
- [ ] **Verify:** Modal shows with role dropdown
- [ ] Select different role
- [ ] Click "Update Role"
- [ ] **Verify:** Success modal appears
- [ ] **Verify:** Role updates in table

**Filters:**
- [ ] Select a role from "ROLE" filter dropdown
- [ ] **Verify:** Table shows only members with that role
- [ ] Select "Active" from "STATUS" filter
- [ ] **Verify:** Table shows only active members
- [ ] Clear filters
- [ ] **Verify:** All members show

**Search:**
- [ ] Type "John" in search bar
- [ ] **Verify:** Table filters to matching members
- [ ] Clear search

**Delete Member:**
- [ ] Click "..." menu on "John Doe"
- [ ] Click "Remove Team Member"
- [ ] **Verify:** Confirmation modal appears
- [ ] Confirm removal
- [ ] **Verify:** Success modal appears
- [ ] **Verify:** Member removed from table

### ✅ Test 4: Users Page

**Navigate:**
- [ ] Go to `http://localhost:3000/users`

**Verify Stats Cards:**
- [ ] **Verify:** "Total Users" shows a number (should be 8 if seeded)
- [ ] **Verify:** Other stat cards show data
- [ ] **Verify:** All cards load without errors

**Verify User Table:**
- [ ] **Verify:** 8 dummy users displayed (if seeded)
- [ ] **Verify:** User names, emails, phones display correctly
- [ ] **Verify:** "Joined On" and "Last Active" show formatted dates
- [ ] **Verify:** No "undefined" or "null" text visible

**Test Search:**
- [ ] Type "Alice" in search bar
- [ ] **Verify:** Table filters to show Alice Johnson
- [ ] Clear search
- [ ] **Verify:** All users show again

**Test Pagination:**
- [ ] If more than 10 users, pagination appears
- [ ] Click page 2
- [ ] **Verify:** Next set of users loads

### ✅ Test 5: End-to-End Flow

**Complete User Journey:**
1. [ ] Login as super admin
2. [ ] Create role: "Content Editor" with App Content permissions
3. [ ] Create team member: "Jane Editor" with "Content Editor" role
4. [ ] Navigate to Users page → Verify users display
5. [ ] Navigate back to Team Members → Verify "Jane Editor" listed
6. [ ] Change "Jane Editor" role to different role
7. [ ] Verify role update in table
8. [ ] Delete "Jane Editor"
9. [ ] Delete "Content Editor" role
10. [ ] **Verify:** No errors throughout entire flow

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot connect to API"
**Check:**
- [ ] Backend server running on port 8000
- [ ] No firewall blocking localhost
- [ ] Check browser console for CORS errors

### Issue: "No roles in dropdown"
**Fix:**
- [ ] Go to roles page and create at least one role
- [ ] Refresh team members page

### Issue: Role delete fails
**Reason:**
- Roles with assigned members cannot be deleted
**Fix:**
- [ ] First remove or reassign all team members
- [ ] Then delete the role

### Issue: Validation errors not showing
**Check:**
- [ ] Try different validation scenarios
- [ ] Check browser console for JavaScript errors

---

## ✅ Success Criteria

All items should be checked:
- [ ] Can login successfully
- [ ] Can create/edit/delete roles
- [ ] Permissions transformation works (UI ↔ API)
- [ ] Can create team members with role selection
- [ ] Can change team member roles
- [ ] Can delete team members
- [ ] Search works on all tables
- [ ] Pagination works (if applicable)
- [ ] Filters work on team members table
- [ ] Users page displays 8 dummy users
- [ ] No TypeScript/console errors
- [ ] All loading states appear correctly
- [ ] All error messages are user-friendly
- [ ] No crashes or unexpected behavior

---

## 📞 Quick Reference

**Login Credentials:**
- Email: `superadmin@mailinator.com`
- Password: `go6Qnri&cQ1Rj1$N`

**URLs:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

---

**Happy Testing! 🎉**
