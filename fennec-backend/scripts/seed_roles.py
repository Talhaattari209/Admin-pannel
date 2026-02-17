"""
Script to seed roles with dummy permissions for testing
Run this after the super admin is created
"""

import asyncio
import sys
import os
import platform

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import select
from app.database import AsyncSessionLocal
from app.models import Role, SuperAdmin

# Set Windows event loop policy
if platform.system() == 'Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def create_dummy_roles():
    """Create dummy roles with permissions"""
    async with AsyncSessionLocal() as db:
        try:
            # Check if roles already exist
            result = await db.execute(select(Role))
            existing_roles = result.unique().scalars().all()
            
            if existing_roles:
                print(f"✅ {len(existing_roles)} roles already exist:")
                for role in existing_roles:
                    print(f"   - {role.title}")
                return
            
            # Define dummy roles based on TeamMembersTable mock data
            roles_data = [
                {
                    "title": "Admin",
                    "description": "Full access to all modules",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view", "export"]},
                        {"module": "app content", "permissions": ["view", "edit", "delete", "export"]},
                        {"module": "users management", "permissions": ["view", "edit", "delete", "export"]},
                        {"module": "support request", "permissions": ["view", "edit", "delete", "export"]},
                        {"module": "account settings", "permissions": ["view", "edit"]},
                        {"module": "team & roles", "permissions": ["view", "edit", "delete", "export"]},
                    ]
                },
                {
                    "title": "Moderator", 
                    "description": "Moderate content and users",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "app content", "permissions": ["view", "edit", "delete"]},
                        {"module": "users management", "permissions": ["view", "edit"]},
                        {"module": "support request", "permissions": ["view", "edit"]},
                    ]
                },
                {
                    "title": "Support Agent",
                    "description": "Handle user support requests",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "support request", "permissions": ["view", "edit"]},
                        {"module": "users management", "permissions": ["view"]},
                    ]
                },
                {
                    "title": "Editor",
                    "description": "Manage app content",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "app content", "permissions": ["view", "edit", "delete"]},
                    ]
                },
                {
                    "title": "Viewer",
                    "description": "Read-only access",
                    "resources": [
                        {"module": "dashboard", "permissions": ["view"]},
                        {"module": "app content", "permissions": ["view"]},
                        {"module": "users management", "permissions": ["view"]},
                    ]
                },
            ]
            
            # Create roles
            created_roles = []
            for role_data in roles_data:
                role = Role(**role_data)
                db.add(role)
                created_roles.append(role.title)
            
            await db.commit()
            
            print("\n✅ Successfully created dummy roles:")
            for title in created_roles:
                print(f"   - {title}")
                
            print("\n📝 You can now:")
            print("   1. Login with super admin credentials")
            print("   2. Create team members with these roles")
            print("   3. Test the full integration flow")
            
        except Exception as e:
            await db.rollback()
            print(f"\n❌ Error creating roles: {e}")
            raise

if __name__ == "__main__":
    print("🚀 Creating dummy roles for Fennec Admin Panel...\n")
    asyncio.run(create_dummy_roles())
    print("\n✅ Done!")
