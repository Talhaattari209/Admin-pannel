# Fennec Backend Quick Start

**Complete FastAPI backend implementation for Fennec Admin Panel**

## ✅ What's Included

### Complete API Endpoints
- ✅ **Authentication** - Super Admin & Team Member login
- ✅ **Roles** - Full CRUD with permissions
- ✅ **Team Members** - Full CRUD with role assignment
- ✅ **Users** - List, stats, details
- ✅ **File Upload** - Single & multiple files

### Database & Infrastructure
- ✅ PostgreSQL models (Role, SuperAdmin, TeamMember, User)
- ✅ Alembic migrations
- ✅ JWT authentication with refresh tokens
- ✅ Pydantic schemas matching Postman collection
- ✅ CORS configuration

---

## 🚀 Quick Setup (5 minutes)

### 1. Install UV & Dependencies

```powershell
# Install UV
pip install uv

# Navigate to backend
cd c:\Users\DELL\Downloads\FennecAdminPanel\fennec-backend

# Create & activate environment
uv venv
.venv\Scripts\activate

# Install dependencies
uv pip install -r requirements.txt
```

### 2. Setup Database

```powershell
# Create PostgreSQL database
createdb -U postgres fennec_admin

# Copy environment file
copy .env.example .env

# Edit .env with your database password and secret key
notepad .env
```

**Important:** Update `DATABASE_URL` in `.env`:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/fennec_admin
```

### 3. Initialize & Run

```powershell
# Run migrations
alembic upgrade head

# Seed super admin
python scripts\seed_super_admin.py

# Start server
uvicorn app.main:app --reload --port 8000
```

**API is now running at:** http://localhost:8000/docs

---

## 🎯 Test with Postman

1. Import: `fennec.postman_collection.json`
2. Set variables:
   - `local_url` = `http://localhost:8000`
   - `base_url` = `http://localhost:8000`
3. Try **Super Admin Login**:
   - Email: `superadmin@mailinator.com`
   - Password `go6Qnri&cQ1Rj1$N`

---

## 📝 API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/auth/super-admin/login` | POST | Super admin login |
| `/admin/auth/login` | POST | Team member login |
| `/admin/auth/me` | GET | Get current admin |
| `/admin/roles` | GET/POST | List/create roles |
| `/admin/roles/:id` | GET/PUT/DELETE | Role operations |
| `/admin/team-members` | GET/POST | List/create team members |
| `/admin/team-members/:id` | GET/PUT/DELETE | Team member operations |
| `/admin/users` | GET | List users |
| `/admin/users/stats` | GET | User statistics |
| `/admin/users/:id` | GET | Get user details |
| `/upload/single` | POST | Upload single file |
| `/upload/multiple` | POST | Upload multiple files |

---

## 📁 Project Structure

```
fennec-backend/
├── app/
│   ├── api/v1/          # API routes
│   │   ├── auth.py      # Authentication endpoints
│   │   ├── roles.py     # Roles endpoints
│   │   ├── team_members.py  # Team members endpoints
│   │   ├── users.py     # Users endpoints
│   │   └── upload.py    # File upload endpoints
│   ├── core/            # Security, config, dependencies
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── config.py        # Settings
│   ├── database.py      # DB connection
│   └── main.py          # FastAPI app
├── alembic/             # Database migrations
├── scripts/             # Utility scripts
├── uploads/             # File storage
└── requirements.txt     # Dependencies
```

---

## 🔧 Common Tasks

### Add a migration
```powershell
alembic revision --autogenerate -m "Added new field"
alembic upgrade head
```

### Reset database
```powershell
alembic downgrade base
alembic upgrade head
python scripts\seed_super_admin.py
```

### Run on different port
```powershell
uvicorn app.main:app --reload --port 8001
```

---

## 📚 Full Documentation

See `SETUP.md` for detailed setup instructions and troubleshooting.

---

Built with FastAPI 🚀 | PostgreSQL 🐘 | UV ⚡
