"""
Async Database Testing Script
Tests all models with dummy data insertion and retrieval
"""
import asyncio
import sys
import platform
from pathlib import Path
from datetime import datetime, timezone

# Fix for Windows ProactorEventLoop incompatibility with psycopg
if platform.system() == 'Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.database import AsyncSessionLocal
from app.models import SuperAdmin, TeamMember, Role, User, UserStatus
from app.core.security import get_password_hash
from sqlalchemy import select, func

async def test_database_integration():
    """Test database integration with all models"""
    async with AsyncSessionLocal() as session:
        try:
            print("\n" + "=" * 70)
            print("🧪 Starting Database Integration Test")
            print("=" * 70)
            
            # Test 1: Create and verify Role
            print("\n📋 Test 1: Creating Role...")
            test_role = Role(
                title="Content Manager",
                description="Manages all app content and user-generated content",
                resources=[
                    {"module": "dashboard", "permissions": ["view", "export"]},
                    {"module": "app content", "permissions": ["view", "edit", "delete"]},
                    {"module": "users management", "permissions": ["view", "export"]}
                ]
            )
            session.add(test_role)
            await session.flush()  # Get the ID without committing
            print(f"✅ Role created: {test_role.title} (ID: {test_role.id})")
            
            # Test 2: Create and verify TeamMember
            print("\n👥 Test 2: Creating Team Member...")
            test_team_member = TeamMember(
                email="john.doe@fennec.app",
                name="John Doe",
                hashed_password=get_password_hash("SecurePassword123!"),
                is_active=True,
                status="active",
                role_id=test_role.id
            )
            session.add(test_team_member)
            await session.flush()
            print(f"✅ Team Member created: {test_team_member.name} (ID: {test_team_member.id})")
            print(f"   Role:  {test_role.title}")
            
            # Test 3: Create and verify User
            print("\n👤 Test 3: Creating End User...")
            test_user = User(
                email="alice.smith@example.com",
                first_name="Alice",
                last_name="Smith",
                phone="+1234567890",
                age=28,
                gender="female",
                verified=True,
                status=UserStatus.ACTIVE,
                last_active=datetime.now(timezone.utc)
            )
            session.add(test_user)
            await session.flush()
            print(f"✅ User created: {test_user.name} (ID: {test_user.id})")
            print(f"   Email: {test_user.email}")
            print(f"   Status: {test_user.status.value}")
            
            # Commit all changes
            await session.commit()
            print("\n💾 All data committed to database")
            
            # Test 4: Verify Data Retrieval
            print("\n🔍 Test 4: Verifying Data Retrieval...")
            
            # Count all roles
            role_count = await session.execute(select(func.count()).select_from(Role))
            total_roles = role_count.scalar()
            print(f"✅ Total Roles in DB: {total_roles}")
            
            # Count all team members
            member_count = await session.execute(select(func.count()).select_from(TeamMember))
            total_members = member_count.scalar()
            print(f"✅ Total Team Members in DB: {total_members}")
            
            # Count all users
            user_count = await session.execute(select(func.count()).select_from(User))
            total_users = user_count.scalar()
            print(f"✅ Total Users in DB: {total_users}")
            
            # Test 5: Verify Relationships
            print("\n🔗 Test 5: Verifying Relationships...")
            
            # Fetch role with team members
            result = await session.execute(
                select(Role).filter(Role.id == test_role.id)
            )
            fetched_role = result.unique().scalar_one()  # Use unique() for eager loaded relationships
            
            # Manually fetch team members for this role
            members_result = await session.execute(
                select(TeamMember).filter(TeamMember.role_id == fetched_role.id)
            )
            role_members = members_result.scalars().all()
            
            print(f"✅ Role '{fetched_role.title}' has {len(role_members)} team member(s)")
            for member in role_members:
                print(f"   - {member.name} ({member.email})")
            
            # Test 6: Verify Permissions
            print("\n🔐 Test 6: Verifying Permissions...")
            print(f"✅ Role resources/permissions:")
            for resource in fetched_role.resources:
                print(f"   - {resource['module']}: {', '.join(resource['permissions'])}")
            
            # Test 7: Query with filters
            print("\n🔎 Test 7: Testing Queries with Filters...")
            
            # Find active team members
            active_members_result = await session.execute(
                select(TeamMember).filter(TeamMember.status == "active")
            )
            active_members = active_members_result.scalars().all()
            print(f"✅ Active team members: {len(active_members)}")
            
            # Find verified users
            verified_users_result = await session.execute(
                select(User).filter(User.verified == True)
            )
            verified_users = verified_users_result.scalars().all()
            print(f"✅ Verified users: {len(verified_users)}")
            
            # Test 8: SuperAdmin check
            print("\n👑 Test 8: Verifying Super Admin...")
            super_admin_result = await session.execute(
                select(SuperAdmin).filter(SuperAdmin.is_active == True)
            )
            super_admins = super_admin_result.scalars().all()
            print(f"✅ Super Admins in DB: {len(super_admins)}")
            for admin in super_admins:
                print(f"   - {admin.name} ({admin.email})")
            
            # Final Summary
            print("\n" + "=" * 70)
            print("✅ ALL TESTS PASSED!")
            print("=" * 70)
            print(f"📊 Database Summary:")
            print(f"   - Super Admins: {len(super_admins)}")
            print(f"   - Roles: {total_roles}")
            print(f"   - Team Members: {total_members}")
            print(f"   - End Users: {total_users}")
            print("=" * 70)
            
            return True
            
        except Exception as e:
            print(f"\n❌ Test failed with error: {e}")
            print(f"   Error type: {type(e).__name__}")
            import traceback
            traceback.print_exc()
            await session.rollback()
            return False

if __name__ == "__main__":
    success = asyncio.run(test_database_integration())
    sys.exit(0 if success else 1)
