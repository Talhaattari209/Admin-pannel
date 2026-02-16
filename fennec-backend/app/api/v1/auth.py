from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.core.security import verify_password, create_access_token, create_refresh_token
from app.core.dependencies import get_current_admin, get_super_admin
from app.models import SuperAdmin, TeamMember
from app.schemas import (
    SuperAdminLoginRequest,
    TeamMemberLoginRequest,
    LoginRequest,
    LoginResponse,
    CurrentAdminResponse,
    UpdatePasswordRequest,
    AdminUserInfo,
    ResourcePermission,
)
from typing import Union

router = APIRouter()

# ==================== Unified Login ====================

@router.post("/login", response_model=LoginResponse)
async def login(
    credentials: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Unified login endpoint for Super Admin and Team Members
    Returns access token, refresh token, user info, and permissions
    """
    # 1. Try Super Admin Login
    result = await db.execute(select(SuperAdmin).filter(SuperAdmin.email == credentials.email))
    admin = result.scalar_one_or_none()
    
    if admin and verify_password(credentials.password, admin.hashed_password):
        if not admin.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive",
            )
        
        # Create tokens
        token_data = {"sub": str(admin.id), "user_type": "super_admin"}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)
        
        return LoginResponse(
            accessToken=access_token,
            refreshToken=refresh_token,
            user=AdminUserInfo(
                id=admin.id,
                email=admin.email,
                name=admin.name,
                isSuperAdmin=True,
                role=None
            ),
            permissions=admin.get_permissions()
        )

    # 2. Try Team Member Login
    result = await db.execute(select(TeamMember).filter(TeamMember.email == credentials.email))
    member = result.scalar_one_or_none()
    
    if member and verify_password(credentials.password, member.hashed_password):
        if not member.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive",
            )
        
        # Create tokens
        token_data = {"sub": str(member.id), "user_type": "team_member"}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)
        
        return LoginResponse(
            accessToken=access_token,
            refreshToken=refresh_token,
            user=AdminUserInfo(
                id=member.id,
                email=member.email,
                name=member.name,
                isSuperAdmin=False,
                role=member.role.title if member.role else None
            ),
            permissions=member.get_permissions()
        )
    
    # 3. Failed Login
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
    )

# ==================== Get Current Admin ====================

@router.get("/me", response_model=CurrentAdminResponse)
async def get_current_admin_info(
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get current authenticated admin user details
    """
    is_super = isinstance(current_admin, SuperAdmin)
    
    return CurrentAdminResponse(
        user=AdminUserInfo(
            id=current_admin.id,
            email=current_admin.email,
            name=current_admin.name,
            isSuperAdmin=is_super,
            role=None if is_super else current_admin.role.title
        ),
        permissions=current_admin.get_permissions()
    )

# ==================== Update Super Admin Password ====================

@router.post("/super-admin/update-password")
async def update_super_admin_password(
    request: UpdatePasswordRequest,
    current_admin: SuperAdmin = Depends(get_super_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    Update super admin password (requires super admin authentication)
    """
    from app.core.security import get_password_hash
    
    # Update password
    current_admin.hashed_password = get_password_hash(request.newPassword)
    await db.commit()
    
    return {"success": True, "message": "Password updated successfully"}

# ==================== Logout ====================

@router.post("/logout")
async def logout(
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Logout endpoint
    In a production system with token blacklisting, add token to blacklist here
    """
    return {"success": True, "message": "Logged out successfully"}
