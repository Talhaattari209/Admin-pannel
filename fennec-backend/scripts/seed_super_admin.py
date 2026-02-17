"""
Seed super admin user into the database
Run this script after creating the database to add the super admin
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.database import SessionLocal
from app.models import SuperAdmin
from app.core.security import get_password_hash
from app.config import settings

def seed_super_admin():
    """Create super admin user"""
    db = SessionLocal()
    
    try:
        # Check if super admin already exists
        existing_admin = db.query(SuperAdmin).filter(
            SuperAdmin.email == settings.SUPER_ADMIN_EMAIL
        ).first()
        
        if existing_admin:
            print(f"✅ Super admin already exists: {settings.SUPER_ADMIN_EMAIL}")
            return
        
        # Create super admin
        super_admin = SuperAdmin(
            email=settings.SUPER_ADMIN_EMAIL,
            name="Super Administrator",
            hashed_password=get_password_hash(settings.SUPER_ADMIN_PASSWORD),
            is_active=True
        )
        
        db.add(super_admin)
        db.commit()
        
        print("=" * 60)
        print("✅ Super Admin Created Successfully!")
        print("=" * 60)
        print(f"Email: {settings.SUPER_ADMIN_EMAIL}")
        print(f"Password: {settings.SUPER_ADMIN_PASSWORD}")
        print("=" * 60)
        print("⚠️  IMPORTANT: Change this password in production!")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Error creating super admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_super_admin()
