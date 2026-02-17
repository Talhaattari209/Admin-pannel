from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import or_, select, func
from sqlalchemy.orm import selectinload
from typing import Optional, Union
from uuid import UUID
from app.database import get_db
from app.core.dependencies import get_current_admin
from app.core.security import get_password_hash
from app.models import TeamMember, Role, SuperAdmin
from app.schemas import (
    TeamMemberCreate,
    TeamMemberUpdate,
    TeamMemberResponse,
    PaginatedResponse,
)
import math

router = APIRouter()

# ==================== Create Team Member ====================

@router.post("", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
async def create_team_member(
    member_data: TeamMemberCreate,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Create a new team member
    An invitation email with password will be sent automatically (TODO: implement email)
    """
    # Check if email already exists
    result = await db.execute(select(TeamMember).filter(TeamMember.email == member_data.email))
    existing_member = result.scalar_one_or_none()
    if existing_member:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if role exists
    result = await db.execute(select(Role).filter(Role.id == member_data.role))
    role = result.scalar_one_or_none()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )
    
    # Create team member
    member = TeamMember(
        name=member_data.name,
        email=member_data.email,
        hashed_password=get_password_hash(member_data.password),
        role_id=member_data.role,
        status="active"
    )
    
    db.add(member)
    await db.commit()
    await db.refresh(member)
    
    # TODO: Send invitation email
    
    return member

# ==================== Get All Team Members ====================

@router.get("", response_model=PaginatedResponse)
async def get_team_members(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None, description="Search by name or email"),
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get all team members with pagination and search
    """
    query = select(TeamMember).options(selectinload(TeamMember.role))
    
    # Apply search filter
    if search:
        query = query.filter(
            or_(
                TeamMember.name.ilike(f"%{search}%"),
                TeamMember.email.ilike(f"%{search}%")
            )
        )
    
    # Get total count
    count_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = count_result.scalar()
    
    # Calculate pagination
    pages = math.ceil(total / limit)
    offset = (page - 1) * limit
    
    # Get paginated results with eager loading
    query = query.offset(offset).limit(limit)
    result = await db.execute(query)
    members = result.scalars().all()
    
    # Convert to response format
    members_data = [TeamMemberResponse.model_validate(member) for member in members]
    
    return PaginatedResponse(
        total=total,
        page=page,
        limit=limit,
        pages=pages,
        data=members_data
    )

# ==================== Get Team Member by ID ====================

@router.get("/{member_id}", response_model=TeamMemberResponse)
async def get_team_member(
    member_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get a single team member by ID
    """
    result = await db.execute(
        select(TeamMember)
        .options(selectinload(TeamMember.role))
        .filter(TeamMember.id == member_id)
    )
    member = result.scalar_one_or_none()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )
    
    return member

# ==================== Update Team Member ====================

@router.put("/{member_id}", response_model=TeamMemberResponse)
async def update_team_member(
    member_id: UUID,
    member_data: TeamMemberUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Update a team member (all fields are optional)
    """
    result = await db.execute(
        select(TeamMember)
        .options(selectinload(TeamMember.role))
        .filter(TeamMember.id == member_id)
    )
    member = result.scalar_one_or_none()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )
    
    # Update fields
    update_data = member_data.model_dump(exclude_unset=True)
    
    # Check email uniqueness if changing email
    if "email" in update_data and update_data["email"] != member.email:
        result = await db.execute(select(TeamMember).filter(TeamMember.email == update_data["email"]))
        existing_member = result.scalar_one_or_none()
        if existing_member:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    # Check role exists if changing role
    if "role" in update_data:
        result = await db.execute(select(Role).filter(Role.id == update_data["role"]))
        role = result.scalar_one_or_none()
        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Role not found"
            )
        # Map 'role' to 'role_id' for database field
        update_data["role_id"] = update_data.pop("role")
    
    for key, value in update_data.items():
        setattr(member, key, value)
    
    await db.commit()
    await db.refresh(member)
    
    return member

# ==================== Delete Team Member ====================

@router.delete("/{member_id}")
async def delete_team_member(
    member_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Delete a team member
    """
    result = await db.execute(select(TeamMember).filter(TeamMember.id == member_id))
    member = result.scalar_one_or_none()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )
    
    await db.delete(member)
    await db.commit()
    
    return {"success": True, "message": "Team member deleted successfully"}
