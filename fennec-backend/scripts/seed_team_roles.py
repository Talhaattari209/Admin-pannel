"""
Seed dummy data for Roles and Team Members tables
Run with: python scripts/seed_team_roles.py
"""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database import AsyncSessionLocal
from app.models import Role, TeamMember
from app.core.security import get_password_hash
from sqlalchemy import select
import platform

# Set event loop policy for Windows
if platform.system() == 'Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def seed_data():
    """Seed dummy roles and team members"""
    
    async with AsyncSessionLocal() as db:
        try:
            # Check if data already exists
            result = await db.execute(select(Role))
            existing_roles = result.scalars().unique().all()
            
            if len(existing_roles) >= 5:
                print(f"✅ Already have {len(existing_roles)} roles. Skipping seed.")
                return
            
            print("🌱 Seeding roles and team members...")
            
            # Create 5 roles
            roles_data = [
                {
                    "title": "Administrator",
                    "description": "Full system access with all permissions",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view", "export"]},
                        {"module": "app content", "permissions": ["view", "edit", "delete"]},
                        {"module": "users management", "permissions": ["view", "edit", "delete", "export"]},
                        {"module": "support request", "permissions": ["view", "edit", "delete"]},
                        {"module": "team & roles", "permissions": ["view", "edit", "delete"]}
                    ]
                },
                {
                    "title": "Content Manager",
                    "description": "Manages app content and media",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "app content", "permissions": ["view", "edit", "delete"]},
                        {"module": "users management", "permissions": ["view"]}
                    ]
                },
                {
                    "title": "Support Agent",
                    "description": "Handles user support and inquiries",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "users management", "permissions": ["view", "edit"]},
                        {"module": "support request", "permissions": ["view", "edit"]}
                    ]
                },
                {
                    "title": "Moderator",
                    "description": "Moderates user content and behavior",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "users management", "permissions": ["view", "edit"]},
                        {"module": "reported problem", "permissions": ["view", "edit", "delete"]}
                    ]
                },
                {
                    "title": "Viewer",
                    "description": "Read-only access to dashboards and reports",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "users management", "permissions": ["view"]},
                        {"module": "system logs", "permissions": ["view"]}
                    ]
                }
            ]
            
            created_roles = []
            for role_data in roles_data:
                # Check if role already exists
                result = await db.execute(select(Role).filter(Role.title == role_data["title"]))
                existing = result.scalars().unique().one_or_none()
                
                if existing:
                    created_roles.append(existing)
                    print(f"  → Role '{role_data['title']}' already exists")
                else:
                    role = Role(**role_data)
                    db.add(role)
                    await db.flush()
                    created_roles.append(role)
                    print(f"  ✅ Created role: {role_data['title']}")
            
            await db.commit()
            
            # Refresh roles to get their IDs
            for role in created_roles:
                await db.refresh(role)
            
            # Create 5 team members
            team_members_data = [
                {
                    "name": "John Administrator",
                    "email": "john.admin@fennec.com",
                    "role_id": created_roles[0].id,
                    "status": "active"
                },
                {
                    "name": "Sarah Content",
                    "email": "sarah.content@fennec.com",
                    "role_id": created_roles[1].id,
                    "status": "active"
                },
                {
                    "name": "Mike Support",
                    "email": "mike.support@fennec.com",
                    "role_id": created_roles[2].id,
                    "status": "active"
                },
                {
                    "name": "Emma Moderator",
                    "email": "emma.mod@fennec.com",
                    "role_id": created_roles[3].id,
                    "status": "active"
                },
                {
                    "name": "David Viewer",
                    "email": "david.viewer@fennec.com",
                    "role_id": created_roles[4].id,
                    "status": "invited"
                }
            ]
            
            for member_data in team_members_data:
                # Check if member already exists
                result = await db.execute(select(TeamMember).filter(TeamMember.email == member_data["email"]))
                existing = result.scalar_one_or_none()
                
                if existing:
                    print(f"  → Team member '{member_data['name']}' already exists")
                else:
                    member = TeamMember(
                        **member_data,
                        hashed_password=get_password_hash("Password123!")
                    )
                    db.add(member)
                    print(f"  ✅ Created team member: {member_data['name']}")
            
            await db.commit()
            
            print("\n✅ Seeding completed successfully!")
            print("📊 Summary:")
            print(f"   - Roles: {len(created_roles)}")
            print(f"   - Team Members: {len(team_members_data)}")
            print("\n🔑 All team members use password: Password123!")
            
        except Exception as e:
            print(f"❌ Error seeding data: {e}")
            await db.rollback()
            raise

if __name__ == "__main__":
    asyncio.run(seed_data())
