"""API v1 package"""
from fastapi import APIRouter
from app.api.v1 import auth, roles, team_members, users

# Create main router
router = APIRouter()

# Include routers with /admin prefix
router.include_router(auth.router, prefix="/admin/auth", tags=["Authentication"])
router.include_router(roles.router, prefix="/admin/roles", tags=["Roles"])
router.include_router(team_members.router, prefix="/admin/team-members", tags=["Team Members"])
router.include_router(users.router, prefix="/admin/users", tags=["Users"])
