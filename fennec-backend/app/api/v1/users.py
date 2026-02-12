from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from typing import Optional, Union
from uuid import UUID
from datetime import datetime, timedelta
from app.database import get_db
from app.core.dependencies import get_current_admin
from app.models import User, SuperAdmin, TeamMember
from app.schemas import UserResponse, UserStatistics, PaginatedResponse
import math

router = APIRouter()

# ==================== Get All Users ====================

@router.get("", response_model=PaginatedResponse)
def get_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None, description="Search by firstName, lastName, email, or phone"),
    db: Session = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get all mobile app users with pagination and search
    """
    query = db.query(User)
    
    # Apply search filter
    if search:
        query = query.filter(
            or_(
                User.first_name.ilike(f"%{search}%"),
                User.last_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.phone.ilike(f"%{search}%")
            )
        )
    
    # Get total count
    total = query.count()
    
    # Calculate pagination
    pages = math.ceil(total / limit)
    offset = (page - 1) * limit
    
    # Get paginated results
    users = query.offset(offset).limit(limit).all()
    
    # Convert to response format
    users_data = [UserResponse.model_validate(user) for user in users]
    
    return PaginatedResponse(
        total=total,
        page=page,
        limit=limit,
        pages=pages,
        data=users_data
    )

# ==================== Get User Statistics ====================

@router.get("/stats", response_model=UserStatistics)
def get_user_statistics(
    db: Session = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get user statistics including:
    - Total users
    - Active this week
    - Pending KYC (placeholder)
    - Suspended accounts
    - Verified accounts
    - Premium subscriptions (placeholder)
    """
    # Total users
    total_users = db.query(User).count()
    
    # Active this week (users active in last 7 days)
    one_week_ago = datetime.utcnow() - timedelta(days=7)
    active_this_week = db.query(User).filter(User.last_active >= one_week_ago).count()
    
    # Suspended accounts
    suspended_accounts = db.query(User).filter(User.status == "suspended").count()
    
    # Verified accounts
    verified_accounts = db.query(User).filter(User.verified == True).count()
    
    # Placeholders (implement based on your business logic)
    pending_kyc = 0  # TODO: Implement KYC logic
    premium_subscriptions = 0  # TODO: Implement premium subscription logic
    
    return UserStatistics(
        totalUsers=total_users,
        activeThisWeek=active_this_week,
        pendingKYC=pending_kyc,
        suspendedAccounts=suspended_accounts,
        verifiedAccounts=verified_accounts,
        premiumSubscriptions=premium_subscriptions
    )

# ==================== Get User by ID ====================

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
):
    """
    Get a single user by ID
    """
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user
