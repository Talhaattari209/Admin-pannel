from sqlalchemy import Column, String, Boolean, Integer, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum
from app.database import Base
from app.models.base import TimestampMixin

class UserStatus(str, enum.Enum):
    """User status enum"""
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class User(Base, TimestampMixin):
    """End user model - represents mobile app users"""
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    first_name = Column(String(255), nullable=True)
    last_name = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String(20), nullable=True)
    verified = Column(Boolean, default=False, nullable=False)
    status = Column(SQLEnum(UserStatus), default=UserStatus.ACTIVE, nullable=False)
    last_active = Column(DateTime(timezone=True), nullable=True)
    profile_picture = Column(String(500), nullable=True)
    
    @property
    def name(self) -> str:
        """Full name"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.first_name or self.last_name or "Unknown"
