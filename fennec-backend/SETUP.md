# Backend Setup Guide

This guide will help you set up and run the Fennec Admin Panel backend.

## Prerequisites

Before you begin, ensure you have:
- Python 3.11 or higher installed
- PostgreSQL 15 or higher installed and running
- `uv` package manager (we'll install this)

---

## Step-by-Step Setup

### 1. Install UV Package Manager

```powershell
pip install uv
```

### 2. Create PostgreSQL Database

Open PostgreSQL and create a new database:

```sql
CREATE DATABASE fennec_admin;
```

Or using command line:

```powershell
createdb -U postgres fennec_admin
```

### 3. Create Environment File

Navigate to the backend directory and copy the example environment file:

```powershell
cd c:\Users\DELL\Downloads\FennecAdminPanel\fennec-backend
copy .env.example .env
```

### 4. Configure Environment Variables

Open `.env` in a text editor and update these variables:

```env
# Update with your PostgreSQL credentials
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/fennec_admin

# Change this secret key in production!
SECRET_KEY=your-super-secret-key-change-in-production-minimum-32-characters

# Your frontend URL
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

**IMPORTANT:** Replace `YOUR_PASSWORD` with your actual PostgreSQL password!

### 5. Create Virtual Environment

```powershell
uv venv
```

### 6. Activate Virtual Environment

```powershell
.venv\Scripts\activate
```

You should see `(.venv)` in your terminal prompt.

### 7. Install Dependencies

```powershell
uv pip install -r requirements.txt
```

This will install all required packages using UV (much faster than pip!).

### 8. Initialize Database with Alembic

Create the initial migration:

```powershell
alembic revision --autogenerate -m "Initial migration"
```

Apply the migration:

```powershell
alembic upgrade head
```

### 9. Seed Super Admin

Run the seed script to create the super admin user:

```powershell
python scripts\seed_super_admin.py
```

You should see:

```
============================================================
✅ Super Admin Created Successfully!
============================================================
Email: superadmin@mailinator.com
Password: go6Qnri&cQ1Rj1$N
============================================================
```

### 10. Start the Server

```powershell
uvicorn app.main:app --reload --port 8000
```

The API will be running at:
- **API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## Testing with Postman

1. Open Postman
2. Import the collection: `fennec.postman_collection.json`
3. Set environment variables:
   - `local_url`: `http://localhost:8000`
   - `base_url`: `http://localhost:8000`
4. Try the "Super Admin Login" endpoint
5. The access token will be automatically saved to environment variables

---

## Common Commands

### Start Server (Development)
```powershell
.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

### Create New Migration
```powershell
alembic revision --autogenerate -m "description of changes"
```

### Apply Migrations
```powershell
alembic upgrade head
```

### Rollback Migration
```powershell
alembic downgrade -1
```

---

## Troubleshooting

### Database Connection Error

If you get a database connection error:

1. Make sure PostgreSQL is running
2. Check that the database exists: `psql -U postgres -l`
3. Verify your `DATABASE_URL` in `.env`

### Module Not Found Error

Make sure you've activated the virtual environment:

```powershell
.venv\Scripts\activate
```

### Port Already in Use

If port 8000 is already in use, run on a different port:

```powershell
uvicorn app.main:app --reload --port 8001
```

---

## Next Steps

1. Test all endpoints using Postman
2. Create some roles using the "Create Role" endpoint
3. Add team members with the "Create Team Member" endpoint
4. Integrate with your Next.js frontend!

Enjoy building! 🚀
