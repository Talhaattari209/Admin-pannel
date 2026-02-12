from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.database import Base
from app.models.base import TimestampMixin

class SuperAdmin(Base, TimestampMixin):
    """Super Admin model with full system permissions"""
    __tablename__ = "super_admins"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    def get_permissions(self):
        """Super admin has all permissions"""
        return [
            {"module": "dashboard", "permissions": ["view", "export"]},
            {"module": "app content", "permissions": ["view", "edit", "delete"]},
            {"module": "users management", "permissions": ["view", "edit", "delete", "export"]},
            {"module": "support request", "permissions": ["view", "edit", "delete"]},
            {"module": "reported problem", "permissions": ["view", "edit", "delete"]},
            {"module": "app setting", "permissions": ["view", "edit"]},
            {"module": "team & roles", "permissions": ["view", "edit", "delete"]},
            {"module": "account setting", "permissions": ["view", "edit"]},
            {"module": "system logs", "permissions": ["view", "export"]},
        ]

class TeamMember(Base, TimestampMixin):
    """Team Member model with role-based permissions"""
    __tablename__ = "team_members"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    profile_picture = Column(String(500), nullable=True)
    status = Column(String(20), default="active", nullable=False)  # active, inactive
    
    # Foreign key to Role - field name is 'role' to match Postman
    role_id = Column("role", UUID(as_uuid=True), ForeignKey("roles.id"), nullable=False)
    
    # Relationships
    role = relationship("Role", back_populates="team_members")
    
    def get_permissions(self):
        """Get permissions from assigned role"""
        return self.role.resources if self.role else []
