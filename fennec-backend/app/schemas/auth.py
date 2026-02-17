from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from app.schemas.common import ResourcePermission

# ==================== Login Schemas ====================

class LoginRequest(BaseModel):
    """Login request schema"""
    email: EmailStr
    password: str = Field(..., min_length=1)

class SuperAdminLoginRequest(LoginRequest):
    """Super admin login request"""
    pass

class TeamMemberLoginRequest(LoginRequest):
    """Team member login request"""
    pass

# ==================== Token Schemas ====================

class TokenPair(BaseModel):
    """Access and refresh token pair"""
    accessToken: str
    refreshToken: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }

# ==================== Admin Response Schemas ====================

class AdminUserInfo(BaseModel):
    """Admin user information"""
    id: UUID
    email: EmailStr
    name: str
    is_super_admin: bool = Field(..., alias="isSuperAdmin")
    role: Optional[str] = None  # Role title for team members
    
    class Config:
        populate_by_name = True

class LoginResponse(TokenPair):
    """Login response with tokens and user info"""
    user: AdminUserInfo
    permissions: List[ResourcePermission]
    
    class Config:
        json_schema_extra = {
            "example": {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "user": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "email": "admin@example.com",
                    "name": "Admin User",
                    "isSuperAdmin": False,
                    "role": "Content Manager"
                },
                "permissions": [
                    {"module": "dashboard", "permissions": ["view"]}
                ]
            }
        }

class CurrentAdminResponse(BaseModel):
    """Current admin response"""
    user: AdminUserInfo
    permissions: List[ResourcePermission]

# ==================== Password Update ====================

class UpdatePasswordRequest(BaseModel):
    """Update password request"""
    newPassword: str = Field(..., min_length=8, description="New password (min 8 characters)")
