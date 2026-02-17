from sqlalchemy import Column, String, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.database import Base
from app.models.base import TimestampMixin

class Role(Base, TimestampMixin):
    """
    Role model for team member roles
    Permissions stored as resources array matching Postman format
    """
    __tablename__ = "roles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(String(500), nullable=True)
    
    # Resources format: [{"module": "dashboard", "permissions": ["view", "edit"]}]
    resources = Column(JSON, nullable=False, default=[])
    
    # Relationships
    team_members = relationship("TeamMember", back_populates="role", lazy="joined")
    
    @property
    def member_count(self) -> int:
        """Count of team members with this role"""
        return len(self.team_members) if self.team_members else 0
