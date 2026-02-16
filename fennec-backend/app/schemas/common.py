from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime

# ==================== Resource/Permission Schemas ====================

class ResourcePermission(BaseModel):
    """Permission for a specific module - matches Postman format"""
    module: str = Field(..., description="Module name (e.g., 'dashboard', 'app content')")
    permissions: List[str] = Field(..., description="List of permissions (e.g., ['view', 'edit', 'delete'])")
    
    class Config:
        json_schema_extra = {
            "example": {
                "module": "dashboard",
                "permissions": ["view", "export"]
            }
        }

# ==================== Role Schemas ====================

class RoleBase(BaseModel):
    """Base role schema"""
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    resources: List[ResourcePermission] = Field(default_factory=list)

class RoleCreate(RoleBase):
    """Schema for creating a role"""
    pass

class RoleUpdate(BaseModel):
    """Schema for updating a role - all fields optional"""
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    resources: Optional[List[ResourcePermission]] = None

class RoleResponse(RoleBase):
    """Schema for role response"""
    id: UUID
    member_count: int = Field(..., description="Number of team members with this role")
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ==================== Team Member Schemas ====================

class TeamMemberBase(BaseModel):
    """Base team member schema"""
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr

class TeamMemberCreate(TeamMemberBase):
    """Schema for creating a team member"""
    role: UUID = Field(..., description="Role ID")
    password: str = Field(..., min_length=8, description="Password (min 8 characters)")

class TeamMemberUpdate(BaseModel):
    """Schema for updating a team member - all fields optional"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    role: Optional[UUID] = None
    status: Optional[str] = Field(None, pattern="^(active|inactive)$")

class TeamMemberResponse(TeamMemberBase):
    """Schema for team member response"""
    id: UUID
    status: str
    profile_picture: Optional[str]
    role: RoleResponse
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ==================== User Schemas ====================

class UserResponse(BaseModel):
    """Schema for end user response"""
    id: UUID
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    age: Optional[int]
    gender: Optional[str]
    verified: bool
    status: str
    last_active: Optional[datetime]
    profile_picture: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class UserStatusUpdate(BaseModel):
    """Schema for updating user status"""
    status: str = Field(..., description="New status for the user")


class UserStatistics(BaseModel):
    """Schema for user statistics"""
    total_users: int = Field(..., alias="totalUsers")
    active_this_week: int = Field(..., alias="activeThisWeek")
    pending_kyc: int = Field(..., alias="pendingKYC")
    suspended_accounts: int = Field(..., alias="suspendedAccounts")
    verified_accounts: int = Field(..., alias="verifiedAccounts")
    premium_subscriptions: int = Field(..., alias="premiumSubscriptions")
    
    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "totalUsers": 1000,
                "activeThisWeek": 150,
                "pendingKYC": 25,
                "suspendedAccounts": 5,
                "verifiedAccounts": 800,
                "premiumSubscriptions": 200
            }
        }

# ==================== Pagination ====================

class PaginationParams(BaseModel):
    """Pagination parameters"""
    page: int = Field(1, ge=1, description="Page number")
    limit: int = Field(10, ge=1, le=100, description="Items per page")
    search: Optional[str] = Field(None, description="Search query")

class PaginatedResponse(BaseModel):
    """Generic paginated response"""
    total: int
    page: int
    limit: int
    pages: int
    data: List
    
    class Config:
        json_schema_extra = {
            "example": {
                "total": 100,
                "page": 1,
                "limit": 10,
                "pages": 10,
                "data": []
            }
        }
