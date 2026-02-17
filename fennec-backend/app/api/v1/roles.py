from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import or_, func, select
from sqlalchemy.orm import selectinload
from typing import Optional
from uuid import UUID
from app.database import get_db
from app.core.dependencies import get_current_admin
from app.models import Role, TeamMember, SuperAdmin
from app.schemas import (
    RoleCreate,
    RoleUpdate,
    RoleResponse,
    PaginatedResponse,
)
from typing import Union
import math

router = APIRouter()

# ==================== Create Role ====================

@router.post("", response_model=RoleResponse, status_code=status.HTTP_201_CREATED)
async def create_role(
    role_data: RoleCreate,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Create a new role with permissions
    """
    # Check if role title already exists
    result = await db.execute(select(Role).filter(Role.title == role_data.title))
    existing_role = result.scalar_one_or_none()
    if existing_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Role with title '{role_data.title}' already exists"
        )
    
    # Convert Pydantic models to dicts for JSON storage
    resources_data = [r.model_dump() for r in role_data.resources]
    
    # Create role
    role = Role(
        title=role_data.title,
        description=role_data.description,
        resources=resources_data
    )
    
    db.add(role)
    await db.commit()
    await db.refresh(role)
    
    return role

# ==================== Get All Roles ====================

@router.get("", response_model=PaginatedResponse)
async def get_roles(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search by title or description"),
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get all roles with pagination and search
    Returns roles with associated team member count
    """
    query = select(Role).options(selectinload(Role.team_members))
    
    # Apply search filter
    if search:
        query = query.filter(
            or_(
                Role.title.ilike(f"%{search}%"),
                Role.description.ilike(f"%{search}%")
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
    roles = result.scalars().all()
    
    # Convert to response format
    roles_data = [RoleResponse.model_validate(role) for role in roles]
    
    return PaginatedResponse(
        total=total,
        page=page,
        limit=limit,
        pages=pages,
        data=roles_data
    )

# ==================== Get Role by ID ====================

@router.get("/{role_id}", response_model=RoleResponse)
async def get_role(
    role_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get a single role by ID with team members
    """
    result = await db.execute(
        select(Role)
        .options(selectinload(Role.team_members))
        .filter(Role.id == role_id)
    )
    role = result.scalar_one_or_none()
    
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )
    
    return role

# ==================== Update Role ====================

@router.put("/{role_id}", response_model=RoleResponse)
async def update_role(
    role_id: UUID,
    role_data: RoleUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Update a role (all fields are optional)
    """
    result = await db.execute(
        select(Role)
        .options(selectinload(Role.team_members))
        .filter(Role.id == role_id)
    )
    role = result.scalar_one_or_none()
    
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )
    
    # Update fields
    update_data = role_data.model_dump(exclude_unset=True)
    
    # Check title uniqueness if changing title
    if "title" in update_data and update_data["title"] != role.title:
        result = await db.execute(select(Role).filter(Role.title == update_data["title"]))
        existing_role = result.scalar_one_or_none()
        if existing_role:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Role with title '{update_data['title']}' already exists"
            )
    
    # Convert resources to dict if present
    if "resources" in update_data and update_data["resources"] is not None:
        update_data["resources"] = [r.model_dump() for r in role_data.resources]
    
    for key, value in update_data.items():
        setattr(role, key, value)
    
    await db.commit()
    await db.refresh(role)
    
    return role

# ==================== Delete Role ====================

@router.delete("/{role_id}")
async def delete_role(
    role_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Delete a role (only if no team members are assigned)
    """
    result = await db.execute(
        select(Role)
        .options(selectinload(Role.team_members))
        .filter(Role.id == role_id)
    )
    role = result.scalar_one_or_none()
    
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )
    
    # Check if role has team members
    if role.member_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot delete role. {role.member_count} team member(s) are assigned to this role."
        )
    
    await db.delete(role)
    await db.commit()
    
    return {"success": True, "message": "Role deleted successfully"}
