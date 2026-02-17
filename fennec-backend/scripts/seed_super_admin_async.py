"""
Async seed super admin user into the database
Run this script after creating the database to add the super admin
"""
import asyncio
import sys
import platform
from pathlib import Path

# Fix for Windows ProactorEventLoop incompatibility with psycopg
if platform.system() == 'Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.database import AsyncSessionLocal
from app.models import SuperAdmin
from app.core.security import get_password_hash
from app.config import settings
from sqlalchemy import select

async def seed_super_admin():
    """Create super admin user"""
    async with AsyncSessionLocal() as session:
        try:
            # Check if super admin already exists
            result = await session.execute(
                select(SuperAdmin).filter(SuperAdmin.email == settings.SUPER_ADMIN_EMAIL)
            )
            existing_admin = result.scalar_one_or_none()
            
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
            
            session.add(super_admin)
            await session.commit()
            
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
            await session.rollback()
            raise

if __name__ == "__main__":
    asyncio.run(seed_super_admin())
