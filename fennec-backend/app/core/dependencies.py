from typing import Optional, Union
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import decode_token
from app.models import SuperAdmin, TeamMember

security = HTTPBearer()

def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> Union[SuperAdmin, TeamMember]:
    """
    Dependency to get current authenticated admin (Super Admin or Team Member)
    """
    token = credentials.credentials
    payload = decode_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id: str = payload.get("sub")
    user_type: str = payload.get("user_type")
    
    if not user_id or not user_type:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )
    
    # Get user based on type
    if user_type == "super_admin":
        admin = db.query(SuperAdmin).filter(SuperAdmin.id == user_id).first()
    elif user_type == "team_member":
        admin = db.query(TeamMember).filter(TeamMember.id == user_id).first()
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user type",
        )
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user",
        )
    
    return admin

def get_super_admin(
    current_admin: Union[SuperAdmin, TeamMember] = Depends(get_current_admin)
) -> SuperAdmin:
    """
    Dependency to ensure current user is a Super Admin
    """
    if not isinstance(current_admin, SuperAdmin):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super admin access required",
        )
    return current_admin
