"""
Seed dummy mobile app users for testing the Users Management page

Run this script to populate the database with test users
"""
import asyncio
import sys
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
import platform

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.database import AsyncSessionLocal
from app.models.user import User, UserStatus
from sqlalchemy.ext.asyncio import AsyncSession

# Windows event loop policy
if platform.system() == 'Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

DUMMY_USERS = [
    {
        "first_name": "Alice",
        "last_name": "Johnson",
        "email": "alice.johnson@example.com",
        "phone": "+1234567890",
        "status": UserStatus.ACTIVE,
        "verified": True,
        "created_at": datetime.now(timezone.utc) - timedelta(days=30),
        "last_active": datetime.now(timezone.utc) - timedelta(hours=2)
    },
    {
        "first_name": "Bob",
        "last_name": "Smith",
        "email": "bob.smith@example.com",
        "phone": "+1234567891",
        "status": UserStatus.ACTIVE,
        "verified": True,
        "created_at": datetime.now(timezone.utc) - timedelta(days=25),
        "last_active": datetime.now(timezone.utc) - timedelta(days=1)
    },
    {
        "first_name": "Carol",
        "last_name": "Williams",
        "email": "carol.williams@example.com",
        "phone": "+1234567892",
        "status": UserStatus.INACTIVE,
        "verified": False,
        "created_at": datetime.now(timezone.utc) - timedelta(days=5),
        "last_active": datetime.now(timezone.utc) - timedelta(hours=6)
    },
    {
        "first_name": "David",
        "last_name": "Brown",
        "email": "david.brown@example.com",
        "phone": "+1234567893",
        "status": UserStatus.SUSPENDED,
        "verified": True,
        "created_at": datetime.now(timezone.utc) - timedelta(days=60),
        "last_active": datetime.now(timezone.utc) - timedelta(days=10)
    },
    {
        "first_name": "Emma",
        "last_name": "Davis",
        "email": "emma.davis@example.com",
        "phone": "+1234567894",
        "status": UserStatus.ACTIVE,
        "verified": True,
        "created_at": datetime.now(timezone.utc) - timedelta(days=15),
        "last_active": datetime.now(timezone.utc) - timedelta(minutes=30)
    },
    {
        "first_name": "Frank",
        "last_name": "Miller",
        "email": "frank.miller@example.com",
        "phone": "+1234567895",
        "status": UserStatus.ACTIVE,
        "verified": False,
        "created_at": datetime.now(timezone.utc) - timedelta(days=3),
        "last_active": datetime.now(timezone.utc) - timedelta(hours=5)
    },
    {
        "first_name": "Grace",
        "last_name": "Wilson",
        "email": "grace.wilson@example.com",
        "phone": "+1234567896",
        "status": UserStatus.INACTIVE,
        "verified": False,
        "created_at": datetime.now(timezone.utc) - timedelta(days=1),
        "last_active": datetime.now(timezone.utc) - timedelta(hours=12)
    },
    {
        "first_name": "Henry",
        "last_name": "Moore",
        "email": "henry.moore@example.com",
        "phone": "+1234567897",
        "status": UserStatus.ACTIVE,
        "verified": True,
        "created_at": datetime.now(timezone.utc) - timedelta(days=45),
        "last_active": datetime.now(timezone.utc) - timedelta(hours=1)
    },
]

async def seed_users(session: AsyncSession):
    """Seed database with dummy users"""
    print("🌱 Seeding dummy users...")
    
    for user_data in DUMMY_USERS:
        # Check if user already exists
        from sqlalchemy import select
        result = await session.execute(
            select(User).where(User.email == user_data["email"])
        )
        existing_user = result.scalar_one_or_none()
        
        if existing_user:
            print(f"  ⏭️  User {user_data['email']} already exists, skipping...")
            continue
        
        user = User(**user_data)
        session.add(user)
        print(f"  ✅ Created user: {user_data['first_name']} {user_data['last_name']} ({user_data['email']})")
    
    await session.commit()
    print("✅ Dummy users seeded successfully!")

async def main():
    async with AsyncSessionLocal() as session:
        try:
            await seed_users(session)
        except Exception as e:
            print(f"❌ Error seeding users: {e}")
            await session.rollback()
            raise

if __name__ == "__main__":
    asyncio.run(main())
